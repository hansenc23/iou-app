const request = require('supertest');
const expect = require('expect');
const app = require('../index');

const mongoose = require('mongoose');

describe('User authentication test', () => {
  let userId, token;
  beforeAll(async (done) => {
    done();
  });

  afterAll(async (done) => {
    mongoose.connection.close();
    app.close();
    done();
  });

  it('POST /auth/register should create a new user', async (done) => {
    const res = await request(app).post('/auth/register').send({
      firstName: 'Captain',
      lastName: 'America',
      email: '000110110@gmail.com',
      password: '123456',
    });
    userId = res.body.user;
    expect(res.statusCode).toEqual(200);
    done();
  });

  it('POST /auth/delete should delete a user', async (done) => {
    const res = await request(app).post('/auth/delete').send({
      id: userId,
    });
    expect(res.body.success).toEqual('user deleted successfully');
    done();
  });

  it('POST /auth/login should login user and return a token', async (done) => {
    const res = await request(app).post('/auth/login').send({
      email: 'hulk1@gmail.com',
      password: '123456',
    });
    token = res.header['auth-token'];
    expect(res.header).toHaveProperty('auth-token');
    done();
  });

  it('GET /auth/getCurrentUser should get authenticated user', async (done) => {
    const res = await request(app).get('/auth/getCurrentUser').set('auth-token', token);
    expect(res.body).toHaveProperty('id');
    expect(res.body).toHaveProperty('firstName');
    expect(res.body).toHaveProperty('lastName');
    expect(res.body).toHaveProperty('email');
    done();
  });
});
