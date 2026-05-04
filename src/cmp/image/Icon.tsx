export default function Icon({ src }: { src: string}) {
    return (
        <div className="icon">
            <img src={src}></img>
        </div>
    )
}