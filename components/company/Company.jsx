import { useState, useEffect } from "react";
import round from "../../helpers/round";
import Breadcrumbs from "../breadcrumbs";
import Ranking from "../ranking";
import TrendThumbnail from "../trend_thumbnail";
import Year from "../year";
import Info from "../info";
import css from "./styles.scss";

const Company = ({ ancestry, rankings, sector, distribution, threshold, year, setYear, setSubject, setTrendView, esg, client }) => {
  const [auditor, setAuditor] = useState(null);

  const ranking = (member) => (
    rankings.find(r => r.rankable_type.toLowerCase() == member.type.toLowerCase() && r.rankable_id == member.id)
  );

  const auditorRanking = rankings.find(r => r.auditor_id);
  const auditorId = (typeof auditorRanking !== "undefined") ? auditorRanking.auditor_id : null;

  useEffect(() => {
    if (auditorId) {
      client.company(auditorId).then(({ data }) => setAuditor(data));
    }
  }, [auditorId])

  const rootRanking = ranking(esg);

  rootRanking.children = ancestry.descendents.map(child => {
    const childRanking = ranking(child);
    childRanking.children = child.descendents.map(grandchild => ranking(grandchild));

    return childRanking;
  });

  return (
    <div className={css.company}>
      {auditor && <div className={css.auditor}>
        <p className={css.text}>Assured by:</p>

        <img className={css.logo} src={auditor.logo} />
      </div>}

      <Breadcrumbs
        ancestry={ancestry}
        sector={sector}
        current={rankings[0].company_name}
        setSubject={setSubject}
      />

      <div className={css.top_level}>
        <img className={css.logo} src={rankings[0].company_logo} />

        <div className={css.title}>
          {ranking(esg).rankable_name} rating:

          <div className={css.year}>
            <Year year={year} setYear={setYear} />
          </div>
        </div>

        <div className={css.trend}>
          <div className={css.esg_score}>
            ESG score: <span>{round(ranking(esg).value)}</span>
          </div>

          <TrendThumbnail
            sector={sector}
            distribution={distribution}
            threshold={threshold}
            ranking={ranking(esg)}
            setSubject={setSubject}
            setTrendView={setTrendView}
            size={[240, 120]}
            client={client} />
        </div>

        <div className={css.ranking}>
          <Ranking
            ranking={ranking(esg)}
            setSubject={setSubject}
            setTrendView={setTrendView}
            sector={sector}
            distribution={distribution}
            threshold={threshold}
            year={year}
            size={[240, 120]}
            nullText="Insufficient data points."
            suffix={` in ${sector}`}
            client={client} />
        </div>
      </div>

      <div className={css.breakdown}>
        {rootRanking.children.map((r, i) => (
          <div key={i} className={css.section}>
            <div className={css.overall_ranking}>
              <div className={css.title}>
                {r.rankable_name}:
              </div>

              <div className={css.ranking}>
                <Ranking
                  ranking={r}
                  setSubject={setSubject}
                  setTrendView={setTrendView}
                  sector={sector}
                  distribution={distribution}
                  threshold={threshold}
                  year={year}
                  size={[120, 60]}
                  nullText="Insufficient data points."
                  client={client}>

                  <div className={css.info}>
                    <TrendThumbnail
                      sector={sector}
                      distribution={distribution}
                      threshold={threshold}
                      ranking={r}
                      setSubject={setSubject}
                      setTrendView={setTrendView}
                      size={[120, 60]}
                      client={client} />
                  </div>
                </Ranking>
              </div>
            </div>

            {r.children.map((r, i) => (
              <div key={i} className={css.outcome}>
                <div className={css.title}>
                  {r.rankable_name}
                </div>

                <div className={css.ranking}>
                  <Ranking
                    ranking={r}
                    setSubject={setSubject}
                    setTrendView={setTrendView}
                    sector={sector}
                    distribution={distribution}
                    threshold={threshold}
                    year={year}
                    size={[80, 40]}
                    client={client}>

                    <Info ranking={r}>
                      <TrendThumbnail
                        sector={sector}
                        distribution={distribution}
                        threshold={threshold}
                        ranking={r}
                        setSubject={setSubject}
                        setTrendView={setTrendView}
                        client={client} />
                    </Info>
                  </Ranking>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Company;
