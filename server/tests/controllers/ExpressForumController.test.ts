import mocha from 'mocha';
import request from 'supertest';
import { app } from '../../express';
import { db } from "../../database";
import { expect } from 'chai';
import UserSchema from "../../database/mongoose/schemas/user";
import { ForumPostSchema } from '../../database/mongoose/schemas';


/** 
 * Tests for the UserRouter and associated handlers
 * @author Peter Walsh
 */
describe('ExpressUserController', function() {

    /** Start the server on port 3000 */
    const server = app.listen('3000');

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

    after(async function() {
        /** Close the conenction to the server */
        server.close()
        await db.disconnect()
    })
});