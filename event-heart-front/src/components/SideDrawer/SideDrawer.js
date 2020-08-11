import React from "react";

import NavigationItems from "../NavigationItems/NavigationItems";
import Logo from "../Logo/Logo";
import classes from "./SideDrawer.css"
import Aux from "../../hoc/Aux";
import Backdrop from "../Backdrop/Backdrop";

const SideDrawer = (props) => {
    let attachedClasses = [classes.SideDrawer, classes.Close];
    if(props.open){
        attachedClasses = [classes.SideDrawer, classes.Open]
    }
    return (
        <Aux>
            <Backdrop show={props.open} clicked={props.closed}/>
            <div className={attachedClasses.join(' ')}>
                <Logo height="11%"><strong>Event Heart</strong></Logo>
                <nav>
                    <NavigationItems token={props.token} />
                </nav>
            </div>
        </Aux>
    )
}

export default SideDrawer;
