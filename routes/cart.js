/**
 * Created by 김서진 on 2016-11-24.
 */
var express = require('express');
var router = express.Router();
var models = require('../models');
var session = require('express-session');

models.Cart.belongsTo(models.Item,{foreignKey: 'it_id'});
models.Cart.belongsTo(models.Member,{foreignKey: 'mb_no'});
models.Cart.belongsTo(models.Checkout,{foreignKey: 'ck_id'});


// 특정 유저의 카트 정보 session 이용
router.get('/', function(req, res) {
    models.Cart.findAll({
        // order : 'id ASC',
        where :
        {
            mb_no : req.session.member.mb_no,
            finished:0
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
                id : cartSv.id,
                total : cartSv.total,
                point : cartSv.point,
                quantity : cartSv.quantity,
                it_id : cartSv.Item.it_id,
                mb_id : cartSv. mb_id,
                name: cartSv.Item.name,
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
    console.log("카트에 추가"+req.body.it_id);
    console.log("session:" + req.session.member);
    req.body.mb_no = req.session.member.mb_no;
    //아직 결제되지 않은 것중 찾기
    models.Cart.findOne({
        where:{
            it_id:req.body.it_id,
            finished:0,
            mb_no:req.body.mb_no
        }
    }).then(function(cart){
        if(cart!=null){//이미 동일 상품 존재
            res.send({
                error: true,
                msg:'동일 상품이 존재합니다.'
            });
        }else{
            models.Cart.create(req.body).then(function() {
                res.send({
                    error: false
                });
            }).catch( function ( error ) {
                res.send({ error : true });
            });
        }
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




router.put('/',function(req,res){
    console.log('params.id:for cart put'+req.body.id);
    models.Cart.findOne({
        where:{
            id:req.body.id
        }
    }).then(function(cart){
       cart.updateAttributes(req.body).then(function(){
           res.send({
               error:false
           });
       });
    });
});

function isLogin(req,res,next) {
    if(req.session.user)
        next();
    else
        res.send({error:true, msg:'doLogin'});
}

module.exports = router;