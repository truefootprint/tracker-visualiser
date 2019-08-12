import { useState, useEffect } from "react";
import Breadcrumbs from "../breadcrumbs";
import Ranking from "../ranking";
import Year from "../year";
import Client from "../../helpers/client";
import css from "./styles.scss";

const Company = ({ ancestry, rankings, sector, year, setYear, setSubject, esg }) => {
  const [auditor, setAuditor] = useState(null);

  const ranking = (member) => (
    rankings.find(r => r.rankable_type.toLowerCase() == member.type.toLowerCase() && r.rankable_id == member.id)
  );

  const auditorRanking = rankings.find(r => r.auditor_id);
  const auditorId = (typeof auditorRanking !== "undefined") ? auditorRanking.auditor_id : null;

  useEffect(() => {
    if (auditorId) {
      (new Client()).company(auditorId).then(({ data }) => setAuditor(data));
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
        <p className={css.text}>Audited by:</p>

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

        <div className={css.ranking}>
          <Ranking
            ranking={ranking(esg)}
            setSubject={setSubject}
            sector={sector}
            year={year}
            size={[240, 120]}
            nullText="Insufficient data points."
          />
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
                  sector={sector}
                  year={year}
                  size={[160, 80]}
                  nullText="Insufficient data points."
                />
              </div>
            </div>

            {r.children.map((r, i) => (
              <div key={i} className={css.outcome}>
                <div className={css.title}>
                  {r.rankable_name}
                </div>

                <div className={css.subtitle}>
                  <span className={css.value}>{r.value}</span>&nbsp;

                  {r.auditor_name &&
                  <span className={css.auditor}>(Audited by {r.auditor_name})</span>}
                </div>

                <div className={css.ranking}>
                  <Ranking
                    ranking={r}
                    setSubject={setSubject}
                    sector={sector}
                    year={year} size={[80, 40]}
                  />
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
};

export default Company;
