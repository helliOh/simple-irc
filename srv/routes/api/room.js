import express from 'express';
import sequelize from 'sequelize';
import models from '../../models';

const { Room, UserRoom } = models;

var router = express.Router();

const validate = {
  ListRoom(req, res, next){
      console.log('Validation(ListRoom)\tisLogined?hasAuth?');
      next(); 
    },
  CreateRoom(req, res, next){
      console.log('Validation(CreateRoom)\tisLogined?');
      next(); 
  },
  ReadRoom(req, res, next){
      console.log('Validation(ReadRoom)\tisLogined?');
      next();
  }
};

router.get('/', validate.ListRoom, async (req, res, next) => {
  try {
    const rooms = await Room.findAll({
      include : { all : true }
    });

    res.json({ rooms : rooms});
  } catch(e) {
    console.log(e);
    res.status(300).send({success:false, message:"failed"});
  }
});

router.post('/', validate.CreateRoom, async (req, res, next) => {
  try {
    const room = await Room.create(req.body);

    res.send({ room : room });
  } catch(e) {
    console.log(e);
    res.status(300).send({success:false, message:"failed"});
  }
});

router.get('/:roomId', validate.ReadRoom, async (req, res, next) => {
  try {
    const room = await Room.findOne({
      include : {all : true},
      where : {
        id : req.params.roodId
      }
    });
  
    res.send({room : room});
  } catch(e) {
    console.log(e);
    res.status(300).send({success:false, message:"failed"});
  }
});

module.exports = router;
