import { useEffect, useState } from "react";
import Graph from "../graph";
import Indicator from "../indicator";
import Client from "../../helpers/client";
import ordinal from "../../helpers/ordinal";
import css from "./styles.scss";

const Ranking = ({ ranking, setSubject, subject, sector, threshold, year, size, nullText, suffix, children }) => {
  const [showInfo, setShowInfo] = useState(false);
  const [rankings, setRankings] = useState(null);
  const text = nullText || `${ranking.company_name} did not answer.`;

  let inner;
  if (ranking.rank) {
    inner = <><b>{ordinal(ranking.rank)}</b> out of {ranking.out_of}{suffix}</>;
  } else {
    inner = <span className={css.none}>{text}</span>;
  }

  const member = {
    type: ranking.rankable_type.toLowerCase(),
    id: ranking.rankable_id
  };

  const client = new Client();

  useEffect(() => {
    if (ranking.rank) {
      client.companyRankings(sector, threshold, year, member).then(({ data }) => setRankings(data));
    }
  }, [sector, year, ranking])

  const toggleInfo = () => {
    setShowInfo(!showInfo);
  };

  return (
    <div className={css.ranking}>
      {rankings && <div className={css.thumbnail} onClick={() => setSubject(member)}>
        <Graph rankings={rankings} current={ranking} year={year} thumbnail={true} size={size} />
      </div>}

      <a className={css.inner} onClick={() => setSubject(member)}>{inner}</a>

      <Indicator sector={sector} threshold={threshold} year={year} ranking={ranking} />

      {ranking.rankable_type === "Outcome" && ranking.value !== null && <span>
        <i className={`${css.icon} ${showInfo && css.selected} fas fa-info-circle`} onClick={toggleInfo}></i>

        {showInfo && <div className={css.info}>
          {children}
        </div>}
      </span>}
    </div>
  );
};

export default Ranking;
