import css from "./styles.scss";

const LogoPair = ({ ranking, auditor }) => {
  if (!auditor) {
    return <img className={css.company_logo_on_its_own} src={ranking.company_logo} />;
  }

  return (
    <span className={css.logo_pair}>
      <span className={css.inner}>
        <img className={css.company_logo}
             src={ranking.company_logo} />

        {auditor && <>
          <span className={css.assured_by}>
            Assured by
          </span>

          <img className={css.auditor_logo}
               src={auditor.logo} />
        </>}
      </span>
    </span>
  );
};

export default LogoPair;
