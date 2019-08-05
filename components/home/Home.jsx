import { useState, useEffect } from "react";
import Client from "../../helpers/client";

import Head from "next/head";
import Breadcrumbs from "../breadcrumbs";
import DrillDown from "../drill_down";
import Graph from "../graph";

const Home = () => {
  const client = new Client("http://localhost:3000");

  const [sector, setSector] = useState("Mining");
  const [year, setYear] = useState(2018);
  const [member, setMember] = useState({ type: "group", id: 2 });

  const [rankings, setRankings] = useState(null);
  const [ancestry, setAncestry] = useState(null);

  useEffect(() => {
    client.companyRankings(sector, year, member).then(({ data }) => setRankings(data));
  }, [sector, year, member])

  useEffect(() => {
    client.ancestry(member).then(({ data }) => setAncestry(data));
  }, [member]);

  return <>
    <Head>
      <link rel="stylesheet" type="text/css" href="/static/graph.css" />
    </Head>

    {ancestry && <Breadcrumbs ancestry={ancestry} setMember={setMember} />}
    {ancestry && <DrillDown ancestry={ancestry} setMember={setMember} />}
    {rankings && <Graph rankings={rankings} />}
  </>;
};

export default Home;
