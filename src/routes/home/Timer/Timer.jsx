import React from "react";
import AppContext from "../../../App/AppContext";
import styles from "./Timer.module.css";

const Timer = () => (
  <AppContext.Consumer>
    {({ actions, values }) => (
      <React.Fragment>
        <div className={styles.Buttons}>
          {values.timings.map(timing => (
            <button key={timing} className={styles.Button} onClick={actions.startTiming(timing)}>
              {timing}
            </button>
          ))}
        </div>
        <div className={styles.Timer} style={values.alert ? { color: "red", fontSize: "3em" } : {}}>
          {values.currentTiming}
        </div>
      </React.Fragment>
    )}
  </AppContext.Consumer>
);

export default Timer;
