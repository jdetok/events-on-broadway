const images = Object.values(import.meta.glob('../../../data/img/gallery/s02/*.png', { eager: true }));
export default function Gallery() {
    console.log(images);
    return (
        <div className="gallery">
            {Object.values(images).map((module: any) => (
                <img key={module.default} src={module.default} />
            ))}
        </div>
    )
}