
import Menu from "./Menu/Menu";

import styles from "./navbar.module.scss";

function Navbar() {
  return (
    <nav className={styles.navbar}>
      <Menu />
    </nav>
  );
}
export default Navbar;
