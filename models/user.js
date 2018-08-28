//Model for the user
'use strict';

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;


// User schema
const userSchema = mongoose.Schema({
    user: {
        firstName: String,
        lastName: String,
        eMail: String,
      },
   uniqueUserName: {
    type: 'string',
   // unique: true
  }
});


userSchema.pre('find', function(next) {
  this.populate('author');
  next();
});

userSchema.pre('findOne', function(next) {
  this.populate('author');
  next();
});

userSchema.virtual('name').get(function() {
  if(this.author) {
    return `${this.user.firstName} ${this.user.lastName}`.trim();
 } 
  
});


userSchema.methods.serialize = function() {
  return {
    id: this._id,
    user: this.user,
    userName: this.uniqueUserName,
  };
};



// note that all instance methods and virtual properties on our
// schema must be defined *before* we make the call to `.model`.

const User = mongoose.model('User', userSchema);
module.exports = { User };