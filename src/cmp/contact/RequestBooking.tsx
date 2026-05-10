import { useState } from 'react';

type formInput = {
    inputType: 'text' | 'date' | 'email' | 'textarea' | 'number';
    cssClass: string;
    placeholder: string;
};

export type formData = {
    title: string;
    cssClass: string;
    inputs: formInput[];
};

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
                <label className={input.cssClass}>
                    {input.placeholder}:<br></br>
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
                </label>  
            ))}
            <button className="submit" onClick={handleSubmit}>Submit</button>
        </div>
    )
}