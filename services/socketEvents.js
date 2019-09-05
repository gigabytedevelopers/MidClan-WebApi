exports = module.exports = (io) => {
    // set socket io listener
    io.on('connection', (socket) => {
        // on conversation entry join conversation channel
        socket.on('enter conversation', (conversation) => {
            socket.join(conversation);
        });

        socket.on('leave conversation', (conversation) => {
          socket.leave(conversation);
        });

        socket.on('new message', (conversation) => {
            io.sockets.in(conversation).emit('refresh messages', conversation);
        });

        socket.on('disconnect', () => {
          //console.log('user disconnected');
        });
    })
}
