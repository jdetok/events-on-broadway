import Icon from "./image/Icon";
import Title from "./header/Title";
import ButtonRow from "./ButtonRow";
import Gallery from "./gallery/Gallery";
import Contact from "./contact/Contact";
import BizHours from "./contact/BizHours";
import Background from "./image/Background";
import GoogleMapsIFrame from "./GoogleMapsIFrame";
import RequestBooking, { type formData } from "./contact/RequestBooking";
import { data } from "../../data/eventsOnBroadwayData.json";
import { mainSiteButtons } from "@/consts";

export default function App() {
    return (
        <main className="app">
            <Icon src={ data.logoSrc } />
            <Title text={data.siteTitle} subText={`${data.subTitle}`} />
            <ButtonRow buttons={mainSiteButtons} />
            <Background />
            <Gallery />
            <RequestBooking {...data.form as formData} />
            <BizHours />
            <Contact />
            <GoogleMapsIFrame />
        </main>
    )
}