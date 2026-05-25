import express from 'express';
import multer from 'multer';
import sharp from 'sharp';
import path from 'path';
import { fileURLToPath } from 'url';
import { TIME_FSTRING } from '../utils';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
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

const GALLERY_DIR = path.resolve(__dirname, '../../../data/img/upload');
console.log('image upload directory:', GALLERY_DIR);

router.post('/upload', upload.single('photo'), async (req,res) => {
    console.log('attempting to upload', req.file?.originalname);
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }

    try {
        const filename = `img-${TIME_FSTRING(new Date())}.png`;
        const outputPath = path.join(GALLERY_DIR, filename);
        await sharp(req.file.buffer).png({ quality: 90 }).toFile(outputPath);
        res.json({ success: true, filename });
    } catch (err) {
        console.error('Image processing error:', err);
        res.status(500).json({ error: 'Failed to process image' });
    }
});

export default router;