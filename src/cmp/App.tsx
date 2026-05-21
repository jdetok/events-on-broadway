import Map from "./Map";
import Icon from "./Icon";
import Title from "./Title";
import Contact from "./Contact";
import ButtonRow from "./ButtonRow";
import Gallery from "./gallery/Gallery";
import FeaturedText from "./FeaturedText";
import RequestBooking from "./RequestBooking";
import { FORM, TITLE, SUBTITLE, ICON_SRC, mainSiteButtons, ABOUT_TEXT, ABOUT_BOTTOM } from "@/consts";

export default function App() {
    window.onresize = () => console.log(`Width: ${window.innerWidth}px, Height: ${window.innerHeight}px`);
    return (
        <main className="app">
            <Icon src={ICON_SRC} />
            <Title ttl={TITLE} subTtl={SUBTITLE} />
            <ButtonRow buttons={mainSiteButtons} />
            <Gallery type="horiz" />
            <Gallery type="vert" />
            <RequestBooking {...FORM} />
            <FeaturedText ttl="About Us" text={ABOUT_TEXT} emphasisBtm={ABOUT_BOTTOM} />
            <Contact />
            <Map />
        </main>
    )
}