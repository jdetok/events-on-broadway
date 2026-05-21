import type { buttonProps } from "@/types"

export default function Button({ buttonType, onClick, cssClass, children }: buttonProps) {
    return (
        <button
            onClick={onClick}
            className={`${buttonType === 'secondary' ? 'btn2' : 'btn1'} ${cssClass}`} >
            {children}
        </button>
    )
}