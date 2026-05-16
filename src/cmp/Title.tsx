export default function Title({ ttl, subTtl }: { ttl: string, subTtl: string}) {
    return (
        <div className="title">
            <h1>{ttl}</h1>
            <h2>{subTtl}</h2>
        </div>
    )
}