var express = require('express');
var session = require('express-session');
var config = require('../config/config.json');
var router = express.Router();

function loadUser(req,res,next) {
	console.log(req.session.member);
  if( req.session.member ){
    next();
  }
  else
    next();
    // res.redirect('/');
}

/* GET home page. */
/*router.get('/', function(req, res, next) {
  res.render('index', { title: config.title });
});*/

router.get('/main', function(req, res) {
  res.render('main_layout', { title: config.title });
});

/*router.get('/member', loadUser, function(req, res, next) {
  res.render('member', { title: config.title });
});*/

router.get('/admin', function(req, res) {
  res.render('admin');
});

router.get('/findpw', function(req, res){
  res.render('findpw');
});

/*router.get('/login', function(req, res, next) {
  res.render('login');
});*/

/*router.get('/cart', loadUser, function(req, res, next) {
  res.render('cart', { title: config.title });
});*/

module.exports = router;
