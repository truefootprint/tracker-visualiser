import css from "./styles.scss";

const GoldFilter = ({ tags, setTags }) => (
  <div className={css.tag_filters} onClick={() => setTags(tags ? null : ["Gold"])}>
    Gold mining companies?

    <div className={`${tags && css.active} ${css.checkbox}`} />
  </div>
);

export default GoldFilter;
