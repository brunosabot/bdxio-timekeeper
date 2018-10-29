import React from "react";
import AppContext from "../../../App/AppContext";
import { ReactComponent as Check } from "../../../components/svg/check.svg";
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
        <div className={`${styles.Timer} ${values.alert ? styles.TimerActive : ""}`}>
          {values.currentTiming}
        </div>
        {values.alert ? (
          <button className={styles.AlertButton} onClick={actions.viewAlert}>
            <Check className={styles.AlertButtonIcon} />
          </button>
        ) : null}
      </React.Fragment>
    )}
  </AppContext.Consumer>
);

export default Timer;
