import round from "../../helpers/round";
import css from "./styles.scss";

const Info = ({ ranking }) => {
  if (ranking.value === null) {
    return null;
  }

  return (
    <div className="info">
      {<div className={css.value}>
        <span className={css.value}>{round(ranking.value)}</span>
        <span className={css.unit}>{ranking.unit_name}</span>
      </div>}

      {ranking.auditor_name &&
      <div className={css.auditor_name}>(Audited by {ranking.auditor_name})</div>}
    </div>
  );
};

export default Info;