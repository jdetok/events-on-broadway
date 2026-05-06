import BigImg from "./BigImg";
import Img from "./Img";
import { useState, useEffect } from "react";

const images = Object.values(import.meta.glob('../../../data/img/gallery/*.png', { eager: true }));

export default function Gallery() {
    const cssClass = Gallery.name.toLowerCase();
    const [selected, setSelected] = useState<string | null>(null);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setSelected(null);
        };
        window.addEventListener('keydown', handleKeyDown);
    }, []);

    return (
        <div className={cssClass}>
            {selected && (
                <>
                    <div className="bigimg-overlay" />
                    <BigImg src={selected} onClick={() => setSelected(null) }/>
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