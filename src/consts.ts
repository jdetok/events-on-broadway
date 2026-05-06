import type { buttonData } from '@/types';

export const mainSiteButtons: buttonData[] = [
    {cssClass: 'btn-home', text: 'Home', onClick: () => { window.scrollTo({top: 0, behavior: 'smooth'})}},
    {cssClass: 'btn-contact', text: 'Contact'},
    {cssClass: 'btn-gallery', text: 'Gallery'},
    {cssClass: 'btn-about', text: 'About'},
];

export const galleryButtons: buttonData[] = [
    
];