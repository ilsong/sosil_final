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
    // console.log("checkout:" + req.body.check);
    req.body.check.mb_no = req.session.member.mb_no;
    // alert("카트에추가2");

    models.Checkout.create(req.body.check).then(function(result) {
        console.log('create한 이후 result값:'+result.id);
       /* models.Cart.updateAttributes({ck_id:result.id}).then(function(cart){
            cart.destroy().then(function(){
                console.log('delete성공'+cart.id);
                res.send({
                    error: false
                });
            });
        });*/
        res.send({
            check:result,
            error: false
        });

    }).catch( function ( error ) {
        res.send({ error : true });
    });

});


/*
var t;
var retJSON;


models.sequelize.transaction().then(
    function(transaction){
        t=transaction;

        return models.Check.create(req.body.check,{transaction:t});
    }).then(function(result){
    retJSON=result;
    console.log('transaction1'+result);
    console.log('transaction1'+result.id);
    /!*   return models.Cart.update({ck_id:result.id},
     {where:{},transaction:t});*!/

}).catch(
    function(err){

    }
);
*/


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