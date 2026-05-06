import type { imgProps } from './Img';

type bigImgProps = imgProps & {
    onPrev?: () => void;
    onNext?: () => void;
}

export default function BigImg(p: bigImgProps) {
    return (
        <div className="bigimg">
            <div className="bigimg-inner">
                <button className="bigimg-close" onClick={p.onClick}>x</button>
                <button className="bigimg-prev" onClick={p.onPrev}>{`<`}</button>
                <button className="bigimg-next" onClick={p.onNext}>{`>`}</button>
                <img alt={p.alt} className={p.cssClass} src={p.src} />
            </div>
        </div>
    )
}