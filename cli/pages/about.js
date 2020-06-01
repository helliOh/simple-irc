import React, { useState, useEffect, useRef } from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { Box } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';

import socketio from 'socket.io-client';
import axios from 'axios';

import Copyright from '../src/Copyright';

const Socket = socketio.connect('ws://localhost:4000', {});

function About({rooms}) {
  const [User, setUser] = useState(null);
  const [Chat, setChat] = useState([]);
  const [Room, setRoom] = useState(null);
  
  function clickHandler(){
    if(!Room) return alert('채팅방을 먼저 선택해주세요!');
    const message = { user : User, room : Room, message : document.querySelector('input[name="message"]').value };
    
    document.querySelector('input[name="message"]').value = '';

    setChat([...Chat, message]);
    Socket.emit('chat:message', message);
  }

  function connectHandler(){ console.log('connection established'); }
  function disconnectHandler(){ console.log('disconnected'); }
  function chatHandler(chat){ setChat([...Chat, chat]); }
  function joinRoomHandler(room){
    if(Room) Socket.emit('room:leave', { room : Room, user : User});
    setRoom(room);
  }
  function userHandler(user){ setUser(user); }

  useEffect(() =>{
    const cookies = document.cookie.split(';');

    for(const cookie of cookies){
        const [key, val] = cookie.replace(/ /gi, '').split('=');

        if(key == 'user') setUser(JSON.parse(val));
    }
  }, []);

  useEffect(() =>{
    Socket.on('connect', connectHandler);
    Socket.on('disconnect', disconnectHandler);
    Socket.on('chat:message', chatHandler);

    return () => Socket.removeAllListeners();
  }, [Chat]);

  useEffect(() =>{
    if(Room){
      Socket.emit('room:join', { user : User, room : Room });
    }
  }, [Room]);

  return (
    <Container maxWidth="lg">
      <Box my={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          Next.js example
        </Typography>
        
        <Box display="flex" flexDirection="row" justifyContent="flex-start" flexWrap="wrap" style={{ border : '1px solid #ddd', margin : '2em 0'}}>
          <Box 
            display="flex" 
            flexDirection="column" 
            style={{ borderRight : '1px solid #ddd' }} 
          >
            <Box display="flex" justifyContent="center">
              <Typography variant="h5" component="h5" gutterBottom>{Room ? Room.socketId : '채팅방' }</Typography>
            </Box>
            
            {rooms && rooms.map((room) => 
            <Box display="flex" justifyContent="center">
              <Button 
                key={room.socketId} 
                variant="contained" 
                color="primary" 
                onClick={() => {joinRoomHandler(room)}}
                style={{
                  display : 'flex'
                }}>
                {room.socketId}
              </Button>
            </Box>)}
          </Box>
          <Box display="flex" flexDirection="column" flexWrap="wrap">
            {Chat && Chat.map((chat,i) => 
              <Box display="flex" key={`${chat.user.id}-${chat.room.id}-${i}`}>
                {chat.user.nickname == User.nickname? 
                  <span style={{fontWeight: 700}}>{chat.user.nickname}</span> 
                  : 
                  <span>{chat.user.nickname}</span>} : {chat.message}
            </Box>)}
          </Box>
        </Box>
        <Box display="flex" flexDirection="row">
          <Box display="flex" flexGrow={3}>
            <Input 
              defaultValue ="" 
              inputProps={{ 'name' : 'message'}} 
              onKeyPress={(e) =>{
                const {key} = e;
                if(key == 'Enter') clickHandler();
              }}
            />
          </Box>
          <Box display="flex">
            <Button 
              variant="contained" 
              color="primary" 
              onClick={clickHandler}
            >
              sendMessage
            </Button>
          </Box>
        </Box>
        <Copyright />
      </Box>
    </Container>
  );
}

About.getInitialProps = async () =>{
  try{
    const response = await axios.get('http://localhost:4000/api/rooms');
    
    return response.data;
  }
  catch(e){
    console.log(e);
    return e;
  }
}

export default About;