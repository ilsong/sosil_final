/**
 * Created by 김서진 on 2016-11-24.
 */
var express = require('express');
var router = express.Router();
var models = require('../models');
var session = require('express-session');

models.Cart.belongsTo(models.Item,{foreignKey: 'it_no'});
models.Cart.belongsTo(models.Member,{foreignKey: 'mb_no'});
// models.Cart.belongsTo(models.Member,{foreignKey: 'mb_no'});


// 특정 유저의 카트 정보 session 이용
router.get('/', function(req, res) {
   /* console.log(1);
    res.send('1');*/
   // console.log(req.session.member);
    models.Cart.findAll({
        // order : 'id ASC',
        where :
        {
            mb_no : req.session.member.mb_no
        },
        include: {
            model: models.Item,
            attributes: ['id', 'name', 'price', 'category','img'],
            order: [['createdAt', 'DESC']]
        }
    }).then(function(cartSvArr) {
        var cartCliArr = [];
        cartSvArr.forEach(function(cartSv) {
            cartSv = cartSv.dataValues;
            cartSv.Item = cartSv.Item.dataValues;
            console.log(cartSv.Item);


            var cartCli = {
                id : cartSv.ck_no,
                total : cartSv.total,
                point : cartSv.point,
                quantity : cartSv.quantity,
                ck_no : cartSv.ck_no,
                it_no : cartSv.it_no,
                mb_id : cartSv. mb_id,
                createdAt : cartSv.createdAt,
                updatedAt : cartSv.updatedAt,
                img:cartSv.Item.img,
                price:cartSv.Item.price
            };
            cartCliArr.push(cartCli);
        });
        res.contentType('application/json');
        res.send(cartCliArr);
    });
});

// 카트 추가
router.post('/', function(req, res) {
  /*  console.log(1);
    res.send(1);*/
    console.log("카트에 추가"+req.body);
    console.log("session:" + req.session.member);
    req.body.mb_no = req.session.member.mb_no;

    // alert("카트에추가2");
    models.Cart.create(req.body).then(function() {
        res.send({
            error: false
        });
    }).catch( function ( error ) {
        res.send({ error : true });
    });
});

// 카트에 상품 삭제
router.delete('/:id', function(req, res) {
    console.log("deleteCart"+req.params.id);
    var mb_no=req.session.member.mb_no;
    models.Cart.findOne({
        where: {
            id: req.params.id
            ,mb_no: mb_no
        }
    }).then(function(cart) {
        if (cart !== null) {
            cart.destroy().then(function() {
                res.send({
                    error: false
                });
            });
        } else {
            res.send({
                error: true
            });
        }
    });
});

function isLogin(req,res,next) {
    if(req.session.user)
        next();
    else
        res.send({error:true, msg:'doLogin'});
}

module.exports = router;