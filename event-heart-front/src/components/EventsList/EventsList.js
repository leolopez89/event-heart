import bclasses from 'bootstrap/dist/css/bootstrap.min.css';
import React from "react";

import Event from "../Event/Event";

const EventsList = (props) => {
    let displayEvents = props.events;
    if (props.selectedCategory.length) {
        displayEvents = displayEvents.filter(event => Number(event.idCategory) === Number(props.selectedCategory));
    }
    const events = displayEvents ? displayEvents.map((event, index) => {
        return <Event
            // click={() => props.clicked(index)}
            name={event.name}
            description={event.description}
            execution={event.execution}
            price={event.price}
            id={event.uid}
            key={event.uid}
        />
    }) : null;
    return (
        <div className={bclasses.row}>
            {events}
        </div>
    );
}

export default EventsList;