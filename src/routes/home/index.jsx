import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Timer from "./Timer/Timer";

const Admin = () => (
  <Switch>
    <Route path="/home/timer" component={Timer} />
    <Redirect to="/home/timer" />
  </Switch>
);

export default Admin;
