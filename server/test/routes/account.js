/* eslint-disable no-undef */
/* eslint-disable import/no-extraneous-dependencies */
import request from 'supertest';
import { expect } from 'chai';
import mockData from '../utils/mockData';
import tokens from '../utils/tokens';
import app from '../../src/app';

const { userToken } = tokens;
const { validAccountDetails, emptyAccountDetails } = mockData.account;

describe('Account routes:', () => {
    describe('## Create', () => {
        it('should create a new account', (done) => {
            request(app)
                .post('/api/v1/accounts')
                .set('Accept', 'application/json')
                .set('Authorization', userToken)
                .send({ ...validAccountDetails })
                .end((err, res) => {
                    expect(res.statusCode).to.equal(201);
                    expect(res.body).to.be.a('object');
                    expect(res.body).to.include.keys('data');
                    expect(res.body.data).to.include.keys('accountNumber');
                    expect(res.body.data).to.include.keys('type');
                    expect(res.body.data).to.include.keys('email');
                    expect(res.body.data).to.include.keys('openingBalance');


                    done(err);
                });
        });

        it('should return error for empty field', (done) => {
            request(app)
                .post('/api/v1/accounts')
                .set('Accept', 'application/json')
                .set('Authorization', userToken)
                .send({ ...emptyAccountDetails })
                .end((err, res) => {
                    expect(res.statusCode).to.equal(400);
                    expect(res.body).to.be.a('object');
                    expect(res.body).to.include.keys('errors');
                    expect(res.body.errors).to.include.keys('type');
                    expect(res.body.errors.type.msg).to.equal('Type must be specified');

                    done(err);
                });
        });

        it('should return error unauthorized user', (done) => {
            request(app)
                .post('/api/v1/accounts')
                .set('Accept', 'application/json')
                .send({ ...validAccountDetails })
                .end((err, res) => {
                    expect(res.statusCode).to.equal(401);
                    expect(res.body).to.include.keys('error');
                    expect(res.body.error).to.equal('Unauthorized user');

                    done(err);
                });
        });
    });

    describe('## Update', () => {
        it('should return new account update', (done) => {
            request(app)
                .patch('/api/v1/accounts/2343457787')
                .set('Accept', 'application/json')
                .set('Authorization', userToken)
                .send({ status: 'active' })
                .end((err, res) => {
                    expect(res.statusCode).to.equal(200);
                    expect(res.body).to.include.keys('data');
                    expect(res.body.data).to.include.keys('accountNumber');
                    expect(res.body.data).to.include.keys('status');

                    done(err);
                });
        });

        it('should return error empty data', (done) => {
            request(app)
                .patch('/api/v1/accounts/2343457787')
                .set('Accept', 'application/json')
                .set('Authorization', userToken)
                .send({ status: '' })
                .end((err, res) => {
                    expect(res.statusCode).to.equal(400);
                    expect(res.body).to.include.keys('errors');
                    expect(res.body.errors).to.include.keys('status');
                    expect(res.body.errors.status.msg).to.equal('Status field cannot be left blank');

                    done(err);
                });
        });

        it('should return error for account not found', (done) => {
            request(app)
                .patch('/api/v1/accounts/23434577')
                .set('Accept', 'application/json')
                .set('Authorization', userToken)
                .send({ status: 'active' })
                .end((err, res) => {
                    expect(res.statusCode).to.equal(404);
                    expect(res.body).to.include.keys('message');
                    expect(res.body.message).to.equal('Account not found');

                    done(err);
                });
        });

        it('should return error for unauthorized user', (done) => {
            request(app)
                .patch('/api/v1/accounts/2343457787')
                .set('Accept', 'application/json')
                .send({ status: '' })
                .end((err, res) => {
                    expect(res.statusCode).to.equal(401);
                    expect(res.body).to.include.keys('error');
                    expect(res.body.error).to.equal('Unauthorized user');

                    done(err);
                });
        });
    });

    describe('## Delete', () => {
        it('should delete an existing account', (done) => {
            request(app)
                .delete('/api/v1/accounts/2343457787')
                .set('Accept', 'application/json')
                .set('Authorization', userToken)
                .end((err, res) => {
                    expect(res.statusCode).to.equal(200);
                    expect(res.body).to.include.keys('message');
                    expect(res.body.message).to.equal('Account successfully deleted');

                    done(err);
                });

        });

        it('should return error for account not found', (done) => {
            request(app)
                .delete('/api/v1/accounts/2343457')
                .set('Accept', 'application/json')
                .set('Authorization', userToken)
                .end((err, res) => {
                    expect(res.statusCode).to.equal(404);
                    expect(res.body).to.include.keys('message');
                    expect(res.body.message).to.equal('Account not found');

                    done(err);
                });

        });

        it('should return error for unauthorized user', (done) => {
            request(app)
                .delete('/api/v1/accounts/2343457787')
                .set('Accept', 'application/json')
                .end((err, res) => {
                    expect(res.statusCode).to.equal(401);
                    expect(res.body).to.include.keys('error');
                    expect(res.body.error).to.equal('Unauthorized user');

                    done(err);
                });

        });
    });
});
