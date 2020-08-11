import React from 'react';

import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';
import Aux from '../../hoc/Aux';


const NavigationItems = (props) => (
    <ul className={classes.NavigationItems}>
        <NavigationItem link="/home">All Events</NavigationItem>
        {
            props.token.length
                ?
                <Aux>
                    <NavigationItem link="/new-event">New Event</NavigationItem>
                    <NavigationItem link="/new-category">New Category</NavigationItem>
                    <NavigationItem link="/events">My Events</NavigationItem>
                    <NavigationItem link="/logout">Logout</NavigationItem>
                </Aux>
                : null
        }
        {
            props.token.length === 0
                ?
                <Aux>
                    <NavigationItem link="/login">Login</NavigationItem>
                    <NavigationItem link="/singup">Sing Up</NavigationItem>
                </Aux>
                : null
        }
    </ul>
);

export default NavigationItems;