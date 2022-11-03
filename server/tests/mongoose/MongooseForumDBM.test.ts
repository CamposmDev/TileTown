import mocha from 'mocha';
import { expect } from 'chai';
import mongoose from 'mongoose';

import { UserModel, ForumPostModel } from '../../database/mongoose/schemas';
import MongooseUserDBM from "../../database/mongoose/managers/MongooseUserDBM";
import { User }  from "@types";
import dotenv from "dotenv";
import { MongooseForumDBM } from '../../database/mongoose/managers';
import { ForumPost } from '@types';

/** Config the env variables */
dotenv.config()

/** 
 * Tests for MongooseForumDBM
 * @author Michael Campos
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
        beforeEach(async function() { await ForumPostModel.deleteMany() })
        it('It should create and return a new forum post', async function() {
            let forums: MongooseForumDBM = new MongooseForumDBM()

            let partial = {
                "author": new mongoose.Types.ObjectId().toString(),
                "title": "How to play MC",
                "body": "How much dedicated RAM do I need for mc",
                "tags": ["mc", "servers"],
                "isPublished": true
            }
            let forumPost: ForumPost | null = await forums.createForumPost(partial)
            expect(forumPost).not.null
            // expect(forumPost).property("author", "Camposm")
            expect(forumPost).property("title", "How to play MC")
            expect(forumPost).property("body", "How much dedicated RAM do I need for mc")
            expect(forumPost).property("tags").eql(["mc", "servers"])
            expect(forumPost).property("isPublished", true)
            
            if (forumPost !== null) {
                let res = await ForumPostModel.findById(forumPost.id)
                expect(res).not.null;
            }
        })
    })

    /**
     * A set of tests fo rthe method MongooseForumDBM.getForumPost()
     * @see MongooseForumDBM.createForumPost
     */
    describe("MongooseForumDBM.getForumPost", function() {
        beforeEach(async function() {
            await ForumPostModel.deleteMany()
            await ForumPostModel.create({
                author: new mongoose.Types.ObjectId().toString(),
                title: "Clean Tilemaps",
                body: "Clean tilemaps use gradients",
                tags: ['clean', 'tilemaps', 'design'],
                likes: [],
                dislikes: [],
                views: 0,
                isPublished: true
            })
        })

        it('Successfully finds a forum post by id', async function() {
            let forums: MongooseForumDBM = new MongooseForumDBM()
            let schema = await ForumPostModel.findOne({title: 'Clean Tilemaps'})
            let id: string = schema !== null ? schema._id.toString() : ''
            let forumPost: ForumPost | null = await forums.getForumPost(id)
            expect(forumPost).not.null
            // expect(forumPost).property('author').eql();
            expect(forumPost).property('title').eql('Clean Tilemaps')
            expect(forumPost).property('body').eql('Clean tilemaps use gradients')
            expect(forumPost).property('tags').eql(['clean', 'tilemaps', 'design'])
            expect(forumPost).property('likes').eql([])
            expect(forumPost).property('dislikes').eql([])
            expect(forumPost).property('views').eql(0)
            expect(forumPost).property('isPublished').eql(true)
        })
    });

    /**
     * A set of tests fo rthe method MongooseForumDBM.updateForumPost()
     * @see MongooseForumDBM.updateForumPost
     */
    describe("MongooseForumDBM.updateForumPost", function() {
        beforeEach(async function() {
            await ForumPostModel.deleteMany()
            await ForumPostModel.create({
                author: new mongoose.Types.ObjectId().toString(),
                title: "Clean Tilesets",
                body: "Clean tilesets use gradients",
                tags: ['clean', 'tilesets', 'design'],
                likes: [],
                dislikes: [],
                views: 0,
                isPublished: true
            })
        })

        it('Successfully updates a forum post by id', async function() {
            let forums: MongooseForumDBM = new MongooseForumDBM()
            let schema = await ForumPostModel.findOne({title: 'Clean Tilesets'})
            let id: string = schema !== null ? schema._id.toString() : ''
            let forumPost: ForumPost | null = await forums.getForumPost(id)
            if (forumPost !== null) {
                forumPost.body = 'Tilesets can be well designed using color theory'
                let returnValue = await forums.updateForumPost(forumPost.id, forumPost)
                expect(returnValue).not.null
                expect(returnValue).property('body').eql('Tilesets can be well designed using color theory')
            }
        })
    })

    /**
     * A set of tests fo rthe method MongooseForumDBM.toggleLike()
     * @see MongooseForumDBM.toggleLike
     */
    describe("MongooseForumDBM.toggleLike", function() {
        beforeEach(async function() {
            await UserModel.deleteMany()
            await ForumPostModel.deleteMany()
            await UserModel.create({
                firstName: 'Michael',
                lastName: 'Campos',
                username: 'Camposm',
                email: 'michael.campos@stonybrook.edu',
                password: 'helloworld',
                favoriteTileMaps: [],
                favoriteTileSets: [],
                joinedContests: [],
                joinedCommunities: [],
                friends: [],
                isVerified: false,
                verifyKey: 'string',
                imageURL: 'https://google.com'
            })
            await ForumPostModel.create({
                author: new mongoose.Types.ObjectId().toString(),
                title: "Clean Tilesets",
                body: "Clean tilesets use gradients",
                tags: ['clean', 'tilesets', 'design'],
                likes: [],
                dislikes: [],
                views: 0,
                isPublished: true
            })
        })

        // it('Successfully toggled like for a forum post', async function() {
        //     let user = await UserModel.findOne({username: 'Camposm'})
        //     let userId = user !== null ? user._id.toString() : ''

        //     let forums: MongooseForumDBM = new MongooseForumDBM()
        //     let forumPost = await ForumPostModel.findOne({title: 'Clean Tilesets'})
        //     let forumId = forumPost !== null ? forumPost._id.toString() : ''

        //     if (user !== null && forumId !== null) {
        //         let result = await forums.toggleLike(userId, forumId)
        //         expect(result).not.null
        //         if (result !== null) {
        //             let forumPostAfterLike = await forums.getForumPost(result.id)
        //             expect(forumPostAfterLike).not.null
        //             if (forumPostAfterLike !== null) {
        //                 expect(forumPostAfterLike).property('likes').eql([user._id])
        //             }
        //         }

        //         result = await forums.toggleLike(userId, forumId)
        //         expect(result).not.null
        //         if (result !== null) {
        //             let forumPostAfterLike = await forums.getForumPost(result.id)
        //             expect(forumPostAfterLike).not.null
        //             if (forumPostAfterLike !== null) [
        //                 expect(forumPostAfterLike).property('likes').eql([])
        //             ]
        //         }
        //     }            
        // })
    })

    /**
     * A set of tests fo rthe method MongooseForumDBM.toggleDislike()
     * @see MongooseForumDBM.toggleDislike
     */
    describe("MongooseForumDBM.toggleDislike", function() {
        beforeEach(async function() {
            await UserModel.deleteMany()
            await ForumPostModel.deleteMany()
            await UserModel.create({
                firstName: 'Michael',
                lastName: 'Campos',
                username: 'Camposm',
                email: 'michael.campos@stonybrook.edu',
                password: 'helloworld',
                favoriteTileMaps: [],
                favoriteTileSets: [],
                joinedContests: [],
                joinedCommunities: [],
                friends: [],
                isVerified: false,
                verifyKey: 'string',
                imageURL: 'https://google.com'
            })
            await ForumPostModel.create({
                author: new mongoose.Types.ObjectId().toString(),
                title: "Clean Tilesets",
                body: "Clean tilesets use gradients",
                tags: ['clean', 'tilesets', 'design'],
                likes: [],
                dislikes: [],
                views: 0,
                isPublished: true
            })
        })

        // it('Successfully toggled like for a forum post', async function() {
        //     let user = await UserModel.findOne({username: 'Camposm'})
        //     let userId = user !== null ? user._id.toString() : ''

        //     let forums: MongooseForumDBM = new MongooseForumDBM()
        //     let forumPost = await ForumPostModel.findOne({title: 'Clean Tilesets'})
        //     let forumId = forumPost !== null ? forumPost._id.toString() : ''

        //     if (user !== null && forumId !== null) {
        //         let result = await forums.toggleDislike(userId, forumId)
        //         expect(result).not.null
        //         if (result !== null) {
        //             let forumPostAfterLike = await forums.getForumPost(result.id)
        //             expect(forumPostAfterLike).not.null
        //             if (forumPostAfterLike !== null) {
        //                 expect(forumPostAfterLike).property('dislikes').eql([user._id])
        //             }
        //         }

        //         result = await forums.toggleDislike(userId, forumId)
        //         expect(result).not.null
        //         if (result !== null) {
        //             let forumPostAfterLike = await forums.getForumPost(result.id)
        //             expect(forumPostAfterLike).not.null
        //             if (forumPostAfterLike !== null) [
        //                 expect(forumPostAfterLike).property('dislikes').eql([])
        //             ]
        //         }
        //     }            
        // })
    })

    /**
     * A set of tests fo rthe method MongooseForumDBM.addView()
     * @see MongooseForumDBM.addView
     */
    describe("MongooseForumDBM,addView", function() {
        beforeEach(async function() {
            await UserModel.deleteMany()
            await ForumPostModel.deleteMany()
            await UserModel.create({
                firstName: 'Michael',
                lastName: 'Campos',
                username: 'Camposm',
                email: 'michael.campos@stonybrook.edu',
                password: 'helloworld',
                favoriteTileMaps: [],
                favoriteTileSets: [],
                joinedContests: [],
                joinedCommunities: [],
                friends: [],
                isVerified: false,
                verifyKey: 'string',
                imageURL: 'https://google.com'
            })
            await ForumPostModel.create({
                author: new mongoose.Types.ObjectId().toString(),
                title: "Clean Tilesets",
                body: "Clean tilesets use gradients",
                tags: ['clean', 'tilesets', 'design'],
                likes: [],
                dislikes: [],
                views: 0,
                isPublished: true
            })
        })
        // it('Successfully finds a forum post by id', async function() {
        //     let user = await UserModel.findOne({username: 'Camposm'})
        //     let userId = user !== null ? user._id.toString() : ''

        //     let forums: MongooseForumDBM = new MongooseForumDBM()
        //     let forumPost = await ForumPostModel.findOne({title: 'Clean Tilesets'})
        //     let forumId = forumPost !== null ? forumPost._id.toString() : ''

        //     if (userId !== null && forumId !== null) {
        //         let forumPost: ForumPost | null = await forums.addView(userId, forumId)
        //         expect(forumPost).not.null
        //         expect(forumPost).property('views').eql(1)
        //     }
        // })
    })

    /** 
     * The before method gets called after all of the tests have run. I am using it here
     * to close the connection to MongoDB.
     * {@link https://mochajs.org/#hooks}
     */
    after(async function() { await mongoose.connection.close(); })
})