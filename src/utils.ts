// BASIC UTILS FUNCS
export const TIME = () => new Date().toLocaleString('en-US', { timeZone: 'America/Chicago' });

export const TIME_FSTRING = (date: Date) => {
    const pad = (n: number, len = 2) => String(n).padStart(len, '0');
    return [
        pad(date.getMonth() + 1), pad(date.getDate()), date.getFullYear(), '_',
        pad(date.getHours()), pad(date.getMinutes()), pad(date.getSeconds()),
    ].join('');
}

// scroll to an element, but with offset of y space on top
export const scrollJustAbove = (selector: string, offset = 40) => {
    const el = document.querySelector(selector);
    if (!el) return;
    window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - offset, behavior: 'smooth' });
}

// intended to set a new border and message on the msg div in the RequestBooking form
export const setMsgDiv = (div: HTMLDivElement | HTMLParagraphElement, borderStyle: string, txt: string) => {
    div.style.display = 'block';
    div.style.border = borderStyle;
    div.textContent = txt;
}

// hide and clear a div element
export const clearMsgDiv = (div: HTMLDivElement) => {
    div.style.display = 'none';
    div.textContent = '';
}

// send passed data in a post request to passed url
export const postJSON = async (url: string, data: any) => {
    return await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });
}

// request the api to delete a gallery image
export const deleteImage = async (galleryType: string, src: string) => {
    try {
        const resp = await fetch(`/api/img/gallery/${galleryType}/${src}`, { method: 'DELETE' });
        console.log(resp)
        if (resp.status < 200 || resp.status > 299) {
            throw new Error(`Unsuccessful status: ${resp.status}`);
        }
        console.log(`${resp.statusText}: Deleted ${src}`)
    } catch (err) {
        console.error(err);
    }   
}

export const stripFileName = (path: string): string => path.replace(/^.*[\\/]/, '');