/* eslint-disable no-undef */
/* eslint-disable import/no-extraneous-dependencies */
import request from "supertest";
import { expect } from "chai";
import mockData from "../utils/mockData";
import tokens from "../utils/tokens";
import app from "../../src/app";

const { userToken, staffToken } = tokens;
const { validAccountDetails, emptyAccountDetails } = mockData.account;

describe("Account routes:", () => {
  describe("## Create", () => {
    it("should create a new account", done => {
      request(app)
        .post("/api/v1/accounts")
        .set("Accept", "application/json")
        .set("Authorization", userToken)
        .send({ ...validAccountDetails })
        .end((err, res) => {
          expect(res.statusCode).to.equal(201);
          expect(res.body).to.be.a("object");
          expect(res.body).to.include.keys("data");
          expect(res.body.data).to.include.keys("accountnumber");
          expect(res.body.data).to.include.keys("type");

          done(err);
        });
    });

    ("should return error for empty field", done => {
      request(app)
        .post("/api/v1/accounts")
        .set("Accept", "application/json")
        .set("Authorization", userToken)
        .send({ ...emptyAccountDetails })
        .end((err, res) => {
          console.log(res.body);
          expect(res.statusCode).to.equal(400);
          expect(res.body).to.be.a("object");
          expect(res.body).to.include.keys("errors");
          expect(res.body.errors[0]).to.equal("Type must be specified");

          done(err);
        });
    });

    it("should return error unauthorized user", done => {
      request(app)
        .post("/api/v1/accounts")
        .set("Accept", "application/json")
        .send({ ...validAccountDetails })
        .end((err, res) => {
          expect(res.statusCode).to.equal(401);
          expect(res.body).to.include.keys("error");
          expect(res.body.error).to.equal("Unauthorized user");

          done(err);
        });
    });
  });

 
});
