import express from 'express';
import type { bookingFormFields } from '@/types';

const TIME_NOW = () => new Date().toLocaleTimeString('en-US', { timeZone: 'America/Chicago' });

const app = express();
const PORT = process.env.API_PORT ?? 9999;

app.use(express.json());

app.get('/api/health', (_req, res) => {
    res.json({
        ok: true,
        message: `express server is healthy at ${TIME_NOW()}`,
    });
});

app.post('/api/booking/submit', (req, res) => {
    const data = req.body;
    const msg = `Received data from form at ${TIME_NOW()}:`;
    console.log(msg, data);

    // build error handling around this
    const dataTyped = data as bookingFormFields;

    res.status(201).send({
        message: msg,
        data: dataTyped,
    });
});

app.listen(PORT, () => {
    console.log(`API listening on port ${PORT}`);
});