import express from 'express';
import multer from 'multer';
import sharp from 'sharp';
import path from 'path';
import fs from 'fs';
import { TIME_FSTRING } from '../utils';

const router = express.Router();

// store uploaded file in memory for sharp to process
const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 10 * 1024 * 1024 },
    fileFilter: (_, file, cb) => {
        const allowed = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/heic', 'image/heif'];
        cb(null, allowed.includes(file.mimetype));
    },
});

router.post('/upload', upload.single('photo'), async (req,res) => {
    console.log('attempting to upload', req.file?.originalname);
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }

    try {
        const { data: buffer, info } = await sharp(req.file.buffer)
            .rotate()
            .png({ quality: 90 })
            .toBuffer({ resolveWithObject: true });

        console.log('post-rotation dimensions:', info.width, 'x', info.height);

        const isVert = info.height > info.width;
        const subdir = isVert ? 'vert' : 'horiz';
        const GALLERY_DIR = `/data/img/gallery/${subdir}`;
        const filename = `img-${TIME_FSTRING(new Date())}.png`;
        const outputPath = path.join(GALLERY_DIR, filename);

        await fs.promises.writeFile(outputPath, buffer);
        res.json({ success: true, filename, subdir });
    } catch (err) {
        console.error('Image processing error:', err);
        res.status(500).json({ error: 'Failed to process image' });
    }
});

export default router;