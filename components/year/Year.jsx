import css from "./styles.scss";

const years = [2018, 2017, 2016, 2015, 2014];

function yearFormat(y){
  var num = 0;
  console.log(window.location.href.includes("Water"))
  if (window.location.href.includes("Water")){
    num = parseInt(y) + 1  //alert("yes")
  } 
  else 
  {
    num = y
  }
  return num;
}

const Year = ({ year, setYear }) => (
  <div className={css.year}>
    <select defaultValue={year} onChange={e => setYear(e.target.value)}>
      {years.map((y, index) => (
        <option key={index} value={y}>{yearFormat(y)}</option>
      ))}
    </select>
  </div>
);

export default Year;
