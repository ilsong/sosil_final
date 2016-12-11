/**
 * Created by 김서진 on 2016-12-10.
 */
var express = require('express');
var router = express.Router();
var models = require('../models');
var session = require('express-session');
var sequelize = require('sequelize');

models.Cart.belongsTo(models.Checkout,{foreignKey: 'ck_id'});
models.Checkout.belongsTo(models.Member, {foreignKey: 'mb_no'});
// models.Checkout.belongsTo(models.Cart,{foreignKey: 'ct_id'});


//결제하기
router.post('/', function (req, res) {
    var checkInput = {
        payment: req.body.payment,
        total: req.body.total,
        total_point: req.body.total_point,
        mb_no: req.session.member.mb_no
    };
    models.Checkout.create(checkInput).then(function (result) {
        console.log('create한 이후 checkout id:' + result.id);
        console.log('create한 이후 checkout mb_no 값:' + result.mb_no);
        req.body.cartList.forEach(function(cart){
            cart.finished=1;
            console.log('update하는 cartList의 이후 checkout id:' + result.id);
            cart.ck_id=result.id;
            models.Cart.findOne({
                where:{id:cart.id}
            }).then(function(cartSv){
                cartSv.updateAttributes(cart).then(function(){
                    console.log('cart정보 update 성공');
                });
            });
        });
    }).then(function(){
        models.Member.findOne({
            where:{mb_no:checkInput.mb_no}
        }).then(function(member){
            var new_point= member.mb_point+parseInt(req.body.total_point);
            console.log('point수정'+new_point);
            member.mb_point=new_point;
            member.updateAttributes(member).then(function(){
                res.send({
                    error:false
                });
            });
        });

    }).catch(function (error) {
        res.send({error: true});
    });

});



// 카트에 상품 삭제
router.delete('/:id', function (req, res) {
    console.log("deleteCart" + req.params.id);
    var mb_no = req.session.member.mb_no;
    models.Cart.findOne({
        where: {
            id: req.params.id
            , mb_no: mb_no
        }
    }).then(function (cart) {
        if (cart !== null) {
            cart.destroy().then(function () {
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

function isLogin(req, res, next) {
    if (req.session.user)
        next();
    else
        res.send({error: true, msg: 'doLogin'});
}

module.exports = router;