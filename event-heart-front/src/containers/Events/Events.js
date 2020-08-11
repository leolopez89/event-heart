import React, { Component } from "react";
import Aux from "../../hoc/Aux";
import EventsHeader from "../../components/EventsHeader/EventsHeader";
import EventsList from "../../components/EventsList/EventsList";
import classes from "./Events.css";
import bclasses from 'bootstrap/dist/css/bootstrap.min.css';

class Events extends Component {

    state = {
        events: [],
        categories: [],
        selectedCategory: "",
        error: false,
    }

    selectCategory = (event) => {
        this.setState({ selectedCategory: event.target.value });
    }


    componentDidMount() {
        let headers = new Headers();

        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/json');

        fetch('http://localhost:8080/api/events', {
            'headers': headers
        })
            .then(res => res.json())
            .then((data) => {
                this.setState({ events: data })
            })
            .catch(_ => { this.setState({ error: true }) });

        fetch('http://localhost:8080/api/categories', {
            'headers': headers
        })
            .then(res => res.json())
            .then((data) => {
                var updatedCategories = data.map(category => {
                    return {
                        id: category.categoryId,
                        name: category.name
                    }
                });
                this.setState({ categories: updatedCategories })
            })
            .catch(_ => { this.setState({ error: true }) });
    }

    render() {

        if (this.state.error)
            return (
                <div className={classes.Events}>
                    <p className={bclasses["text-danger"]}>Ups!! Something went wrong!!</p>
                </div>
            )

        return (
            <Aux>
                <EventsHeader
                    selected={this.selectCategory}
                    categories={this.state.categories}
                    text="Upcoming Events"
                />
                <EventsList
                    events={this.state.events}
                    categories={this.state.categories}
                    selectedCategory={this.state.selectedCategory}
                />
            </Aux>
        );
    }
}

export default Events;