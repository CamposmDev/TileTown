import mocha from 'mocha';
import request from 'supertest';
import { app } from '../../express';
import { db } from "../../database";
import { expect } from 'chai';
import { UserSchema } from "../../database/mongoose/schemas";
import { ForumPostSchema } from '../../database/mongoose/schemas';
import { UserSchemaType } from '../../database/mongoose/types';


/** 
 * Tests for the UserRouter and associated handlers
 * @author Peter Walsh
 */
describe('ExpressUserController', function() {

    /** Start the server on port 3000 */
    const server = app.listen('3001');

    before(async function() {
        const connect: string = process.env.MONGO_URI || "mongodb+srv://Admin:BxXqBUDuPWvof95o@tiletown.bi0xq5u.mongodb.net/?retryWrites=true&w=majority";
        await db.connect(connect)
    });

    /**
     * Method: POST
     * Route: api/forum
     */
    describe('createForumPost', function() {
        this.beforeEach(async function() {
            await ForumPostSchema.deleteMany()
        })

        it('Successfully created forum post and returned new forum post', async function() {
            let res = await request(app).post('/api/forum/').send({
                author: 'Camposm',
                title: 'How do i comuter',
                body: 'computer*',
                tags: [],
                likes: [],
                dislikes: [],
                views: 0,
                isPublished: true
            })
            expect(res.status).equals(201)
        })
    })

    describe('getForumPost', function() {
        let forumPostId: string
        this.beforeEach(async function() {
            await ForumPostSchema.deleteMany()
            await ForumPostSchema.create({
                author: 'Camposm',
                title: 'How do i comuter',
                body: 'computer*',
                tags: [],
                likes: [],
                dislikes: [],
                views: 0,
                isPublished: true
            })
            let forumPost = await ForumPostSchema.findOne({title: 'How do i comuter'})
            forumPostId = forumPost !== null ? forumPost._id.toString() : ''
        })

        it('Successfully retrieved forum post by id', async function() {
            let res = await request(app).get('/api/forum/' + forumPostId).send()
            expect(res.status).equal(200)
        })
    })

    describe('updateForumPost', function() {
        let forumPostId: string
        beforeEach(async function() {
            await ForumPostSchema.deleteMany()
            await ForumPostSchema.create({
                author: 'Camposm',
                title: 'How do i comuter',
                body: 'computer*',
                tags: [],
                likes: [],
                dislikes: [],
                views: 0,
                isPublished: false
            })
            let forumPost = await ForumPostSchema.findOne({author: 'Camposm'})
            forumPostId = forumPost !== null ? forumPost._id.toString() : ''
        })

        it('Successfully updated forum post by id', async function() {
            let payload = {
                author: 'Mickey',
                title: 'How does one computer?',
                body: "I don't understand it",
                tags: ['pc'],
                isPublished: true
            }
            let res = await request(app).put('/api/forum/' + forumPostId).send(payload)
            expect(res.status).equal(200)
        })
    })

    describe('likeForumPostById', function() {
        let userId: string
        let forumPostId: string
        this.beforeEach(async function() {
            await ForumPostSchema.deleteMany()
            await ForumPostSchema.create({
                author: 'Camposm',
                title: 'How do i comuter',
                body: 'computer*',
                tags: [],
                likes: [],
                dislikes: [],
                views: 0,
                isPublished: false
            })
            await UserSchema.deleteMany()
            await UserSchema.create({
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
            let forumPost = await ForumPostSchema.findOne({title: 'How do i comuter'})
            let user = await UserSchema.findOne({username: 'Camposm'})
            userId = user !== null ? user._id.toString() : ''
            forumPostId = forumPost !== null ? forumPost._id.toString() : ''
        })

        it('Successfully liked forum post', async function() {
            let res = await request(app).put('/api/forum/like/' + forumPostId).send({
                userId: userId
            })
            expect(res.status).equals(200)
        })

        it('Successfully unliked forum post', async function() {
            let res = await request(app).put('/api/forum/like/' + forumPostId).send({
                userId: userId
            })
            expect(res.status).equals(200)
        })

        
    })

    describe('dislikeForumPost', function() {
        let userId: string
        let forumPostId: string
        this.beforeEach(async function() {
            await ForumPostSchema.deleteMany()
            await ForumPostSchema.create({
                author: 'Camposm',
                title: 'How do i comuter',
                body: 'computer*',
                tags: [],
                likes: [],
                dislikes: [],
                views: 0,
                isPublished: false
            })
            await UserSchema.deleteMany()
            await UserSchema.create({
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
            let forumPost = await ForumPostSchema.findOne({title: 'How do i comuter'})
            let user = await UserSchema.findOne({username: 'Camposm'})
            userId = user !== null ? user._id.toString() : ''
            forumPostId = forumPost !== null ? forumPost._id.toString() : ''
        })

        it('Successfully disliked forum post', async function() {
            let res = await request(app).put('/api/forum/dislike/' + forumPostId).send({
                userId: userId
            })
            expect(res.status).equals(200)
        })

        it('Successfully undisliked forum post', async function() {
            let res = await request(app).put('/api/forum/dislike/' + forumPostId).send({
                userId: userId
            })
            expect(res.status).equals(200)
        })
    })

    describe("commentForumPostById", function() {
        let userId: string
        let forumPostId: string
        let forumPost
        let user
        this.beforeEach(async function() {
            await UserSchema.deleteMany()
            await ForumPostSchema.deleteMany()
            await UserSchema.create({
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
            await ForumPostSchema.create({
                author: "Camposm",
                title: "Clean Tilesets",
                body: "Clean tilesets use gradients",
                tags: ['clean', 'tilesets', 'design'],
                likes: [],
                dislikes: [],
                views: 0,
                isPublished: true
            })
            user = await UserSchema.findOne({username: 'Camposm'})
            userId = user !== null ? user._id.toString() : ''
            forumPost = await ForumPostSchema.findOne({title: 'Clean Tilesets'})
            forumPostId = forumPost !== null ? forumPost._id.toString() : ''
        })

        it('Successfully commented on a forum post', async function() {
            let res = await request(app).put('/api/forum/comment/' + forumPostId).send({
                author: userId,
                body: 'First',
                referenceId: forumPostId
            })
            expect(res.status).equals(200)
        })
    })

    after(async function() {
        /** Close the conenction to the server */
        server.close()
        await db.disconnect()
    })
});