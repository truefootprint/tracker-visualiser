import { useState, useEffect } from "react";
import Client from "../../helpers/client";
import Layout from "../layout";
import Rankable from "../rankable";

const Home = () => {
  const client = new Client("http://localhost:3000");

  const [sector, setSector] = useState("Mining");
  const [year, setYear] = useState("2018");
  const [subject, setSubject] = useState({ type: "group", id: 1 });

  const [rankings, setRankings] = useState(null);
  const [ancestry, setAncestry] = useState(null);

  const [page, setPage] = useState("rankable");

  useEffect(() => {
    client.companyRankings(sector, year, subject).then(({ data }) => setRankings(data));
  }, [sector, year, subject])

  useEffect(() => {
    client.ancestry(subject).then(({ data }) => setAncestry(data));
  }, [subject]);

  const props = {
    sector, setSector,
    year, setYear,
    subject, setSubject,
    rankings, setRankings,
    ancestry, setAncestry,
    page, setPage,
  };

  return (
    <Layout>
      {page === "rankable" && <Rankable {...props} />}
    </Layout>
  );
};

export default Home;
