const express = require('express');
const Music = require('../model/Music');
const router = express.Router();
const nimadir = require('../middleware/nimadir');

/* GET users listing. */
router.get('/add', nimadir, function (req, res, next) {
  res.render("Musicadd", { title: "musiqa qo`shish sahifasi" })
});

router.post('/add', function (req, res, next) {

  req.checkBody('name', 'iltimos musiqa nomini kiriting').notEmpty()
  req.checkBody('singer', 'iltimos musiqa avtorini kiriting').notEmpty()
  req.checkBody('comment', 'iltimos musiqa izohni kiriting').notEmpty()

  const errors = req.validationErrors();

  if (errors) {
    res.render('musicadd', {
      title: "Musiqa qo`shishda validator ishlayabdi",
      errors : errors
    })
  }
  else {
    console.log('yubordik');
    const music = new Music();

    music.name = req.body.name;
    music.singer = req.body.singer;
    music.comment = req.body.comment;

    music.save((err) => {
      if (err) console.log(err);
      else {
        req.flash('success', "Musiqa qo`shildi")
        res.redirect('/')
      }
    })
  }
})
module.exports = router;
