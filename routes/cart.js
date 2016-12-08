/**
 * Created by 김서진 on 2016-11-24.
 */
var express = require('express');
var router = express.Router();
var models = require('../models');
var session = require('express-session');


// 특정 유저의 카트 정보 session 이용
router.get('/', function(req, res) {
    models.Cart.findAll({
        // order : 'id ASC',
        where :
        {
            mb_id : req.session.user.mb_id
        },
        include: {
            model: models.Item,
            attributes: ['it_no', 'it_name', 'it_price', 'it_category'],
            order: [['createdAt', 'DESC']]
        }
    }).then(function(cartSvArr) {
        var cartCliArr = [];
        cartSvArr.forEach(function(cartSv) {
            cartSv = cartSv.dataValues;
            cartSv.Item = cartSv.Item.dataValues;

            var cartCli = {
                ck_no : cartSv.ck_no,
                it_no : cartSv.it_no,
                ct_num : cartSv.ct_num,
                ct_point : cartSv.ct_point,
                ct_total : cartSv.ct_total,
                mb_id : cartSv. mb_id,
                createdAt : cartSv.createdAt,
                updatedAt : cartSv.updatedAt
            };
            cartCliArr.push(cartCli);
        });
        res.contentType('application/json');
        res.send(cartCliArr);
    });
});

// 카트 추가
router.post('/', function(req, res) {
    req.body.mb_id = req.session.user.mb_id;

    models.Cart.create(req.body).then(function() {
        res.send({
            error: false
        });
    }).catch( function ( error ) {
        res.send({ error : true });
    });
});

// 카트에 상품 삭제
router.delete('/:mb_id', function(req, res) {
    models.Cart.findOne({
        where: {
            mb_id: req.params.id
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