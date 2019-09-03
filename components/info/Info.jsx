import round from "../../helpers/round";
import ordinal from "../../helpers/ordinal";
import css from "./styles.scss";

const Info = ({ ranking, children }) => {
  const showValue = ranking.rankable_type === "Outcome";
  const showAuditor = ranking.auditor_name && showValue;

  const value = showValue ? round(ranking.value) : `ranked ${ordinal(ranking.rank)}`;
  const unit = showValue ? ranking.unit_name : ` in ${ranking.year}`;

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
