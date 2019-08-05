import { useState, useEffect } from "react";
import Client from "../../helpers/client";

import Layout from "../layout";
import SideBar from "../side_bar";
import Breadcrumbs from "../breadcrumbs";
import Graph from "../graph";
import css from "./styles.scss";

const Home = () => {
  const client = new Client("http://localhost:3000");

  const [sector, setSector] = useState("Mining");
  const [year, setYear] = useState("2018");
  const [member, setMember] = useState({ type: "group", id: 3 });

  const [rankings, setRankings] = useState(null);
  const [ancestry, setAncestry] = useState(null);

  useEffect(() => {
    client.companyRankings(sector, year, member).then(({ data }) => setRankings(data));
  }, [sector, year, member])

  useEffect(() => {
    client.ancestry(member).then(({ data }) => setAncestry(data));
  }, [member]);

  return (
    <Layout>
      <div className={css.home}>
        <div className={css.left}>
          {ancestry && rankings &&
            <Breadcrumbs ancestry={ancestry} sector={sector} current={rankings.name} setMember={setMember} />}

          <h2 className={css.title}>
            {rankings && rankings.name}
          </h2>

          {rankings && <Graph rankings={rankings} year={year} />}
        </div>

        <SideBar year={year} setYear={setYear} ancestry={ancestry} setMember={setMember} />
      </div>
    </Layout>
  );
};

export default Home;
