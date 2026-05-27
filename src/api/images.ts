import { type Response, Router } from 'express';
import fs from 'fs';
import path from 'path';
import type { galleryType } from '@/types';

const router = Router();

const GALLERY_BASE = '/data/img/gallery';

const readDir = async (dir: string, type: galleryType): Promise<string[]> => {
    return (await fs.promises.readdir(dir))
        .filter(f => /\.(png|jpe?g|webp)$/i.test(f)).map(f => `/img/gallery/${type}/${f}`);
};

const checkForGalleryType = (type: string, res: Response): galleryType | null => {
    if (type !== 'vert' && type !== 'horiz') {
        res.status(400).json({ error: 'Invalid gallery type. Use "vert" or "horiz".' });
        return null;
    }
    return type as galleryType;
}

// return array of images in specified gallery dir
router.get('/img/gallery/:type', async (req, res) => {
    const type = req.params.type;
    
    const validType = checkForGalleryType(type, res);
    if (!validType) return;

    const images = await readDir(path.join(GALLERY_BASE, type), validType);
    res.json({ images });
});

// move image out of gallery/:type dir and into gallery/archive
router.delete('/img/gallery/:type/:img', async (req, res) => {
    const type = req.params.type;
    const img = req.params.img;

    const validType = checkForGalleryType(type, res);
    if (!validType) return;

    const dir = path.join(GALLERY_BASE, type);
    const sourcePath = path.join(dir, img);

    try {
        await fs.promises.access(sourcePath);
    } catch {
        res.status(400).json({ error: `Could not find ${img} in ${dir}` });
        return;
    }

    try {
        const destPath = path.join(path.join(GALLERY_BASE, 'archive'), img);
        await fs.promises.rename(sourcePath, destPath);
        console.log(`Moved ${sourcePath} to ${destPath}`);
    } catch (err) {
        console.error('failed to move file', err)
        res.status(500).json({ error: 'Failed to move file' });
        return;
    }

    res.status(200).json({ message: 'Successfully deleted image' });
});

export default router;