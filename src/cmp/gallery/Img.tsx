import type { imgProps } from '@/types';

export default function Img(p: imgProps) {
    return (<div className={p.cssClass} style={{ position: 'relative' }}>
        {
            (p.deleteHandler !== null) && <button
                className={`delete-img`}
                onClick={p.deleteHandler}
                style={{
                    pointerEvents: 'all',
                    position: 'absolute',
                    margin: '0.4rem',
                    right: '0',
                    backgroundColor: 'rgba(176, 32, 32, 0.85)',
                    color: 'rgb(255, 255, 255)',
                    fontSize: '1.01rem',
                    zIndex: 997,
                }} 
            >Archive Image</button>
        }
        <img
            alt={p.alt}
            className={p.cssClass}
            src={p.src}
            onClick={p.onClick}
        />
    </div>)
}