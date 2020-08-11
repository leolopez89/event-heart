import React from "react";
import bclasses from 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom";

const Access = (props) => (
    <form onSubmit={props.sumbitHandler}>
        {
            props.state.error ?
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
                value={props.state.form.user}
                onChange={(event) => props.changeHandler(event, "user")}
                required
            ></input>
            <div className={bclasses['text-danger']}>{props.state.errorForm.user.join(' ')}</div>
        </div>

        <div className={bclasses['form-group']}>
            <label htmlFor="password">Password</label>
            <input
                name="password"
                id="password"
                type="password"
                placeholder="password"
                className={bclasses["form-control"]}
                value={props.state.form.password}
                onChange={(event) => props.changeHandler(event, "password")}
                required
            ></input>
            <div className={bclasses['text-danger']}>{props.state.errorForm.password.join(' ')}</div>
        </div>

        <div className={bclasses["text-center"]}>
            <button type="submit" className={`${bclasses.btn} ${bclasses["btn-primary"]}`}>Login</button>
            <div>Are you new here? <span><Link to="/singup">Sing Up</Link></span></div>
        </div>
    </form>
);

export default Access