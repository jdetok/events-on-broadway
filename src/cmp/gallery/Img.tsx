import type { imgProps } from '@/types';

export default function Img(p: imgProps) {
    return <img alt={p.alt} className={p.cssClass} src={p.src} onClick={p.onClick} />
}