import Img from "./Img";
import BigImg from "./BigImg";
import ButtonRow from "../ButtonRow";
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
    ];
    const len = images.length;

    // separate index for handling full-screen displayed image from horiz gallery
    const [horizIdx, setHorizIdx] = useState(0);

    // determine index to base array navigation on
    const currentIdx = type === 'horiz'
        ? selected
            ? images.findIndex((path: string) => path === selected)
            : horizIdx
        : images.findIndex((path: string) => path === selected);
    
    const effectiveIdx = currentIdx === -1 ? 0 : currentIdx;

    // helper for showPrev and showNext
    const nav = (dir: 1 | -1) => {
        const idx = (effectiveIdx + dir + len) % len;
        if (type === 'horiz') {
            selected ? setSelected(images[idx]) : setHorizIdx(idx)
        } else[
            setSelected(images[idx])
        ];
    }

    // navigation handlers
    const showPrev = () => nav(-1);
    const showNext = () => nav(1);
    const close = () => setSelected(null);
    
    // buttons prop for ButtonRow
    const navButtons = [
        { cssClass: 'bigimg-close', text: 'x', onClick: close },
        { cssClass: 'bigimg-prev', text: '<', onClick: showPrev },
        { cssClass: 'bigimg-next', text: '>', onClick: showNext },
    ]

    // keyboard event listeners for navigating 
    const handleNavKeys = (e: KeyboardEvent) => {
        if (e.key === 'Escape') setSelected(null);
        if (e.key === 'ArrowLeft') showPrev();
        if (e.key === 'ArrowRight') showNext();
    };

    // register key listeners
    useEffect(() => {
        if (!selected) return; 
        window.addEventListener('keydown', handleNavKeys);
        return () => window.removeEventListener('keydown', handleNavKeys);
    }, [selected]);

    return (
        <div className={`${cssClass}-${type}`}>
            {selected && (
                <>
                    <div className="bigimg-overlay" onClick={() => setSelected(null)} />
                    <BigImg src={selected} buttons={navButtons} onClick={close} onPrev={showPrev} onNext={showNext} />
                </>
            )}

            {type === 'horiz' && (
                <>
                    <Img src={images[horizIdx]}
                        cssClass={`img-${type}-currnt-${horizIdx}`}
                        alt={`Horizontal gallery image`}
                        onClick={() => setSelected(images[horizIdx])}
                    />
                    <ButtonRow buttons={navButtons.filter((b) => b.cssClass !== 'bigimg-close')} />
                </>
            )}

            {type === 'vert' && images.map((path: string, i) => (
                <Img key={`${cssClass}-${i}`} src={path} cssClass={`${cssClass}-${i}`} 
                    alt={`Gallery image ${i+1}/${len}`} onClick={() => setSelected(path)}
                />
            ))}
        </div>
    )
}