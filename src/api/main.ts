import express from 'express';

const app = express();
const PORT = process.env.API_PORT ?? 9999;

app.use(express.json());

app.get('/api/health', (_req, res) => {
    const dt = new Date().toLocaleTimeString('en-US', { timeZone: 'America/Chicago' });
    res.json({
        ok: true,
        message: `express server is healthy at ${dt}`,
    });
});

app.listen(PORT, () => {
    console.log(`API listening on port ${PORT}`);
});