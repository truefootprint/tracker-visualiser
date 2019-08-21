import { useState, useEffect } from "react";
import Client from "../../helpers/client";
import Layout from "../layout";
import History from "../history";
import Rankable from "../rankable";
import Company from "../company";
import Trend from "../trend";
import Password from "../password";

const Home = () => {
  const [sector, setSector] = useState("Mining");
  const [distribution, setDistribution] = useState("33-33-33");
  const [threshold, setThreshold] = useState("0.1");
  const [year, setYear] = useState("2018");
  const [subject, setSubject] = useState({ type: "group", id: "1" });

  const [rankings, setRankings] = useState(null);
  const [ancestry, setAncestry] = useState(null);
  const [password, setPassword] = useState(null);

  const esg = { type: "group", id: 1 };
  const client = new Client("truefootprint", password);

  useEffect(() => {
    client.companyRankings(sector, distribution, threshold, year, subject).then(({ data }) => setRankings(data));
  }, [sector, distribution, threshold, year, subject, password])

  useEffect(() => {
    const member = subject.type === "company" ? esg : subject;
    client.ancestry(member).then(({ data }) => setAncestry(data));
  }, [subject, password]);

  const nullifyDataAndSetDistribution = (distribution) => {
    setRankings(null);
    setDistribution(distribution);
  };

  const nullifyDataAndSetThreshold = (threshold) => {
    setRankings(null);
    setThreshold(threshold);
  };

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
    distribution, setDistribution: nullifyDataAndSetDistribution,
    threshold, setThreshold: nullifyDataAndSetThreshold,
    year, setYear: nullifyDataAndSetYear,
    subject, setSubject: nullifyDataAndSetSubject,
    rankings, setRankings,
    ancestry, setAncestry,
    esg, client,
  };

  if (password === null) {
    return (
      <Layout {...props}>
        <Password onPassword={p => setPassword(p)}/>
      </Layout>
    );
  }

  if (rankings === null || ancestry === null) {
    return (
      <Layout {...props} />
    );
  }

  return (
    <Layout {...props}>
      <History {...props} />

      {subject.type === "company"  && <Company {...props} />}
      {(subject.type === "outcome" || subject.type === "group") && <Rankable {...props} />}
      {subject.type === "trend"    && <Trend {...props} />}
    </Layout>
  );
};

export default Home;
