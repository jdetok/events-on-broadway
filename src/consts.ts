import { data } from '../data/eventsOnBroadwayData.json';
import type { buttonData, contactData, formData } from '@/types';

// objects from json data config file to directly import in modules
export const CONTACT = data.contact as contactData;
export const FORM = data.form as formData;
export const HOURS = data.contact.hours as [string, string][];
export const ICON_SRC = data.logoSrc;
export const TITLE = data.siteTitle;
export const SUBTITLE = data.subTitle;

// scroll to an element, but with offset of y space on top
const scrollTo = (selector: string, offset = 40) => {
    const el = document.querySelector(selector);
    if (!el) return;
    window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - offset, behavior: 'smooth' });
}

// feeds ButtonRow component that sticks to top right of screen
export const mainSiteButtons: buttonData[] = [
    {cssClass: 'btn-home', text: 'Home', onClick: () => { window.scrollTo({top: 0, behavior: 'smooth'})}},
    { cssClass: 'btn-gallery', text: 'Gallery', onClick: () => scrollTo('.gallery') },
    {cssClass: 'btn-contact', text: 'Contact', onClick: () => scrollTo('.request-booking')},
    {cssClass: 'btn-loc', text: 'Location', onClick: () => scrollTo('.map')},
];

// feeds RequestBooking component
export const URL_BOOKINGFORM = `/api/booking/submit`; 
export const errorFieldBorder = '2.5px dashed red';
export const errorMsgBorder = '4px solid red';
export const successMsgBorder = '4px solid green';
export const formEmptyFieldErrorMsg = 'Fill out each field to submit';
export const formUnknownErrorMsg = 'Something went wrong, please try again';
export const formSuccessMsg = 'Submitted successfully!';

// intended to set a new border and message on the msg div in the RequestBooking form
export const setMsgDiv = (div: HTMLDivElement, borderStyle: string, txt: string) => {
    div.style.display = 'block';
    div.style.border = borderStyle;
    div.textContent = txt;
}

// hide and clear a div element
export const clearMsgDiv = (div: HTMLDivElement) => {
    div.style.display = 'none';
    div.textContent = '';
}