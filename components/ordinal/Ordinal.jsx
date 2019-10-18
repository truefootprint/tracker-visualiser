import css from "./styles.scss";

const superscripts = [
  "th", "st", "nd", "rd", "th", "th", "th", "th", "th", "th", "th",
  "th", "th", "th", "th", "th", "th", "th", "th", "th",
  "th", "st", "nd", "rd", "th", "th", "th", "th", "th",
  "th", "th", "st", "nd", "rd", "th", "th", "th", "th",
  "th", "th", "th",
];

const Ordinal = ({ number }) => (
  <span className={css.ordinal}>
    {number}
    <sup>{superscripts[parseInt(number, 10)]}</sup>
  </span>
);

export default Ordinal;
