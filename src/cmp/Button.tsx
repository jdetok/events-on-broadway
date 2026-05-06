import { type MouseEventHandler, type ReactNode } from "react"

type buttonProps = {
    buttonType?: 'primary' | 'secondary';
    cssClass?: string;
    onClick?: MouseEventHandler;
    children?: ReactNode;
}

export default function Button({ buttonType = 'primary', onClick, cssClass, children }: buttonProps) {
    return (
        <button
            onClick={onClick}
            className={`${buttonType === 'primary' ? 'btn1' : 'btn2'} ${cssClass}`} >
            {children}
        </button>
    )
}