import { useState, useEffect } from "react";
import Client from "../../helpers/client";
import LineGraph from "../line_graph";
import css from "./styles.scss";

const TrendThumbnail = ({ sector, ranking, setSubject }) => {
  const [rankings, setRankings] = useState(null);

  const trend = {
    type: "trend",
    id: `${ranking.rankable_type}-${ranking.rankable_id}-${ranking.company_id}`
  };

  useEffect(() => {
    (new Client()).companyRankings(sector, null, trend)
      .then(({ data }) => setRankings(data));
  }, [sector, ranking])

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