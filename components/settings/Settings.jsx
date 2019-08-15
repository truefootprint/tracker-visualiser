import css from "./styles.scss";

const thresholds = [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1];

const Settings = ({ threshold, setThreshold }) => {
  const decimal = parseFloat(threshold);
  const percentage = decimal * 100;
  let index = thresholds.indexOf(decimal);

  const up = () => {
    if (index < thresholds.length - 1) {
      index += 1;
    }

    setThreshold(thresholds[index]);
  };

  const down = () => {
    if (index > 0) {
      index -= 1;
    }

    setThreshold(thresholds[index]);
  };

  const upDisabled = index === thresholds.length - 1;
  const downDisabled = index === 0;

  return (
    <div className={css.settings}>
      <p className={css.title}>Settings</p>

      <p className={css.sentence}>
        Require at least <span className={css.counter}>{percentage}%</span>

        <div className={css.controls}>
          <i className={`${css.up} ${upDisabled && css.disabled} && css.disabled} fas fa-caret-up`} onClick={up}></i>
          <i className={`${css.down} ${downDisabled && css.disabled} fas fa-caret-down`} onClick={down}></i>
        </div>

        of outcomes to qualify for an ESG rank.
      </p>
    </div>
  );
};

export default Settings;