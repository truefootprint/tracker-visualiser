import ordinal from "../../helpers/ordinal";
import css from "./styles.scss";

const Ranking = ({ ranking, setSubject }) => {
  let value;
  if (ranking.rank) {
    value = <><b>{ordinal(ranking.rank)}</b> out of {ranking.out_of}</>;
  } else {
    value = <span className={css.none}>-</span>;
  }

  const member = {
    type: ranking.rankable_type.toLowerCase(),
    id: ranking.rankable_id
  };

  return (
    <div className={css.ranking}>
      <label className={css.label}>ranking:</label>
      <a className={css.value} onClick={() => setSubject(member)}>{value}</a>
    </div>
  );
};

export default Ranking;
