
var users = express.Router();
const { User } = require("./models/user");
/* GET users listing. */
//router.get('/', function(req, res, next) {
 // res.send('respond with a resource');
//});

module.exports = users;


'use strict';

const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const { DATABASE_URL, PORT } = require('./config');
const { User } = require('./models/user');

const app = express();

app.use(morgan('common'));
app.use(express.json());

app.get('/users', (req, res) => {
  User
    .find()
    .then(users => {
      res.json(users.map(user => user.serialize()));
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'something went terribly wrong' });
    });
});

app.get('/users/:id', (req, res) => {
  User
    .findById(req.params.id)
    .then(user => res.json(user.serialize()))
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'something went horribly awry' });
    });
});