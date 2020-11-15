const { describe, it } = require('mocha');
const request = require('supertest');
const api = require('./api');
const assert = require('assert');

describe('API Suite test', () => {
    describe('/contact', () => {
        it('Should request the contact page and return HTTP Status 200', async() => {
            const response = await request(api).get('/contact').expect(200);
            assert.deepStrictEqual(response.text, 'contact us page')
        })
    })
    describe('/hello', () => {
        it('Should request an inexistent route /hi and redirect to /hello', async() => {
            const response = await request(api).get('/hi').expect(200);
            assert.deepStrictEqual(response.text, 'Hello World')
        })
    })
    describe('/login', () => {
        it('Should login successfylly on the login route and return HTTP Status 200 ', async() => {
            const response = await request(api)
                .post('/login')
                .send({username: 'Mucilon', password: '123456'})
                .expect(200);


            assert.deepStrictEqual(response.text, 'Logging has suceeded!')
        })
        it('Should not be login and return HTTP Status 401 ', async() => {
            const response = await request(api)
                .post('/login')
                .send({username: 'MucilonLoiro', password: '1234'})
                .expect(401);

               assert.ok(response.unauthorized) 


            assert.deepStrictEqual(response.text, 'Logging has failed!')
        })
    })
})