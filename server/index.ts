import app from './express/app';
import { db } from './database/index'
import dotenv from "dotenv";

// Set up enviorment configuration
dotenv.config();

const port: string = process.env.PORT || '3000';
const mongo: string = process.env.MONGO_URI || 'mongodb+srv://Admin:BxXqBUDuPWvof95o@tiletown.bi0xq5u.mongodb.net/?retryWrites=true&w=majority'

app.listen(port, () => {
    // We'll need to pass in args here to connect to the database.
    db.connect(mongo);
    console.log(`Server started on port ${port}...`);
});