import css from "./styles.scss";

const years = [2018, 2017];

const SideBar = ({ year, setYear }) => (
  <div className={css.side_bar}>
    <div className={css.year}>
      <select defaultValue={year} onChange={e => setYear(e.target.value)}>
        {years.map((y, index) => (
          <option key={index} value={y}>{y}</option>
        ))}
      </select>
    </div>
  </div>
);

export default SideBar;
