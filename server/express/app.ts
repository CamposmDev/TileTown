import express, { Express } from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import path from 'path';
import { ApiRouter } from './routers';

const app: Express = express();

app.use(express.urlencoded({ extended: true }))
app.use(cors({
    origin: ["http://localhost:3001"],
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());

app.use("/api", ApiRouter);

app.use(express.static(path.join(__dirname, '/public')));

export default app;