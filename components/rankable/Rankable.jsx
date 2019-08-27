import SideBar from "../side_bar";
import Breadcrumbs from "../breadcrumbs";
import Graph from "../graph";
import css from "./styles.scss";

const Rankable = ({ rankings, ancestry, sector, threshold, year, setYear, tags, setTags, setSubject }) => (
  <div className={css.rankable}>
    <div className={css.left}>
      <Breadcrumbs
        ancestry={ancestry}
        sector={sector}
        current={rankings[0].rankable_name}
        setSubject={setSubject}
      />

      <div className={css.tag_filters} onClick={() => setTags(tags ? null : ["Gold"])}>
        Gold mining companies?

        <div className={`${tags && css.active} ${css.checkbox}`} />
      </div>

      <h2 className={css.title}>
        {rankings[0].rankable_name}
      </h2>

      <Graph rankings={rankings} threshold={threshold} year={year} setSubject={setSubject} />
    </div>

    <SideBar rankings={rankings} year={year} setYear={setYear} ancestry={ancestry} setSubject={setSubject} />
  </div>
);

export default Rankable;
