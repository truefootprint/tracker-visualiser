import { useEffect, useState } from "react";
import Tooltip from "../tooltip";
import ordinal from "../../helpers/ordinal";
import css from "./styles.scss";
import Icon from "../icon";

const Indicator = ({ sector, distribution, threshold, year, ranking, client }) => {
  const [previousRanking, setPreviousRanking] = useState(null);
  const [tooltip, setTooltip] = useState(null);

  const member = {
    type: ranking.rankable_type.toLowerCase(),
    id: ranking.rankable_id
  };

  useEffect(() => {
    if (ranking.rank) {
      client.companyRanking(sector, distribution, threshold, year - 1, ranking.company_id, member)
        .then(({ data }) => setPreviousRanking(data));
    }
  }, [sector, distribution, threshold, year, ranking])

  const percentile = (ranking) => (
    ranking && ranking.rank && ranking.rank / ranking.out_of
  );

  const current = percentile(ranking);
  const previous = percentile(previousRanking);

  let icon, trend;

  if (current === null || previous === null) {
    return null;
  } else if (current < previous) {
    icon = "long-arrow-alt-up";
    trend = css.better;
  } else if (current > previous) {
    icon = "long-arrow-alt-down";
    trend = css.worse;
  } else {
    icon = "equals";
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
    <span className={`indicator ${css.indicator}`}>
      <Icon name={icon} className={trend} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} />
      <Tooltip content={tooltip} />
    </span>
  );
};

export default Indicator;
