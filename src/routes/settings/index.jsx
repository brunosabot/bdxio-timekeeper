import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import List from "./List/List";

const Admin = () => (
  <Switch>
    <Route path="/settings/list" component={List} />
    <Redirect to="/settings/list" />
  </Switch>
);

export default Admin;
