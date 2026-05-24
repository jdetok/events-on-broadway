import { useState, useRef } from 'react';

type UploadStatus = 'idle' | 'uploading' | 'success' | 'error';

export default function PhotoUpload({ onSuccess }: { onSuccess?: (filename: string) => void }) {
    const [status, setStatus] = useState<UploadStatus>('idle');
    const [preview, setPreview] = useState<string | null>(null);
    const [errorMsg, setErrorMsg] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        
        setPreview(URL.createObjectURL(file));
        setStatus('idle');
    };

    const handleUpload = async () => {
        const file = inputRef.current?.files?.[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('photo', file);

        setStatus('uploading');
        try {
            const res = await fetch('/api/upload', { method: 'POST', body: formData });
            const data = await res.json();

            if (!res.ok) throw new Error(data.error || 'Upload failed');

            setStatus('success');
            onSuccess?.(data.filename);
        } catch (err: any) {
            setStatus('error');
            setErrorMsg(err.message);
        }
    };

    return (
        <div className='upload'>
            <h2 className='head'>Upload an Image</h2>
            <input ref={inputRef} type="file" accept="image/*" onChange={handleFileChange} />
            <button onClick={handleUpload} disabled={!preview || status === 'uploading'}>Upload Image</button>
            {preview && <img src={preview} alt="Preview" style={{ maxWidth: 300 }} />}
            {status === 'success' && <p className='ok'>Upload successful!</p>}
            {status === 'error' && <p className='err'>Error: {errorMsg}</p>}
        </div>
    );
}