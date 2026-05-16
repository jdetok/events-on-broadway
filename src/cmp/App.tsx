import Map from "./Map";
import Icon from "./Icon";
import Title from "./Title";
import Contact from "./Contact";
import ButtonRow from "./ButtonRow";
import Gallery from "./gallery/Gallery";
import RequestBooking from "./RequestBooking";
import { FORM, TITLE, SUBTITLE, ICON_SRC, mainSiteButtons } from "@/consts";

export default function App() {
    return (
        <main className="app">
            <Icon src={ ICON_SRC } />
            <Title ttl={TITLE} subTtl={SUBTITLE} />
            <ButtonRow buttons={mainSiteButtons} />
            <Gallery type="horiz" />
            <Gallery type="vert" />
            <RequestBooking {...FORM} />
            <Contact />
            <Map />
        </main>
    )
}