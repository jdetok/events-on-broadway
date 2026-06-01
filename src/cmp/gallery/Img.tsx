import type { imgProps } from '@/types';
import Button from '../Button';

export default function Img(p: imgProps) {
    return (<>
        <img
            alt={p.alt}
            className={p.cssClass}
            src={p.src}
            onClick={p.onClick}
        />
        {
            (p.deleteHandler !== null) && <Button
                cssClass={`delete-${p.cssClass}`}
                onClick={p.deleteHandler}
            />
        }
    </>)
}