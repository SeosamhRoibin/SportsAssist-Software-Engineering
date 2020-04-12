let mongoose = require("mongoose");
let User = require('../models/user.js');
let Gym = require('../models/Gym.js');
let Comment = require('../models/comment.js'); 
let Nutrition = require('../models/nutrition.js'); 
let Post = require('../models/post.js'); 
let PrivateMessage = require('../models/PrivateMessage.js'); 
let TeamUserRel = require('../models/TeamUserRel.js'); 
let Training = require('../models/Training.js'); 
let Video = require('../models/Video.js'); 
let Formation = require('../models/formation.js'); 
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app');
let should = chai.should(); 
let host_url = 'http://localhost:8999'; 
let request = require('supertest'); 
chai.use(chaiHttp); 
let container_url = host_url; 
var cheerio = require('cheerio')
var Session = require('supertest-session');



function extractCsrfToken (res) {
  var $ = cheerio.load(res.text);
  return $('[name=_csrf]').val();
}


describe('Testing the landing page is functional', function() 
{
    describe('Check parameters', function() 
    {
        let container = request(container_url);
        it('Check call to get landing page', function(done)
         {
            container.get('').expect(200, done);
        });
    });
});





describe('POST /register Testing', function () {

  let session;
  let testUser; 

  
  beforeEach(function ()
  {
    session = new Session(host_url);
  });

  describe('with no CSRF token', function () {

    it('should be unauthorized', function (done) {
      session
        .post('/signup')
        .expect(403)
        .end(done)
    });
  });
  describe('with valid user object being submitted as new user', function () 
  {
  let  csrfToken;
    beforeEach(function (done) {
      session.get('/signup')
        .end(function (err, res) {
          if (err) return done(err);
          csrfToken = extractCsrfToken(res);
          console.log(csrfToken); 
          done();
        });
    });


      it('should accept the result', function (done) 
      {  
      session
        .post('/signup')
        .type('form')
        .send(    {
                  "_method" : "post", 
                  "email": "c@c.com", 
                  "name": "Seosamh Test", 
                  "phoneNumber": "053", 
                  "dateOfBirth": "12/12/2000",
                  "proType": "1",
                  "col1": "blue",
                  "col2": "red",
                  "userType": "1", 
                  "password":"BeathaSheosaimhDhuibh",
                  "password-confirm":"BeathaSheosaimhDhuibh",  
                  "_csrf": csrfToken })
        .expect(302)
        .end((err, res) =>{
          res.should.have.status(302); 
          res.body.should.be.a('object'); 
          done(); 
        })
      })



  describe('when no Email provided', function () 
  {
    var csrfToken;
    beforeEach(function (done) {
      session.get('/signup')
        .end(function (err, res) {
          if (err) return done(err);
          csrfToken = extractCsrfToken(res);
          done();
        });
    });

    it('It should not allow the sign up process to fully complete, should be blocked by validation function', function (done) {
      session
        .post('/signup')
             .send(    {
                  "_method" : "post", 
                  "email": "", 
                  "name": "Seosamh Test", 
                  "phoneNumber": "053", 
                  "dateOfBirth": "12/12/2000",
                  "proType": "1",
                  "col1": "blue",
                  "col2": "red",
                  "userType": "1", 
                  "password":"BeathaSheosaimhDhuibh",
                  "password-confirm":"BeathaSheosaimhDhuibh",  
                  "_csrf": csrfToken })
        .expect(200)
          .end((err, res) =>{
          res.should.have.status(200); 
          res.body.should.be.a('object'); 
          done(); 
        })
    });


  });


  describe('when no name provided', function () 
  {
    var csrfToken;
    beforeEach(function (done) {
      session.get('/signup')
        .end(function (err, res) {
          if (err) return done(err);
          csrfToken = extractCsrfToken(res);
          done();
        });
    });

    it('It should not allow the sign up process to fully complete, should be blocked by validation function', function (done) {
      session
        .post('/signup')
             .send(    {
                  "_method" : "post", 
                  "email": "dooo@dooo.com", 
                  "name": "", 
                  "phoneNumber": "053", 
                  "dateOfBirth": "12/12/2000",
                  "proType": "1",
                  "col1": "blue",
                  "col2": "red",
                  "userType": "1", 
                  "password":"BeathaSheosaimhDhuibh",
                  "password-confirm":"BeathaSheosaimhDhuibh",  
                  "_csrf": csrfToken })
        .expect(200)
          .end((err, res) =>{
          res.should.have.status(200); 
          res.body.should.be.a('object');  
          done(); 
        })
    });


  });





  describe('when phone number that is not a number is provided ', function () 
  {
    var csrfToken;
    beforeEach(function (done) {
      session.get('/signup')
        .end(function (err, res) {
          if (err) return done(err);
          csrfToken = extractCsrfToken(res);
          done();
        });
    });

    it('It should not allow the sign up process to fully complete, should be blocked by validation function', function (done) {
      session
        .post('/signup')
             .send(    {
                  "_method" : "post", 
                  "email": "dooo@dooo.com", 
                  "name": "test", 
                  "phoneNumber": "blah", 
                  "dateOfBirth": "12/12/2000",
                  "proType": "1",
                  "col1": "blue",
                  "col2": "red",
                  "userType": "1", 
                  "password":"BeathaSheosaimhDhuibh",
                  "password-confirm":"BeathaSheosaimhDhuibh",  
                  "_csrf": csrfToken })
        .expect(200)
          .end((err, res) =>{
          res.should.have.status(200); 
          res.body.should.be.a('object'); 
          done(); 
        })
    });


  });




  describe('when passwords do not match ', function () 
  {
    var csrfToken;
    beforeEach(function (done) {
      session.get('/signup')
        .end(function (err, res) {
          if (err) return done(err);
          csrfToken = extractCsrfToken(res);
          done();
        });
    });

    it('It should not allow the sign up process to fully complete, should be blocked by validation function', function (done) {
      session
        .post('/signup')
             .send(    {
                  "_method" : "post", 
                  "email": "dooo@dooo.com", 
                  "name": "test", 
                  "phoneNumber": "blah", 
                  "dateOfBirth": "12/12/2000",
                  "proType": "1",
                  "col1": "blue",
                  "col2": "red",
                  "userType": "1", 
                  "password":"BeathaSheosaimhDhuibhx",
                  "password-confirm":"BeathaSheosaimhDhuibh",  
                  "_csrf": csrfToken })
        .expect(200)
          .end((err, res) =>{
          res.should.have.status(200); 
          res.body.should.be.a('object'); 
          done(); 
        })
    });


  });





  describe('When email is invalid', function () 
  {
    var csrfToken;
    beforeEach(function (done) {
      session.get('/signup')
        .end(function (err, res) {
          if (err) return done(err);
          csrfToken = extractCsrfToken(res);
          done();
        });
    });

    it('It should not allow the sign up process to fully complete, should be blocked by validation function', function (done) {
      session
        .post('/signup')
             .send(    {
                  "_method" : "post", 
                  "email": "dooodooo.com", 
                  "name": "test", 
                  "phoneNumber": "blah", 
                  "dateOfBirth": "12/12/2000",
                  "proType": "1",
                  "col1": "blue",
                  "col2": "red",
                  "userType": "1", 
                  "password":"BeathaSheosaimhDhuibhx",
                  "password-confirm":"BeathaSheosaimhDhuibh",  
                  "_csrf": csrfToken })
        .expect(200)
          .end((err, res) =>{
          res.should.have.status(200); 
          res.body.should.be.a('object'); 
          done(); 
        })
    });
  });



  describe('Logging In Procedure', function () 
  {
    var csrfToken;
    beforeEach(function (done) {
      session.get('/signup')
        .end(function (err, res) {
          if (err) return done(err);
          csrfToken = extractCsrfToken(res);
          done();
        });
    });

    it('Should successfully sign in now, using details from above user creation test', function (done) {
      session
        .post('/login')
             .send(    {
                  "_method" : "post", 
                  "email": "c@c.com",  
                  "password":"BeathaSheosaimhDhuibh",  
                  "_csrf": csrfToken })
        .expect(302)
          .end((err, res) =>{
          res.should.have.status(302); 
          res.body.should.be.a('object'); 
          done(); 
        })
    });
  });














  describe('when valid CSRF token is provided', function () 
  {
    var csrfToken;
    beforeEach(function (done) {
      session.get('/signup')
        .end(function (err, res) {
          if (err) return done(err);
          csrfToken = extractCsrfToken(res);
          done();
        });
    });

    it('should accept the result', function (done) {
      session
        .post('/signup')
        .send({ _csrf: csrfToken })
        .expect(200)
        .end(done)
    });


  });

});



});
