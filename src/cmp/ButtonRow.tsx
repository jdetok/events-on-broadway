import Button from "./Button";
import type { buttonData } from "@/types";
import type { MouseEventHandler } from "react";

export default function ButtonRow({ buttons }: { buttons: buttonData[] }) {
    return (
        <div className="btn-row">
            {buttons.map((btn, i) => (
                <Button key={`${btn.cssClass}-${i}`}
                    cssClass={btn.cssClass}
                    onClick={btn.onClick as MouseEventHandler}>{btn.text}
                </Button>
            ))}
        </div>
    )
}
