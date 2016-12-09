var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session=require('express-session');
var fileUpload = require('express-fileupload');

var routes = require('./routes/index');
var member = require('./routes/member');
var cart=require('./routes/cart');
var item = require('./routes/item');

var app = express();

// assign the swig engine to .html files
app.engine('html', require('ejs').renderFile);
// set .html as the default extension
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.use('/views', express.static(path.join(__dirname, 'views')));

//세션에 대한 수정
app.use(session({
	secret: 'mefind',
	proxy: true,
	resave: true,
	saveUninitialized: true,
	cookie: { maxAge: 3*60*60*1000 }
}));

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(fileUpload());

app.use('/', routes);
app.use('/member', member);
app.use('/cart',cart);
app.use('/item', item);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
	app.use(function(err, req, res, next) {
		res.status(err.status || 500);
		res.render('error', {
			message: err.message,
			error: err
		});
	});
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
	res.status(err.status || 500);

	res.render('error', {
		message: err.message,
		error: {}
	});
});

module.exports = app;
