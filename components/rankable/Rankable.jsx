import SideBar from "../side_bar";
import Breadcrumbs from "../breadcrumbs";
import Graph from "../graph";
import GoldFilter from "../gold_filter";
import css from "./styles.scss";

const Rankable = ({ rankings, ancestry, sector, threshold, year, setYear, tags, setTags, subject, setSubject }) => (
  <div className={css.rankable}>
    <div className={css.left}>
      <Breadcrumbs
        ancestry={ancestry}
        sector={sector}
        current={rankings[0].rankable_name}
        setSubject={setSubject}
      />

      {sector === "Mining" && <div className={css.filters}>
        <GoldFilter tags={tags} setTags={setTags} />
      </div>}

      <h2 className={css.title}>
        {rankings[0].rankable_name}
      </h2>

      <Graph rankings={rankings} threshold={threshold} year={year} subject={subject} setSubject={setSubject} />
    </div>

    <SideBar rankings={rankings} year={year} setYear={setYear} ancestry={ancestry} setSubject={setSubject} />
  </div>
);

export default Rankable;
