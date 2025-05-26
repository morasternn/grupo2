var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var productRouter = require('./routes/products');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//middleware de confg session
app.use(session({
  secret:"grupo2",
  resave:false,
  saveUninitialized:true
}));
//middleware de poner session en locals
app.use(function(req,res, next){
  //hago la accion que yo quiero
  if (req.session.user != undefined) {
    res.locals.user = req.session.user;

  }
  return next();
})

//middleware de poner cookie en locals y en session
app.use(function(req,res,next){
  //hago la accion que yo quiera  
  if (req.cookies.user != undefined && req.session.user == undefined) {
    res.locals.user = req.cookies.user;
    req.session.user = req.cookies.user;

  }

  return next()
})
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/producto',productRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
