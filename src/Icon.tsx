const EOB_EXISTING_ICON = "https://le-cdn.website-editor.net/s/d23deb51a9a642e2a7294c47faeb5b82/dms3rep/multi/opt/Events23-ea8102af-613h.jpg?Expires=1779728439&Signature=XUxDH-QTTaaSFjO0~K9vGYRi6LKSTn7E5OzDoEjW45bORCh00nrKcGgTAJDpWSAfvZjHj1I5WR~uEXxxn2P3SMqWFU6Ki5~Yhp5gaD0ryGetCSH5pHiKA5nElFbjo9abds-W358vcsxBmf4c~wVPP5UBLAUvJXpj3ZnyoDCulj9gGL-MrLpxn4ouTwelYXkolbkbIqkYpFAP1PW0wJVZRdSwG2y6Q2BGDaSlRkD2KJ4RqHfkS9VcDjjNh87~BIKpg9l1QX7uZT9aaMhs-MJ-zPEr1fZGOJt12Xhd8WX85aRNmI9CLL2fr8wHLiwaYuz4vUldUbQX8c41roRQUNBaRg__&Key-Pair-Id=K2NXBXLF010TJW"

export default function Icon() {
    return (
        <div className="icon">
            <img src={`${EOB_EXISTING_ICON}`}></img>
        </div>
    )
}