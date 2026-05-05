import { data } from '../../../data/events-on-broadway-data.json'

type contactData = {
    name: string;
    email: string;
    phone: string;
    addr: {
        street: string;
        city: string;
        state: string;
        zip: string;
    }
}

export default function Contact() {
    const CONTACT = data.contact as contactData;
    return (
        <div className="contact">
            <h2>Contact Us:</h2>
            <p className="bolder">{CONTACT.name}</p>
            <div className="bold">
                <p>{CONTACT.email}</p>
                <p>{CONTACT.phone}</p>
            </div>
            <div className="ital">
                <p>{CONTACT.addr.street}</p>
                <p>{CONTACT.addr.city}, {CONTACT.addr.state} {CONTACT.addr.zip}</p>
            </div>
        </div>
    )
}