import React, { useState, useEffect, useRef } from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';

import socketio from 'socket.io-client';
import axios from 'axios';

import ProTip from '../src/ProTip';
import Link from '../src/Link';
import Copyright from '../src/Copyright';

const Socket = socketio.connect('ws://localhost:4000', {});

function About({rooms}) {
  const [User, setUser] = useState(null);
  const [UserList, setUserList] = useState(null);
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
  
  useEffect(async () =>{
    let userList = await axios.get('http://localhost:4000/api/users');
    setUserList(userList.data);
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
  }, [Room])

  useEffect(() =>{
    if(User){
      console.log(`current user : ${User.nickname}`);
      setChat([]);
    }
  }, [User])

  
  return (
    <Container maxWidth="sm">
      <Box my={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          Next.js example
        </Typography>
        <Button variant="contained" color="primary" component={Link} naked href="/">
          Go to the main page
        </Button>
        {UserList && UserList.map((user) => <Button key={`user-${user.id}`} variant="contained" color="primary" onClick={() => {userHandler(user)}}>{user.nickname}</Button>)}
        {Room && <h1>{Room.socketId}</h1>}
        {rooms && rooms.map((room) => <Button key={room.socketId} variant="contained" color="primary" onClick={() => {joinRoomHandler(room)}}>{room.socketId}</Button>)}
        {Chat && Chat.map((chat,i) => <p key={`${chat.user.id}-${chat.room.id}-${i}`}>{chat.user.nickname == User.nickname? <span style={{fontWeight: 700}}>{chat.user.nickname}</span> : <span>{chat.user.nickname}</span>} : {chat.message}</p>)}
        <Input defaultValue ="" inputProps={{ 'name' : 'message'}} />
        <Button variant="contained" color="primary" onClick={clickHandler}>sendMessage</Button>
        <ProTip />
        <Copyright />
      </Box>
    </Container>
  );
}

About.getInitialProps = async () =>{
  try{
    const response = await axios.get('http://localhost:4000/api/rooms');
    console.log(response);
    return response.data;
  }
  catch(e){
    console.log(e);
    return e;
  }
}

export default About;