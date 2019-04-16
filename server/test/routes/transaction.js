/* eslint-disable no-undef */
/* eslint-disable import/no-extraneous-dependencies */
import request from 'supertest';
import { expect } from 'chai';
import mockData from '../utils/mockData';
import tokens from '../utils/tokens';
import app from '../../src/app';

const { userToken, staffToken } = tokens;
const { validTransaction, emptyTransaction, excessTransaction } = mockData.transaction;

describe('Transaction routes:', () => {
  describe('## Credit', () => {
    it('should credit an existing account', (done) => {
      request(app)
        .post('/api/v1/transactions/1234567890/credit')
        .set('Accept', 'application/json')
        .set('Authorization', staffToken)
        .send({ ...validTransaction })
        .end((err, res) => {
          expect(res.statusCode).to.equal(201);
          expect(res.body.data).to.include.keys('transactionId');
          expect(res.body.data).to.include.keys('accountNumber');
          expect(res.body.data).to.include.keys('amount');
          expect(res.body.data).to.include.keys('accountBalance');
          expect(res.body.data.transactionType).to.equal('credit');

          done(err);
        });
    });

    it('should return error for empty amount field', (done) => {
      request(app)
        .post('/api/v1/transactions/1234567890/credit')
        .set('Accept', 'application/json')
        .set('Authorization', staffToken)
        .send({ ...emptyTransaction })
        .end((err, res) => {
          expect(res.statusCode).to.equal(400);
          expect(res.body).to.include.keys('errors');
          expect(res.body.errors).to.include.keys('amount');
          expect(res.body.errors.amount.msg).to.equal('Amount field cannot be left blank');

          done(err);
        });
    });

    it('should return error for forbidden access', (done) => {
      request(app)
        .post('/api/v1/transactions/1234567890/credit')
        .set('Accept', 'application/json')
        .set('Authorization', userToken)
        .send({ ...validTransaction })
        .end((err, res) => {
          expect(res.statusCode).to.equal(403);
          expect(res.body).to.include.keys('error');
          expect(res.body.error).to.equal(
            "Forbidden access, Admin or Staff only"
          );

          done(err);
        });
    });

    it('should return error for unauthorized user', (done) => {
      request(app)
        .post('/api/v1/transactions/1234567890/credit')
        .set('Accept', 'application/json')
        .send({ ...validTransaction })
        .end((err, res) => {
          expect(res.statusCode).to.equal(401);
          expect(res.body).to.include.keys('error');
          expect(res.body.error).to.equal('Unauthorized user');

          done(err);
        });
    });
  });

  describe('## Debit', () => {
    it('should debit an existing account', (done) => {
      request(app)
        .post('/api/v1/transactions/1234567890/debit')
        .set('Accept', 'application/json')
        .set('Authorization', staffToken)
        .send({ ...validTransaction })
        .end((err, res) => {
          expect(res.statusCode).to.equal(201);
          expect(res.body.data).to.include.keys('transactionId');
          expect(res.body.data).to.include.keys('accountNumber');
          expect(res.body.data).to.include.keys('amount');
          expect(res.body.data).to.include.keys('accountBalance');
          expect(res.body.data.transactionType).to.equal('debit');

          done(err);
        });
    });

    it('should return error for empty amount field', (done) => {
      request(app)
        .post('/api/v1/transactions/1234567890/debit')
        .set('Accept', 'application/json')
        .set('Authorization', staffToken)
        .send({ ...emptyTransaction })
        .end((err, res) => {
          expect(res.statusCode).to.equal(400);
          expect(res.body).to.include.keys('errors');
          expect(res.body.errors).to.include.keys('amount');
          expect(res.body.errors.amount.msg).to.equal('Amount field cannot be left blank');

          done(err);
        });
    });

    it('should return error for excess withdrawal amount', (done) => {
      request(app)
        .post('/api/v1/transactions/1234567890/debit')
        .set('Accept', 'application/json')
        .set('Authorization', staffToken)
        .send({ ...excessTransaction })
        .end((err, res) => {
          expect(res.statusCode).to.equal(400);
          expect(res.body).to.include.keys('message');
          expect(res.body.message).to.equal('Insufficient funds for transaction');

          done(err);
        });
    });

    it('should return error for forbidden access', (done) => {
      request(app)
        .post('/api/v1/transactions/1234567890/debit')
        .set('Accept', 'application/json')
        .set('Authorization', userToken)
        .send({ ...validTransaction })
        .end((err, res) => {
          expect(res.statusCode).to.equal(403);
          expect(res.body).to.include.keys('error');
          expect(res.body.error).to.equal(
            "Forbidden access, Admin or Staff only"
          );

          done(err);
        });
    });

    it('should return error for unauthorized user', (done) => {
      request(app)
        .post('/api/v1/transactions/1234567890/debit')
        .set('Accept', 'application/json')
        .send({ ...validTransaction })
        .end((err, res) => {
          expect(res.statusCode).to.equal(401);
          expect(res.body).to.include.keys('error');
          expect(res.body.error).to.equal('Unauthorized user');

          done(err);
        });
    });
  });
});
