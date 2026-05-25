import { errorMsgBorder, progressMsgBorder, successMsgBorder } from '@/consts';
import { setMsgDiv } from '@/utils';
import { useState, useRef } from 'react';

type UploadStatus = 'idle' | 'uploading' | 'success' | 'error';

export default function PhotoUpload({ onSuccess }: { onSuccess?: (filename: string) => void }) {
    const [status, setStatus] = useState<UploadStatus>('idle');
    const [preview, setPreview] = useState<string | null>(null);
    const [errorMsg, setErrorMsg] = useState('');
    const [fileName, setFileName] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);
    const msgRef = useRef<HTMLParagraphElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        
        setFileName(file.name);
        setPreview(URL.createObjectURL(file));
        setStatus('idle');
    };

    const handleUpload = async () => {
        const file = inputRef.current?.files?.[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('photo', file);


        setMsgDiv(msgRef.current as HTMLParagraphElement, progressMsgBorder, `Attempting to upload ${fileName}...`);
        setStatus('uploading');
        try {
            const res = await fetch('/api/upload', { method: 'POST', body: formData });
            const data = await res.json();

            if (!res.ok) throw new Error(data.error || 'Upload failed');

            setMsgDiv(msgRef.current as HTMLParagraphElement, successMsgBorder, `Successfully uploaded ${fileName}!`);
            setStatus('success');
            onSuccess?.(data.filename);
        } catch (err: any) {
            setMsgDiv(msgRef.current as HTMLParagraphElement, errorMsgBorder, `Failed to upload ${fileName}: ${errorMsg}`);
            setStatus('error');
            setErrorMsg(err.message);
        }
    };

    return (
        <div className='upload'>
            <h2 className='head'>Upload an Image</h2>
            <input ref={inputRef} type="file" accept="image/*" onChange={handleFileChange} />
            <button onClick={handleUpload} disabled={!preview || status === 'uploading'}>Upload Image</button>
            {preview && <img src={preview} alt="Preview" style={{ maxWidth: 350 }} />}
            <p ref={msgRef} className='msg'></p>
        </div>
    );
}