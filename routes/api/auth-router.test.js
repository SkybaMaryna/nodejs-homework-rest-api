const mongoose = require('mongoose');
const request = require('supertest');

const app = require('../../app');

const { PORT, DB_HOST } = process.env;

describe('test login route', () => {
  let server = null;

  beforeAll(async () => {
    server = app.listen(PORT);
    await mongoose.connect(DB_HOST);
  });

  afterAll(() => {
    server.close();
    mongoose.connection.close();
  });

  test('test login route with correct data', async () => {
    const loginData = {
      email: 'marysmith@gmail.com',
      password: '123456',
    };
    const { statusCode, body } = await request(app)
      .post('/users/login')
      .send(loginData);

    expect(statusCode).toBe(200);
    expect(body.token).toBeTruthy();
    expect(body.user).toStrictEqual({
      email: expect.any(String),
      subscription: expect.any(String),
    });
  });
});
