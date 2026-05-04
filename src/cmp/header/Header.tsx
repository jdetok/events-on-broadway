import type { ReactNode } from "react";

type headerProps = {
    children: ReactNode;
}

export default function Header({ children }: headerProps) {
    return (
        <div className="header">
            {children}
        </div>
    )
}