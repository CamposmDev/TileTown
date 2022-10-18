import express, { Express, Request, Response } from 'express';
import path from 'path';
import { connect } from './db';
import Test from './schemas/test';

const app: Express = express();
const port: string = process.env.PORT || '3000';

app.use(express.static(path.join(__dirname, '/public')));


app.get("/", (req: Request, res: Response) => {
    res.status(200).send({message: "Hello there!"});
});


app.listen(port, () => {
    connect();
    Test.create({"message": "Hello world!"});
    console.log(`Server started on port ${port}...`);
});



export default app;