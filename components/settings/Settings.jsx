import Icon from "../icon";
import Distribution from "../distribution";
import css from "./styles.scss";

const thresholds = [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1];

const Settings = ({ distribution, setDistribution, threshold, setThreshold }) => {
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
      <h4 className={css.header}>
        Completeness
      </h4>

      <p className={css.sentence}>
        Require at least <span className={css.counter}>{percentage}%</span>

        <span className={css.controls}>
          <Icon name="caret-up" className={`${css.up} ${upDisabled && css.disabled}`} onClick={up} />
          <Icon name="caret-down" className={`${css.down} ${downDisabled && css.disabled}`} onClick={down} />
        </span>

        of outcomes to qualify for an ESG rank.
      </p>

      <h4 className={css.header}>
        ESG Weightings
      </h4>

      <Distribution distribution={distribution} setDistribution={setDistribution} />
    </div>
  );
};

export default Settings;
