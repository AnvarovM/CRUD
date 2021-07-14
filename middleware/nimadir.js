const nimadir = (req, res, next) => {
    if(req.isAuthenticated()){
        next();
    }else{
        req.flash('danger', 'iltimos tizimga kiring');
        res.redirect('/register');
    };
};

module.exports = nimadir;