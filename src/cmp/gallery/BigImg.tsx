import type { imgProps } from './Img';

export default function BigImg(p: imgProps) {
    return (
        // <div className="bigimg">
        <div className="bigimg">
            <div className="bigimg-inner">
                <button className="bigimg-close" onClick={p.onClick}>x</button>
                <img alt={p.alt} className={p.cssClass} src={p.src} />
            </div>
        </div>
        
    )
}