import request from 'supertest';
import { app } from '../../express';
import { db } from "../../database";
import { expect } from 'chai';

import UserSchema from "../../database/mongoose/schemas/user";


/** 
 * Tests for the UserRouter and associated handlers
 * @author Peter Walsh
 */
describe('ExpressUserController', function() {

    /** Start the server on port 3000 */
    const server = app.listen('3000');

    before(async function() {
        const connect: string = process.env.MONGO_URI || "mongodb+srv://Admin:BxXqBUDuPWvof95o@tiletown.bi0xq5u.mongodb.net/?retryWrites=true&w=majority";
        await db.connect(connect)
    });

    /** 
     * Method: GET
     * Route: api/user/:id
     */
    describe("getUserById", function() {

        beforeEach(function() {});

        // Invalid Id - 404 - send id of nonexisting user
        it("", function() {})

        // Unauthorized - 401 - request without authorization
        it("", function() {});

        // Valid Id - 200 - send id of exisitng user
        it("", function() {})

    });

    /** 
     * Method: POST
     * Route: api/user
     */
    describe("createUser", function() {

        beforeEach(async function() {
            await UserSchema.deleteMany({});
            await db.users.createUser({
                firstName: "Peter",
                lastName: "Walsh",
                email: "Walsh9636@gmail.com",
                username: "PeteyLumps",
                password: "password", 
            });
        });

        // Success - 201 - User created successfully and returned
        it("Successfully create and return a new user", async function() {
            let response = await request(app).post("/api/user").send({
                username: "PeteyLumpkins",
                password: "blackstarthedog",
                email: "peter.t.walsh@stonybrook.edu",
                firstName: "Peter",
                lastName: "Walsh"
            });
            expect(response.status).equals(201);
        })

        // Bad Request - 400 - non-unique email
        it("Failure - Non-unique email", async function() {
            let response = await request(app).post("/api/user").send({
                username: "PeteyLumpkins",
                password: "blackstarthedog",
                email: "Walsh9636@gmail.com",
                firstName: "Peter",
                lastName: "Walsh"
            });
            expect(response.status).equals(400);
        });

        // Bad Request - 400 - non-unique username
        it("Failure - Non-unique username", async function() {
            let response = await request(app).post("/api/user").send({
                username: "PeteyLumps",
                password: "blackstarthedog",
                email: "walsh9636@gmail.com",
                firstName: "Peter",
                lastName: "Walsh"
            });
            expect(response.status).equals(400);
        });

        // Bad Request - 400 - invalid password (<= 12 chararacters)
        it("Failure - Invalid Password - Exactly 12 characters", async function() {
            let response = await request(app).post("/api/user").send({
                username: "PeteyLumpkins",
                password: "blackstardog",
                email: "walsh9636@gmail.com",
                firstName: "Peter",
                lastName: "Walsh"
            });
            expect(response.status).equals(400);
        });

        // Success - 400 - Missing data in body
        it("Failure - Missing data in body", async function() {
            let response = await request(app).post("/api/user").send({
                username: "PeteyLumpkins",
                password: "blackstarthedog",
                email: "walsh9636@gmail.com",
                firstName: "Peter",
            });
            expect(response.status).equals(400);
        });

    });

    /**
     * Method: POST
     * Route: api/user/login
     */
    describe("loginUser", function() {

        beforeEach(async function() {
            await UserSchema.deleteMany({});
            let user = await db.users.createUser({
                firstName: "Peter",
                lastName: "Walsh",
                email: "peter.t.walsh@stonybrook.edu",
                username: "PeteyLumpkings",
                password: "password12345"
            });
            expect(user).not.null;
        });

        // Bad Request - 400 - Invalid user email
        it("Failure - Invalid Email", async function() {
            let response = await request(app).post("/api/user/login").send({
                password: "password12345",
                email: "walsh@stonybrook.edu",
            });
            expect(response.status).equals(400);
        });

        // Bad Request - 400 - Incorrect password
        it("Failure - Incorrect Password", async function() {
            let response = await request(app).post("/api/user/login").send({
                password: "password12346",
                email: "peter.t.walsh@stonybrook.edu",
            });
            expect(response.status).equals(400);
        });

        // Success - 200 - Valid email and password
        it("Success - Email and Password match!", async function() {
            let response = await request(app).post("/api/user/login").send({
                password: "password12345",
                email: "peter.t.walsh@stonybrook.edu",
            });
            expect(response.status).equals(200);
            
        });

    });

    /** 
     * Method: POST
     * Route: api/user/logout
     */
    describe("logoutUser", function() {

        // Unauthorized - 401 - Request without authorization token
        it("", function() {});

        // Success - 200 - User has valid credentials and logged out
        it("", function() {});

    });

    /** 
     * Method: PUT
     * Route: api/user/:id
     */
    describe("updateUserById", function() {});

    /** 
     * Method: DELETE
     * Route: api/user/:id
     */
    describe("deleteUserById", function() {

        beforeEach(function() {});

        // Bad Request - 400 - Invalid User Id
        it("", function() {});

        // Unauthorized - 401 - Request without authorization token
        it("", function() {});

        // Success - 200 - User deleted, deleted user id returned
        it("", function() {});

    });


    after(async function() {
        /** Close the connection to the server */
        server.close();
        await db.disconnect();
    });

});