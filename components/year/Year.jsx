import css from "./styles.scss";

const years = [2018, 2017, 2016, 2015, 2014];

const Year = ({ year, setYear }) => (
  <div className={css.year}>
    <select defaultValue={year} onChange={e => setYear(e.target.value)}>
      {years.map((y, index) => (
        <option key={index} value={y}>{y}</option>
      ))}
    </select>
  </div>
);

export default Year;
