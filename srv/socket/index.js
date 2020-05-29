import socketIO from 'socket.io';

const io = socketIO();

io.on('connect', (socket) =>{
    const ROOM = 'hello socket';
    socket.join(ROOM);

    socket.to(ROOM).emit('chat', {sender : 'server', message : `${socket.id} has joined`});

    socket.on('message', (data) =>{
        console.log(`[socket.io]\t/chat/message\t${data.sender}\t${data.message}`);
        socket.to(ROOM).emit('chat', data);
    });

    socket.on('disconnect', (reason)=> {
        socket.to(ROOM).emit('chat', {sender : 'server', message : `${socket.id} has leaved`});
    });
});

export default io;