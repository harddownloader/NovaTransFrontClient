import styles from "./SeatModal.module.scss";
import React from "react";

export const getBusElementDriver = (key) => {
  return(
    <div key={key} className={styles.busElementWrap}>
      <div className={styles.busElement}>
        <div className={styles.steer}>
          <img
            className={styles.img}
            src="static/img/steer/car-steering-wheel-blue.png"
            alt={"driver"}
          />
        </div>
      </div>
    </div>
  );
}

export const getBusElementWC = (key) => {
  return(
    <div key={key} className={styles.busElementWrap}>
      <div className={styles.busElement}>
        <span>WC</span>
      </div>
    </div>
  );
}

export const getBusElementDoor = (key) => {
  return(
    <div key={key} className={styles.busElementWrap}>
      <div className={styles.busElement}>
        <span>Вход</span>
      </div>
    </div>
  );
}

export const getBusElementBar = (key) => {
  return(
    <div key={key} className={styles.busElementWrap}>
      <div className={styles.busElement}>
        <span>Бар</span>
      </div>
    </div>
  );
}

export const getEmptyBlock = () => {
  return <div className={styles.button}>+</div>
}
