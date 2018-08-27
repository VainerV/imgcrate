'use strict';

 // Model for comments
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const commentSchema = mongoose.Schema({ content: 'string' });