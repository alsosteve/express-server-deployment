'use strict';

const server = require('../src/server.js');
const supertest = require('supertest');
const request = supertest(server.app);

describe('Testing my HTTP server', () => {

  it('Should be able to respond to a GET to /person', async () => {

    let response = await request.get('/person?name=test');

    expect(response.status).toEqual(200);
    expect(response.body.name).toEqual('test');
  });

  it('Should be able to 500 if no name in the query string.', async () => {
    let response = await request.get('/person?name=');

    expect(response.status).toEqual(500);    
  });
  
  it('Should be able to 404 on a bad route.', async () => {
    let response = await request.post('/person');

    expect(response.status).toEqual(404);
  });
  it('Should be able to 404 on a bad method.', async () => {
    let response = await request.get('/badroute');

    expect(response.status).toEqual(404);
  });
});