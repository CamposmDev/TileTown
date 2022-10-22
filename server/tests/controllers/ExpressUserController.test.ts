import request from 'supertest';
import { app } from '../../express';
import { expect } from 'chai';

/** 
 * Tests for the UserRouter and associated handlers
 * @author Peter Walsh
 */
describe('ExpressUserController', function() {

    /** Start the server on port 3000 */
    const server = app.listen('3000');


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

        beforeEach(function() {

        });

        // Bad Request - 400 - missing body, missing data
        it("", function() {})

        // Bad Request - 400 - non-unique email
        it("", function() {});

        // Bad Request - 400 - non-unique username
        it("", function() {});

        // Bad Request - 400 - invalid password (<= 12 chararacters)
        it("", function() {});

        // Success - 201 - User successfully and returned
        it("", function() {});

    });

    /**
     * Method: POST
     * Route: api/user/login
     */
    describe("loginUser", function() {

        // Bad Request - 400 - Invalid user email
        it("", function() {});

        // Bad Request - 400 - Incorrect password
        it("", function() {});

        // Success - 200 - Valid email and password
        it("", function() {});

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



    /** Close the connection to the server */
    server.close();
});