import Year from "../year";
import DrillDown from "../drill_down";
import css from "./styles.scss";

const SideBar = ({ rankings, year, setYear, ancestry, setSubject }) => {
  const [numerator, denominator] = rankings[0].ratio_of;

  const handleClick = ({ outcome_id }) => {
    setSubject({ type: "outcome", id: outcome_id });
  };

  const outcomeRatio = () => (
    <div className={css.outcome_ratio}>
      <a className={css.link} onClick={() => handleClick(numerator)}>
        &gt; {numerator.outcome_name}
      </a>

      <div className={css.divided_by}>
        divided by
      </div>

      <a className={css.link} onClick={() => handleClick(denominator)}>
        &gt; {denominator.outcome_name}
      </a>
    </div>
  );

  return (
    <div className={css.side_bar}>
      <div className={css.year}>
        <Year year={year} setYear={setYear} />
      </div>

      {numerator && denominator && outcomeRatio()}

      {ancestry && <DrillDown ancestry={ancestry} setSubject={setSubject} />}
    </div>
  );
};

export default SideBar;
