import mongoose from 'mongoose';

const url: string = "mongodb+srv://Admin:BxXqBUDuPWvof95o@tiletown.bi0xq5u.mongodb.net/?retryWrites=true&w=majority"

async function connect() {
    mongoose.connect(url);
    const db = mongoose.connection;
    db.on("error", console.error.bind(console, "MongoDB Connection error"));
    console.log("MongoDB connected");
}

export { connect };