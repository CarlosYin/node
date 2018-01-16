var express = require('express');
var app = express();

var bodyParser = require('body-parser');
var RetBase = require('./routes/index');


var mongoose = require('mongoose');


//通用跨域过滤
app.all("*", function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
  next();
});


//body数据格式化
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));




app.use(function(req,res,next){
  console.log(req.hostname);
  console.log(req.ip);
  next();
})


//mongodb 数据库链接
Promise = require('bluebird'); // eslint-disable-line no-global-assign

// plugin bluebird promise in mongoose
mongoose.Promise = Promise;
// connect to mongo db
const mongoUri = "mongodb://icardworld:123456@39.107.104.119:3399/icardworld";
mongoose.connect(mongoUri, { server: { socketOptions: { keepAlive: 1 } } });
mongoose.connection.on('error', () => {
  throw new Error(`unable to connect to database: ${mongoUri}`);
});
mongoose.connection.on('connected', function () {    
  console.log('Mongoose connection open to ' + mongoUri);  
});




//业务路由配置
var userRouter = require('./routes/user.route');
var quersionRouter = require('./routes/quersion.route');
var testRouter = require('./routes/test.route');

// app.use('/api/user', userRouter);
app.use('/api/quersions', quersionRouter);
app.use('/api/test', testRouter);








// catch 404 and forward to error handler
app.use(function(req, res, next) {
  res.status(404).json(RetBase(404,'未知的api',null));
});



module.exports = app;