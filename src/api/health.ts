import express from 'express';
import { TIME } from '@/utils';

const router = express.Router();

router.get('/api/health', (_req, res) => {
    res.json({
        ok: true,
        message: `express server is healthy at ${TIME()}`,
    });
});

export default router;