import Menu from "./Menu";
import Icon from "./Icon";
import Gallery from "./Gallery";
import Contact from "./Contact";
import Header from "./Header";
import Title from "./Title";
import eob from "../data/events-on-broadway-data.json"
export default function App() {
    return (
        <main className="app">
            <Header>
                <Icon src={ eob.data.logoSrc } />
                <Title text={eob.data.siteTitle} subText={ eob.data.subTitle } />
                <Menu />
            </Header>
            <Gallery />
            <Contact />
        </main>
    );
}