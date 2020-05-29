import express from 'express';
var router = express.Router();

// router.post('/create', async function(req, res, next) {
//   try {
//     res.send("bar");
//   } catch(e) {
//     console.log(e);
//     res.status(300).send({success:false, message:"failed"});
//   }
// });

router.get('/', async (req, res, next) => {
  try {

    res.send({
      whatever : 'you want to return'
    });
  } catch(e) {
    console.log(e);
    res.status(300).send({success:false, message:"failed"});
  }
});

// router.get('/:id', async (req, res, next) => {
  
//   try {

//     res.send("bar");
//   } catch(e) {
//     console.log(e);
//     res.status(300).send({success:false, message:"failed"});
//   }
// });

// router.put('/:id', async function(req, res, next) {
//   try {

//     res.send("bar");
//   } catch(e) {
//     console.log(e);
//     res.status(300).send({message:"failed"});
//   }
// });

// router.delete('/', async function(req, res, next) {
//   try {
//     res.send({success:true});
//   } catch(e) {
//     console.log(e);
//     res.status(300).send({message:"failed"});
//   }
// });


module.exports = router;
