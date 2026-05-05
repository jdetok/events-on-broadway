import Button from "../Button";

type PageDirect = {
    cssClass: string;
    text: string;
}

const pageDirects: PageDirect[] = [
    {cssClass: 'btn-home', text: 'Home'},
    {cssClass: 'btn-contact', text: 'Contact Us'},
    {cssClass: 'btn-about', text: 'About Us'},
];

function buildPageDirects(pageDirects: PageDirect[]) {
    return pageDirects.map((pd) => (
        <Button onClick={(e) => {console.log('clicked')}}>{pd.text}</Button>
    ));
}

export default function Menu() {
    const menu = (
        <div className="menu">
            {buildPageDirects(pageDirects)}
        </div>
    )
    // menu.props
    return menu;
}