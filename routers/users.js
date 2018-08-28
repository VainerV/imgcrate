'use strict';
const express = require('express');
const router = express.Router();

const { User } = require("../models/user");

const morgan = require('morgan');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;



router.get('/', function(req, res, next) {
  console.log("TESTING GET REQUEST");
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
  


module.exports = router;






