import app from './express/app';
import { db } from './database/index'
import dotenv from "dotenv";
import path from 'path';
import express from 'express';

// Set up enviorment configuration
dotenv.config();
const port: string = process.env.PORT || '3000';
const mongo: string = process.env.MONGO_URI || 'mongodb+srv://Admin:BxXqBUDuPWvof95o@tiletown.bi0xq5u.mongodb.net/?retryWrites=true&w=majority'

// This serves the client application from "localhost:3000" - all the backend routes are at "localhost:3000/api"
app.use(express.static(path.join(__dirname, 'client')));
app.use((req, res, next) => {
    return res.redirect("/");
});

// Connect to the database and start the express server
app.listen(port, () => {
    // We'll need to pass in args here to connect to the database.
    db.connect(mongo);
    console.log(`Server started on port ${port}...`);
    console.log(process.env);
});