'use strict';

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;


// User schema
const userSchema = mongoose.Schema({
    user: {
        firstName: String,
        lastName: String
      },
   userName: {
    type: 'string',
    unique: true
  }
});


blogPostSchema.pre('find', function(next) {
  this.populate('author');
  next();
});

blogPostSchema.pre('findOne', function(next) {
  this.populate('author');
  next();
});

userSchema.virtual('userName').get(function() {
  if(this.author) {
    return `${this.user.firstName} ${this.user.lastName}`.trim();
 } 
  
});


userSchema.methods.serialize = function() {
  return {
    id: this._id,
    user: this.userName,
  };
};



// note that all instance methods and virtual properties on our
// schema must be defined *before* we make the call to `.model`.

const User = mongoose.model('User', userSchema);
module.exports = { User, Blogposts };