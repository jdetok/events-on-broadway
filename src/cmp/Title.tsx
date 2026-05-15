export default function Title({ text, subText }: { text: string, subText: string}) {
    return (
        <div className="title">
            <h1>{text}</h1>
            <h2>{subText}</h2>
        </div>
    )
}