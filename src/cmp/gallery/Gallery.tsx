import Img from "./Img";
import BigImg from "./BigImg";
import ButtonRow from "../ButtonRow";
import { FIRST_IMAGE } from "@/consts";
import { useState, useEffect } from "react";
import { deleteImage, stripFileName } from "@/utils";
import type { galleryType } from "@/types";

export default function Gallery({ type, adminAccess }: { type: galleryType, adminAccess?: boolean }) {
    const cssClass = Gallery.name.toLowerCase();
    const [selected, setSelected] = useState<string | null>(null);
    const [unsortedImages, setUnsortedImages] = useState<string[]>([]);
    const [confirmTarget, setConfirmTarget] = useState<string | null>(null);
    const [deleting, setDeleting] = useState(false);
    
    useEffect(() => {
        fetch(`/api/img/gallery/${type}`)
            .then(r => r.json()).then(data => setUnsortedImages(data.images))
            .catch(err => console.error('Gallery fetch failed:', err));
    }, [type]);

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
            selected ? setSelected(images[idx] || '') : setHorizIdx(idx)
        } else[
            setSelected(images[idx] || '')
        ];
    }

    // navigation handlers
    const showPrev = () => nav(-1);
    const showNext = () => nav(1);
    const close = () => setSelected(null);
    
    // buttons prop for ButtonRow
    const navButtons = [
        { cssClass: 'bigimg-close', buttonType: 'secondary' as const, text: 'x', onClick: close },
        { cssClass: 'bigimg-prev', buttonType: 'secondary' as const, text: '<', onClick: showPrev },
        { cssClass: 'bigimg-next', buttonType: 'secondary' as const, text: '>', onClick: showNext },
    ]

    // keyboard event listeners for navigating 
    const handleNavKeys = (e: KeyboardEvent) => {
        if (e.key === 'Escape') { setSelected(null); setConfirmTarget(null) };
        if (e.key === 'ArrowLeft') showPrev();
        if (e.key === 'ArrowRight') showNext();
    };

    // register key listeners
    useEffect(() => {
        if (!selected && !confirmTarget) return; 
        window.addEventListener('keydown', handleNavKeys);
        return () => window.removeEventListener('keydown', handleNavKeys);
    }, [selected, confirmTarget]);

    // delete confirmation
    const requestDelete = (path: string) => {
        if (path) setConfirmTarget(path);
    };
    
    const cancelConfirmDelete = () => {
        if (!deleting) setConfirmTarget(null);
    };

    const performDelete = async () => {
        console.log('called delete');
        if (!confirmTarget) return;
        setDeleting(true);
        try {
            await deleteImage(type, stripFileName(confirmTarget));
            setUnsortedImages((prev) => prev.filter((p) => p !== confirmTarget));
            if (selected === confirmTarget) setSelected(null);
        } catch (err) {
            console.error('Delete failed:', err);
        } finally {
            setDeleting(false);
            setConfirmTarget(null);
        }
    };


    const confirmButtons = [
        { cssClass: 'delete-confirm-cancel', buttonType: 'secondary' as const, text: 'Cancel', onClick: cancelConfirmDelete },
        { cssClass: 'delete-confirm-yes', buttonType: 'secondary' as const, text: deleting ? 'Archiving...' : 'Archive', onClick: performDelete },
    ]

    return (
        <div className={`${cssClass}-${type}`}>

            {selected && (
                <>
                    <div className="bigimg-overlay" onClick={() => setSelected(null)} />
                    <BigImg src={selected} buttons={navButtons} onClick={close} onPrev={showPrev} onNext={showNext} />
                </>
            )}

            {confirmTarget && (
                <>
                    <div className="delete-confirm-overlay" onClick={cancelConfirmDelete} />
                    <div className="delete-confirm-box">
                        <div className='delete-confirm-prompt'>
                            <span className="delete-confirm-text">Archive this image?</span>
                            <ButtonRow cssClass="delete-confirm-btns" buttons={confirmButtons} />
                        </div>
                        <Img src={confirmTarget} cssClass="delete-confirm-img" alt="Image pending archival" />
                        
                    </div>
                </>
            )}

            {type === 'horiz' && (
                <>
                    <Img src={images[horizIdx] ?? '.png'}
                        cssClass={`img-${type}-currnt-${horizIdx}`}
                        alt={`Horizontal gallery image`}
                        onClick={() => setSelected(images[horizIdx] ?? null)}
                        deleteHandler={
                            adminAccess
                            ? async () => requestDelete(images[horizIdx] ?? '')
                            : null
                        }
                    />
                    <ButtonRow buttons={navButtons.filter((b) => b.cssClass !== 'bigimg-close')} />
                </>
            )}

            {type === 'vert' && images.map((path: string, i) => (
                <Img key={`${cssClass}-${i}`}
                    src={path}
                    cssClass={`${cssClass}-${i}`} 
                    alt={`Gallery image ${i + 1}/${len}`}
                    onClick={() => setSelected(path)}
                    deleteHandler={
                        adminAccess
                        ? async () => requestDelete(path)
                        : null
                    }
                />
            ))}
        </div>
    )
}