import React, { Component } from "react";
import Aux from "../../hoc/Aux";
import EventsHeader from "../../components/EventsHeader/EventsHeader";
import EventsList from "../../components/EventsList/EventsList";
import bclasses from 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";

class MyEvents extends Component {

    state = {
        events: [],
        categories: [],
        selectedCategory: "",
        error: false,
        token: ""
    }

    selectCategory = (event) => {
        this.setState({ selectedCategory: event.target.value });
    }


    componentDidMount() {
        const token = localStorage.getItem('token');
        this.setState({ token: token });
        const config = {
            headers: {
                'Authorization': token,
            }
        }
        console.log("TOKEN");
        console.log(token);

        axios.get('http://localhost:8080/api/user', config)
            .then((data) => {
                this.setState({ events: data.data.events })
            })
            .catch(_ => {
                this.setState({ error: true })
            });

        axios.get('http://localhost:8080/api/categories')
            .then((data) => {
                var updatedCategories = data.data.map(category => {
                    return {
                        id: category.categoryId,
                        name: category.name
                    }
                });
                this.setState({ categories: updatedCategories })
            })
            .catch(_ => {
                this.setState({ error: true })
            });
    }

    render() {

        if (this.state.error)
            return (
                <div className={bclasses["text-center"]}>
                    <p className={bclasses["text-danger"]}>Ups!! Something went wrong!!</p>
                </div>
            )

        return (
            <Aux>
                <EventsHeader
                    selected={this.selectCategory}
                    categories={this.state.categories}
                    text="My Events"
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

export default MyEvents;