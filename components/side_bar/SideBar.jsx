import DrillDown from "../drill_down";
import css from "./styles.scss";

const years = [2018, 2017];

const SideBar = ({ year, setYear, ancestry, setMember }) => (
  <div className={css.side_bar}>
    <div className={css.year}>
      <select defaultValue={year} onChange={e => setYear(e.target.value)}>
        {years.map((y, index) => (
          <option key={index} value={y}>{y}</option>
        ))}
      </select>
    </div>

    {ancestry && <DrillDown ancestry={ancestry} setMember={setMember} />}
  </div>
);

export default SideBar;
