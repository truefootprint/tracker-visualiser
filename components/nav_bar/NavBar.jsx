import { useState } from "react";
import Logo from "../logo";
import Settings from "../settings";
import css from "./styles.scss";

const NavBar = ({ threshold, setThreshold }) => {
  const [showSettings, setShowSettings] = useState(false);

  return (
    <div className={css.nav_bar}>
      <a href="." className={css.logo}>
        <Logo />
      </a>

      <h1 className={css.title}>
        Tracker
      </h1>

      <div className={css.icons}>
        <i className="fas fa-search"></i>
        <i className={`fas fa-cog ${showSettings && css.selected}`} onClick={() => setShowSettings(!showSettings)}></i>
      </div>

      {showSettings && <Settings threshold={threshold} setThreshold={setThreshold} />}
    </div>
  );
};

export default NavBar;
