import SideBar from "../side_bar";
import Breadcrumbs from "../breadcrumbs";
import Graph from "../graph";
import css from "./styles.scss";

const Rankable = ({ rankings, ancestry, sector, year, setYear, setSubject }) => (
  <div className={css.rankable}>
    <div className={css.left}>
      <Breadcrumbs
        ancestry={ancestry}
        sector={sector}
        current={rankings[0].rankable_name}
        setSubject={setSubject}
      />

      <h2 className={css.title}>
        {rankings[0].rankable_name}
      </h2>

      <Graph rankings={rankings} year={year} setSubject={setSubject} />
    </div>

    <SideBar year={year} setYear={setYear} ancestry={ancestry} setSubject={setSubject} />
  </div>
);

export default Rankable;
