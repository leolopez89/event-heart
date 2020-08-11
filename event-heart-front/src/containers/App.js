import React, { Component } from 'react';
import Layout from "../components/Layout/Layout";
import Events from './Events/Events';
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import bclasses from 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import Access from '../components/Access/Access';
import Singup from './Singup/Singup';
import MyEvents from './MyEvents/MyEvents';
import Category from './Category/Category';
import NewEvent from './NewEvent/NewEvent';

class App extends Component {

    state = {
        auth: false,
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

    handleValidation = () => {
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

        const qs = require('querystring')

        this.setState({
            loading: true,
            error: false,
            created: 0,
        });
        const config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            }
        }
        const data = { user: this.state.form.user };
        axios.post('http://localhost:8080/api/login?user=' + this.state.form.user + '&password=' + this.state.form.password, qs.stringify(data), config)
            .then(response => {
                if (response.data.accessToken && typeof response.data.accessToken !== "undefined" && response.data.accessToken.includes('Bearer')) {
                    this.setState({
                        loading: false,
                        error: false,
                        token: response.data.accessToken,
                    });
                    localStorage.setItem('token', response.data.accessToken);
                } else {
                    this.setState({
                        loading: false,
                        error: true,
                        token: "",
                    });
                }
            })
            .catch(_ => {
                this.setState({
                    loading: false,
                    error: true,
                    token: "",
                })
            })
    }

    componentDidMount() {
        const token = localStorage.getItem('token');
        if (token) {
            this.setState({ token: token });
        }
    }

    logout = () => {
        localStorage.removeItem('token');
        this.setState({ token: "" });
        return <Redirect to="/home" />
    }

    render() {
        return (<BrowserRouter>
            <div className={bclasses.container}>
                <Layout token={this.state.token}>
                    <Switch>
                        {this.state.token.length ? <Route path="/events" component={MyEvents} /> : null}
                        {this.state.token.length ? <Route path="/new-event" component={NewEvent} /> : null}
                        {this.state.token.length ? <Route path="/new-category" component={Category} /> : null}
                        {this.state.token.length ? <Route path="/logout" render={this.logout} /> : null}

                        {this.state.token.length === 0 ?
                            <Route path="/login" render={() => <Access
                                state={this.state}
                                changeHandler={this.changeHandler}
                                sumbitHandler={this.sumbitHandler}
                            />} />
                            : null}
                        {this.state.token.length === 0 ? <Route path="/singup" component={Singup} /> : null}

                        <Route path="/home" exact component={Events} />
                        <Redirect from="/" to="/home" />
                    </Switch>
                </Layout>
            </div>
        </BrowserRouter >)
    };
}

export default App;
