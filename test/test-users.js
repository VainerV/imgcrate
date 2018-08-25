'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
const faker = require('faker');
const mongoose = require('mongoose');
var should = require("chai").should();

//const expect = chai.expect;



// sead db with the uses info 
function seedUsersData() {
    const seedData = [];
    for (let i = 1; i <= 10; i++) {
      seedData.push({
        user: {
          firstName: faker.name.firstName(),
          lastName: faker.name.lastName(),
          userName: faker.userName()
        }
      });
    }
    return Users.insertMany(seedData);
    
  }

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
    })


    /// GET End poit for Users
      
  describe('GET endpoint', function () {

    it('should return all number of users', function () {
      
      let res;
      return chai.request(app)
        .get('/users')
        .then(_res => {
          res = _res;
          res.status.should.equal(200);
          // otherwise our db seeding didn't work
          res.body.should.have.lengthOf.at.least(1);
          return Users.count();
        })
        .then(count => {
          
         res.body.should.have.lengthOf(count);
        });
    });

    it('should return a list of users with right fields', function () {
      

      let resUser;
      return chai.request(app)
        .get('/users')
        .then(function (res) {

          res.status.should.equal(200);
          res.should.be.json;
          res.body.should.be.a('array');
          
          res.body.should.have.lengthOf.at.least(1);

            res.body.forEach(function (post) {
            post.should.be.a('object');
            post.should.include.keys('firstName', 'lastName', 'userName');
          });
          
          resUser = res.body[0];
          console.log("ID OF RETERNED OBJECT", resUser.id);
          return Users.findById(resUser.id);
          
        })
        .then(post => {
            resUser.firstName.should.equal(post.firstName);
            resUser.lastName.should.equal(post.lastName);
            resUser.userName.should.equal(post.userName);
        });
    });
  });


