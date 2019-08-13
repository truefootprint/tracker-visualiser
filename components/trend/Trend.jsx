import { useState, useEffect } from "react";
import Breadcrumbs from "../breadcrumbs";
import LineGraph from "../line_graph";
import Client from "../../helpers/client";
import css from "./styles.scss";

const Trend = ({ ancestry, sector, rankings, setSubject }) => {
  const [auditor, setAuditor] = useState(null);

  const [comparisonIds, setComparisonIds] = useState([1, 2, 3]);
  const [comparisons, setComparisons] = useState({});

  const auditorRanking = rankings.find(r => r.auditor_id);
  const auditorId = (typeof auditorRanking !== "undefined") ? auditorRanking.auditor_id : null;

  useEffect(() => {
    if (auditorId) {
      (new Client()).company(auditorId).then(({ data }) => setAuditor(data));
    }
  }, [auditorId]);

  useEffect(() => {
    comparisonIds.forEach(id => {
      if (comparisons[id]) {
        return;
      }

      const trend = { type: "trend", id: `${rankings[0].rankable_id}-${id}` };

      (new Client()).companyRankings(sector, null, trend)
        .then(({ data }) => setComparisons(prev => ({ ...prev, [id]: data })));
    });
  }, [comparisonIds]);

  let rankingGroups = comparisonIds.map(id => comparisons[id]).filter(v => v);
  rankingGroups.unshift(rankings);

  return (
    <div className={css.trend}>
      {auditor && <div className={css.auditor}>
        <p className={css.text}>Audited by:</p>

        <img className={css.logo} src={auditor.logo} />
      </div>}

      <Breadcrumbs
        ancestry={ancestry}
        sector={sector}
        above={{ type: "company", id: rankings[0].company_id, name: rankings[0].company_name }}
        below={{ type: "outcome", id: rankings[0].rankable_id, name: rankings[0].rankable_name }}
        current="History"
        setSubject={setSubject}
      />

      <div className={css.top_level}>
        <img className={css.logo} src={rankings[0].company_logo} />
      </div>

      <h2 className={css.title}>
        {rankings[0].rankable_name}
      </h2>

      <LineGraph rankingGroups={rankingGroups} />
    </div>
  );
};

export default Trend;
