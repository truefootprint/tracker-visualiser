import round from "../../helpers/round";
import Ordinal from "../ordinal";
import css from "./styles.scss";

const Info = ({ ranking, children, trendView }) => {
  const showValue = trendView === "by_value";
  const showAuditor = ranking.auditor_name && showValue;

  let value;
  if (showValue) {
    value = round(ranking.value);
  } else if (ranking.rank) {
    value = <>Ranked <Ordinal number={ranking.rank} /></>;
  } else {
    value = "Insufficient data to rank";
  }

  let prefix, suffix;
  if (trendView === "by_rank") {
    suffix = ` in ${ranking.year}`;
  } else if (ranking.rankable_type === "Group") {
    prefix = `${ranking.rankable_name} score: `;
    suffix = ` in ${ranking.year}`;
  } else if (showValue) {
    suffix = ranking.unit_name;
  }

  return (
    <div className="info">
      {children}

      {<div className={css.value}>
        <span className={css.prefix}>{prefix}</span>
        <span className={css.value}>{value}</span>
        <span className={css.suffix}>{suffix}</span>
      </div>}

      {showAuditor &&
      <div className={css.auditor_name}>(Assured by {ranking.auditor_name} in {ranking.year})</div>}
    </div>
  )
};

export default Info;
