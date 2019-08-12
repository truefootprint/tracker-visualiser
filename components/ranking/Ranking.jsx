import { useEffect, useState } from "react";
import Graph from "../graph";
import Client from "../../helpers/client";
import ordinal from "../../helpers/ordinal";
import css from "./styles.scss";

const Ranking = ({ ranking, setSubject, sector, year, size, nullText }) => {
  const [rankings, setRankings] = useState(null);
  const text = nullText || `${ranking.company_name} did not answer.`;

  let inner;
  if (ranking.rank) {
    inner = <><b>{ordinal(ranking.rank)}</b> out of {ranking.out_of}</>;
  } else {
    inner = <span className={css.none}>{text}</span>;
  }

  const member = {
    type: ranking.rankable_type.toLowerCase(),
    id: ranking.rankable_id
  };

  const client = new Client();

  ranking.rank && useEffect(() => {
    client.companyRankings(sector, year, member).then(({ data }) => setRankings(data));
  }, [sector, year, ranking])

  return (
    <div className={css.ranking}>
      {rankings && <div className={css.thumbnail} onClick={() => setSubject(member)}>
        <Graph rankings={rankings} year={year} thumbnail={true} size={size} />
      </div>}

      <a className={css.inner} onClick={() => setSubject(member)}>{inner}</a>
    </div>
  );
};

export default Ranking;
