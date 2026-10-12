const test = require('node:test');
const assert = require('node:assert/strict');
const http = require('node:http');
const { Server } = require('socket.io');
const { io } = require('socket.io-client');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const hbs = require('hbs');

test('JWT round trip succeeds and unsigned tokens are rejected', () => {
    const secret = 'local-test-only-strong-secret-value';
    const token = jwt.sign({ _id: '507f1f77bcf86cd799439011' }, secret);
    assert.equal(jwt.verify(token, secret)._id, '507f1f77bcf86cd799439011');
    const unsigned = jwt.sign({ _id: 'attacker' }, null, { algorithm: 'none' });
    assert.throws(() => jwt.verify(unsigned, secret));
});
test('Mongoose accepts a valid ObjectId and validates without a database connection', async () => {
    assert.equal(mongoose.Types.ObjectId.isValid('507f1f77bcf86cd799439011'), true);
    const User = mongoose.model('SecurityTestUser', new mongoose.Schema({ name: { type: String, required: true } }));
    await new User({ name: 'Test' }).validate();
    await assert.rejects(new User({}).validate());
    mongoose.deleteModel('SecurityTestUser');
});
test('Handlebars still escapes untrusted template values', () => {
    assert.equal(hbs.handlebars.compile('{{name}}')({ name: '<script>' }), '&lt;script&gt;');
});
test('Socket.IO can join a room and receive the existing refresh event', async t => {
    const server = http.createServer();
    const sockets = new Server(server, { allowEIO3: true });
    await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
    const client = io(`http://127.0.0.1:${server.address().port}`, { reconnection: false });
    t.after(() => { client.close(); sockets.close(); server.close(); });
    sockets.on('connection', socket => socket.on('enter conversation', async room => {
        await socket.join(room);
        sockets.sockets.in(room).emit('refresh messages', room);
    }));
    const refreshed = new Promise((resolve, reject) => {
        client.on('refresh messages', resolve);
        client.on('connect_error', reject);
    });
    await new Promise(resolve => client.once('connect', resolve));
    client.emit('enter conversation', 'example-room');
    assert.equal(await refreshed, 'example-room');
});
test('existing Engine.IO 3 clients can still obtain a handshake', async t => {
    const server = http.createServer();
    const sockets = new Server(server, { allowEIO3: true });
    await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
    t.after(() => { sockets.close(); server.close(); });
    const response = await new Promise((resolve, reject) => {
        http.get(`http://127.0.0.1:${server.address().port}/socket.io/?EIO=3&transport=polling`, res => {
            let body = '';
            res.on('data', chunk => { body += chunk; });
            res.on('end', () => resolve({ status: res.statusCode, body }));
        }).on('error', reject);
    });
    assert.equal(response.status, 200);
    assert.match(response.body, /"sid":/);
});
