import { useState, useEffect } from "react";
import Client from "../../helpers/client";
import Layout from "../layout";
import Rankable from "../rankable";
import Company from "../company";

const Home = () => {
  const client = new Client("http://localhost:3000");

  const [sector, setSector] = useState("Mining");
  const [year, setYear] = useState("2018");
  const [subject, setSubject] = useState({ type: "company", id: 19 });

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

  const foo = (subject) => {
    setRankings(null);
    setAncestry(null);
    setSubject(subject);
  };

  const props = {
    sector, setSector,
    year, setYear,
    subject, setSubject: foo,
    rankings, setRankings,
    ancestry, setAncestry,
    esg,
  };

  if (rankings === null || ancestry === null) {
    return null;
  }

  return (
    <Layout>
      {subject.type === "company" ?
        <Company {...props} /> :
        <Rankable {...props} /> }
    </Layout>
  );
};

export default Home;
