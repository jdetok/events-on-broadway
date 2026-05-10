import Icon from "./image/Icon";
import Title from "./header/Title";
import ButtonRow from "./ButtonRow";
import Gallery from "./gallery/Gallery";
import Contact from "./contact/Contact";
import BizHours from "./contact/BizHours";
import Background from "./image/Background";
import GoogleMapsIFrame from "./GoogleMapsIFrame";
import RequestBooking from "./contact/RequestBooking";
import { FORM, TITLE, SUBTITLE, ICON_SRC, mainSiteButtons } from "@/consts";

export default function App() {
    return (
        <main className="app">
            <Icon src={ ICON_SRC } />
            <Title text={TITLE} subText={SUBTITLE} />
            <ButtonRow buttons={mainSiteButtons} />
            <Background />
            <Gallery />
            <RequestBooking {...FORM} />
            <BizHours />
            <Contact />
            <GoogleMapsIFrame />
        </main>
    )
}