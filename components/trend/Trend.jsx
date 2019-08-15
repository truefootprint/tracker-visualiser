import { useState, useEffect } from "react";
import Breadcrumbs from "../breadcrumbs";
import LineGraph from "../line_graph";
import CompanyDropdown from "../company_dropdown";
import Client from "../../helpers/client";
import css from "./styles.scss";

const Trend = ({ ancestry, sector, distribution, threshold, rankings, year, setSubject }) => {
  const [auditor, setAuditor] = useState(null);

  const [comparisonIds, setComparisonIds] = useState([]);
  const [comparisons, setComparisons] = useState({});

  const [companyListing, setCompanyListing] = useState([]);

  const auditorRanking = rankings.find(r => r.auditor_id);
  const auditorId = (typeof auditorRanking !== "undefined") ? auditorRanking.auditor_id : null;

  const companyId = rankings[0].company_id;
  const client = new Client();

  useEffect(() => {
    if (auditorId) {
      client.company(auditorId).then(({ data }) => setAuditor(data));
    }
  }, [auditorId]);

  useEffect(() => {
    comparisonIds.forEach(id => {
      if (comparisons[id]) {
        return;
      }

      const trend = {
        type: "trend",
        id: `${rankings[0].rankable_type}-${rankings[0].rankable_id}-${id}`
      };

      client.companyRankings(sector, distribution, threshold, null, trend)
        .then(({ data }) => setComparisons(prev => ({ ...prev, [id]: data })));
    });
  }, [sector, distribution, threshold, comparisonIds]);

  useEffect(() => {
    const member = {
      type: rankings[0].rankable_type.toLowerCase(),
      id: rankings[0].rankable_id
    };

    client.companyRankings(sector, distribution, threshold, year, member).then(({ data }) => setCompanyListing(data));
  }, [sector, distribution, threshold, year]);

  let rankingGroups = comparisonIds.map(id => comparisons[id]).filter(v => v);
  rankingGroups.unshift(rankings);

  return (
    <div className={css.trend}>
      {auditor && <div className={css.auditor}>
        <p className={css.text}>Audited by:</p>

        <img className={css.logo} src={auditor.logo} />
      </div>}

      <div className={css.company_dropdown}>
        <label>Compare to:</label>

        <CompanyDropdown rankings={companyListing} exclusionId={companyId} onSelect={id => setComparisonIds([id])} />
      </div>

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
