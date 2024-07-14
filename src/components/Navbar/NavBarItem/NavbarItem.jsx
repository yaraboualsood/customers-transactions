import { Link, useLocation } from "react-router-dom";
import styles from "./navbaritem.module.scss";

const NavBarItem = (props) => {
  const location = useLocation();

  const { item, className } = props;


  const getClassName = () => {
    const classNames = [];
    classNames.push(className);
    classNames.push(styles.navbaritem);
    if (location.pathname === item?.to) {
      classNames.push(styles.active);

      if (item?.label === "support") {
        classNames.push(styles.active_stroke);
      }
    }
    return classNames.join(" ");
  };

  const ItemBody = (
    <>
      <div>
        <span>{item?.label}</span>
      </div>
      {item.notifications && (
        <div className={styles.notifications}>{item.notifications}</div>
      )}
    </>
  );

  const ButtonItem = (
    <button className={getClassName()} onClick={item?.onClick}>
      {ItemBody}
    </button>
  );

  const LinkItem = (
    <Link className={getClassName()} to={item?.to}>
      {ItemBody}
    </Link>
  );

  return item.to ? LinkItem : ButtonItem;
};

export default NavBarItem;
