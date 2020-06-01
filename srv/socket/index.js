import socketIO from 'socket.io';

const io = socketIO();

io.on('connect', (socket) =>{
    socket.on('room:join', (data) =>{
        try{
            const { user, room } = data;
            const { nickname } = user;
            const { socketId } = room
            console.log(`[socket.io]\troom:join\troom(${socketId})\tuser(${nickname})`);
            
            socket.join(socketId);
            socket.to(socketId).emit('chat:message', {user : {id : '-1', nickname : 'admin'}, room: room, message : `${nickname} has joined`});
        }
        catch(e){
            console.log(e);
        }
    });

    socket.on('room:leave', (data) =>{
        try{
            console.log(data);
            const { user, room } = data;
            const { nickname } = user;
            const { socketId } = room;
            console.log(`[socket.io]\troom:leave\troom(${socketId})\tuser(${nickname})`);
            
            socket.leave(socketId);
            socket.to(socketId).emit('chat:message', {user : { id : -1, nickname : 'admin '}, room : room, message : `${nickname} has leaved`});    
        }
        catch(e){
            console.log(e);
        }
    });

    socket.on('chat:message', (data) =>{
        try{
            const { user, room, message } = data;
            const { nickname } = user;
            const { socketId } = room;

            console.log(`[socket.io]\tchat:message\troom(${socketId})\tuser(${nickname})\t${message}`);
            socket.to(socketId).emit('chat:message', data);
        }
        catch(e){
            console.log(e);
        }
    });

    socket.on('disconnect', (reason)=> {
    });

    
});

export default io;