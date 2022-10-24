import mocha from 'mocha';
import request from 'supertest';
import { app } from '../../express';
import { db } from "../../database";
import { expect } from 'chai';
import UserSchema from "../../database/mongoose/schemas/User";
import { Auth } from '../../express/middleware';


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

        beforeEach(async function() {
            await UserSchema.deleteMany({});
            await db.users.createUser({
                firstName: "Peter",
                lastName: "Walsh",
                email: "peteylumpkins@gmail.com",
                username: "peteylumpkins",
                password: "blackstarthedog", 
            });
        });

        // Invalid Id - 404 - send id of nonexisting user
        it("Failure - Invalid user id", async function() { 
            let user = await UserSchema.findOne({email: "peteylumpkins@gmail.com"})
            let id: string = user !== null ? user._id.toString() : "";
            let token = Auth.signJWT<string>(JSON.stringify(id));

            let response = await request(app).get(`/api/user/${id + "123"}`).set("Cookie", [`token=${token}`]);
            expect(response.status).equals(404);
        })

        // Unauthorized - 401 - request without authorization
        it("Failure - Invalid token", async function() {
            let user = await UserSchema.findOne({email: "peteylumpkins@gmail.com"})
            let id: string = user !== null ? user._id.toString() : "";
            let token: string = "Bad token!";

            let response = await request(app).get(`/api/user/${id}`).set("Cookie", [`token=${token}`]);
            expect(response.status).equals(401);
        });

        // Valid Id - 200 - send id of exisitng user
        it("Success - Valid token and valid user id", async function() {
            let user = await UserSchema.findOne({email: "peteylumpkins@gmail.com"})
            let id: string = user !== null ? user._id.toString() : "";
            let token = Auth.signJWT<string>(JSON.stringify(id));

            let response = await request(app).get(`/api/user/${id}`).set("Cookie", [`token=${token}`]);
            expect(response.status).equals(200);
            expect(response.body.user.username).equals("peteylumpkins");
        });

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
            let response = await request(app).post("/api/user/").send({
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
            let response = await request(app).post("/api/user/").send({
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

        // Unauthorized - 401 - Request without authorization token
        it("Failure - Unauthorized user", async function() {
            let user = await UserSchema.findOne({email: "peteylumpkins@gmail.com"})
            let id: string = user !== null ? user._id.toString() : "";
            let token = Auth.signJWT<string>(JSON.stringify(id));
            let response = await request(app).post(`/api/user/logout`).set("Cookie", [`token=${token + "1"}`]);
            expect(response.status).equal(401);

        });

        // Success - 200 - User has valid credentials and logged out
        it("Success - Authorized User", async function() {
            let user = await UserSchema.findOne({email: "peteylumpkins@gmail.com"})
            let id: string = user !== null ? user._id.toString() : "";
            let token = Auth.signJWT<string>(JSON.stringify(id));
            let response = await request(app).post(`/api/user/logout`).set("Cookie", [`token=${token}`]);
            expect(response.status).equals(200);
        });

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

        // Unauthorized - 401 - User was not deleted
        it("Bad Request - Unauthorized", async function() {
            let user = await UserSchema.findOne({email: "peteylumpkins@gmail.com"})
            let id: string = user !== null ? user._id.toString() : "";
            let token = Auth.signJWT<string>(JSON.stringify(id));
            let response = await request(app).delete(`/api/user/`).set("Cookie", [`token=${token + "1"}`]);
            expect(response.status).equals(401);
        });

        // Success - 200 - User deleted, deleted user id returned
        it("Success - Authorized", async function() {
            let user = await UserSchema.findOne({email: "peteylumpkins@gmail.com"})
            let id: string = user !== null ? user._id.toString() : "";
            let token = Auth.signJWT<string>(JSON.stringify(id));
            let response = await request(app).delete(`/api/user/`).set("Cookie", [`token=${token}`]);
            expect(response.status).equals(200);
        });

    });


    after(async function() {
        /** Close the connection to the server */
        server.close();
        await db.disconnect();
    });

});