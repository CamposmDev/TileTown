import { expect } from 'chai';
import mongoose from 'mongoose';
import { hash, compare } from 'bcrypt'
import mocha from 'mocha';

import { CommunitySchema, ContestSchema } from "../../database/mongoose/schemas";
import UserSchema from "../../database/mongoose/schemas/User";
import MongooseUserDBM from "../../database/mongoose/managers/MongooseUserDBM";
import User from "../../types/User";
import dotenv from "dotenv";
import UserSchemaType from "../../database/mongoose/types/UserSchemaType";

/** Config the env variables */
dotenv.config();

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
            });
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

        it("Success - User email exists and associated password matches", async function() {
            let users: MongooseUserDBM = new MongooseUserDBM();
            let user: User | null = await users.loginUser("peter.t.walsh@stonybrook.edu", "DummyPassword");
            expect(user).not.null;
        });

        it("Failure - user email does not exist", async function() {
            let users: MongooseUserDBM = new MongooseUserDBM();
            let user: User | null = await users.loginUser("peter.t.walsh@gmail.com", "DummyPassword");
            expect(user).null;
        });

        it("Failure - user password does not match", async function() {
            let users: MongooseUserDBM = new MongooseUserDBM();
            let user: User | null = await users.loginUser("peter.t.walsh@stonybrook.edu", "blackstarthedog");
            expect(user).null;
        });

    });

    describe("createUser", function() {

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
            let users: MongooseUserDBM = new MongooseUserDBM();
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

        it("Successfully updates a users email", async function() {
            let users: MongooseUserDBM = new MongooseUserDBM();
            let user = await UserSchema.findOne({email: "peter.t.walsh@stonybrook.edu"});
            let id: string = user !== null ? user._id.toString() : "";

            let email: string | null = await users.updateEmail(id, "peter.t.walsh@gmail.com");
            expect(email).equals("peter.t.walsh@gmail.com");

            user = await UserSchema.findOne({email: "peter.t.walsh@gmail.com"});
            email = user !== null ? user.email : "";
            expect(email).equals("peter.t.walsh@gmail.com");
        });

        it("Fails to update email - invalid user id", async function() {
            let users: MongooseUserDBM = new MongooseUserDBM();
            let user = await UserSchema.findOne({email: "peter.t.walsh@stonybrook.edu"});
            let id: string = user !== null ? user._id.toString() : "";

            let email: string | null = await users.updateEmail(id + "123", "peter.t.walsh@gmail.com");
            expect(email).null;

            user = await UserSchema.findOne({email: "peter.t.walsh@stonybrook.edu"});
            email = user !== null ? user.email : "";
            expect(email).equals("peter.t.walsh@stonybrook.edu");
        });

        it("Fails to update email - email already exists on another account", async function() {
            let users: MongooseUserDBM = new MongooseUserDBM();
            let user = await UserSchema.findOne({email: "peter.t.walsh@stonybrook.edu"});
            let id: string = user !== null ? user._id.toString() : "";

            let email: string | null = await users.updateEmail(id, "Walsh9636@gmail.com");
            expect(email).null;

            user = await UserSchema.findOne({email: "peter.t.walsh@stonybrook.edu"});
            email = user !== null ? user.email : "";
            expect(email).equals("peter.t.walsh@stonybrook.edu");
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

        it("Successfully updates a users username", async function() {
            let users: MongooseUserDBM = new MongooseUserDBM();
            let user = await UserSchema.findOne({email: "peter.t.walsh@stonybrook.edu"});
            let id: string = user !== null ? user._id.toString() : "";

            let username: string | null = await users.updateUsername(id, "VertebralOrb932");
            expect(username).equals("VertebralOrb932");

            user = await UserSchema.findOne({email: "peter.t.walsh@stonybrook.edu"});
            username = user !== null ? user.username : "";
            expect(username).equals("VertebralOrb932");
        });

        it("Fails to update username - invalid user id", async function() {
            let users: MongooseUserDBM = new MongooseUserDBM();
            let user = await UserSchema.findOne({email: "peter.t.walsh@stonybrook.edu"});
            let id: string = user !== null ? user._id.toString() : "";

            let username: string | null = await users.updateUsername(id + "123", "VertebralOrb932");
            expect(username).null;

            user = await UserSchema.findOne({email: "peter.t.walsh@stonybrook.edu"});
            username = user !== null ? user.username : "";
            expect(username).equals("PeteyLumpkins");
        });

        it("Fails to update username - username already exists on another account", async function() {
            let users: MongooseUserDBM = new MongooseUserDBM();
            let user = await UserSchema.findOne({email: "peter.t.walsh@stonybrook.edu"});
            let id: string = user !== null ? user._id.toString() : "";

            let username: string | null = await users.updateUsername(id + "123", "PeteyLumps");
            expect(username).null;

            user = await UserSchema.findOne({email: "peter.t.walsh@stonybrook.edu"});
            username = user !== null ? user.username : "";
            expect(username).equals("PeteyLumpkins");
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

        it("Successfully adds a user as a friend", async function() {
            let users: MongooseUserDBM = new MongooseUserDBM();

            let user = await UserSchema.findOne({email: "peter.t.walsh@stonybrook.edu"});
            let friend = await UserSchema.findOne({email: "Walsh9636@gmail.com"});

            let userId: string = user !== null ? user.id : "";
            let friendId: string = friend !== null ? friend.id : "";

            let res: string | null = await users.addFriend(userId, friendId);
            expect(res).equals(friendId, "Return value should be friend id");

            user = await UserSchema.findOne({email: "peter.t.walsh@stonybrook.edu"});
            friend = await UserSchema.findOne({email: "Walsh9636@gmail.com"});

            let userFriends = user !== null ? user.friends : [];
            let friendsFriends = friend !== null ? friend.friends : [];

            expect(userFriends).length(1, "User should have 1 friend");
            expect(friendsFriends).length(0, "Users friend should have 0 friends");
        });

        it("Fails to add a user as a friend - user with id doesn't exist", async function() {
            let users: MongooseUserDBM = new MongooseUserDBM();

            let user = await UserSchema.findOne({email: "peter.t.walsh@stonybrook.edu"});
            let friend = await UserSchema.findOne({email: "Walsh9636@gmail.com"});

            let userId: string = user !== null ? user.id : "";
            let friendId: string = friend !== null ? friend.id : "";

            let res: string | null = await users.addFriend(userId + "123", friendId);
            expect(res).null;

            user = await UserSchema.findOne({email: "peter.t.walsh@stonybrook.edu"});
            friend = await UserSchema.findOne({email: "Walsh9636@gmail.com"});

            let userFriends = user !== null ? user.friends : [];
            let friendsFriends = friend !== null ? friend.friends : [];

            expect(userFriends).length(0, "User should have 0 friends");
            expect(friendsFriends).length(0, "Users friend should have 0 friends");
        });

        it("Fails to add a user as a friend - friend with id doesn't exist", async function() {
            let users: MongooseUserDBM = new MongooseUserDBM();

            let user = await UserSchema.findOne({email: "peter.t.walsh@stonybrook.edu"});
            let friend = await UserSchema.findOne({email: "Walsh9636@gmail.com"});

            let userId: string = user !== null ? user.id : "";
            let friendId: string = friend !== null ? friend.id : "";

            let res: string | null = await users.addFriend(userId, friendId + "123");
            expect(res).null;

            user = await UserSchema.findOne({email: "peter.t.walsh@stonybrook.edu"});
            friend = await UserSchema.findOne({email: "Walsh9636@gmail.com"});

            let userFriends = user !== null ? user.friends : [];
            let friendsFriends = friend !== null ? friend.friends : [];

            expect(userFriends).length(0, "User should have 0 friends");
            expect(friendsFriends).length(0, "Users friend should have 0 friends");
        });

        it("Fails to add user as a friend - users are already friends", async function() {
            let users: MongooseUserDBM = new MongooseUserDBM();

            let user = await UserSchema.findOne({email: "peter.t.walsh@stonybrook.edu"});
            let friend = await UserSchema.findOne({email: "Walsh9636@gmail.com"});

            let userId: string = user !== null ? user.id : "";
            let friendId: string = friend !== null ? friend.id : "";

            let res: string | null;
            res = await users.addFriend(userId, friendId);
            expect(res).equals(friendId, "Return value should be friend id");

            res = await users.addFriend(userId, friendId);
            expect(res).null;

            user = await UserSchema.findOne({email: "peter.t.walsh@stonybrook.edu"});
            friend = await UserSchema.findOne({email: "Walsh9636@gmail.com"});

            let userFriends = user !== null ? user.friends : [];
            let friendsFriends = friend !== null ? friend.friends : [];

            expect(userFriends).length(1, "User should have 1 friend");
            expect(friendsFriends).length(0, "Users friend should have 0 friends");
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
            await CommunitySchema.deleteMany();
            await CommunitySchema.create({
                owner: user._id.toString(),
                name: "Peters Community",
                description: "I don't know",
                memberCounter: 0,
                visibility: "private"
            });
        });

        it("Successfully joins a new community", async function() {
            let users: MongooseUserDBM = new MongooseUserDBM();

            let comm = await CommunitySchema.findOne({"name": "Peters Community"});
            let cid = comm !== null ? comm._id.toString() : "";
            expect(cid).not.equals("");

            let user = await UserSchema.findOne({email: "Walsh9636@gmail.com"});
            let uid = user !== null ? user._id.toString() : "";
            expect(uid).not.equals("");

            let c = await users.joinCommunity(uid, cid);
            expect(c).not.null;

        });

        it("Fails to join a new community - user with id doesn't exist", async function() {
            let users: MongooseUserDBM = new MongooseUserDBM();

            let comm = await CommunitySchema.findOne({"name": "Peters Community"});
            let cid = comm !== null ? comm._id.toString() : "";
            expect(cid).not.equals("");

            let user = await UserSchema.findOne({email: "Walsh9636@gmail.com"});
            let uid = user !== null ? user._id.toString() : "";
            expect(uid).not.equals("");

            let c = await users.joinCommunity(uid + "1", cid);
            expect(c).null;
        })

        it("Fails to join a community - community with id doesn't exist", async function() {
            let users: MongooseUserDBM = new MongooseUserDBM();

            let comm = await CommunitySchema.findOne({"name": "Peters Community"});
            let cid = comm !== null ? comm._id.toString() : "";
            expect(cid).not.equals("");

            let user = await UserSchema.findOne({email: "Walsh9636@gmail.com"});
            let uid = user !== null ? user._id.toString() : "";
            expect(uid).not.equals("");

            let c = await users.joinCommunity(uid, cid + "1");
            expect(c).null;
        });

        it("Fails to join community - user is community owner", async function() {
            let users: MongooseUserDBM = new MongooseUserDBM();

            let comm = await CommunitySchema.findOne({"name": "Peters Community"});
            let cid = comm !== null ? comm._id.toString() : "";
            expect(cid).not.equals("");

            let user = await UserSchema.findOne({email: "peter.t.walsh@stonybrook.edu"});
            let uid = user !== null ? user._id.toString() : "";
            expect(uid).not.equals("");

            let c = await users.joinCommunity(uid, cid);
            expect(c).null;
        });

    });

    describe("leaveCommunity", function() {

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
            let comm = await CommunitySchema.create({
                owner: user._id.toString(),
                name: "Peters Community",
                description: "I don't know",
                memberCounter: 2,
                visibility: "private"
            });
            user.joinedContests.push(comm._id)
            await user.save();
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
                joinedCommunities: [comm._id.toString()],
                friends: [],
                imageURL: " "
            });
            await UserSchema.create({
                firstName: "Peter",
                lastName: "Walsh",
                email: "peteylumpkins@gmail.com",
                username: "PeteyLumpskins2",
                password: "DummyPassword",
                verifyKey: 'something?!',
                isVerified: false,
                favoriteTileMaps: [],
                favoriteTileSets: [],
                joinedContests: [],
                joinedCommunities: [comm._id.toString()],
                friends: [],
                imageURL: " "
            });
        });

        it("Success - user successfully leaves a community", async function() {
            let users: MongooseUserDBM = new MongooseUserDBM();

            let comm = await CommunitySchema.findOne({"name": "Peters Community"});
            let cid = comm !== null ? comm._id.toString() : "";
            let members = comm !== null ? comm.memberCounter : -1;
            expect(cid).not.equals("");

            let user = await UserSchema.findOne({email: "Walsh9636@gmail.com"});
            let uid = user !== null ? user._id.toString() : "";
            expect(uid).not.equals("");

            let left = await users.leaveCommunity(uid, cid);
            expect(left).true;

            comm = await CommunitySchema.findOne({"name": "Peters Community"});
            let newMembers = comm !== null ? comm.memberCounter : "";
            expect(members - 1).equals(newMembers);

            user = await UserSchema.findOne({email: "Walsh9636@gmail.com"});
            let newCommunities = user !== null ? user.joinedCommunities : [];
            expect(newCommunities.map(id => id.toString()).includes(cid)).false;
        })

        it("Failure - user is not a community member", async function() {
            let users: MongooseUserDBM = new MongooseUserDBM();

            let comm = await CommunitySchema.findOne({"name": "Peters Community"});
            let cid = comm !== null ? comm._id.toString() : "";
            let members = comm !== null ? comm.memberCounter : -1;
            expect(cid).not.equals("");

            let user = await UserSchema.findOne({email: "peteylumpkins@gmail.com"});
            let uid = user !== null ? user._id.toString() : "";
            expect(uid).not.equals("");

            let left = await users.leaveCommunity(uid, cid);
            expect(left).false;

            comm = await CommunitySchema.findOne({"name": "Peters Community"});
            let newMembers = comm !== null ? comm.memberCounter : "";
            expect(members).equals(newMembers);

            user = await UserSchema.findOne({email: "peteylumpkins@gmail.com"});
            let newCommunities = user !== null ? user.joinedCommunities : [];
            expect(newCommunities.map(id => id.toString()).includes(cid)).false;
        })

        it("Failure - user is community owner", async function() {
            let users: MongooseUserDBM = new MongooseUserDBM();

            let comm = await CommunitySchema.findOne({"name": "Peters Community"});
            let cid = comm !== null ? comm._id.toString() : "";
            let members = comm !== null ? comm.memberCounter : -1;
            expect(cid).not.equals("");

            let user = await UserSchema.findOne({email: "peter.t.walsh@stonybrook.edu"});
            let uid = user !== null ? user._id.toString() : "";
            expect(uid).not.equals("");

            let left = await users.leaveCommunity(uid, cid);
            expect(left).false;

            comm = await CommunitySchema.findOne({"name": "Peters Community"});
            let newMembers = comm !== null ? comm.memberCounter : "";
            expect(members).equals(newMembers);

            user = await UserSchema.findOne({email: "peter.t.walsh@stonybrook.edu"});
            let newCommunities = user !== null ? user.joinedCommunities : [];
            expect(newCommunities.map(id => id.toString()).includes(cid)).true;
        })

    });

    describe("joinContest", function() {

        beforeEach(async function() { 

        })

        it("Success - user successfully joins a contest", async function() {

        });

        it("Failure - user is the contest owner", async function() {

        });

        it("Failure - user is already in the contest", async function() {

        });

        it("Failure - user id is not a valid id", async function() {

        });

        it("Failure - contest id is not a valid id", async function() {

        });

    });

    describe("leaveContest", function() {

        it("Success - user successfully leaves a contest", async function() {

        });

        it("Failure - user is the contest owner", async function() {

        });

        it("Failure - user is not in the contest", async function() {

        });

        it("Failure - user id is not a valid id", async function() {

        });

        it("Failure - contest id is not a valid id", async function() {

        });
    });

    describe("favoriteTilemap", function() {

        it("Success - user successfully favorites a tilemap", async function() {

        });

        it("Failure - user has already favorited a tilemap", async function() {

        });

        it("Failure - user id is not a valid id", async function() {

        });

        it("Failure - tilemap id is not a valid id", async function() {

        });

    });

    describe("unfavoriteTilemap", function() {

        it("Success - user successfully unfavorites a tilemap", async function() {

        });

        it("Failure - user had not favorited the tilemap", async function() {

        });

        it("Failure - user id is not a valid id", async function() {

        });

        it("Failure - tilemap id is not a valid id", async function() {

        });

    });

    describe("favoriteTileset", function() {});

    describe("unfavoriteTileset", function() {});

    /** 
     * The before method gets called after all of the tests have run. I am using it here
     * to close the connection to MongoDB.
     * {@link https://mochajs.org/#hooks}
     */
    after(async function() { await mongoose.connection.close(); });

});