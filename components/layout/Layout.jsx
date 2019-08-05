import Head from "next/head";
import NavBar from "../nav_bar";

import "./reset.scss";
import "./typography.scss";

const Layout = ({ children }) => <>
  <Head>
    <script src="https://kit.fontawesome.com/89bcaf21e8.js"></script>
  </Head>

  <NavBar />
  {children}
</>;

export default Layout;