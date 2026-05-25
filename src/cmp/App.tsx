import { FORM, TITLE, SUBTITLE, ICON_SRC, mainSiteButtons, ABOUT_TEXT, ABOUT_BOTTOM } from "@/consts";
import Map from "./Map";
import Icon from "./Icon";
import Title from "./Title";
import Contact from "./Contact";
import ButtonRow from "./ButtonRow";
import Gallery from "./gallery/Gallery";
import FeaturedText from "./FeaturedText";
import RequestBooking from "./RequestBooking";
import PhotoUpload from "./gallery/PhotoUpload";
import { useState } from 'react';

export default function App() {
    // increment on successful photo upload, forces galleries to rerender
    const [galleryKey, setGalleryKey] = useState(0);

    return (
        <main className="app">
            <Icon src={ICON_SRC} />
            <Title ttl={TITLE} subTtl={SUBTITLE} />
            <ButtonRow buttons={mainSiteButtons} />
            <Gallery type="horiz" key={`horiz-${galleryKey}`}/>
            <Gallery type="vert" key={`vert-${galleryKey}`}/>
            <RequestBooking {...FORM} />
            <FeaturedText ttl="About Us" text={ABOUT_TEXT} emphasisBtm={ABOUT_BOTTOM} />
            <Contact />
            <Map />
            { /* Render the PhotoUpload component only when /admin page is requested */
                document.cookie.includes('admin=true') &&
                window.location.pathname.startsWith('/admin') &&
                <PhotoUpload onSuccess={() => setGalleryKey(k => k + 1)} />
            }
        </main>
    )
}