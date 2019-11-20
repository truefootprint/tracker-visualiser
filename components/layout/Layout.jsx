import { useState } from "react";
import Head from "next/head";
import NavBar from "../nav_bar";

import "./reset.scss";
import "./typography.scss";

const Layout = ({ distribution, setDistribution, threshold, setThreshold, setSubject, children }) => {
  const [showAggregation, setShowAggregation] = useState(true);

  return <>
    <Head>
      <script src="https://kit.fontawesome.com/89bcaf21e8.js"></script>
    </Head>

    <NavBar
      distribution={distribution}
      setDistribution={setDistribution}
      threshold={threshold}
      setThreshold={setThreshold}
      setSubject={setSubject}
      showAggregation={showAggregation}
      setShowAggregation={setShowAggregation} />

    <div className={showAggregation ? "show-aggregation" : "hide-aggregation"}>
      {children}
    </div>
  </>;
};

export default Layout;
