import React, { Component } from "react";
import bclasses from 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom";
import axios from "axios";

class Login extends Component {

    state = {
        form: {
            user: "",
            password: "",
        },
        errorForm: {
            user: [],
            password: [],
        },
        loading: false,
        error: false,
        token: "",
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
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        headers.append('Accept', 'application/json');

        axios.post('http://localhost:8080/api/login?user=' + this.state.form.user + '&password=' + this.state.form.password)
            .then(response => {
                if (response.data.accessToken && typeof response.data.accessToken !== "undefined" && response.data.accessToken.includes('Bearer')) {
                    this.setState({
                        loading: false,
                        error: false,
                        token: response.data.accessToken,
                    });
                } else {
                    this.setState({
                        loading: false,
                        error: true,
                    });
                }
            })
            .catch(_ => {
                this.setState({
                    loading: false,
                    error: true,
                })
            })
    }

    render() {
        return (
            <form onSubmit={this.sumbitHandler}>
                {
                    this.state.error ?
                        <div className={`${bclasses["alert"]} ${bclasses["alert-danger"]}`}>
                            Error trying to login.
                            </div>
                        : null
                }
                <h2 className={bclasses["text-center"]}>Log in to EventHeart</h2>
                <div className={bclasses['form-group']}>
                    <label htmlFor="user">User</label>
                    <input
                        name="user"
                        id="user"
                        type="text"
                        placeholder="username"
                        className={bclasses["form-control"]}
                        value={this.state.form.user}
                        onChange={(event) => this.changeHandler(event, "user")}
                        required
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
                        className={bclasses["form-control"]}
                        value={this.state.form.password}
                        onChange={(event) => this.changeHandler(event, "password")}
                        required
                    ></input>
                    <div className={bclasses['text-danger']}>{this.state.errorForm.password.join(' ')}</div>
                </div>

                <div className={bclasses["text-center"]}>
                    <button type="submit" className={`${bclasses.btn} ${bclasses["btn-primary"]}`}>Login</button>
                    <div>Are you new here? <span><Link to="/singup">Sing Up</Link></span></div>
                </div>
            </form>
        )
    }
}

export default Login