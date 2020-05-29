import React, { useState, useEffect, useRef } from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';

import socketio from 'socket.io-client';

import ProTip from '../src/ProTip';
import Link from '../src/Link';
import Copyright from '../src/Copyright';

const Socket = socketio.connect('ws://localhost:4000', {});

export default function About() {
  const [Chat, setChat] = useState([]);
  
  function clickHandler(){
    const message = {
      sender : Socket.id,
      message : document.querySelector('input[name="message"]').value
    }
    
    document.querySelector('input[name="message"]').value = '';

    setChat([...Chat, message]);
    Socket.emit('message', message);
  }

  function connectHandler(){ console.log('connection established'); }
  function disconnectHandler(){ console.log('disconnected'); }
  function chatHandler(chat){ setChat([...Chat, chat]); }
    
  useEffect(() =>{
    Socket.on('connect', connectHandler);
    Socket.on('disconnect', disconnectHandler);
    Socket.on('chat', chatHandler);

    return () => Socket.removeAllListeners();
  }, [Chat]);

  
  return (
    <Container maxWidth="sm">
      <Box my={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          Next.js example
        </Typography>
        <Button variant="contained" color="primary" component={Link} naked href="/">
          Go to the main page
        </Button>
        {Chat && Chat.map((chat,i) => <p key={`${chat.sender}-${i}`}>{chat.sender == Socket.id? <span style={{fontWeight: 700}}>{chat.sender}</span> : <span>{chat.sender}</span>} : {chat.message}</p>)}
        <Input defaultValue ="" inputProps={{ 'name' : 'message'}} />
        <Button variant="contained" color="primary" onClick={clickHandler}>sendMessage</Button>
        <ProTip />
        <Copyright />
      </Box>
    </Container>
  );
}
