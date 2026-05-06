import { type MouseEventHandler } from "react"

export type imgProps = {
    src: string;
    alt?: string;
    cssClass?: string;
    onClick?: MouseEventHandler;
};

export default function Img(p: imgProps) {
    return <img alt={p.alt} className={p.cssClass} src={p.src} onClick={p.onClick} />
}