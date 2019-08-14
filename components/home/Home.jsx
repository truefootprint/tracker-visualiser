import { useState, useEffect } from "react";
import Client from "../../helpers/client";
import Layout from "../layout";
import History from "../history";
import Rankable from "../rankable";
import Company from "../company";
import Trend from "../trend";

const Home = () => {
  const client = new Client();

  const [sector, setSector] = useState("Mining");
  const [year, setYear] = useState("2018");
  const [subject, setSubject] = useState({ type: "group", id: "1" });

  const [rankings, setRankings] = useState(null);
  const [ancestry, setAncestry] = useState(null);

  const esg = { type: "group", id: 1 };

  useEffect(() => {
    client.companyRankings(sector, year, subject).then(({ data }) => setRankings(data));
  }, [sector, year, subject])

  useEffect(() => {
    const member = subject.type === "company" ? esg : subject;
    client.ancestry(member).then(({ data }) => setAncestry(data));
  }, [subject]);

  const nullifyDataAndSetSubject = (subject) => {
    setRankings(null);
    setAncestry(null);
    setSubject(subject);
  }

  const nullifyDataAndSetYear = (year) => {
    setRankings(null);
    setYear(year);
  }

  const props = {
    sector, setSector,
    year, setYear: nullifyDataAndSetYear,
    subject, setSubject: nullifyDataAndSetSubject,
    rankings, setRankings,
    ancestry, setAncestry,
    esg,
  };

  if (rankings === null || ancestry === null) {
    return null;
  }

  return (
    <Layout>
      <History {...props} />

      {subject.type === "company"  && <Company {...props} />}
      {(subject.type === "outcome" || subject.type === "group") && <Rankable {...props} />}
      {subject.type === "trend"    && <Trend {...props} />}
    </Layout>
  );
};

export default Home;
