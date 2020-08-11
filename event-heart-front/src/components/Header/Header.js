import React from "react";
import classes from "./Header.css"
import Logo from "../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import DrawerToggle from "../SideDrawer/DrawerToggle/DrawerToggle"

const Header = (props) => (
    <header className={classes.Header}>
        <Logo height="100%"/>
        <nav className={classes.DesktopOnly}>
            <NavigationItems token={props.token} />
        </nav>
        <DrawerToggle clicked={props.drawerToggleClicked} />
    </header>
)

export default Header;