import type { buttonProps } from "@/types"

export default function Button({ buttonType = 'primary', onClick, cssClass, children }: buttonProps) {
    return (
        <button
            onClick={onClick}
            className={`${buttonType === 'primary' ? 'btn1' : 'btn2'} ${cssClass}`} >
            {children}
        </button>
    )
}