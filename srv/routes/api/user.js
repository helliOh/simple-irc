import express from 'express';
import sequelize from 'sequelize';
import models from '../../models';

const { User, Friend, UserRoom } = models;

var router = express.Router();

const validate = {
  ListUser(req, res, next){
      console.log('Validation(ListUser)\tisLogined?hasAuth?');
      next(); 
    },
  CreateUser(req, res, next){
      console.log('Validation(CreateUser)');
      next(); 
  },
  ReadUser(req, res, next){
      console.log('Validation(ReadUser)\tisLogined?');
      next();
  },
  AddFriend(req, res, next){
    console.log('Validation(addFriend)\tisLogined?\tDoesUserExists?');
    next();
  },
  AddRoom(req, res, next){
    console.log('Validation(addRoom)\tisLogined?\tDoesRoomExists?');
    next();
  }
}

router.get('/', validate.ListUser, async (req, res, next) => {
  try {
    const users = await User.findAll({ include : { all : true } });
    
    res.send(users);
  } catch(e) {
    console.log(e);
    res.status(300).send({success:false, message:"failed"});
  }
});

router.get('/:userId', validate.ReadUser,  async (req, res, next) => {
  try {
    const user = await User.findOne({ include : { all : true }, where : { id : req.params.userId } });

    res.send({ user : user });
  } catch(e) {
    console.log(e);
    res.status(300).send({success:false, message:"failed"});
  }
});

router.post('/', validate.CreateUser, async (req, res, next) => {
  try {
    const user = await User.create(req.body);

    res.send({ user : user });
  } catch(e) {
    console.log(e);
    res.status(300).send({success:false, message:"failed"});
  }
});

router.post('/friend/:userId', validate.AddFriend, async (req, res, next) =>{
  try{
    const friend = await Friend.create( req.body );

    res.send({friend : friend});
  }
  catch(e){
    console.log(e);
    res.status(300).send({success : false, message : "failed"})
  }
})

router.post('/room/:userId', validate.AddRoom, async (req, res, next) =>{
  try {
    const userRoom = await UserRoom.create( req.body );

    res.send({room : userRoom});
  } catch(e) {
    console.log(e);
    res.status(300).send({success:false, message:"failed"});
  }
})
module.exports = router;
