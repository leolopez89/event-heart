import React, { Component } from "react";
import Aux from "../../hoc/Aux";
import classes from './Layout.css'
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import SideDrawer from "../SideDrawer/SideDrawer";

class Layout extends Component {

    state = {
        showSideDrawer: false
    }

    sideDrawerCloseHandler = () => {
        this.setState({ showSideDrawer: false });
    }

    sideDrawerToggleHandler = () => {
        this.setState((prevState) => {
            return { showSideDrawer: !prevState.showSideDrawer };
        })
    }
    render() {
        return (
            <Aux>
                <Header
                    token={this.props.token}
                    drawerToggleClicked={this.sideDrawerToggleHandler}
                />
                <SideDrawer
                    token={this.props.token}
                    closed={this.sideDrawerCloseHandler}
                    open={this.state.showSideDrawer}
                />
                <main className={classes.Content}>
                    {this.props.children}
                </main>
                <Footer />
            </Aux>
        )
    }
}

export default Layout;