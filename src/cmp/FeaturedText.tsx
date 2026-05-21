type featuredTextProps = {
    ttl: string;
    text: string;
    emphasisTop?: string;
    emphasisBtm?: string;
};

export default function FeaturedText({ ttl, text, emphasisTop, emphasisBtm }: featuredTextProps) {
    return (
        <div className='feat-text'>
            <h2>{ttl}</h2>
            {emphasisTop ? <h3>{emphasisTop}</h3> : ''}
            <p>{text}</p>
            {emphasisBtm ? <h3 dangerouslySetInnerHTML={{ __html: emphasisBtm}} /> : ''}
        </div>
    )
}