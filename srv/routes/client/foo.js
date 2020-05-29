import express from 'express';

var router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    let oldFashionedWay = 
    `<html>
        <head></head>
        <body>
            <h1>Hello Express</h1>
        </body>
    </html>`;

    res.send(oldFashionedWay);
  } catch(e) {
    console.log(e);
    res.status(300).send({success:false, message:"failed"});
  }
});

module.exports = router;
