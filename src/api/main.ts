import express from 'express';
import healthRouter from './health';
import submitRouter from './submit';
import uploadRouter from './upload';

const ROUTERS = [healthRouter, submitRouter, uploadRouter];
const PORT = process.env.API_PORT ?? 9999;

// register main express instance and use json middleware
const app = express();
app.use(express.json());

// register each router
ROUTERS.forEach((r) => {
    app.use('api', r);
});

// listen for requests
app.listen(PORT, () => console.log(`API listening on port ${PORT}`));