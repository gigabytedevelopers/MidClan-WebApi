const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs/promises');
const os = require('node:os');
const path = require('node:path');
const { writeImage } = require('../utilities/imageWriter');

const png = 'data:image/png;base64,' + Buffer.from('89504e470d0a1a0a', 'hex').toString('base64');
async function storage(t) {
    const root = await fs.mkdtemp(path.join(os.tmpdir(), 'midclan-image-'));
    t.after(() => {
        if (!path.resolve(root).startsWith(path.join(path.resolve(os.tmpdir()), 'midclan-image-'))) throw new Error('Unexpected test cleanup path');
        return fs.rm(root, { recursive: true, force: true });
    });
    const publicRoot = path.join(root, 'public');
    await fs.mkdir(publicRoot);
    return { root, publicRoot, directory: path.join(publicRoot, 'person', 'posts') };
}
test('valid image is written before the returned promise resolves', async t => {
    const { publicRoot, directory } = await storage(t);
    const result = await writeImage(png, directory, 'photo', publicRoot);
    assert.deepEqual(await fs.readFile(result), Buffer.from('89504e470d0a1a0a', 'hex'));
});
test('filename traversal is rejected without writing', async t => {
    const { publicRoot, directory } = await storage(t);
    await assert.rejects(writeImage(png, directory, '../escape', publicRoot));
});
test('directory traversal is rejected', async t => {
    const { root, publicRoot } = await storage(t);
    await assert.rejects(writeImage(png, path.join(root, 'outside'), 'photo', publicRoot));
});
test('HTML or SVG content cannot masquerade as a PNG', async t => {
    const { publicRoot, directory } = await storage(t);
    await assert.rejects(writeImage('data:image/png;base64,' + Buffer.from('<script>bad()</script>').toString('base64'), directory, 'photo', publicRoot));
    await assert.rejects(writeImage('data:image/svg+xml;base64,PHN2Zz4=', directory, 'photo', publicRoot));
});
test('existing files cannot be overwritten', async t => {
    const { publicRoot, directory } = await storage(t);
    await writeImage(png, directory, 'photo', publicRoot);
    await assert.rejects(writeImage(png, directory, 'photo', publicRoot), { code: 'EEXIST' });
});
test('invalid base64 is rejected', async t => {
    const { publicRoot, directory } = await storage(t);
    await assert.rejects(writeImage('data:image/png;base64,%%%bad%%%', directory, 'photo', publicRoot));
});
test('a storage junction cannot redirect an upload outside public storage', async t => {
    const { root, publicRoot } = await storage(t);
    const outside = path.join(root, 'outside');
    await fs.mkdir(outside);
    const link = path.join(publicRoot, 'link');
    await fs.symlink(outside, link, process.platform === 'win32' ? 'junction' : 'dir');
    await assert.rejects(writeImage(png, path.join(link, 'nested'), 'photo', publicRoot));
    assert.deepEqual(await fs.readdir(outside), []);
});
