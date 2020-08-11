import React, { Component } from "react";
import bclasses from 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom";
import axios from "axios";

class Singup extends Component {
    state = {
        form: {
            user: "",
            password: "",
            repeated: "",
        },
        errorForm: {
            user: [],
            password: [],
            repeated: []
        },
        loading: false,
        error: false,
        created: 0,
    }

    changeHandler = (event, element) => {
        const updatedForm = { ...this.state.form };
        updatedForm[element] = event.target.value;
        this.setState({ form: updatedForm });
    }

    handleValidation() {
        let fields = this.state.form;
        let errors = {
            user: [],
            password: [],
            repeated: [],
        };
        let formIsValid = true;

        if (!fields.user) {
            formIsValid = false;
            errors.user.push("User cannot be empty.");
        }

        if (typeof fields.user !== "undefined") {
            if (!fields.user.match(/^[a-zA-Z]+$/)) {
                formIsValid = false;
                errors.user.push("Only letters.");
            }
            if (fields.user.length < 6) {
                formIsValid = false;
                errors.user.push("At least 6 letters.");
            }
        }

        if (!fields.password) {
            formIsValid = false;
            errors.password.push("Password cannot be empty.");
        }

        if (typeof fields.password !== "undefined") {
            if (!fields.password.match(/^[a-zA-Z0-9]+$/)) {
                formIsValid = false;
                errors.password.push("Only numbers and letters.");
            }
            if (fields.password.trim().length < 8) {
                formIsValid = false;
                errors.password.push("At least 8 charactes.");
            }
        }
        if (fields.password !== fields.repeated) {
            formIsValid = false;
            errors.repeated.push("Passwords not math.");
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
            name: this.state.form.user,
            password: this.state.form.password,
        };

        axios.post('http://localhost:8080/api/register', formData)
            .then(response => {
                if (response.data.name && typeof response.data.name !== "undefined" && response.data.name === this.state.form.user) {
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
        return (
            <form onSubmit={this.sumbitHandler}>
                {
                    this.state.created === 1 ?
                        <div className={`${bclasses["alert"]} ${bclasses["alert-success"]}`}>
                            User created successfuly. You can <Link to="/login">Login now</Link>
                        </div>
                        : this.state.created === 2 ?
                            <div className={`${bclasses["alert"]} ${bclasses["alert-danger"]}`}>
                                Error creating the user. Maybe it exist or there is a network error.
                            </div>
                            : null
                }

                <h2 className={bclasses["text-center"]}>Create Accout</h2>
                <div className={bclasses['form-group']}>
                    <label htmlFor="user">User</label>
                    <input
                        name="user"
                        id="user"
                        type="text"
                        placeholder="username"
                        value={this.state.form.user}
                        className={bclasses["form-control"]}
                        onChange={(event) => this.changeHandler(event, "user")}
                        required
                        autoComplete="name"
                    ></input>
                    <div className={bclasses['text-danger']}>{this.state.errorForm.user.join(' ')}</div>
                </div>

                <div className={bclasses['form-group']}>
                    <label htmlFor="password">Password</label>
                    <input
                        name="password"
                        id="password"
                        type="password"
                        placeholder="password"
                        value={this.state.form.password}
                        className={bclasses["form-control"]}
                        onChange={(event) => this.changeHandler(event, "password")}
                        required
                        autoComplete="new-password"
                    ></input>
                    <div className={bclasses['text-danger']}>{this.state.errorForm.password.join(' ')}</div>
                </div>

                <div className={bclasses['form-group']}>
                    <label htmlFor="confirm">Confirm your Password</label>
                    <input
                        name="confirm"
                        id="confirm"
                        type="password"
                        value={this.state.form.repeated}
                        placeholder="repeat your password"
                        className={bclasses["form-control"]}
                        onChange={(event) => this.changeHandler(event, "repeated")}
                        required
                    ></input>
                    <div className={bclasses['text-danger']}>{this.state.errorForm.repeated.join(' ')}</div>
                </div>

                <div className={bclasses["text-center"]}>
                    {
                        this.state.loading
                            ? <div className={`${bclasses["spinner-border"]} ${bclasses["text-primary"]}`} role="status">
                                <span className={bclasses["sr-only"]}>Loading...</span>
                            </div>
                            : <button type="submit" className={`${bclasses.btn} ${bclasses["btn-primary"]}`}>Sing Up</button>
                    }

                    <div>You have an account? <span><Link to="/login">Login</Link></span></div>
                </div>
            </form>
        )
    }
}

export default Singup