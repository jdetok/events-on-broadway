import type { MouseEventHandler, ReactNode } from 'react';

export type buttonData = {
    cssClass: string;
    text: string;
    onClick?: MouseEventHandler | (() => void) | undefined;
};

export type buttonProps = {
    buttonType?: 'primary' | 'secondary';
    cssClass?: string | undefined;
    onClick?: MouseEventHandler | (() => void) | undefined;
    children?: ReactNode;
    text?: string;
};

export type addrData = {
    street: string;
    city: string;
    state: string;
    zip: string;
};

export type contactData = {
    name: string;
    email: string;
    phone: string;
    hours: string[][];
    addr: addrData;
};

export type formInput = {
    inputType: 'text' | 'date' | 'email' | 'textarea' | 'number';
    cssClass: string;
    placeholder: string;
};

export type formData = {
    title: string;
    cssClass: string;
    inputs: formInput[];
};

export type bookingFormFields = {
    name: string;
    mail: string;
    num: string;
    date1: string;
    date2: string;
    desc: string;
};

export type imgProps = {
    src: string;
    alt?: string;
    cssClass?: string;
    onClick?: MouseEventHandler;
};

export type bigImgProps = imgProps & {
    onPrev?: () => void;
    onNext?: () => void;
    buttons?: buttonData[];
};

export type galleryType = 'vert' | 'horiz';