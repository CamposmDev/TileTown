import mocha from 'mocha';
import { expect } from 'chai';
import mongoose from 'mongoose';

import UserSchema from "../../database/mongoose/schemas/User";
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

    /** 
     * A set of tests for the method MongooseUserDBM.createUser()
     * @see MongooseUserDBM.createUser
     */
    describe("getForumPost", function() {

    });

    describe("createForumPost", function() {

    });

    describe("updateForumPost", function() {

    });

    describe("deleteForumPost", function() {

    });

    describe("toggleLike", function() {

    });

    describe("toggleDislike", function() {

    });

    describe("addView", function() {
        
    })

    /** 
     * The before method gets called after all of the tests have run. I am using it here
     * to close the connection to MongoDB.
     * {@link https://mochajs.org/#hooks}
     */
    after(async function() { await mongoose.connection.close(); });

});