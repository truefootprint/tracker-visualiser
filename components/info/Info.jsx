import round from "../../helpers/round";
import ordinal from "../../helpers/ordinal";
import css from "./styles.scss";

const Info = ({ ranking, children }) => {
  const showValue = ranking.rankable_type === "Outcome";
  const showAuditor = ranking.auditor_name && showValue;

  const unit = showValue ? ranking.unit_name : ` in ${ranking.year}`;

  let value;
  if (showValue) {
    value = round(ranking.value);
  } else if (ranking.rank) {
    value = `Ranked ${ordinal(ranking.rank)}`;
  } else {
    value = "Insufficient data to rank";
  }

  return (
    <div className="info">
      {children}

      {<div className={css.value}>
        <span className={css.value}>{value}</span>
        <span className={css.unit}>{unit}</span>
      </div>}

      {showAuditor &&
      <div className={css.auditor_name}>(Assured by {ranking.auditor_name} in {ranking.year})</div>}
    </div>
  )
};

export default Info;
