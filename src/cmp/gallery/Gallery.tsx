import Img from "./Img";
import BigImg from "./BigImg";
import { FIRST_IMAGE } from "@/consts";
import { useState, useEffect } from "react";

export default function Gallery({ type }: { type: 'vert' | 'horiz'}) {
    const cssClass = Gallery.name.toLowerCase();
    const [selected, setSelected] = useState<string | null>(null);
    
    // build separate arrays of vertical and horizontal images
    const vertImages = Object.values(import.meta.glob('../../../data/img/gallery/vert/*.png', { eager: true }));
    const horizImages = Object.values(import.meta.glob('../../../data/img/gallery/horiz/*.png', { eager: true }));
    const unsortedImages = (type === 'vert' ? vertImages : horizImages).map((m: any) => m.default);

    // sort images array to keep specified first image at the start of the array
    const images = [
        ...unsortedImages.filter((path: string) => path.includes(FIRST_IMAGE)),
        ...unsortedImages.filter((path: string) => !path.includes(FIRST_IMAGE)),
    ]
    const len = images.length;

    // get the index value within images array of currently selected image
    const currentIdx = images.findIndex((path: string) => path === selected);
    
    const showPrev = () => setSelected(images[(currentIdx - 1 + len) % len]);
    const showNext = () => setSelected(images[(currentIdx + 1 + len) % len]);

    useEffect(() => {
        if (!selected) return; // fixes issue when component is used multiple times throughout app

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setSelected(null);
            if (e.key === 'ArrowLeft') showPrev();
            if (e.key === 'ArrowRight') showNext();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [selected]);

    return (
        <div className={`${cssClass}-${type}`}>
            {/* highlights photo if one is selected */}
            {selected && (<>
                <div className="bigimg-overlay" onClick={() => setSelected(null)} />
                <BigImg src={selected} onClick={() => setSelected(null)} onPrev={showPrev} onNext={showNext} />
            </>)}
            
            {Object.values(images).map((path: string, i) => (
                <Img key={`${cssClass}-${i}`} src={path} cssClass={`${cssClass}-${i}`} 
                    alt={`Gallery image ${i+1}/${len}`} onClick={() => setSelected(path)}
                />
            ))}
        </div>
    )
}