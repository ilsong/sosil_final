/**
 * Created by 김서진 on 2016-12-10.
 */
var express = require('express');
var router = express.Router();
var models = require('../models');
var session = require('express-session');

// models.Checkout.belongsTo(models.Item,{foreignKey: 'it_id'});
models.Checkout.belongsTo(models.Member,{foreignKey: 'mb_no'});
// models.Checkout.belongsTo(models.Cart,{foreignKey: 'ct_id'});



//결제하기
router.post('/', function(req, res) {
    console.log("결제하기"+req.body);
    console.log("session:" + req.session.member);
    req.body.check.mb_no = req.session.member.mb_no;
    // alert("카트에추가2");
    models.Checkout.create(req.body.check).then(function() {
        res.send({
            error: false
        });
    }).catch( function ( error ) {
        res.send({ error : true });
    });
});

// 카트에 상품 삭제
/*
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
*/

function isLogin(req,res,next) {
    if(req.session.user)
        next();
    else
        res.send({error:true, msg:'doLogin'});
}

module.exports = router;