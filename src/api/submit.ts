import express from 'express';
import { db } from './db';
import { sendEmail } from './gmail';

const TIME_NOW = () => new Date().toLocaleString('en-US', { timeZone: 'America/Chicago' });
// const PORT = process.env.API_PORT ?? 9999;

const router = express.Router();

router.post('/booking/submit', async (req, res) => {
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

    try {
        await sendEmail(
            'jdeko17@gmail.com',
            `New Booking Request Received at ${TIME_NOW()}`,
            [
                `Request made by: ${data.name}`, `Email address: ${data.mail}`, `Estimated attendees: ${data.num}`,
                `First choice date: ${data.date1}`, `Second choice date: ${data.date2}`, `Event description: ${data.desc}`,
            ].join('\n')
        )
    } catch (err) {
        console.log('failed to send mail:', err);
    }

    res.status(201).send({
        message: msg,
        data: data,
    });
});

export default router;