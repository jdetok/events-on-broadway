import type { buttonData, contactData, formData } from '@/types';
import { data } from '../data/eventsOnBroadwayData.json';

export const CONTACT = data.contact as contactData;
export const FORM = data.form as formData;
export const HOURS = data.contact.hours as [string, string][];
export const ICON_SRC = data.logoSrc;
export const TITLE = data.siteTitle;
export const SUBTITLE = data.subTitle;
export const mainSiteButtons: buttonData[] = [
    {cssClass: 'btn-home', text: 'Home', onClick: () => { window.scrollTo({top: 0, behavior: 'smooth'})}},
    {cssClass: 'btn-contact', text: 'Contact'},
    {cssClass: 'btn-gallery', text: 'Gallery'},
    {cssClass: 'btn-about', text: 'About'},
];

export const URL_BOOKINGFORM = `/api/booking/submit`; 