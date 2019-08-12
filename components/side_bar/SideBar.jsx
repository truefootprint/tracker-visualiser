import Year from "../year";
import DrillDown from "../drill_down";
import css from "./styles.scss";

const SideBar = ({ year, setYear, ancestry, setSubject }) => (
  <div className={css.side_bar}>
    <div className={css.year}>
      <Year year={year} setYear={setYear} />
    </div>

    {ancestry && <DrillDown ancestry={ancestry} setSubject={setSubject} />}
  </div>
);

export default SideBar;
