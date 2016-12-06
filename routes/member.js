var express = require('express');
var sha256 = require('sha256');
var router = express.Router();
var models = require('../models');
var session = require('express-session');

function loadUser(req,res,next) {
    console.log(req.session.member);
  if( req.session.member){
    next();
  }
  else
    res.redirect('/');
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
			/*  req.session.user.time = new Date();
			req.session.user.ip = req.connection.remoteAddress;*/
			delete req.session.member.mb_pw; //세션에서 password 정보 삭제
			res.send({
				result: true
			});
		} else {
			res.send({
				result: false 
			});
		}
	});
});

// 로그아웃
router.get('/logout', function(req, res, next) {
    req.session.member = {};
    delete req.session.member;
    res.send({
        error: false 
    });
});

router.get('/getSession', function(req, res, next) {
    res.send(req.session.member);
    //내 세션을 전달하는 부분
});

// Create
router.post('/register', function(req, res) {
	console.log(req.body);
	models.Member.findOne({
		where: {
			mb_id: req.body.mb_id
		}
	}).then(function(user){
		if (user === null) {
			req.body.mb_pw = sha256(req.body.mb_pw);
			models.Member.create(req.body).then(function(member) {
				/*생성 완료 후 바로 세션 등록*/
				//회원 가입 후 바로 로그인 되는 부분 **
				if (member !== null) {
					req.session.member = member.dataValues;
					req.session.member.time = new Date();
					req.session.member.ip = req.connection.remoteAddress;
					delete req.session.member.mb_pw;
					res.send(req.session.member);
				}
			});
		}
		else {
			res.send({"result": "alreadyExist"});
		}
	}).catch(function(error){
		res.send({ emailConflict: true });
	});
});

// Read
router.get('/:mb_id', function(req, res) {
	models.Member.findOne({
        where: {
            mb_id: req.params.mb_id
        }
    }).then(function(user) {
        if (user !== null) {
            var userCli ={};
            userCli.mb_id = user.mb_id;
            userCli.mb_pw = user.mb_pw;

            res.contentType('application/json');
            res.send(userCli);
        } else {
            res.send({
                error: true
            });
        }
    });
});

module.exports = router;
