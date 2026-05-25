import { scrollJustAbove } from '@/utils';
// import { data } from '../data/eventsOnBroadwayData.json';
import type { addrData, buttonData, contactData, formData } from '@/types';

const data = {
    siteTitle: "Events on Broadway",
    subTitle: "St. Louis, Missouri",
    logoSrc: "./data/img/oglogo_025.png",
    contact: {
        name: "Events on Broadway, LLC",
        email: "eventsonbroadwaystl@gmail.com",
        phone: "314-934-3479",
        hours: [
            ["Mon-Thu", "10am-3pm"],
            ["Fri-Sat", "Appointment Only"],
            ["Sunday", "Closed"],
        ],
        addr: {
            street: "8101 North Broadway",
            city: "Saint Louis",
            state: "MO",
            zip: "63147",
        },
    },
    form: {
        title: "Request to Book an Event",
        cssClass: "book",
        inputs: [
            { inputType: "text",     cssClass: "name",  placeholder: "Name (person or organization)" },
            { inputType: "email",    cssClass: "mail",  placeholder: "Email address" },
            { inputType: "number",   cssClass: "num",   placeholder: "Estimated number of guests" },
            { inputType: "date",     cssClass: "date1", placeholder: "Preferred date" },
            { inputType: "date",     cssClass: "date2", placeholder: "Second-choice date" },
            { inputType: "textarea", cssClass: "desc",  placeholder: "Please briefly describe the event for which you wish to book the space" },
        ],
    },
};

export const CONTACT = data.contact as contactData;
export const ADDR = data.contact.addr as addrData;
export const FORM = data.form as formData;
export const BIZ_HOURS = data.contact.hours as [string, string][];
export const ICON_SRC = data.logoSrc;
export const TITLE = data.siteTitle;
export const SUBTITLE = data.subTitle;

// start image for gallery list
export const FIRST_IMAGE = 'horiz.png';

// css classes
export const cssContact = 'contact';
export const cssStreetAddr = 'street-addr';
export const cssEmailPhone = 'email-phone';
export const cssFormMsgDiv = 'msg';
export const cssFormClearBtn = 'clear';
export const cssFormFillBtn = 'fill';
export const cssBookingForm = 'book';
export const cssFormInputLabels = 'input-label';
export const cssGalleryVert = 'gallery-vert';
export const cssGalleryHoriz = 'gallery-horiz';

// feeds ButtonRow component that sticks to top right of screen
export const mainSiteButtons: buttonData[] = [
    {cssClass: 'btn-home', text: 'Home', onClick: () => { window.scrollTo({top: 0, behavior: 'smooth'})}},
    {cssClass: 'btn-abt', text: 'About', onClick: () => scrollJustAbove('.feat-text')},
    {cssClass: 'btn-gallery', text: 'Gallery', onClick: () => scrollJustAbove(`.${cssGalleryVert}`) },
    {cssClass: 'btn-contact', text: 'Contact', onClick: () => scrollJustAbove('.contact')},
    {cssClass: 'btn-request', text: 'Book', onClick: () => scrollJustAbove(`.${cssBookingForm}`)},
    {cssClass: 'btn-loc', text: 'Location', onClick: () => scrollJustAbove('.map')},
];

// feeds RequestBooking component
export const URL_BOOKINGFORM = `/api/booking/submit`; 
export const errorFieldBorder = '2.5px dashed red';
export const errorMsgBorder = '3px solid red';
export const successMsgBorder = '3px solid green';
export const progressMsgBorder = '3px solid purple';
export const submittingMsg = 'Submitting...';
export const formEmptyFieldErrorMsg = 'Fill out each field to submit';
export const formUnknownErrorMsg = 'Something went wrong, please try again';
export const formSuccessMsg = 'Submitted successfully!';

export const ABOUT_TEXT = `
Events on Broadway is an upscale yet affordable event space available for reservation in
the Baden neighborhood of Historic North St. Louis. The newly renovated space was designed with flexibility in mind to accomodate a
wide array of occasions; whether it's a holiday party, wedding reception,
baby shower, or business meeting, we hope to host it at Events on Broadway!
`.trim();

export const ABOUT_BOTTOM = `
For more information, find us on <a href="https://www.facebook.com/eventsonbroadwaystl" target="__blank">Facebook</a>!
`.trim();