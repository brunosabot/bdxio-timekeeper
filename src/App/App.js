import React from "react";
import { BrowserRouter, Switch, Redirect, Route } from "react-router-dom";
import differenceInSeconds from "date-fns/difference_in_seconds";
import Navigation from "../components/functionnal/Navigation";
import Home from "../routes/home";
import Settings from "../routes/settings";
import AppContext from "./AppContext";
import "./App.css";

const defaultTmings = (localStorage.getItem("timings") || "15,45,105")
  .split(",")
  .map(e => parseInt(e, 10));

class App extends React.Component {
  state = {
    alert: false,
    currentTiming: "00:00:00",
    duration: 0,
    startTiming: null,
    timings: defaultTmings
  };

  interval = 0;

  addTiming = value => () => {
    const { timings: oldTimings } = this.state;
    const timings = [...oldTimings, value].sort((a, b) => (a > b ? 1 : -1));
    this.setState({ timings });
    localStorage.setItem("timings", timings.join(","));
  };

  removeTiming = value => () => {
    this.setState(state => ({
      timings: state.timings.filter(timing => timing !== value)
    }));
  };

  startTiming = duration => () => {
    this.setState({ alert: false, startTiming: new Date(), duration });

    window.clearInterval(this.interval);
    this.interval = window.setInterval(() => {
      const { alert, startTiming } = this.state;

      const diff = duration * 60 - differenceInSeconds(new Date(), startTiming);
      const hours = `${Math.floor(diff / 3600)}`.padStart(2, "0");
      const minutes = `${Math.floor((diff - hours * 3600) / 60)}`.padStart(2, "0");
      const seconds = `${diff - hours * 3600 - minutes * 60}`.padStart(2, "0");
      const newState = { currentTiming: `${hours}:${minutes}:${seconds}` };

      if ([1800, 1200, 600, 300, 120, 60].indexOf(diff) > -1) {
        // In minutes [30, 20, 10, 5, 2]
        window.navigator.vibrate(800);
        newState.alert = true;
      } else if (diff === 0) {
        window.clearInterval(this.interval);
        window.navigator.vibrate([2000, 200, 2000, 200, 2000]); // Terminé
        newState.alert = true;
      } else if (alert === true) {
        window.navigator.vibrate(0); // Clear previous vibrations
        window.navigator.vibrate(800); // Add a new vibration because the timer is still unseen
      }

      this.setState(newState);
    }, 1000);
  };

  viewAlert = () => {
    this.setState({ alert: false });
  };

  render() {
    const { alert, currentTiming, startTiming, timings } = this.state;
    return (
      <AppContext.Provider
        value={{
          values: {
            alert,
            currentTiming,
            startTiming,
            timings
          },
          actions: {
            addTiming: this.addTiming,
            endTiming: this.endTiming,
            removeTiming: this.removeTiming,
            startTiming: this.startTiming,
            viewAlert: this.viewAlert
          }
        }}
      >
        <BrowserRouter basename="/bdxio-timekeeper">
          <React.Fragment>
            <Navigation />
            <Switch>
              <Route path="/settings" component={Settings} />
              <Route path="/home" component={Home} />
              <Redirect to="/home" />
            </Switch>
          </React.Fragment>
        </BrowserRouter>
      </AppContext.Provider>
    );
  }
}

export default App;
