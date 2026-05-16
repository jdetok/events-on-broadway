import { BIZ_HOURS, CONTACT, ADDR, cssContact, cssEmailPhone, cssStreetAddr } from '@/consts';
import type { ReactNode } from 'react';

function BizHours({ cssClass, children }: { cssClass: string, children?: ReactNode }) {
    return (<>
        { children }
        {BIZ_HOURS.map((h: [string, string], i): ReactNode => (
            <ul key={`${cssClass}-${i}`}>
                <li className='left'>{h[0]}</li><li className='right'>{h[1]}</li>
            </ul>
        ))}
    </>)
}

function StreetAddr({ cssClass }: { cssClass?: string}) {
    return (
        <div className={cssClass}>
            <p className="bolder">{CONTACT.name}</p>
            <p>{ADDR.street}</p>
            <p>{ADDR.city}, {ADDR.state} {ADDR.zip}</p>
        </div>
    )
}

function EmailPhone({ cssClass }: { cssClass?: string}) {
    return (
        <div className={cssClass}>
            <p>{CONTACT.email}</p>
            <p>{CONTACT.phone}</p>
        </div>
    )
}

export default function Contact({ children }: { children?: ReactNode}) {
    return (
        <div className={cssContact}>
            {children}
            <BizHours cssClass={cssContact}><h2>Business Hours:</h2></BizHours>
            <h2>Contact Us:</h2>
            <EmailPhone cssClass={cssEmailPhone} />
            <StreetAddr cssClass={cssStreetAddr}/>
        </div>
    )
}