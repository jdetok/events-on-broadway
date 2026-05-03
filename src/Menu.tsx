type PageDirect = {
    cssClass: string;
    text: string;
}

const pageDirects: PageDirect[] = [
    {cssClass: 'home', text: 'Home'},
    {cssClass: 'contact', text: 'Contact Us'},
    {cssClass: 'about', text: 'About Us'},
];

function buildPageDirects(pageDirects: PageDirect[]) {
    return pageDirects.map((pd) => (
        <button key={pd.cssClass} className={pd.cssClass}>{pd.text}</button>
    ));
}

export default function Menu() {
    const menu = (
        <div className="menu">
            {buildPageDirects(pageDirects)}
        </div>
    )
    menu.props
    return menu;
}