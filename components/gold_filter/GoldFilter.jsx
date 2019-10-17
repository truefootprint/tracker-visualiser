import { useState, useEffect } from "react";
import css from "./styles.scss";

const metals = ["Copper", "Gold", "Iron", "Zinc"];

const GoldFilter = ({ metal, setMetal }) => (
  <div className={css.tag_filters}>
    <select className={metal ? "" : css.default}defaultValue={metal} onChange={e => setMetal(e.target.value)}>
      <option>-- Metal --</option>

      {metals.map((m, index) => (
        <option key={index} value={m}>{m}</option>
      ))}
    </select>
  </div>
);

export default GoldFilter;
