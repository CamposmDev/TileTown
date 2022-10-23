import mocha from 'mocha';
import { expect } from 'chai';
import mongoose from 'mongoose';

import UserSchema from "../../database/mongoose/schemas/user";
import MongooseUserDBM from "../../database/mongoose/managers/MongooseUserDBM";
import User from "../../types/User";
import dotenv from "dotenv";
import UserSchemaType from '../../database/mongoose/types/UserSchemaType';


/** 
 * A mocha testing suite for the MongooseCommunityDBM. I have linked the official documentation below.
 * {@link https://mochajs.org/}
 */
 describe("Testing MongooseContestDBM", function() {

    /** The connection string to connect to mongoose */
    const connect: string = process.env.MONGO_URI || "mongodb+srv://Admin:BxXqBUDuPWvof95o@tiletown.bi0xq5u.mongodb.net/?retryWrites=true&w=majority";

    /** 
     * The before method gets called before any of the nested testing suites or tests 
     * gets run. Before I do anything, I need to connect to the database.
     * {@link https://mochajs.org/#hooks}
     */
    before(async function() { await mongoose.connect(connect); });

    describe("getContest", function() {});

    describe("createContest", function() {});

    describe("updateContest", function() {});

    describe("updateModerator", function() {});

    describe("deleteContest", function() {});

    after(async function() { await mongoose.connection.close(); });
});