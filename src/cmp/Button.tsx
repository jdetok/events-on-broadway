import { type MouseEventHandler, type ReactNode } from "react"

type buttonProps = {
    buttonType?: 'primary' | 'secondary';
    onClick: MouseEventHandler;
    children: ReactNode;
}

export default function Button({ buttonType = 'primary', onClick, children }: buttonProps) {
    return (
        <button className={buttonType === 'primary' ? 'btn1' : 'btn2'} onClick={onClick}>
            {children}
        </button>
    )
}