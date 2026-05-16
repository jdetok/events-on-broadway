
import type { bigImgProps } from '@/types';
import ButtonRow from '../ButtonRow';

export default function BigImg(p: bigImgProps) {
    return (
        <div className="bigimg">
            <div className="bigimg-inner">
                <img alt={p.alt} className={p.cssClass} src={p.src} />
                <ButtonRow buttons={[
                        { cssClass: 'bigimg-close', text: 'x', onClick: p.onClick },
                        { cssClass: 'bigimg-prev', text: '<', onClick: p.onPrev },
                        { cssClass: 'bigimg-next', text: '>', onClick: p.onNext },
                ]} />
            </div>
        </div>
    )
}