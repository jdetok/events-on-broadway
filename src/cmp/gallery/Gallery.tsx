import BigImg from "./BigImg";
import Img from "./Img";
import { useState, useEffect } from "react";

export default function Gallery() {
    const cssClass = Gallery.name.toLowerCase();
    const [selected, setSelected] = useState<string | null>(null);
    
    const images = Object.values(import.meta.glob('../../../data/img/gallery/*.png', { eager: true }));
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
        <div className={cssClass}>
            {selected && (
                <>
                    <div className="bigimg-overlay" />
                    <BigImg src={selected} onClick={() => setSelected(null)} onPrev={showPrev} onNext={showNext}/>
                </>
            )}
            
            {Object.values(images).map((module: any, i) => (
                <Img key={module.default} src={module.default} cssClass={`${cssClass}-${i}`} 
                    onClick={() => setSelected(module.default)}
                />
            ))}
        </div>
    )
}