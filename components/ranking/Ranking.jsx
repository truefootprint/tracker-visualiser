import { useEffect, useState } from "react";
import Graph from "../graph";
import Indicator from "../indicator";
import Icon from "../icon";
import Ordinal from "../ordinal";
import css from "./styles.scss";

const Ranking = ({ ranking, setSubject, setTrendView, subject, sector, distribution, threshold, year, size, nullText, suffix, client, children }) => {
  const [showInfo, setShowInfo] = useState(false);
  const [rankings, setRankings] = useState(null);
  const text = nullText || `${ranking.company_name} did not answer.`;

  let inner;
  if (ranking.rank) {
    inner = <><b><Ordinal number={ranking.rank} /></b> out of {ranking.out_of}{suffix}</>;
  } else {
    inner = <span className={css.none}>{text}</span>;
  }

  const member = {
    type: ranking.rankable_type.toLowerCase(),
    id: ranking.rankable_id
  };

  useEffect(() => {
    if (ranking.rank) {
      client.companyRankings(sector, distribution, threshold, year, null, member).then(({ data }) => setRankings(data));
    }
  }, [sector, distribution, threshold, year, ranking])

  const toggleInfo = () => {
    setShowInfo(!showInfo);
  };

  const visitTrendRank = () => {
    const trend = { type: "trend", id: `${member.type}-${member.id}-${ranking.company_id}` };

    setSubject(trend);
    setTrendView("by_rank");
  };

  return (
    <div className={css.ranking}>
      {rankings && <div className={css.thumbnail} onClick={() => setSubject(member)}>
        <Graph rankings={rankings} current={ranking} year={year} thumbnail={true} size={size} />
      </div>}

      <a className={css.inner} onClick={() => setSubject(member)}>{inner}</a>

      <span onClick={visitTrendRank}>
        <Indicator
          sector={sector}
          distribution={distribution}
          threshold={threshold}
          year={year}
          ranking={ranking}
          client={client} />
      </span>

      {children && ranking.value !== null && ranking.rank && <span>
        <Icon name="info-circle" className={`icon ${css.icon} ${showInfo && css.selected}`} onClick={toggleInfo} />

        {showInfo && <div className={css.info}>
          {children}
        </div>}
      </span>}
    </div>
  );
};

export default Ranking;
