import Img from "./Img";
import BigImg from "./BigImg";
import { useState, useEffect } from "react";

export default function Gallery({ type }: { type: 'vert' | 'horiz'}) {
    const cssClass = Gallery.name.toLowerCase();
    const [selected, setSelected] = useState<string | null>(null);
    
    const vertImages = Object.values(import.meta.glob('../../../data/img/gallery/vert/*.png', { eager: true }));
    const horizImages = Object.values(import.meta.glob('../../../data/img/gallery/horiz/*.png', { eager: true }));
    const images = type === 'vert' ? vertImages : horizImages;

    const currentIdx = images.findIndex((m: any) => m.default === selected);

    const len = images.length;
    const showPrev = () => setSelected((images[(currentIdx - 1 + len) % len] as any).default);
    const showNext = () => setSelected((images[(currentIdx + 1 + len) % len] as any).default);

    useEffect(() => {
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
            {selected && (<>
                <div className="bigimg-overlay" onClick={() => setSelected(null)} />
                <BigImg src={selected} onClick={() => setSelected(null)} onPrev={showPrev} onNext={showNext} />
            </>)}
            
            {Object.values(images).map((m: any, i) => (
                <Img key={m.default} src={m.default}
                    cssClass={`${cssClass}-${i}`} 
                    alt={`Gallery image ${i+1}/${len}`}
                    onClick={() => setSelected(m.default)}
                />
            ))}
        </div>
    )
}