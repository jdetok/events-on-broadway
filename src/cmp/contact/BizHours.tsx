import type { ReactNode } from 'react';
import { data } from '../../../data/eventsOnBroadwayData.json'

export default function BizHours({ children }: { children?: ReactNode}) {
    const hours = data.contact.hours as [string, string][];
    return (
        <div className="biz-hours">
            {children}
            <h2>Business Hours:</h2>
            {hours.map((h: [string, string], i): ReactNode => (
                <ul key={`biz-hour-${i}`}>
                    <li className='left'>{h[0]}</li><li className='right'>{h[1]}</li>
                </ul>
            ))}
        </div>
    )
}