import { useState, useRef } from 'react';

type UploadStatus = 'idle' | 'uplaoding' | 'success' | 'error';

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

        setStatus('uplaoding');
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
        <div>
            <input ref={inputRef} type="file" accept="image/*" onChange={handleFileChange} />
            {preview && <img src={preview} alt="Preview" style={{ maxWidth: 200 }} />}
            <button onClick={handleUpload} disabled={!preview || status === 'uplaoding'}>
                {status === 'success' && <p>Upload successful!</p>}
                {status === 'error' && <p>Error: {errorMsg}</p>}
            </button>
        </div>
    );
}