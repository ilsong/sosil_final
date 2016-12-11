var express = require('express');
var router = express.Router();
var models = require('../models');
var session = require('express-session');

router.post('/register', function(req, res, next) {
	var file = req.files.img;
	var category=req.body.category;
	req.body.img='/assets/images/products/'+category+'/' + file.name;
	console.log(req.body);



	file.mv('./public/assets/images/products/'+category+'/' + file.name, function(err) {
		if(err) {
			res.status(500).send(err);
		}
		else {
			models.Item.create(req.body);
			res.send('file uploaded!');
		}
	});

});

router.get('/new', function(req, res) {
	models.Item.findAll({
		order : 'createdAt DESC'
	}).then(function(itemSvArr) {
		var itemCliArr=[];
		itemSvArr.forEach(function(itemSv){
			itemSv=itemSv.dataValues;
			var itemCli={
				id:itemSv.id,
				img:itemSv.img,
				price:itemSv.price,
				name:itemSv.name
			};
			itemCliArr.push(itemCli);
		});
		res.contentType('application/json');
		res.send(itemCliArr);
	});
});

router.get('/best', function(req, res) {
	models.Item.findAll({
		order : 'purchased DESC'
	}).then(function(itemSvArr) {
		var itemCliArr=[];
		itemSvArr.forEach(function(itemSv){
			itemSv=itemSv.dataValues;
			var itemCli={
				id:itemSv.id,
				img:itemSv.img,
				price:itemSv.price,
				name:itemSv.name
			};
			itemCliArr.push(itemCli);
		});
		res.contentType('application/json');
		res.send(itemCliArr);
	});
});

router.get('/:category', function(req, res) {
	models.Item.findAll({
		where: {
			category: req.params.category
		}
	}).then(function(itemSvArr) {
		var itemCliArr=[];
		itemSvArr.forEach(function(itemSv){
			itemSv=itemSv.dataValues;
			var itemCli={
				id:itemSv.id,
				img:itemSv.img,
				price:itemSv.price,
				name:itemSv.name
			};
			itemCliArr.push(itemCli);
		});
		res.contentType('application/json');
		res.send(itemCliArr);
	});
});




module.exports = router;