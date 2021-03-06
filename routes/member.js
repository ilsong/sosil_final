var express = require('express');
var sha256 = require('sha256');
var router = express.Router();
var models = require('../models');
var session = require('express-session');

function loadUser(req,res,next) {
    console.log(req.session.member);
  if( req.session.member){
	  // next();
	  res.redirect('/main#/');
  }
  else
    res.redirect('/main#/');
}

// 로그인
router.post('/login', function(req, res, next) {
	models.Member.findOne({ // 유저 검색
		where: {
			mb_id: req.body.mb_id,
			mb_pw: sha256(req.body.mb_pw)
		}
	}).then(function(member) {
		if (member !== null) {
			req.session.member = member.dataValues; // 세션 추가 등록
			/*console.log("로그인"+member.dataValues.mb_no);
			req.session.member.mb_no=member.dataValues.mb_no;*/
			/*req.session.user.time = new Date();
			req.session.user.ip = req.connection.remoteAddress;*/
			delete req.session.member.mb_pw; //세션에서 password 정보 삭제
			res.send(req.session.member);
			// res.redirect('/main#/');
			// alert("로그인되셨습니다.");
		} else {
			res.send(false);
		}
	});
});

// 로그아웃
router.post('/logout', function(req, res, next) {
	req.session.member = {};
	delete req.session.member;
	res.send({
		error: false 
	});
});

router.get('/getSession', function(req, res, next) {
	models.Member.findOne({
		where: {
			mb_id: req.session.member.mb_id
		}
	}).then(function(user){
		if (user) {
			req.session.member.mb_point = user.dataValues.mb_point;
			res.send(req.session.member);
		}
		else {
			res.send(false);
		}
	});
});

// Create
router.post('/register', function(req, res) {
	models.Member.findOne({
		where: {
			mb_id: req.body.mb_id
		}
	}).then(function(user){
		if (user == null) {
			req.body.mb_pw = sha256(req.body.mb_pw);
			models.Member.create(req.body).then(function(member) {
				/*생성 완료 후 바로 세션 등록*/
				//회원 가입 후 바로 로그인 되는 부분 **
				if (member !== null) {
					req.session.member = member.dataValues;
					/*req.session.member.time = new Date();
					req.session.member.ip = req.connection.remoteAddress;*/
					delete req.session.member.mb_pw;
					res.send(req.session.member);
					// res.redirect('/main#/');
				}
			});
		}
		else {
			res.send(false);
		}
	});
});

router.get('/findpw', function(req, res){
	res.render('findpw');
});

router.post('/findpw', function(req, res) {
	models.Member.findOne({
		where: {
			mb_id: req.body.mb_id,
			mb_name: req.body.mb_name,
			mb_phone: req.body.mb_phone
		}
	}).then(function(user){
		if(user) {
			res.send(true);
		} else {
			res.send(false);
		}
	});
});

router.post('/changepw', function(req, res) {
	models.Member.findOne({
		where: {
			mb_id: req.body.mb_id,
			mb_name: req.body.mb_name,
			mb_phone: req.body.mb_phone
		}
	}).then(function(user){
		user.updateAttributes({
			mb_pw: sha256(req.body.mb_pw)
		}).then(function(){
			res.send(true);
		});
	});
});


router.put('/point',function(req,res){
	console.log('point update'+req.body.mb_point+','+req.body.mb_no);
	models.Member.findOne({
		where:{mb_no:req.body.mb_no}
	}).then(function(member){
		var new_point= member.mb_point+parseInt(req.body.mb_point);
		console.log('point수정'+new_point);
		req.body.mb_point=new_point;
		member.updateAttributes(req.body).then(function(){
			res.send({
				error:false
			});
		});
	});
});

module.exports = router;
