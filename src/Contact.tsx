import { data } from '../data/events-on-broadway-data.json'

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
            <p>{CONTACT.name}</p>
            <div>
                <p>{CONTACT.addr.street}</p>
                <p>{CONTACT.addr.city}, {CONTACT.addr.state} {CONTACT.addr.zip}</p>
            </div>
            <p>{CONTACT.phone} | {CONTACT.email}</p>
        </div>
    )
}