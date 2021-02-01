import React, { useEffect, useState } from "react";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { history } from "../helpers";
import { alertActions } from "../actions";
import { PrivateRoute } from "../components";
import { HomePage } from "../HomePage";
import { ClientPage } from "../ClientPage";
import { LoginPage } from "../LoginPage";
import { RegisterPage } from "../RegisterPage";
import { NavBarPage } from "../NavBarPage/NavBarPage";
import styels from "./App.scss";
import { AddClient } from "../components/AddClient";
import { AddCar } from "../components/AddCar";
import { AddVisit } from "../components/AddVisit";

function App() {
  const alert = useSelector((state) => state.alert);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.authentication.user);

  useEffect(() => {
    history.listen((location, action) => {
      // clear alert on location change
      dispatch(alertActions.clear());
    });
  }, []);

  return (
    <div>
      {alert.message && (
        <div className={`alert ${alert.type}`}>{alert.message}</div>
      )}
      <Router history={history}>
        {user && <NavBarPage />}
        <Switch>
          <PrivateRoute exact path="/" component={HomePage} />
          <Route path="/login" component={LoginPage} />
          <Route path="/register" component={RegisterPage} />
          <Route path="/AddClient" component={AddClient} />
          <Route path="/AddCar" component={AddCar} />
          <Route path="/AddVisit" component={AddVisit} />
          <Route path="/Client" component={ClientPage} />

          <Redirect from="*" to="/" />
        </Switch>
      </Router>
    </div>
  );
}

export { App };
