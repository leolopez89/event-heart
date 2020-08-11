import React from "react";
import classes from './Logo.css'
import ehlogo from "../../assets/images/eh-logo.png";

const Logo = (props) => (
  <div className={classes.Logo} style={{ height: props.height }}>
    <img src={ehlogo} alt="EventHeart" />
    <span>{props.children}</span>
  </div>
);

export default Logo;