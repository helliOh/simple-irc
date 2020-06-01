import express from 'express';
import sequelize from 'sequelize';
import models from '../../models';

const { Chat, ChatAlarm, User, Room } = models;

var router = express.Router();

const validate = {
  ListChat(req, res, next){
      console.log('Validation(ListChat)\tisLogined?hasAuth?');
      next(); 
    },
  ListRoomChat(req, res, next){
      console.log('Validation(ListRoomChat)\tisLogined?\troomExists?\tisJoined?');
      next(); 
  },
  CreateChat(req, res, next){
      console.log('Validation(CreateChat)\tisLogined?\troomExists?\tisJoined?');
      next();
  }
};

router.get('/', validate.ListChat, async (req, res, next) => {
  try {
    const { io } = req.app;

    const chats = await Chat.findAll({
      include : { all : true }
    });

    res.json({chats : chats});
  } catch(e) {
    console.log(e);
    res.status(300).send({success:false, message:"failed"});
  }
});

router.get('/:roomId', validate.ListRoomChat, async (req, res, next) => {
  try {
    const chats = await Chat.findAll({
      include : { all : true },
      where : {
        roomId : req.params.roomId
      }
    })

    res.send({
      whatever : 'you want to return'
    });
  } catch(e) {
    console.log(e);
    res.status(300).send({success:false, message:"failed"});
  }
});

router.post('/', validate.CreateChat, async (req, res, next) => {
  try {
    const chat = await Chat.create(req.body);
    const { io } = req.app;

    io.emit('chat', chat);

    res.send({
      whatever : 'you want to return'
    });
  } catch(e) {
    console.log(e);
    res.status(300).send({success:false, message:"failed"});
  }
});


module.exports = router;
