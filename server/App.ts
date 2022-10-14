import express, { Express } from 'express';

const app: Express = express();
const port: string = process.env.PORT || '3000';

app.listen(port, () => {
    console.log(`Server started on port ${port}...`);
});

export default app;