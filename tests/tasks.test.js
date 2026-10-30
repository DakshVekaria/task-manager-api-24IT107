const request = require('supertest');
const app = require('../server');

describe('Task Management API', () => {
  test('GET /health returns 200', async () => {
    const res = await request(app).get('/health');
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('ok');
  });

  test('Unknown route returns 404 with message', async () => {
    const res = await request(app).get('/does-not-exist');
    expect(res.statusCode).toBe(404);
    expect(res.body.message).toBe('Not found');
  });
});