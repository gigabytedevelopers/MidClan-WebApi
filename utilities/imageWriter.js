const fs = require('node:fs/promises');
const path = require('node:path');

const FORMATS = {
    png: { extension: 'png', valid: data => data.subarray(0, 8).equals(Buffer.from('89504e470d0a1a0a', 'hex')) },
    jpeg: { extension: 'jpg', valid: data => data.subarray(0, 3).equals(Buffer.from('ffd8ff', 'hex')) },
    gif: { extension: 'gif', valid: data => /^GIF8[79]a$/.test(data.subarray(0, 6).toString('ascii')) },
    webp: { extension: 'webp', valid: data => data.subarray(0, 4).toString('ascii') === 'RIFF' && data.subarray(8, 12).toString('ascii') === 'WEBP' }
};

async function writeImage(dataUri, directory, filename, publicRoot = path.resolve('public')) {
    if (typeof dataUri !== 'string' || dataUri.length > 7 * 1024 * 1024) throw new Error('Invalid image size');
    const match = /^data:image\/(png|jpe?g|gif|webp);base64,([A-Za-z0-9+/]+={0,2})$/.exec(dataUri);
    if (!match) throw new Error('Unsupported image format');
    if (typeof filename !== 'string' || !/^[A-Za-z0-9][A-Za-z0-9_.-]{0,127}$/.test(filename)) throw new Error('Invalid image filename');
    if (typeof directory !== 'string' || directory.split(/[\\/]/).some(part => part === '..' || part === '.')) throw new Error('Invalid image directory');
    const resolvedRoot = path.resolve(publicRoot);
    const resolvedDirectory = path.resolve(directory);
    const relative = path.relative(resolvedRoot, resolvedDirectory);
    if (relative === '..' || relative.startsWith('..' + path.sep) || path.isAbsolute(relative)) throw new Error('Image directory is outside public storage');
    const format = FORMATS[match[1] === 'jpg' ? 'jpeg' : match[1]];
    const data = Buffer.from(match[2], 'base64');
    if (!data.length || data.length > 5 * 1024 * 1024 || data.toString('base64').replace(/=+$/, '') !== match[2].replace(/=+$/, '') || !format.valid(data)) throw new Error('Invalid image data');
    await fs.mkdir(resolvedRoot, { recursive: true });
    let current = resolvedRoot;
    for (const segment of relative.split(path.sep).filter(Boolean)) {
        current = path.join(current, segment);
        try {
            const entry = await fs.lstat(current);
            if (entry.isSymbolicLink() || !entry.isDirectory()) throw new Error('Invalid storage directory');
        } catch (error) {
            if (error.code !== 'ENOENT') throw error;
            await fs.mkdir(current);
        }
    }
    // Resolve existing symlinks before writing, so a storage symlink cannot escape the root.
    const realRoot = await fs.realpath(resolvedRoot);
    const realDirectory = await fs.realpath(resolvedDirectory);
    const realRelative = path.relative(realRoot, realDirectory);
    if (realRelative === '..' || realRelative.startsWith('..' + path.sep) || path.isAbsolute(realRelative)) throw new Error('Image directory resolves outside public storage');
    const target = path.join(realDirectory, filename + '.' + format.extension);
    // Never overwrite another upload or follow a symlink at the destination.
    await fs.writeFile(target, data, { flag: 'wx' });
    return path.join(directory, filename + '.' + format.extension).replace(/\\/g, '/');
}

module.exports = { writeImage };
