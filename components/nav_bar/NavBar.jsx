import { useState } from "react";
import Logo from "../logo";
import Settings from "../settings";
import Icon from "../icon";
import css from "./styles.scss";

const NavBar = ({ distribution, setDistribution, threshold, setThreshold, setSubject }) => {
  const [showSettings, setShowSettings] = useState(false);

  const visitHome = () => setSubject({ type: "group", id: 1 });
  const iconClass = showSettings ? css.selected : undefined;

  return (
    <div className={css.nav_bar}>
      <a onClick={visitHome} className={css.logo}>
        <Logo />
      </a>

      <h1 className={css.title}>
        Tracker
      </h1>

      <div className={css.icons}>
        <Icon name="search" />
        <Icon name="cog" className={iconClass} onClick={() => setShowSettings(!showSettings)} />
      </div>

      {showSettings && <Settings
        distribution={distribution}
        setDistribution={setDistribution}
        threshold={threshold}
        setThreshold={setThreshold} />}
    </div>
  );
};

export default NavBar;
