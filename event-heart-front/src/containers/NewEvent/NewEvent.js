import React, { Component } from "react";
import bclasses from 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";

class NewEvent extends Component {
    state = {
        form: {
            name: "",
            description: "",
            datetime: new Date().toISOString(),
            price: 0,
            category: 0,
        },
        errorForm: {
            name: [],
            description: [],
            datetime: [],
            price: [],
            category: [],
        },
        loading: false,
        error: false,
        created: 0,
        token: "",
        categories: [],
    }

    componentDidMount() {
        const token = localStorage.getItem('token');
        this.setState({ token: token });

        axios.get('http://localhost:8080/api/categories')
            .then((data) => {
                var updatedCategories = data.data.map(category => {
                    return {
                        id: category.categoryId,
                        name: category.name
                    }
                });
                this.setState({ categories: updatedCategories })
                
                if (updatedCategories.length > 0) {
                    
                    const updatedForm = { ...this.state.form };
                    updatedForm.category = updatedCategories[0].id;
                    this.setState({ form: updatedForm });
                }
            })
            .catch(_ => {
                this.setState({ error: true })
            });
    }

    changeHandler = (event, element) => {
        const updatedForm = { ...this.state.form };
        updatedForm[element] = event.target.value;
        this.setState({ form: updatedForm });
    }


    handleValidation() {
        let fields = this.state.form;
        let errors = {
            name: [],
            description: [],
            datetime: [],
            price: [],
            category: [],
        };
        let formIsValid = true;

        if (!fields.name) {
            formIsValid = false;
            errors.name.push("Name cannot be empty.");
        }

        if (typeof fields.name !== "undefined") {
            if (fields.name.length < 6) {
                formIsValid = false;
                errors.name.push("At least 6 letters.");
            }
        }

        if (!fields.description) {
            formIsValid = false;
            errors.description.push("description cannot be empty.");
        }

        if (typeof fields.description !== "undefined") {
            if (fields.description.trim().length < 8) {
                formIsValid = false;
                errors.description.push("At least 8 charactes.");
            }
        }

        if (!fields.datetime) {
            formIsValid = false;
            errors.description.push("description cannot be empty.");
        }

        if (typeof fields.price !== "undefined") {
            if (isNaN(fields.price)) {
                formIsValid = false;
                errors.price.push("Only numbers.");
            }
        }

        if (!fields.category) {
            formIsValid = false;
            errors.category.push("Category cannot be empty.");
        }
        this.setState({ errorForm: errors });
        return formIsValid;
    }

    sumbitHandler = (event) => {
        event.preventDefault();

        if (!this.handleValidation()) return;

        this.setState({
            loading: true,
            error: false,
            created: 0,
        });
        const formData = {
            name: this.state.form.name,
            description: this.state.form.description,
            execution: this.state.form.datetime,
            enabled: true,
            price: this.state.form.price,
        };

        const config = {
            headers: {
                'Authorization': this.state.token,
            }
        }

        axios.post('http://localhost:8080/api/events/' + this.state.form.category + '/event', formData, config)
            .then(response => {
                if (response.data.name && typeof response.data.name !== "undefined" && response.data.name === this.state.form.name) {
                    this.setState({
                        loading: false,
                        error: false,
                        created: 1,
                    });
                } else {
                    this.setState({
                        loading: false,
                        error: true,
                        created: 2,
                    });
                }
            })
            .catch(_ => {
                this.setState({
                    loading: false,
                    error: true,
                    created: 2,
                })
            })
    }

    render() {

        const options = this.state.categories.map(category => {
            return <option key={category.id} value={category.id} >{category.name}</option>
        })
        return (
            <form onSubmit={this.sumbitHandler}>
                {
                    this.state.created === 1 ?
                        <div className={`${bclasses["alert"]} ${bclasses["alert-success"]}`}>
                            Event created successfuly.
                    </div>
                        : this.state.created === 2 ?
                            <div className={`${bclasses["alert"]} ${bclasses["alert-danger"]}`}>
                                Error trying to create the event.
                        </div>
                            : null
                }

                <h2 className={bclasses["text-center"]}>Create a new Event</h2>
                <div className={bclasses['form-group']}>
                    <label htmlFor="event">Name</label>
                    <input
                        name="event"
                        id="event"
                        type="text"
                        placeholder="Event name"
                        value={this.state.form.name}
                        className={bclasses["form-control"]}
                        onChange={(event) => this.changeHandler(event, "name")}
                        required
                        autoComplete="name"
                    ></input>
                    <div className={bclasses['text-danger']}>{this.state.errorForm.name.join(' ')}</div>
                </div>

                <div className={bclasses['form-group']}>
                    <label htmlFor="description">Description</label>
                    <input
                        name="description"
                        id="description"
                        type="text"
                        placeholder="Description"
                        value={this.state.form.description}
                        className={bclasses["form-control"]}
                        onChange={(event) => this.changeHandler(event, "description")}
                        required
                        autoComplete="new-description"
                    ></input>
                    <div className={bclasses['text-danger']}>{this.state.errorForm.description.join(' ')}</div>
                </div>

                <div className={bclasses['form-group']}>
                    <label htmlFor="datetime">Date of the Event</label>
                    <input
                        name="datetime"
                        id="datetime"
                        type="text"
                        value={this.state.form.datetime}
                        placeholder={this.state.form.datetime}
                        className={bclasses["form-control"]}
                        onChange={(event) => this.changeHandler(event, "datetime")}
                        required
                        autoComplete="new-description"
                    ></input>
                    <div className={bclasses['text-danger']}>{this.state.errorForm.datetime.join(' ')}</div>
                </div>

                <div className={bclasses['form-group']}>
                    <label htmlFor="price">Price of the Event</label>
                    <input
                        name="price"
                        id="price"
                        type="text"
                        value={this.state.form.price}
                        placeholder="Price"
                        className={bclasses["form-control"]}
                        onChange={(event) => this.changeHandler(event, "price")}
                        required
                        autoComplete="new-description"
                    ></input>
                    <div className={bclasses['text-danger']}>{this.state.errorForm.price.join(' ')}</div>
                </div>

                <div className={bclasses['form-group']}>
                    <label htmlFor="category">Select a Category</label>
                    <select className={bclasses["form-control"]} id="category" onChange={(event) => this.changeHandler(event, "category")}>
                        {options}
                    </select>
                </div>
                <div className={bclasses['text-danger']}>{this.state.errorForm.category.join(' ')}</div>


                <div className={bclasses["text-center"]}>
                    <button type="submit" className={`${bclasses.btn} ${bclasses["btn-primary"]}`}>Create Event</button>
                </div>
            </form>
        )
    }
}

export default NewEvent