import { useState } from 'react';
import type { formData } from '@/types';
import { TIME, postJSON, setMsgDiv, clearMsgDiv } from '@/utils';
import { URL_BOOKINGFORM, errorFieldBorder, errorMsgBorder, successMsgBorder,
    formUnknownErrorMsg, formEmptyFieldErrorMsg, formSuccessMsg, cssFormMsgDiv,
    cssFormFillBtn, cssFormClearBtn, cssFormInputLabels,
    submittingMsg,
    progressMsgBorder,
} from '@/consts';

type formFields = Record<string, string>;
type emptyFields = Set<string>;

export default function RequestBooking(data: formData) {
    // VALUES STATE: key value store of form fields class name as key (name, mail, etc) and its value as value
    const [values, setValues] = useState<formFields>(Object.fromEntries(data.inputs.map((i) => [i.cssClass, ""])));

    // EMPTY FIELDS STATE: keep track of which fields have and haven't been filled by user
    const [emptyFields, setEmptyFields] = useState<emptyFields>(new Set());

    // form submission handler
    const handleSubmit = async () => {
        // should be a div element at form > head > msgDiv to display success or error message after submitting
        const msgDiv = document.querySelector(`.${data.cssClass} > .head > .${cssFormMsgDiv}`) as HTMLDivElement;
        
        // identify fields without a value entered
        const emptyKeys = Object.entries(values).filter(([, v]) => v === '').map(([k]) => k);

        if (emptyKeys.length > 0) {
            // attempted to submit with one or more fields empty - display errMsg and highlight each empty field
            setMsgDiv(msgDiv, errorMsgBorder, formEmptyFieldErrorMsg);
            setEmptyFields(new Set(emptyKeys));
            console.error('attempted to submit form without all fields filled');
        } else {
            // all fields filled, empty msgDiv and attempt to post values to backend
            clearMsgDiv(msgDiv);
            setEmptyFields(new Set());

            // message while form is being submitted
            setMsgDiv(msgDiv, progressMsgBorder, submittingMsg);
            
            try { // send http post request with form data
                const resp = await postJSON(URL_BOOKINGFORM, values);
                if (resp === null || resp.status !== 201) { // something failed posting to backend, display errMsg
                    setMsgDiv(msgDiv, errorMsgBorder, formUnknownErrorMsg);
                    console.error('something went wrong attempting to post data to bakend:', resp, values);
                } else { // post request successful, display success message
                    setMsgDiv(msgDiv, successMsgBorder, formSuccessMsg);
                    console.log(`form submitted successfully at ${TIME()}`)
                }
            } catch (err) { // error posting to backend
                setMsgDiv(msgDiv, errorMsgBorder, formUnknownErrorMsg);
                console.error(err);
            }
        }
    }

    // onChange handler for each input, removes error border once text has been filled
    const handleChange = (cssClass: string, value: string) => {
        setValues((prev) => ({ ...prev, [cssClass]: value }));
        setEmptyFields((prev) => {
            const next = new Set(prev);
            next.delete(cssClass);
            return next;
        });
    }

    // clear all fields in the form
    const handleClearForm = () => setValues(Object.fromEntries(data.inputs.map((input) => [input.cssClass, ""])));
    
    // fill all fields with sample data (visible in development only)
    const handleFillForm = () => {
        const filled: formFields = {};
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
            {/* TOP ROW - FORM TITLE, FILL/CLEAR BUTTONS, MSGDIV */}
            <div className='head'>
                <h2 className='ttl'>{data.title}</h2>
                <div className={cssFormMsgDiv}></div>
                { /* <button className={cssFormFillBtn} onClick={handleFillForm}>Fill Form</button> */ }
                <button className={cssFormClearBtn} onClick={handleClearForm}>Clear Form</button>
            </div>
            {/* ADDS EACH FIELD FROM data.inputs AS AN INPUT OR TEXTAREA ELEMENT */}
            {data.inputs.map((input, i) => (
                <div key={`input-container-${i}`} className={input.cssClass}>
                    <div className={cssFormInputLabels}>{input.placeholder}:</div>
                    {input.inputType === 'textarea'
                        ? <textarea
                            id={input.cssClass}
                            key={input.cssClass}
                            className={input.cssClass}
                            style={emptyFields.has(input.cssClass) ? { border: errorFieldBorder } : {}}
                            placeholder={input.placeholder}
                            value={values[input.cssClass]}
                            onChange={(e) => handleChange(input.cssClass, e.target.value)}
                        /> : <input
                            id={input.cssClass}
                            key={input.cssClass}
                            className={input.cssClass}
                            style={emptyFields.has(input.cssClass) ? { border: errorFieldBorder } : {}}
                            placeholder={input.placeholder}
                            value={values[input.cssClass]}
                            type={input.inputType}
                            onChange={(e) => handleChange(input.cssClass, e.target.value)}
                            
                        />
                    }
                </div>  
            ))}
            <button className="submit" onClick={handleSubmit}>Submit</button>
        </div>
    )
}
