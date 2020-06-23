var createError = require('http-errors');
var express = require('express');
var bodyParser= require('body-parser')
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
const mongo= require('./mongo');


const HttpError = require('./models/http-error');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.post('/admin/credit-debit', mongo.createTransaction);

app.get('/user/transacations', mongo.getTransactions);

app.get('/user/transactions/:account',mongo.getTransactionsbyId);

app.post('/admin/newuser',mongo.createUser);

app.get('/user/home/:username',mongo.getuserbyName);

app.get('/admin/home/balance',mongo.adminHome);

app.get('/admin/home/usercount',mongo.getUserCount);

app.get('/admin/users',mongo.getUsers);

app.post('/user/transfer',mongo.transferToAcc);

app.post('/login', mongo.login);

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
