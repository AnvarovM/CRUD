const express = require('express');
const Music = require('../model/Music');
const router = express.Router();
const nimadir = require('../middleware/nimadir');


/* GET home page. */
router.get('/:id', nimadir, function(req, res, next) {
	Music.findById(req.params.id, (err, musics)=> {
		console.log(musics);
	    res.render('music', {
		    title: 'Music sahifasi',
		    musics,
	    })
	})
});

router.post('/edit', function(req, res, next){
	console.log('yangiladik');
})

module.exports = router;
