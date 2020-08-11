import React from "react";
import classes from "./EventsHeader.css"
import Aux from "../../hoc/Aux";
// import bclasses from 'bootstrap/dist/css/bootstrap.min.css';

const EventsHeader = (props) => {

    const options = props.categories.map(category => {
        return <option key={category.id} value={category.id} >{category.name}</option>
    })
    return <Aux>
        <div className={classes.EventsHeader}>
            <h1 className={classes.left}>{props.text}</h1>
            <select data-style="btn-new" className={classes.rigth} title="Select Category" onChange={props.selected}>
                <option value="" onClick={e => props.selectCategory(null, e)}>All Categories</option>
                {options}
            </select>
        </div>
    </Aux>
}

export default EventsHeader;