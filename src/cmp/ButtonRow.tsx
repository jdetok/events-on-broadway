import type { MouseEventHandler } from "react";
import Button from "./Button";

type buttonData = {
    cssClass: string;
    text: string;
    onClick?: MouseEventHandler;
}

const buttonDatas: buttonData[] = [
    {cssClass: 'btn-home', text: 'Home', onClick: () => { window.scrollTo({top: 0, behavior: 'smooth'})}},
    {cssClass: 'btn-contact', text: 'Contact'},
    {cssClass: 'btn-gallery', text: 'Gallery'},
    {cssClass: 'btn-about', text: 'About'},
];

function buildbuttonDatas(buttonDatas: buttonData[]) {
    return buttonDatas.map((pd) => (
        <Button cssClass={pd.cssClass}>{pd.text}</Button>
    ));
}

export default function ButtonRow() {
    return (
        <div className="btn-row">
            {buildbuttonDatas(buttonDatas)}
        </div>
    )
}