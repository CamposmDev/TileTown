import { expect } from 'chai';
import mongoose from 'mongoose';

import UserSchema from "../../database/mongoose/schemas/user";
import MongooseUserDBM from "../../database/mongoose/managers/MongooseUserDBM";
import User from "../../types/User";
import dotenv from "dotenv";
import UserSchemaType from '../../database/mongoose/types/UserSchemaType';

/** Config the env variables */
dotenv.config()

/** 
 * A mocha testing suite for the MongooseUserDBM. I have linked the official documentation below.
 * {@link https://mochajs.org/}
 */
describe("Testing MongooseUserDBM", function() {

    /** The connection string to connect to mongoose */
    const connect: string = process.env.MONGO_URI || "mongodb+srv://Admin:BxXqBUDuPWvof95o@tiletown.bi0xq5u.mongodb.net/?retryWrites=true&w=majority";

    /** 
     * The before method gets called before any of the nested testing suites or tests 
     * gets run. Before I do anything, I need to connect to the database.
     * {@link https://mochajs.org/#hooks}
     */
    before(async function() { await mongoose.connect(connect); });

    describe("getUserById", function() {});

    describe("loginUser", function() {});

    /** 
     * A set of tests for the method MongooseUserDBM.createUser()
     * @see MongooseUserDBM.createUser
     */
    describe("createUser", function() {

        /** 
         * The beforeEach function is another hook function like before. The only difference 
         * is that it gets called before each test is run in a test suite. I'm using it here
         * to remove all users from the database.
         * {@link https://mochajs.org/#hooks}
         */
        beforeEach(async function() { await UserSchema.deleteMany(); });

        it("It should create and return a new user", async function() {

            let users: MongooseUserDBM = new MongooseUserDBM();

            let partial = {
                firstName: "Peter", 
                lastName: "Walsh",
                username: "Peteylumpkins",
                password: "blackstarthedog",
                email: "peter.t.walsh@stonybrook.edu"
            }
    
            let user: User | null = await users.createUser(partial);
            expect(user).not.null;
            expect(user).property("firstName", "Peter");
            expect(user).property("lastName", "Walsh");


            let res = await UserSchema.find({email: partial.email});
            expect(res).not.null;
        });

        it("Password is not long enough - should return null", async function() {
            let users: MongooseUserDBM = new MongooseUserDBM();

            let partial = {
                firstName: "Peter", 
                lastName: "Walsh",
                username: "Peteylumpkins",
                password: "blackstardog",
                email: "walsh9636@gmail.com"
            }
    
            let user: User | null = await users.createUser(partial);
            expect(user).null;

            let res: UserSchemaType[] = await UserSchema.find({email: partial.email});
            expect(res).length(0);
        });

    });

    describe("deleteUser", function() {});

    describe("verifyUser", function() {});

    describe("updatePassword", function() {});

    describe("updateEmail", function() {});

    describe("updateUsername", function() {});

    describe("addFriend", function() {});

    describe("joinCommunity", function() {});

    describe("leaveCommunity", function() {});

    describe("joinContest", function() {});

    describe("leaveContest", function() {});

    describe("favoriteTilemap", function() {});

    describe("unfavoriteTilemap", function() {});

    describe("favoriteTileset", function() {});

    describe("unfavoriteTileset", function() {});

    /** 
     * The before method gets called after all of the tests have run. I am using it here
     * to close the connection to MongoDB.
     * {@link https://mochajs.org/#hooks}
     */
    after(async function() { await mongoose.connection.close(); });

});