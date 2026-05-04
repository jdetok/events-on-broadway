import type { ReactNode } from 'react';

export type reactComponentProps = {
    class: string;
    children?: ReactNode;
}

export const newReactDiv = (props: reactComponentProps) => {
    return (
        <div className={props.class}>
            {props.children}
        </div>
    )
}