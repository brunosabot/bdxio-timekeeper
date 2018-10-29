import React from "react";
import styles from "./List.module.css";
import AppContext from "../../../App/AppContext";
import { ReactComponent as Close } from "../../../components/svg/close.svg";

const List = () => {
  const [timing, setTiming] = React.useState("30");

  return (
    <AppContext.Consumer>
      {({ actions, values }) => (
        <div className={styles.List}>
          <input
            className={styles.Input}
            value={timing || ""}
            onChange={e => setTiming(parseInt(e.target.value, 10))}
          />
          <button className={styles.Button} onClick={actions.addTiming(parseInt(timing, 10))}>
            Ajouter une durée
          </button>
          <div className={styles.Timings}>
            {values.timings.map(timing => (
              <div key={timing} className={styles.Timing}>
                <span>{timing}</span>
                <button className={styles.RemoveButton} onClick={actions.removeTiming(timing)}>
                  <Close />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </AppContext.Consumer>
  );
};

export default List;
