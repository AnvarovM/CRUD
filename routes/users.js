const express = require('express');
const router = express.Router();
const User = require('../model/User');
const bcrypt = require('bcryptjs');
const passport = require('passport');


/* GET users listing. */
router.get('/register', function (req, res, next) {
	res.render("register", { title: "Ro`yhatdan o`tish sahifasi" });
});

router.post('/register', function (req, res, next) {

	req.checkBody('name', 'iltimos ismingizni yozing').notEmpty();
	req.checkBody('username', 'iltimos usernamingizni yozing').notEmpty();
	req.checkBody('email', 'iltimos email yozing').notEmpty();
	req.checkBody('password', 'iltimos parol yozing').notEmpty();
	req.checkBody('password2', 'iltimos parolingizni tasdiqlang ').equals(req.body.password).notEmpty();

	const errors = req.validationErrors();

	if (errors) {
		res.render('register', {
			title: "Ro`yhatdan o`tishda hato",
			errors: errors
		})
	} else {

		const name = req.body.name;
		const username = req.body.username;
		const email = req.body.email;
		const password = req.body.password;
		const password2 = req.body.password2;

		const newUser = new User({
			name: name,
			username: username,
			email: email,
			password: password,
		});

		bcrypt.genSalt(10, (err, pass) => {
			bcrypt.hash(newUser.password, pass, (err, hash) => {
				if(err) console.log(err);
				newUser.password = hash;
				newUser.save((err) => {
					if(err) console.log(err);
					else{
						req.flash("success", 'royhatdan o`tdingiz');
						res.redirect('/login')
					}
				})
			})
		})



		

	}

})

/* GET users listing. */
router.get('/login', function (req, res, next) {
	res.render("login", { title: "Saytga kirish" });
});

/* post users listing. */
router.post('/login', function (req, res, next) {
	passport.authenticate('local', {
		successRedirect: '/',
		failureRedirect: '/login',
		failureFlash: true
	})(req, res, next);
});


/* GET users listing. */
router.get('/logout', function (req, res, next) {
	req.logOut();
	req.flash('success', "Tizimdan chiqdingiz");
	res.redirect('/login');
});




module.exports = router;
