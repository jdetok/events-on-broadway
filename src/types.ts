import type { MouseEventHandler } from "react";

export type buttonData = {
    cssClass: string;
    text: string;
    onClick?: MouseEventHandler | (() => void) | undefined;
}

export type contactData = {
    name: string;
    email: string;
    phone: string;
    hours: string[][];
    addr: {
        street: string;
        city: string;
        state: string;
        zip: string;
    };
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