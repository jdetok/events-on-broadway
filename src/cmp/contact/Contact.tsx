import { CONTACT } from '@/consts';

export default function Contact() {
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