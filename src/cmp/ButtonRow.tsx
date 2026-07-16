import Button from "./Button";
import type { buttonProps } from "@/types";
import type { MouseEventHandler } from "react";

export default function ButtonRow({ buttons, cssClass }: { buttons: buttonProps[], cssClass?: string }) {
    return (
        <div className={cssClass ?? "btn-row"}>
            {buttons.map((btn, i) => (
                <Button key={`${btn.cssClass}-${i}`}
                    buttonType={btn.buttonType ?? 'primary'}
                    cssClass={btn.cssClass}
                    onClick={btn.onClick as MouseEventHandler}>{btn.text}
                </Button>
            ))}
        </div>
    )
}
