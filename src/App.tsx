import Menu from "./cmp/header/Menu";
import Icon from "./cmp/image/Icon";
import Gallery from "./cmp/gallery/Gallery";
import Contact from "./cmp/contact/Contact";
import Header from "./cmp/header/Header";
import Title from "./cmp/header/Title";
import eob from "../data/events-on-broadway-data.json"
import Background from "./cmp/image/Background";
import RequestBooking, { type formData } from "./cmp/contact/RequestBooking";
export default function App() {
    return (
        <main className="app">
            <Header>
                <Icon src={ eob.data.logoSrc } />
                <Title text={ eob.data.siteTitle } subText={ `${eob.data.subTitle} | ${eob.data.contact.addr.street}` } />
                <Menu />
            </Header>
            <Background />
            <Gallery />
            <RequestBooking {...eob.data.form as formData} />
            <Contact />
        </main>
    );
}