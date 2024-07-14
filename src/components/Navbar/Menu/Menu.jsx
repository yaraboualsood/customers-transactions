import NavBarItem from "../NavBarItem/NavbarItem";
import styles from "./menu.module.scss";

import NavBarItemList from "../NavBarItemList/NavBarItemList";
import { useConfig } from "@config";

const Menu = () => {
  const [NAVBAR_ITEMS] = useConfig();
  return (
    <div className={styles.menu}>
      <ul>
        {NAVBAR_ITEMS.map((item, idx) => (
          <li key={idx} className={item.className}>
            {item.list ? (
              <NavBarItemList item={item} />
            ) : (
              <NavBarItem item={item} />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Menu;
