import { data } from '../../../data/eventsOnBroadwayData.json';

type contactData = {
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

export default function Contact() {
    const CONTACT = data.contact as contactData;
    return (
        <div className="contact">
            <h2>Contact Us:</h2>
            <div className="bold">
                <p>{CONTACT.email}</p>
                <p>{CONTACT.phone}</p>
            </div><br></br>
            <div className="ital">
                <p className="bolder">{CONTACT.name}</p>
                <p>{CONTACT.addr.street}</p>
                <p>{CONTACT.addr.city}, {CONTACT.addr.state} {CONTACT.addr.zip}</p>
            </div>
            <br></br>
        </div>
    )
}