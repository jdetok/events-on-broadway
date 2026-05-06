import type { MouseEventHandler } from "react";

export type buttonData = {
    cssClass: string;
    text: string;
    onClick?: MouseEventHandler | (() => void) | undefined;
    // onClick?: MouseEventHandler | (() => void) | undefined;
}
