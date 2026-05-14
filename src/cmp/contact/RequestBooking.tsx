import { useState } from 'react';
import type { bookingFormFields, formData } from '@/types';
import { URL_BOOKINGFORM, errBorder, setMsgDiv, clearMsgDiv } from '@/consts';

export default function RequestBooking(data: formData) {
    const [values, setValues] = useState<Record<string, string>>(
        Object.fromEntries(data.inputs.map((input) => [input.cssClass, ""]))
    );

    const [invalidFields, setInvalidFields] = useState<Set<string>>(new Set());

    const handleChange = (cssClass: string, value: string) => {
        setValues((prev) => ({ ...prev, [cssClass]: value }));
        setInvalidFields((prev) => {
            const next = new Set(prev);
            next.delete(cssClass);
            return next;
        });
    }

    const handleSubmit = async () => {
        const path = `.${data.cssClass} > .head > .error`;
        const errDiv = document.querySelector(path) as HTMLDivElement;
        const emptyKeys = Object.entries(values).filter(([, v]) => v === '').map(([k]) => k);

        if (emptyKeys.length > 0) {
            setMsgDiv(errDiv, '4px solid red', 'Fill out each field to submit');
            setInvalidFields(new Set(emptyKeys));
        } else {
            clearMsgDiv(errDiv);
            setInvalidFields(new Set());
            try {
                const resp = await fetch(URL_BOOKINGFORM, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', },
                    body: JSON.stringify(values as bookingFormFields),
                });
                if (resp === null || resp.status !== 201) {
                    setMsgDiv(errDiv, '4px solid red', 'Something went wrong, please try again');
                } else {
                    setMsgDiv(errDiv, '4px solid green', 'Booking request submitted!');
                }
            } catch (err) {
                setMsgDiv(errDiv, '4px solid red', 'Something went wrong, please try again');
                console.error('error inserting form data into mongo:', err);
            }
        }
    }

    const handleClearForm = () => {
        setValues(Object.fromEntries(data.inputs.map((input) => [input.cssClass, ""])));
    }

    const handleFillForm = () => {
        const filled: Record<string, string> = {};
        data.inputs.forEach((input) => {
            switch (input.inputType) {
                case 'text':
                    filled[input.cssClass] = 'Test Text';
                    break;
                case 'email':
                    filled[input.cssClass] = 'test@test.com';
                    break;
                case 'number':
                    filled[input.cssClass] = '1';
                    break;
                case 'date':
                    filled[input.cssClass] = new Date().toISOString().split('T')[0] ?? '';
                    break;
                case 'textarea':
                    filled[input.cssClass] = 'Test textarea content.';
                    break;
            }
        });
        setValues((prev) => ({ ...prev, ...filled }));
    }

    return (
        <div className={data.cssClass} id={data.cssClass}>
            <div className='head'>
                <h2>{data.title}</h2>
                <div className='error'></div>
                <button className="fill" onClick={handleFillForm}>Fill Form</button>
                <button className="clear" onClick={handleClearForm}>Clear Form</button>
            </div>
            {data.inputs.map((input, i) => (
                <div key={`input-container-${i}`} className={input.cssClass}>
                    <div className="input-label">{input.placeholder}:</div>
                    {input.inputType === 'textarea'
                        ? <textarea
                            key={input.cssClass}
                            className={input.cssClass}
                            id={input.cssClass}
                            placeholder={input.placeholder}
                            value={values[input.cssClass]}
                            onChange={(e) => handleChange(input.cssClass, e.target.value)}
                            style={invalidFields.has(input.cssClass) ? { border: errBorder } : {}}
                        /> : <input
                            key={input.cssClass}
                            id={input.cssClass}
                            type={input.inputType}
                            placeholder={input.placeholder}
                            value={values[input.cssClass]}
                            onChange={(e) => handleChange(input.cssClass, e.target.value)}
                            style={invalidFields.has(input.cssClass) ? { border: errBorder } : {}}
                        />
                    }
                </div>  
            ))}
            <button className="submit" onClick={handleSubmit}>Submit</button>
        </div>
    )
}