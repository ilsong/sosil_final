var express = require('express');
var router = express.Router();

router.post('/register', function(req, res, next) {

	var file = req.files.img;

	file.mv('./public/assets/images/product-details/' + file.name, function(err) {
		if(err) {
			res.status(500).send(err);
		}
		else {
			res.send('file uploaded!');
		}
	});
});

module.exports = router;