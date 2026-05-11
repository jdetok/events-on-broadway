import type { ReactNode } from 'react';
import { CONTACT, HOURS } from '@/consts';

export default function Contact({ children }: { children?: ReactNode}) {
    return (
        <div className="biz-hours">
            {children}
            <h2>Business Hours:</h2>
            {HOURS.map((h: [string, string], i): ReactNode => (
                <ul key={`biz-hour-${i}`}>
                    <li className='left'>{h[0]}</li><li className='right'>{h[1]}</li>
                </ul>
            ))}
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
        </div>
    )
}