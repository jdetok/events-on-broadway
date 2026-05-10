import { useState } from 'react';
import type { formData } from '@/types';

export default function RequestBooking(data: formData) {
    const [values, setValues] = useState<Record<string, string>>(
        Object.fromEntries(data.inputs.map((input) => [input.cssClass, ""]))
    );

    const handleChange = (cssClass: string, value: string) => {
        setValues((prev) => ({ ...prev, [cssClass]: value }));
    }

    const handleSubmit = () => {
        console.log(values);
    }

    return (
        <div className={data.cssClass}>
            <h2 className='head'>{data.title}</h2>
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