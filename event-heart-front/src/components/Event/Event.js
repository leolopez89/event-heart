import bclasses from 'bootstrap/dist/css/bootstrap.min.css';
import React from "react";
import PropTypes from "prop-types";
import classes from "./Event.css";

const Event = (props) => {
    const date = new Date(props.execution)
    const dateTimeFormat = new Intl.DateTimeFormat('en', { year: 'numeric', month: 'short', day: '2-digit' })
    const [{ value: month }, , { value: day },] = dateTimeFormat.formatToParts(date)

    return <div className={classes.Event + ' ' + bclasses.colsm3 + ' ' + bclasses.card}>
        <div className={bclasses["card-body"]}>
            <div className={bclasses.row}>
                <div className={bclasses["col-3"]}>
                    <div className={bclasses.row + ' ' + bclasses["text-success"]}>{month}</div>
                    <div className={bclasses.row + ' ' + bclasses["text-warning"]}><h3>{day}</h3></div>
                </div>
                <div className={bclasses["col-9"]}>
                    <h4 className={bclasses["card-title"]}>{props.name}</h4>
                    <p className={bclasses["card-text"]}>{props.description}</p>
                    <p className={bclasses["card-text"] + ' ' + bclasses["text-info"]}>{props.price ? '$' + props.price : 'free'}</p>
                </div>
            </div>
        </div>
    </div>
}

Event.propTypes = {
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    execution: PropTypes.string,
    price: PropTypes.number,
    uid: PropTypes.number,
}

export default Event;