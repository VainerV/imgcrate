'use strict';

const express = require('express');
const logger = require('morgan');

const indexRouter = require('./routers/index');
const usersRouter = require('./routers/users');
const commentsRouter = require('./routers/comments');
const picturesRouter = require('./routers/pictures');


const app = express();
console.log(usersRouter);
app.use(logger('dev'));
app.use(express.json());
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use(express.static('/views'));
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/pictures', picturesRouter);
app.use('/comments', commentsRouter);


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

module.exports =  app;
