import Logo from "../logo";
import css from "./styles.scss";

const NavBar = () => (
  <div className={css.nav_bar}>
    <div className={css.logo}>
      <Logo />
    </div>

    <h1 className={css.title}>
      Tracker
    </h1>

    <div className={css.icons}>
      <i className="fas fa-search"></i>
      <i className="fas fa-cog"></i>
    </div>
  </div>
);

export default NavBar;
