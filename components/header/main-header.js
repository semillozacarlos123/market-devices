import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleUser,
  faCartShopping,
} from "@fortawesome/free-solid-svg-icons";
import Search from "../input/search";
import classes from "./main-header.module.css";

export default function MainHeader() {
  return (
    <header className={classes.header}>
      <div className={classes.logo}>
        <Link href="/">Iot Market</Link>
      </div>
      <Search />
      <nav className={classes.navigation}>
        <ul className={classes.icons}>
          <li>
            <div className={classes.icon}>
              <FontAwesomeIcon icon={faCircleUser} />
            </div>
          </li>
          <div className={classes.icon}>
            <FontAwesomeIcon icon={faCartShopping} />
          </div>
        </ul>
      </nav>
    </header>
  );
}
