import Button from "./Button";
import type { buttonData, buttonProps } from "@/types";
import type { MouseEventHandler } from "react";

export default function ButtonRow({ buttons }: { buttons: buttonProps[] }) {
    return (
        <div className="btn-row">
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
