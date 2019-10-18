import { useState, useEffect } from "react";
import round from "../../helpers/round";
import Breadcrumbs from "../breadcrumbs";
import Ranking from "../ranking";
import TrendThumbnail from "../trend_thumbnail";
import Year from "../year";
import Info from "../info";
import LogoPair from "../logo_pair";
import css from "./styles.scss";

const Company = ({ ancestry, rankings, sector, distribution, threshold, year, setYear, setSubject, setTrendView, trendView, esg, client }) => {
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
  if (!rootRanking) return null;

  rootRanking.children = ancestry.descendents.map(child => {
    const childRanking = ranking(child);
    if (!childRanking) return;

    childRanking.children = child.descendents
      .map(grandchild => ranking(grandchild))
      .filter(x => x)
      .filter(x => x.out_of > 0);

    return childRanking;
  }).filter(x => x);

  const stableSort = (rankings) => {
    let ranksWithIndices = rankings.map((r, i) => ({ r, i }));

    ranksWithIndices.sort(({ r: a, i: ai }, { r: b, i: bi }) => {
      const aHasARank = !!a.rank;
      const bHasARank = !!b.rank;

      if (aHasARank && bHasARank || !aHasARank && !bHasARank) {
        return ai - bi;
      } else if (aHasARank) {
        return -1;
      } else {
        return 1;
      }
    });

    return ranksWithIndices.map(({ r }) => r);
  };

  return (
    <div className={css.company}>
      <Breadcrumbs
        ancestry={ancestry}
        sector={sector}
        current={rankings[0].company_name}
        setSubject={setSubject}
      />

      <div className={css.top_level}>
        <LogoPair ranking={rankings[0]} auditor={auditor} />

        <div className={css.title}>
          <span className={css.esg_rating}>
            {ranking(esg).rankable_name} ranking
          </span>

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
            trendView={trendView}
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
                {r.rankable_name}
              </div>

              <div className={css.completeness}>
                This company has only provided <span>{r.children.filter(({ rank }) => rank !== null).length} out of {r.children.length}</span> available data points.
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
                      trendView={trendView}
                      size={[120, 60]}
                      client={client} />
                  </div>
                </Ranking>
              </div>
            </div>

            {stableSort(r.children).map((r, i) => (
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

                    <Info ranking={r} trendView={trendView}>
                      <TrendThumbnail
                        sector={sector}
                        distribution={distribution}
                        threshold={threshold}
                        ranking={r}
                        setSubject={setSubject}
                        setTrendView={setTrendView}
                        trendView={trendView}
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
