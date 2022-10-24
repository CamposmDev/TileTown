import mocha from 'mocha';
import { expect } from 'chai';
import mongoose from 'mongoose';

import UserSchema from "../../database/mongoose/schemas/User";
import MongooseUserDBM from "../../database/mongoose/managers/MongooseUserDBM";
import User from "../../types/User";
import dotenv from "dotenv";
import UserSchemaType from '../../database/mongoose/types/UserSchemaType';


/** 
 * A mocha testing suite for the MongooseCommunityDBM. I have linked the official documentation below.
 * {@link https://mochajs.org/}
 */
 describe("Testing MongooseCommunityDBM", function() {

    /** The connection string to connect to mongoose */
    const connect: string = process.env.MONGO_URI || "mongodb+srv://Admin:BxXqBUDuPWvof95o@tiletown.bi0xq5u.mongodb.net/?retryWrites=true&w=majority";

    /** 
     * The before method gets called before any of the nested testing suites or tests 
     * gets run. Before I do anything, I need to connect to the database.
     * {@link https://mochajs.org/#hooks}
     */
    before(async function() { await mongoose.connect(connect); });

    describe("getCommunityById", function() {});

    describe("createCommunity", function() {});

    describe("updateCommunity", function() {});

    describe("addCommunityMember", function() {});

    describe("removeCommunityMember", function() {});

    describe("deleteCommunity", function() {});

    after(async function() { await mongoose.connection.close(); });
 });