module.exports = {
    ensureAuthenticated: function(req, res, next) {
        // this isAuthenticated is from passport
        if(req.isAuthenticated()){
            return next();
        }
        var error = 'Please log in to view this resource';
        res.render('user/signin', {error: error});
    }
};