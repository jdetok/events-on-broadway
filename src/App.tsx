import Icon from "./cmp/image/Icon";
import Title from "./cmp/header/Title";
import ButtonRow from "./cmp/ButtonRow";
import Gallery from "./cmp/gallery/Gallery";
import Contact from "./cmp/contact/Contact";
import BizHours from "./cmp/contact/BizHours";
import Background from "./cmp/image/Background";
import GoogleMapsIFrame from "./cmp/GoogleMapsIFrame";
import RequestBooking, { type formData } from "./cmp/contact/RequestBooking";
import { data } from "../data/events-on-broadway-data.json"

export default function App() {
    return (
        <main className="app">
            <Icon src={ data.logoSrc } />
            <Title text={data.siteTitle} subText={`${data.subTitle}`} />
            <ButtonRow />
            <Background />
            <Gallery />
            <RequestBooking {...data.form as formData} />
            <BizHours />
            <Contact />
            <GoogleMapsIFrame />
        </main>
    )
}