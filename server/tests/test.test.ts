import request from 'supertest';
import app from '../express/app';

describe('Basic Test', () => {

    let server = app.listen('3000');

    test("Dummy", () => {
        expect(true).toBe(true);
    })

    // test("/ GET", async () => {
    //     let res = await request(app).get('/api');;
    //     expect(res.statusCode).toBe(200);
    //     expect(res.body.message).toBe("Hello there!");
    // });

    server.close();

})