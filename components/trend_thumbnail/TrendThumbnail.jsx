import { useState, useEffect } from "react";
import Client from "../../helpers/client";
import LineGraph from "../line_graph";
import css from "./styles.scss";

const TrendThumbnail = ({ sector, threshold, ranking, setSubject }) => {
  const [rankings, setRankings] = useState(null);

  const trend = {
    type: "trend",
    id: `${ranking.rankable_type}-${ranking.rankable_id}-${ranking.company_id}`
  };

  useEffect(() => {
    (new Client()).companyRankings(sector, threshold, null, trend)
      .then(({ data }) => setRankings(data));
  }, [sector, threshold, ranking])

  if (!rankings) {
    return null;
  }

  return (
    <a className={css.trend_thumbnail} onClick={() => setSubject(trend)}>
      <LineGraph rankingGroups={[rankings]} thumbnail={true} size={[90, 45]} />
    </a>
  )
};

export default TrendThumbnail;
