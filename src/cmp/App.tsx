import Icon from "./Icon";
import Title from "./Title";
import ButtonRow from "./ButtonRow";
import Gallery from "./gallery/Gallery";
import Contact from "./Contact";
import Background from "./Background";
import Map from "./Map";
import RequestBooking from "./RequestBooking";
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
            <Contact />
            <Map />
        </main>
    )
}