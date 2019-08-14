import { useEffect, useState } from "react";
import Tooltip from "../tooltip";
import Client from "../../helpers/client";
import ordinal from "../../helpers/ordinal";
import css from "./styles.scss";

const Indicator = ({ sector, year, ranking }) => {
  const [previousRanking, setPreviousRanking] = useState(null);
  const [tooltip, setTooltip] = useState(null);

  const member = {
    type: ranking.rankable_type.toLowerCase(),
    id: ranking.rankable_id
  };

  useEffect(() => {
    if (ranking.rank && ranking.rankable_type === "Outcome") {
      (new Client()).companyRanking(sector, year - 1, ranking.company_id, member)
        .then(({ data }) => setPreviousRanking(data));
    }
  }, [sector, year, ranking])

  const percentile = (ranking) => (
    ranking && ranking.rank && ranking.rank / ranking.out_of
  );

  const current = percentile(ranking);
  const previous = percentile(previousRanking);

  let icon, trend;

  if (!current || !previous) {
    return null;
  } else if (current < previous) {
    icon = "fa-long-arrow-alt-up";
    trend = css.better;
  } else if (current > previous) {
    icon = "fa-long-arrow-alt-down";
    trend = css.worse;
  } else {
    icon = "fa-equals";
    trend = css.same;
  }

  const handleMouseOver = () => {
    const prevYear = year - 1;
    const rank = ordinal(previousRanking.rank);
    const outOf = previousRanking.out_of;

    setTooltip(`In ${prevYear}, ranked ${rank} out of ${outOf}`);
  };

  const handleMouseOut = () => {
    setTooltip(null);
  };

  return (
    <span className={css.indicator}>
      <i
        className={`fas ${icon} ${trend}`}
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}>
      </i>

      <Tooltip content={tooltip} />
    </span>
  );
};

export default Indicator;
