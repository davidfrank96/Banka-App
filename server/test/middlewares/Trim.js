/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-undef */
import sinon from 'sinon';
import { assert, expect } from 'chai';
import Trim from '../../src/middlewares/Trim';

const req = {
    body: {
        first: '      gtb',
        second: 'fcmb         ',
        third: '   access   ',
    },
};

const res = {
    json: message => ({
        message,
    }),
    status: status => ({
        json: message => ({
            status,
            message,
        }),
    }),
};

const next = sinon.spy();

describe('Trim', () => {
    it('should trim and return trimmed values', (done) => {
        Trim.trim(req, res, next);

        expect(req.body).to.deep.equal({
            first: 'gtb',
            second: 'fcmb',
            third: 'access',
        });

        assert(next.called);
        done();
    });
});
