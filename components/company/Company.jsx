import Breadcrumbs from "../breadcrumbs";
import Ranking from "../ranking";
import css from "./styles.scss";

const Company = ({ ancestry, rankings, sector, setSubject, esg }) => {
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

      <img className={css.logo} src={rankings[0].company_logo} />

      <Ranking ranking={ranking(esg)} setSubject={setSubject} />

      <div className={css.breakdown}>
        {rootRanking.children.map(r => (
          <div className={css.section}>
            <div className={css.title}>
              {r.rankable_name}:
            </div>

            <Ranking ranking={r} setSubject={setSubject} />

          <br/><br/> <br/><br/> <br/><br/> <br/><br/>

            {r.children.map(r => (
              <Ranking ranking={r} setSubject={setSubject} />
            ))}
          </div>
        ))}
      </div>
    </div>
  )
};

export default Company;
