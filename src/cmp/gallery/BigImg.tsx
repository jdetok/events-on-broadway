import type { bigImgProps } from '@/types';
import ButtonRow from '../ButtonRow';

export default function BigImg(p: bigImgProps) {
    return (
        <div className="bigimg">
            <div className="bigimg-inner">
                <img alt={p.alt} className={p.cssClass} src={p.src} />
                { p.buttons && <ButtonRow buttons={p.buttons} /> }
            </div>
        </div>
    )
}