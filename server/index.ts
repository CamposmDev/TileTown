#!/usr/bin/env node

import app from './express/app';
import { db } from './database/index'
import dotenv from "dotenv";
import path from 'path';
import express from 'express';

// Set up enviorment configuration
dotenv.config();
const port: string = process.env.PORT || '3000';
const mongo: string = process.env.MONGO_URI || 'mongodb+srv://Admin:BxXqBUDuPWvof95o@tiletown.bi0xq5u.mongodb.net/?retryWrites=true&w=majority'

// This serves the client application from the base URL - all the backend routes are at "/api"
app.use(express.static(path.join(__dirname, 'client')));
app.get("/*", (req, res) => {
    return res.sendFile(path.join(__dirname, 'client/index.html'));
});

// Connect to the database and start the express server
app.listen(port, () => {
    // We'll need to pass in args here to connect to the database.
    db.connect(mongo);
    console.log(`Server started on port ${port}...`);
});

