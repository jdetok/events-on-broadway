import { useState } from 'react';
import type { bookingFormFields, formData } from '@/types';
import { URL_BOOKINGFORM } from '@/consts';

export default function RequestBooking(data: formData) {
    const [values, setValues] = useState<Record<string, string>>(
        Object.fromEntries(data.inputs.map((input) => [input.cssClass, ""]))
    );

    const handleChange = (cssClass: string, value: string) => {
        setValues((prev) => ({ ...prev, [cssClass]: value }));
    }

    const handleSubmit = async () => {
        console.log(values);
        const path = `.${data.cssClass} > .head > .error`;
        const errDiv = document.querySelector(path) as HTMLDivElement;
        if (!errDiv) throw new Error("couldn't find error div");

        let txt: string; 
        if (Object.values(values).some((v) => v === "")) {
            errDiv.style.display = 'block';
            errDiv.textContent = 'All form inputs must be populated.';
        } else {
            errDiv.style.display = 'none';
            errDiv.textContent = '';
            const resp = await fetch(URL_BOOKINGFORM, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', },
                body: JSON.stringify(values as bookingFormFields),
            });
            console.log(resp);
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
            {data.inputs.map((input) => (
                <div className={input.cssClass}>
                    <div className="input-label">{input.placeholder}:</div>
                    {input.inputType === 'textarea'
                        ? <textarea
                            key={input.cssClass}
                            className={input.cssClass}
                            placeholder={input.placeholder}
                            value={values[input.cssClass]}
                            onChange={(e) => handleChange(input.cssClass, e.target.value)}
                        /> : <input
                            key={input.cssClass}
                            type={input.inputType}
                            placeholder={input.placeholder}
                            value={values[input.cssClass]}
                            onChange={(e) => handleChange(input.cssClass, e.target.value)}
                        />
                    }
                </div>  
            ))}
            <button className="submit" onClick={handleSubmit}>Submit</button>
        </div>
    )
}