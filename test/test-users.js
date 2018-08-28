'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
const faker = require('faker');
const mongoose = require('mongoose');
// //const expect = chai.expect;
// //const express = require('express');
//const { app } = require("../app");
const { app, runServer, closeServer } = require('../server');
const { User } = require('../models/user')
var should = require("chai").should();
chai.use(chaiHttp);

const { TEST_DATABASE_URL } = require('../config'); // importing DB

// sead db with the uses info 
function seedUsersData() {
  const seedData = [];
  for (let i = 1; i <= 10; i++) {
    seedData.push({
      user: {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        
      },
       uniqueUserName: faker.internet.userName()
    });
  }
  console.log(seedData);
  return User.insertMany(seedData);

}


// Before and After behavior
describe('Users API resource', function () {

  before(function () {
    return runServer(TEST_DATABASE_URL);
  });

  beforeEach(function () {
    return seedUsersData();
  });

  afterEach(function () {
    // tear down database so we ensure no state from this test
    // effects any coming after.
    return tearDownDb();
  });

  after(function () {
    return closeServer();
  });


  /// tear down DB working 
  function tearDownDb() {
    return new Promise((resolve, reject) => {
      console.warn('Deleting database');
      mongoose.connection.dropDatabase()
        .then(result => resolve(result))
        .catch(err => reject(err));
    });
  }



  /// GET End poit for Users

  describe('GET endpoint', function () {

    it('should return  number of users', function () {

      let res;
      return chai.request(app)
        .get('/users')
        .then(_res => {
          res = _res;
          res.status.should.equal(200);
          // otherwise our db seeding didn't work
          res.body.should.have.lengthOf.at.least(1);
          return User.count();
        })
        .then(count => {

          res.body.should.have.lengthOf(count);
        });
    });
  })
  it('should return a list of users with right fields', function () {


    let resUser;
    return chai.request(app)
      .get('/users')
      .then(function (res) {
        //console.log(res.body);
        res.status.should.equal(200);
        res.should.be.json;
        res.body.should.be.a('array');
        
        res.body.should.have.lengthOf.at.least(1);

        res.body.forEach(function (user) {
          
         user.should.be.a('object');
         user.should.include.keys('id','user', 'userName');
          
        });

       
        resUser = res.body[0];
        console.log("ID OF RETERNED OBJECT", resUser.id);
        return User.findById(resUser.id);

      })
      .then(user => {
        let returnUser = user.serialize();
        //resUser.firstName.should.equal(user.firstName);
        resUser.user.firstName.should.equal(returnUser.user.firstName);
        resUser.userName.should.equal(returnUser.userName);
      });
  });
});


