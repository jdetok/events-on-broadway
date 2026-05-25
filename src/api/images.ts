import express from 'express';
import fs from 'fs';
import path from 'path';

const router = express.Router();

const GALLERY_BASE = '/data/img/gallery';

router.get('/img/gallery/:type', (req, res) => {
    const type = req.params.type;
    if (type !== 'vert' && type !== 'horiz') {
        res.status(400).json({ error: 'Invalid gallery type. Use "vert" or "horiz".' });
        return;
    }

    const dir = path.join(GALLERY_BASE, type);
    fs.readdir(dir, (err, files) => {
        if (err) {
            res.status(500).json({ error: `Could not read directory ${dir}` });
            return;
        }
        const images = files
            .filter(f => /\.(png|jpe?g|webp)$/i.test(f))
            .map(f => `/img/gallery/${type}/${f}`);
        res.json({ images });
    })
});

export default router;