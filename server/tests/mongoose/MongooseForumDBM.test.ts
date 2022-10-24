import { expect } from 'chai';
import mongoose from 'mongoose';

import UserSchema from "../../database/mongoose/schemas/user";
import MongooseUserDBM from "../../database/mongoose/managers/MongooseUserDBM";
import User from "../../types/User";
import dotenv from "dotenv";
import UserSchemaType from '../../database/mongoose/types/UserSchemaType';
import { ForumPostSchema } from '../../database/mongoose/schemas';
import { MongooseForumDBM } from '../../database/mongoose/managers';
import { ForumPost } from '../../types';

/** Config the env variables */
dotenv.config()

/** 
 * A mocha testing suite for the MongooseUserDBM. I have linked the official documentation below.
 * {@link https://mochajs.org/}
 */
describe("Testing MongooseForumDBM", function() {

    /** The connection string to connect to mongoose */
    const connect: string = process.env.MONGO_URI || "mongodb+srv://Admin:BxXqBUDuPWvof95o@tiletown.bi0xq5u.mongodb.net/?retryWrites=true&w=majority";

    /** 
     * The before method gets called before any of the nested testing suites or tests 
     * gets run. Before I do anything, I need to connect to the database.
     * {@link https://mochajs.org/#hooks}
     */
    before(async function() { await mongoose.connect(connect); });
    
    /**
     * A set of tests for the method MongooseForumDBM.createForumPost()
     * @see MongooseForumDBM.createForumPost
     */
    describe('MongooseForumDBM.createForum', function() {
        beforeEach(async function() { await ForumPostSchema.deleteMany() })
        it('It should create and return a new forum post', async function() {
            let forums: MongooseForumDBM = new MongooseForumDBM()

            let partial = {
                "author": "Camposm",
                "title": "How to play MC",
                "body": "How much dedicated RAM do I need for mc",
                "tags": ["mc", "servers"],
                "isPublished": true
            }
            let forumPost: ForumPost | null = await forums.createForumPost(partial)
            expect(forumPost).not.null
            expect(forumPost).property("author", "Peter")
            expect(forumPost).property("title", "How to play MC")
            expect(forumPost).property("body", "How much dedicated RAM do I need for mc")
            expect(forumPost).property("tags", ["mc", "servers"])
            expect(forumPost).property("isPublished", true)
            
            if (forumPost !== null) {
                let res = await ForumPostSchema.findById(forumPost.id)
                expect(res).not.null;
            }
        })
    })

    // /** 
    //  * A set of tests for the method MongooseUserDBM.createUser()
    //  * @see MongooseUserDBM.createUser
    //  */
    // describe("MongooseUserDBM.createUser", function() {

    //     /** 
    //      * The beforeEach function is another hook function like before. The only difference 
    //      * is that it gets called before each test is run in a test suite. I'm using it here
    //      * to remove all users from the database.
    //      * {@link https://mochajs.org/#hooks}
    //      */
    //     beforeEach(async function() { await UserSchema.deleteMany(); });

    //     it("It should create and return a new user", async function() {

    //         let users: MongooseUserDBM = new MongooseUserDBM();

    //         let partial = {
    //             firstName: "Peter", 
    //             lastName: "Walsh",
    //             username: "Peteylumpkins",
    //             password: "blackstarthedog",
    //             email: "peter.t.walsh@stonybrook.edu"
    //         }
    
    //         let user: User | null = await users.createUser(partial);
    //         expect(user).not.null;
    //         expect(user).property("firstName", "Peter");
    //         expect(user).property("lastName", "Walsh");


    //         let res = await UserSchema.find({email: partial.email});
    //         expect(res).not.null;
    //     });

    //     it("Password is not long enough - should return null", async function() {
    //         let users: MongooseUserDBM = new MongooseUserDBM();

    //         let partial = {
    //             firstName: "Peter", 
    //             lastName: "Walsh",
    //             username: "Peteylumpkins",
    //             password: "blackstardog",
    //             email: "walsh9636@gmail.com"
    //         }
    
    //         let user: User | null = await users.createUser(partial);
    //         expect(user).null;

    //         let res: UserSchemaType[] = await UserSchema.find({email: partial.email});
    //         expect(res).length(0);
    //     });

    // });

    /** 
     * The before method gets called after all of the tests have run. I am using it here
     * to close the connection to MongoDB.
     * {@link https://mochajs.org/#hooks}
     */
    after(async function() { await mongoose.connection.close(); });

});