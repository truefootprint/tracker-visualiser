import Breadcrumbs from "../breadcrumbs";
import Ranking from "../ranking";
import css from "./styles.scss";

const Company = ({ ancestry, rankings, sector, year, setSubject, esg }) => {
  const ranking = (member) => (
    rankings.find(r => r.rankable_type.toLowerCase() == member.type.toLowerCase() && r.rankable_id == member.id)
  );

  const rootRanking = ranking(esg);

  rootRanking.children = ancestry.descendents.map(child => {
    const childRanking = ranking(child);
    childRanking.children = child.descendents.map(grandchild => ranking(grandchild));

    return childRanking;
  });

  return (
    <div className={css.company}>
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
        </div>

        <div className={css.ranking}>
          <Ranking ranking={ranking(esg)} setSubject={setSubject} sector={sector} year={year} size={[240, 120]}/>
        </div>
      </div>

      <div className={css.breakdown}>
        {rootRanking.children.map(r => (
          <div className={css.section}>
            <div className={css.title}>
              {r.rankable_name}:
            </div>

            <div className={css.ranking}>
              <Ranking ranking={r} setSubject={setSubject} sector={sector} year={year} size={[160, 80]} />
            </div>

            {r.children.map(r => (
              <div className={css.outcome}>
                <div className={css.title}>
                  {r.rankable_name}
                </div>

                <div className={css.ranking}>
                  <Ranking
                    ranking={r}
                    setSubject={setSubject}
                    sector={sector}
                    year={year} size={[80, 40]}
                    showValue={true}
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
