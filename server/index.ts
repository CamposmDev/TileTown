import app from './app';
import { db } from './database/index'

const port: string = process.env.PORT || '3000';

app.listen(port, () => {
    // We'll need to pass in args here to connect to the database.
    db.connect("mongodb+srv://Admin:BxXqBUDuPWvof95o@tiletown.bi0xq5u.mongodb.net/?retryWrites=true&w=majority");
    console.log(`Server started on port ${port}...`);
});