import { useState } from "react";
import css from "./styles.scss";

const Distribution = ({ distribution, setDistribution }) => {
  const [e, s, g] = distribution.split("-");

  const toggle = () => {
    if (distribution === "33-33-33") {
      setDistribution("25-25-50");
    } else {
      setDistribution("33-33-33");
    }
  };

  return (
    <div className={`${css.distribution} ${css[`distribution-${distribution}`]}`} onClick={toggle}>
      <div className={`${css.rectangle} ${css.e}`}>
        E<div className={css.percentage}>{e}</div>
      </div>

      <div className={`${css.rectangle} ${css.s}`}>
        S<div className={css.percentage}>{s}</div>
      </div>

      <div className={`${css.rectangle} ${css.g}`}>
        G<div className={css.percentage}>{g}</div>
      </div>

      <div className={`${css.divider} ${css.left}`}>
        <div className={css.handle} />
      </div>

      <div className={`${css.divider} ${css.right}`}>
        <div className={css.handle} />
      </div>
    </div>
  )
};

export default Distribution;
