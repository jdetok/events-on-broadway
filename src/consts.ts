import { scrollJustAbove } from '@/utils';
import { data } from '../data/eventsOnBroadwayData.json';
import type { addrData, buttonData, contactData, formData } from '@/types';

// objects from json data config file to directly import in modules
export const CONTACT = data.contact as contactData;
export const ADDR = data.contact.addr as addrData;
export const FORM = data.form as formData;
export const BIZ_HOURS = data.contact.hours as [string, string][];
export const ICON_SRC = data.logoSrc;
export const TITLE = data.siteTitle;
export const SUBTITLE = data.subTitle;

// css classes
export const cssContact = 'contact';
export const cssStreetAddr = 'street-addr';
export const cssEmailPhone = 'email-phone';
export const cssFormMsgDiv = 'msg';
export const cssFormClearBtn = 'clear';
export const cssFormFillBtn = 'fill';
export const cssFormInputLabels = 'input-label';

// feeds ButtonRow component that sticks to top right of screen
export const mainSiteButtons: buttonData[] = [
    {cssClass: 'btn-home', text: 'Home', onClick: () => { window.scrollTo({top: 0, behavior: 'smooth'})}},
    { cssClass: 'btn-gallery', text: 'Gallery', onClick: () => scrollJustAbove('.gallery') },
    {cssClass: 'btn-contact', text: 'Contact', onClick: () => scrollJustAbove('.contact')},
    {cssClass: 'btn-request', text: 'Book', onClick: () => scrollJustAbove('.request-booking')},
    {cssClass: 'btn-loc', text: 'Location', onClick: () => scrollJustAbove('.map')},
];

// feeds RequestBooking component
export const URL_BOOKINGFORM = `/api/booking/submit`; 
export const errorFieldBorder = '2.5px dashed red';
export const errorMsgBorder = '4px solid red';
export const successMsgBorder = '4px solid green';
export const formEmptyFieldErrorMsg = 'Fill out each field to submit';
export const formUnknownErrorMsg = 'Something went wrong, please try again';
export const formSuccessMsg = 'Submitted successfully!';