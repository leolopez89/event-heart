import React, { Component } from "react";
import bclasses from 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";

class Category extends Component {

    state = {
        form: {
            name: "",
        },
        errorForm: {
            name: [],
        },
        loading: false,
        error: false,
        token: ""
    }

    componentDidMount() {
        const token = localStorage.getItem('token');
        this.setState({ token: token });
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
        };
        let formIsValid = true;

        if (!fields.name) {
            formIsValid = false;
            errors.name.push("Name cannot be empty.");
        }

        if (typeof fields.name !== "undefined") {
            if (!fields.name.match(/^[a-zA-Z]+$/)) {
                formIsValid = false;
                errors.name.push("Only letters.");
            }
        }

        this.setState({ errorForm: errors });
        return formIsValid;
    }

    sumbitHandler = (event) => {
        event.preventDefault();

        if (!this.handleValidation()) return;

        this.setState({
            loading: true,
            created: 0,
        });

        const config = {
            headers: {
                'Authorization': this.state.token,
            }
        }
        const dataPost = { name: this.state.form.name };
        axios.post('http://localhost:8080/api/categories', dataPost, config)
            .then(response => {
                if (response.data.name && typeof response.data.name !== "undefined" && response.data.name === this.state.form.name) {
                    this.setState({
                        loading: false,
                        created: 1,
                    });
                } else {
                    this.setState({
                        loading: false,
                        created: 2,
                    });
                }
            })
            .catch(_ => {
                this.setState({
                    loading: false,
                    created: 2,
                })
            })
    }

    render() {
        return (
            <form onSubmit={this.sumbitHandler}>
                {
                    this.state.created === 1 ?
                        <div className={`${bclasses["alert"]} ${bclasses["alert-success"]}`}>
                            Category created successfuly.
                        </div>
                        : this.state.created === 2 ?
                            <div className={`${bclasses["alert"]} ${bclasses["alert-danger"]}`}>
                                Error trying to create the category.
                            </div>
                            : null
                }
                <h2 className={bclasses["text-center"]}>Create a new Event</h2>
                <div className={bclasses['form-group']}>
                    <label htmlFor="category">Name</label>
                    <input
                        name="category"
                        id="category"
                        type="text"
                        placeholder="Category name"
                        className={bclasses["form-control"]}
                        value={this.state.form.name}
                        onChange={(event) => this.changeHandler(event, "name")}
                        required
                    ></input>
                    <div className={bclasses['text-danger']}>{this.state.errorForm.name.join(' ')}</div>
                </div>

                <div className={bclasses["text-center"]}>
                    <button type="submit" className={`${bclasses.btn} ${bclasses["btn-primary"]}`}>Create Category</button>
                </div>
            </form>
        )
    }
}

export default Category