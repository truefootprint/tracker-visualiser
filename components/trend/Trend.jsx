import Breadcrumbs from "../breadcrumbs";
import css from "./styles.scss";

const Trend = ({ ancestry, sector, rankings, setSubject }) => {
  const companyName = rankings[0].company_name;

  return (
    <Breadcrumbs
      ancestry={ancestry}
      sector={sector}
      above={{ type: "company", id: rankings[0].company_id, name: rankings[0].company_name }}
      below={{ type: "outcome", id: rankings[0].rankable_id, name: rankings[0].rankable_name }}
      current="Trend"
      setSubject={setSubject}
    />
  );
};

export default Trend;
