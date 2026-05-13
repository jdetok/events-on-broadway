import express from 'express';
import type { bookingFormFields } from '@/types';
import { db } from './db';

const TIME_NOW = () => new Date().toLocaleString('en-US', { timeZone: 'America/Chicago' });

const app = express();
const PORT = process.env.API_PORT ?? 9999;

app.use(express.json());

app.get('/api/health', (_req, res) => {
    res.json({
        ok: true,
        message: `express server is healthy at ${TIME_NOW()}`,
    });
});

app.post('/api/booking/submit', async (req, res) => {
    const data = req.body;
    const msg = `Received data from form at ${TIME_NOW()}:`;
    console.log(msg, data);

    try {
        const insertRes = await db.collection('bookingRequest').insertOne(data);
        console.log('inserted bookingRequest form:', insertRes.insertedId);

    } catch (err) {
        res.status(500).send({
            message: `${msg}\n + failed to insert into database: ${err}`,
            data: data,
        });    
        console.error(err);
    }

    res.status(201).send({
        message: msg,
        data: data,
    });
});

app.listen(PORT, () => {
    console.log(`API listening on port ${PORT}`);
});