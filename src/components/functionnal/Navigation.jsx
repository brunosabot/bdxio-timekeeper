import React from "react";
import { NavLink } from "react-router-dom";
import { ReactComponent as Home } from "../svg/home.svg";
import { ReactComponent as Settings } from "../svg/settings.svg";
import styles from "./Navigation.module.css";

const Navigation = React.memo(() => (
  <div className={styles.Navigation}>
    <NavLink className={styles.Links} to="/home">
      <Home fill="#ffffff" />
    </NavLink>
    <NavLink className={styles.Links} to="/settings">
      <Settings fill="#ffffff" />
    </NavLink>
  </div>
));

export default Navigation;
