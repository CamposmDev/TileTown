import express, { Express, Request, Response } from 'express';
import path from 'path';

const app: Express = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, '/public')));

app.get("/api", (req: Request, res: Response) => {
    res.status(200).send({message: "Hello there!"});
});


export default app;