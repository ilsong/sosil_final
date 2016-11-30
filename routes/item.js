var express = require('express');
var router = express.Router();
var multiparty=require('multiparty');
var fs=require('fs');
// var mv=require('mv');

router.post('/register', function(req, res,next) {
//	console.log('왔당');
	console.log('왓당2'+req);
	//var file = req.files.img;

	// console.log('왔당1'+req.files);
	//file.
	var form = new multiparty.Form();

	// get field name & value
	form.on('field',function(name,value){
		console.log('normal field / name = '+name+' , value = '+value);
	});

	// file upload handling
	form.on('part',function(part){
		var filename;
		var size;
		if (part.filename) {
			filename = part.filename;
			size = part.byteCount;
		}else{
			part.resume();

		}

		console.log("Write Streaming file :"+filename);
		var writeStream = fs.createWriteStream('./public/assets/images/products/'+filename);
		writeStream.filename = filename;
		part.pipe(writeStream);

		part.on('data',function(chunk){
			console.log(filename+' read '+chunk.length + 'bytes');
		});

		part.on('end',function(){
			console.log(filename+' Part read complete');
			writeStream.end();
		});
	});

	// all uploads are completed
	form.on('close',function(){
		res.status(200).send('Upload complete');
	});

	// track progress
	form.on('progress',function(byteRead,byteExpected){
		console.log(' Reading total  '+byteRead+'/'+byteExpected);
	});

	form.parse(req);


/*	file.mv('/assets/images/product-details/' + file.name, function(err) {
		if(err) {
			// console.log('왔당2');
		//	console.log(err);
			res.status(500).send(err);
		}
		else {
			res.send('file uploaded!');
		}
	});*/





});



module.exports = router;