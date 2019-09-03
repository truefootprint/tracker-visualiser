import { useState, useEffect } from "react";
import LineGraph from "../line_graph";
import css from "./styles.scss";

const TrendThumbnail = ({ sector, distribution, threshold, ranking, setSubject, setTrendView, trendView, size, client }) => {
  const [rankings, setRankings] = useState(null);

  const trend = {
    type: "trend",
    id: `${ranking.rankable_type}-${ranking.rankable_id}-${ranking.company_id}`
  };

  const visitTrendValue = () => {
    setTrendView("by_value");
    setSubject(trend);
  };

  useEffect(() => {
    client.companyRankings(sector, distribution, threshold, null, null, trend)
      .then(({ data }) => setRankings(data));
  }, [sector, distribution, threshold, ranking])

  if (!rankings) {
    return null;
  }

  return (
    <a className={css.trend_thumbnail} onClick={visitTrendValue}>
      <LineGraph rankingGroups={[rankings]} trendView={trendView} thumbnail={true} size={size || [90, 45]} />
    </a>
  )
};

export default TrendThumbnail;
