const express = require('express');
const Music = require('../model/Music');
const router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {


  Music.find({}, (err, musics) => {
    if(err) console.log(err);
    else{
      res.render('index', {title: 'bosh sahifa', musics})
    }
  })
});

module.exports = router;
