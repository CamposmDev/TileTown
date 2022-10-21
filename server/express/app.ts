import express, { Express } from 'express';
import path from 'path';

import { ApiRouter } from './routers';

const app: Express = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, '/public')));

app.use("/api", ApiRouter);

export default app;