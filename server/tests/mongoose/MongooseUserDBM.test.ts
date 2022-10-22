import { expect } from 'chai';
import mongoose from 'mongoose';
import { hash, compare } from 'bcrypt'

import CommunitySchema from "../../database/mongoose/schemas/community";
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

    describe("getUserById", function() {

        beforeEach(async function() { 
            await UserSchema.deleteMany(); 
            await UserSchema.create({
                firstName: "Peter",
                lastName: "Walsh",
                email: "peter.t.walsh@stonybrook.edu",
                username: "PeteyLumpkins",
                password: "DummyPassword",
                verifyKey: 'something?!',
                isVerified: false,
                favoriteTileMaps: [],
                favoriteTileSets: [],
                joinedContests: [],
                joinedCommunities: [],
                friends: [],
                imageURL: " "
            })
        });

        it("Successfully finds a user with the id", async function() {
            let users: MongooseUserDBM = new MongooseUserDBM();

            let schema = await UserSchema.findOne({email: "peter.t.walsh@stonybrook.edu"});
            let id: string = schema !== null ? schema._id.toString() : "";

            let user: User | null = await users.getUserById(id);
            expect(user).not.null;
            expect(user).property("firstName", "Peter");
            expect(user).property("lastName", "Walsh");
        })

        it("Fails to find a user - user with id doesn't exist", async function() {
            let users: MongooseUserDBM = new MongooseUserDBM();

            let schema = await UserSchema.findOne({email: "peter.t.walsh@stonybrook.edu"});
            let id: string = schema !== null ? schema._id.toString() : "";

            let user: User | null = await users.getUserById(id + "123");
            expect(user).null;
        });

    });

    describe("loginUser", function() {

    });

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
        beforeEach(async function() { 
            await UserSchema.deleteMany(); 
            await UserSchema.create({
                firstName: "Peter",
                lastName: "Walsh",
                email: "Walsh9636@gmail.com",
                username: "PeteyLumps",
                password: "DummyPassword",
                verifyKey: 'something?!',
                isVerified: false,
                favoriteTileMaps: [],
                favoriteTileSets: [],
                joinedContests: [],
                joinedCommunities: [],
                friends: [],
                imageURL: " "
            })
        });

        it("Successfully creates a new user in the DBMS", async function() {

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

        it("Fails to create a new user - password is not long enough", async function() {
            let users: MongooseUserDBM = new MongooseUserDBM();

            let partial = {
                firstName: "Peter", 
                lastName: "Walsh",
                username: "Peteylumpkins",
                password: "blackstardog",
                email: "peter.t.walsh@stonybrook.edu"
            }
    
            let user: User | null = await users.createUser(partial);
            expect(user).null;

            let res: UserSchemaType[] = await UserSchema.find({email: partial.email});
            expect(res).length(0);
        });

        it("Fails to create a new user - missing info in partial", async function() {
            let users: MongooseUserDBM = new MongooseUserDBM();

            let partial = {
                firstName: "Peter", 
                lastName: "Walsh",
                username: "Peteylumpkins",
                password: "blackstardog"
            }

            let user: User | null = await users.createUser(partial);
            expect(user).null;

            let res: UserSchemaType[] = await UserSchema.find({email: partial.username});
            expect(res).length(0);
        })

        it("Fails to create a new user - account with email already exists", async function() {
            let users: MongooseUserDBM = new MongooseUserDBM();

            let partial = {
                firstName: "Peter", 
                lastName: "Walsh",
                username: "Peteylumpkins",
                password: "blackstardog",
                email: "Walsh9636@gmail.com"
            }

            let user: User | null = await users.createUser(partial);
            expect(user).null;

            let res: UserSchemaType[];
            res = await UserSchema.find({username: partial.username});
            expect(res).length(0);

            res = await UserSchema.find({email: partial.email});
            expect(res).length(1);
            expect(res[0]).to.have.property('email', 'Walsh9636@gmail.com');
            expect(res[0]).to.have.property('username', 'PeteyLumps');
        });

        it("Fails to create a new user - account with username already exists", async function() {
            let users: MongooseUserDBM = new MongooseUserDBM();

            let partial = {
                firstName: "Peter", 
                lastName: "Walsh",
                username: "PeteyLumps",
                password: "blackstardog",
                email: "peter.t.walsh@stonybrook.edu"
            }

            let user: User | null = await users.createUser(partial);
            expect(user).null;

            let res: UserSchemaType[];

            res = await UserSchema.find({email: partial.email});
            expect(res).length(0);

            res = await UserSchema.find({username: partial.username});
            expect(res).length(1);
            expect(res[0]).to.have.property('email', 'Walsh9636@gmail.com');
            expect(res[0]).to.have.property('username', 'PeteyLumps');
        });

    });

    describe("deleteUser", function() {

        beforeEach(async function() { 
            await UserSchema.deleteMany(); 
            await UserSchema.create({
                firstName: "Peter",
                lastName: "Walsh",
                email: "peter.t.walsh@stonybrook.edu",
                username: "PeteyLumps",
                password: "DummyPassword",
                verifyKey: 'something?!',
                isVerified: false,
                favoriteTileMaps: [],
                favoriteTileSets: [],
                joinedContests: [],
                joinedCommunities: [],
                friends: [],
                imageURL: " "
            })
        });

        it("Successfully deletes a user with the id", async function() {
            let users: MongooseUserDBM = new MongooseUserDBM();

            let user = await UserSchema.findOne({email: "peter.t.walsh@stonybrook.edu"});
            let id: string = user !== null ? user._id.toString() : "";

            let deletedUserId: boolean = await users.deleteUser(id);
            expect(deletedUserId).true;

            user = await UserSchema.findById(id);
            expect(user).null;
        });

        it("Fails to delete the user - invalid id", async function() {
            let users: MongooseUserDBM = new MongooseUserDBM();

            let user = await UserSchema.findOne({email: "peter.t.walsh@stonybrook.edu"});
            let id: string = user !== null ? user._id.toString() : "";

            let deletedUserId: boolean = await users.deleteUser(id + "123");
            expect(deletedUserId).false;

            user = await UserSchema.findById(id);
            expect(user).not.null;
        });
    });

    describe("verifyUser", function() {

        beforeEach(async function() { 
            await UserSchema.deleteMany(); 
            await UserSchema.create({
                firstName: "Peter",
                lastName: "Walsh",
                email: "peter.t.walsh@stonybrook.edu",
                username: "PeteyLumps",
                password: "DummyPassword",
                verifyKey: 'verificationkey',
                isVerified: false,
                favoriteTileMaps: [],
                favoriteTileSets: [],
                joinedContests: [],
                joinedCommunities: [],
                friends: [],
                imageURL: " "
            })
        });

        it("Successfully verifies a user", async function() {
            let users: MongooseUserDBM = new MongooseUserDBM();

            let verified: boolean = await users.verifyUser("verificationkey");
            expect(verified).true;

            let user = await UserSchema.findOne({email: "peter.t.walsh@stonybrook.edu"});
            verified = user !== null ? user.isVerified : false;
            expect(verified).true;
        });

        it("Fails to verify a user - no user with matching key", async function() {
            let users: MongooseUserDBM = new MongooseUserDBM();

            let verified: boolean = await users.verifyUser("key");
            expect(verified).false;

            let user = await UserSchema.findOne({email: "peter.t.walsh@stonybrook.edu"});
            verified = user !== null ? user.isVerified : true;
            expect(verified).false;
        })
    });

    describe("updatePassword", function() {

        beforeEach(async function() { 
            await UserSchema.deleteMany(); 
            await UserSchema.create({
                firstName: "Peter",
                lastName: "Walsh",
                email: "peter.t.walsh@stonybrook.edu",
                username: "PeteyLumps",
                password: await hash("DummyPassword", 10),
                verifyKey: 'something?!',
                isVerified: false,
                favoriteTileMaps: [],
                favoriteTileSets: [],
                joinedContests: [],
                joinedCommunities: [],
                friends: [],
                imageURL: " "
            })
        });

        it("Successfully updates a users password", async function() {
            let users: MongooseUserDBM = new MongooseUserDBM();

            let user = await UserSchema.findOne({email: "peter.t.walsh@stonybrook.edu"});
            let id: string = user !== null ? user._id.toString() : "";

            let pass: string | null = await users.updatePassword(id, "DummyPassword", "Blackstarthedog");
            expect(pass).not.null;

            user = await UserSchema.findOne({email: "peter.t.walsh@stonybrook.edu"});
            let pass2 = user !== null ? user.password : "DummyPassword";
            expect(pass).equals(pass2);

            let match: boolean;

            match = await compare("DummyPassword", pass2);
            expect(match).false;

            match = await compare("Blackstarthedog", pass2)
            expect(match).true;
        });

        it("Fails to update password - invalid user id", function() {

        });

        it("Fails to update password - old password does not match", function() {

        });

        it("Fails to update password - new password invalid length", function() {

        });


    });

    describe("updateEmail", function() {
        beforeEach(async function() { 
            await UserSchema.deleteMany(); 
            await UserSchema.create({
                firstName: "Peter",
                lastName: "Walsh",
                email: "Walsh9636@gmail.com",
                username: "PeteyLumps",
                password: "DummyPassword",
                verifyKey: 'something?!',
                isVerified: false,
                favoriteTileMaps: [],
                favoriteTileSets: [],
                joinedContests: [],
                joinedCommunities: [],
                friends: [],
                imageURL: " "
            });
            await UserSchema.create({
                firstName: "Peter",
                lastName: "Walsh",
                email: "peter.t.walsh@stonybrook.edu",
                username: "PeteyLumpkins",
                password: "DummyPassword",
                verifyKey: 'something?!',
                isVerified: false,
                favoriteTileMaps: [],
                favoriteTileSets: [],
                joinedContests: [],
                joinedCommunities: [],
                friends: [],
                imageURL: " "
            });
        });

        it("Successfully updates a users email", function() {

        });

        it("Fails to update email - invalid user id", function() {

        });

        it("Fails to update email - email alread exists on another account", function() {

        });
    });

    describe("updateUsername", function() {
        beforeEach(async function() { 
            await UserSchema.deleteMany(); 
            await UserSchema.create({
                firstName: "Peter",
                lastName: "Walsh",
                email: "Walsh9636@gmail.com",
                username: "PeteyLumps",
                password: "DummyPassword",
                verifyKey: 'something?!',
                isVerified: false,
                favoriteTileMaps: [],
                favoriteTileSets: [],
                joinedContests: [],
                joinedCommunities: [],
                friends: [],
                imageURL: " "
            });
            await UserSchema.create({
                firstName: "Peter",
                lastName: "Walsh",
                email: "peter.t.walsh@stonybrook.edu",
                username: "PeteyLumpkins",
                password: "DummyPassword",
                verifyKey: 'something?!',
                isVerified: false,
                favoriteTileMaps: [],
                favoriteTileSets: [],
                joinedContests: [],
                joinedCommunities: [],
                friends: [],
                imageURL: " "
            });
        });

        it("Successfully updates a users email", function() {

        });

        it("Fails to update email - invalid user id", function() {

        });

        it("Fails to update email - email alread exists on another account", function() {

        });
    });

    describe("addFriend", function() {
        beforeEach(async function() { 
            await UserSchema.deleteMany(); 
            await UserSchema.create({
                firstName: "Peter",
                lastName: "Walsh",
                email: "Walsh9636@gmail.com",
                username: "PeteyLumps",
                password: "DummyPassword",
                verifyKey: 'something?!',
                isVerified: false,
                favoriteTileMaps: [],
                favoriteTileSets: [],
                joinedContests: [],
                joinedCommunities: [],
                friends: [],
                imageURL: " "
            });
            await UserSchema.create({
                firstName: "Peter",
                lastName: "Walsh",
                email: "peter.t.walsh@stonybrook.edu",
                username: "PeteyLumpkins",
                password: "DummyPassword",
                verifyKey: 'something?!',
                isVerified: false,
                favoriteTileMaps: [],
                favoriteTileSets: [],
                joinedContests: [],
                joinedCommunities: [],
                friends: [],
                imageURL: " "
            });
        });

        it("Successfully adds a user as a friend", function() {

        });

        it("Fails to add a user as a friend - user with id doesn't exist", function() {

        });

        it("Fails to add a user as a friend - friend with id doesn't exist", function() {

        });

        it("Fails to add user as a friend - users are already friends", function() {

        });
    });

    describe("joinCommunity", function() {

        beforeEach(async function() { 
            await UserSchema.deleteMany(); 
            let user = await UserSchema.create({
                firstName: "Peter",
                lastName: "Walsh",
                email: "peter.t.walsh@stonybrook.edu",
                username: "PeteyLumpkins",
                password: "DummyPassword",
                verifyKey: 'something?!',
                isVerified: false,
                favoriteTileMaps: [],
                favoriteTileSets: [],
                joinedContests: [],
                joinedCommunities: [],
                friends: [],
                imageURL: " "
            });
            await CommunitySchema.deleteMany();
            await CommunitySchema.create({
                owner: user._id.toString(),
                name: "Peters Community",
                description: "I don't know",
                memberCount: 0,
                visibility: "private"
            });
        });

        it("Successfully joins a new community", function() {

        });

        it("Fails to join a new community - user with id doesn't exist", function() {

        })

        it("Fails to join a community - community with id doesn't exist", function() {

        });

    });

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