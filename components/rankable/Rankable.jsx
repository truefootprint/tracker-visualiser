import SideBar from "../side_bar";
import Breadcrumbs from "../breadcrumbs";
import Graph from "../graph";
import GoldFilter from "../gold_filter";
import Year from "../year";
import css from "./styles.scss";

const Rankable = ({ rankings, ancestry, sector, threshold, year, setYear, metal, setMetal, subject, setSubject }) => (
  <div className={css.rankable}>
    <div className={css.left}>
      <Breadcrumbs
        ancestry={ancestry}
        sector={sector}
        current={rankings[0].rankable_name}
        setSubject={setSubject}
      />

      <h2 className={css.title}>
        <span>
          {rankings[0].rankable_name}
          {rankings[0].rankable_type === "Group" && " score"}
        </span>

        <div className={css.filters}>
          <Year year={year} setYear={setYear} />
          {sector === "Mining" && <GoldFilter metal={metal} setMetal={setMetal} />}
        </div>
      </h2>

      <Graph rankings={rankings} threshold={threshold} year={year} subject={subject} setSubject={setSubject} />
    </div>

    <SideBar rankings={rankings} year={year} setYear={setYear} ancestry={ancestry} setSubject={setSubject} />
  </div>
);

export default Rankable;
