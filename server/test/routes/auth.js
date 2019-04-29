/* eslint-disable no-undef */
/* eslint-disable import/no-extraneous-dependencies */
import request from 'supertest';
import { expect } from 'chai';
import mockData from '../utils/mockData';
import app from '../../src/app';

const { validClientDetails, validStaffDetails, invalidUserDetails } = mockData.signup;
const { validLoginDetails, emptyLoginDetails, invalidLoginDetails } = mockData.login;

describe('Auth routes:', () => {
  describe('##Signup', () => {
    ('should add a new client user', (done) => {
      request(app)
        .post('/api/v1/auth/signup')
        .set('Accept', 'application/json')
        .send({ ...validClientDetails })
        .end((err, res) => {
          expect(res.statusCode).to.equal(201);
          expect(res.body).to.be.a('object');
          expect(res.body).to.include.keys('data');
          expect(res.body.data).to.include.keys('token');
          expect(res.body.data).to.include.keys('user');
          expect(res.body.data.user.type).to.equal('Client');

          done(err);
        });
    });

    it('should return error for missing fields', (done) => {
      request(app)
        .post('/api/v1/auth/signup')
        .set('Accept', 'application/json')
        .send({ ...invalidUserDetails })
        .end((err, res) => {
          expect(res.statusCode).to.equal(400);
          expect(res.body).to.be.a('object');
          expect(res.body).to.include.keys('errors');
          expect(res.body.errors[0]).to.include('last_name is required');
          expect(res.body.errors[1]).to.include('Email is required');
          

          done(err);
        });
    });

    it('should return unathorized user', (done) => {
      request(app)
        .post("/api/v1/admin")
        .set("Accept", "application/json")
        .send({ ...validStaffDetails })
        .end((err, res) => {
          console.log(res.body);
          expect(res.statusCode).to.equal(401);
          expect(res.body).to.be.a("object");


          done(err);
        });
    });
  });

  describe('##Login', () => {
    it('should login a user', (done) => {
      request(app)
        .post('/api/v1/auth/login')
        .set('Accept', 'application/json')
        .send({ ...validLoginDetails })
        .end((err, res) => {
          //console.log(res.body.data.token);
          expect(res.statusCode).to.equal(200);
          expect(res.body).to.be.a('object');
          expect(res.body).to.include.keys('data');
          expect(res.body.data).to.include.keys('token');
          expect(res.body.data).to.include.keys('user');

          done(err);
        });
    });


    it('should return error for empty field', (done) => {
      request(app)
        .post('/api/v1/auth/login')
        .set('Accept', 'application/json')
        .send({ ...emptyLoginDetails })
        .end((err, res) => {
          expect(res.statusCode).to.equal(400);
          expect(res.body).to.be.a('object');
          expect(res.body).to.include.keys('errors');
          expect(res.body.errors[0]).to.equal(
            "Password must be minimum of 6 characters"
          );

          done(err);
        });
    });

    it('should return error for unauthorized user', (done) => {
      request(app)
        .post('/api/v1/auth/login')
        .set('Accept', 'application/json')
        .send({ ...invalidLoginDetails })
        .end((err, res) => {
          expect(res.statusCode).to.equal(401);
          expect(res.body).to.include.keys('error');
          expect(res.body.error).to.equal(
            "Invalid credentials, inputed details does not match our records"
          );

          done(err);
        });
    });
  });
});
