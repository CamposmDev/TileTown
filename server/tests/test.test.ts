import request from 'supertest';
import app from '../app';

describe('Basic Test', () => {

    let server = app.listen('3000');

    test("/ GET", async () => {
        let res = await request(app).get('/api');;
        expect(res.statusCode).toBe(200);
        expect(res.body.message).toBe("Hello here!");
    });

    server.close();

})