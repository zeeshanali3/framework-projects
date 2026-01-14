import React from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "./NavBar.module.css"; // Adjust path if necessary

const NavBar = ({onSelect}) => {
  const location = useLocation(); // Get the current location
  
  return (
    <nav className={styles.topNavStyle}>
      <ul>
        <li className={location.pathname === "/profile/account" ? styles.active : ""}>
          <Link to="/profile/account" onClick={() =>onSelect("account")}>Account</Link>
        </li>
        <li className={location.pathname === "/profile/security" ? styles.active : ""}>
          <Link to="/profile/security" onClick={() =>onSelect("security")}>Security</Link>
        </li>
        <li className={location.pathname === "/profile/privacy-policy" ? styles.active : ""}>
          <Link to="/profile/privacy-policy" onClick={() =>onSelect("privacy-policy")}>Privacy Policy</Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
