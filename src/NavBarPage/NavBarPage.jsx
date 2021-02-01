import React from "react";
import { Link } from "react-router-dom";
import styles from "./NavBarPage.scss";
import { useSelector } from "react-redux";

function NavBarPage() {
  const user = useSelector((state) => state.authentication.user);
  return (
    <div className={styles.navBarPage}>
      <div className={styles.contentLogoAndAboutUs}>
        <span className={styles.logo}>Service Auto</span>
        <span onClick={() => alert("next stage")} style={{ cursor: "pointer" }}>
          About Us
        </span>
      </div>
      <div className={styles.contentUserAndIcon}>
        <i className={`${"fa fa-user"} ${styles.userIcon}`}></i>
        <span className={styles.hiContent}>Hi</span>
        <span className={styles.contentUser}>{user?.userName}</span>
      </div>
      <div style={{ marginRight: "2rem" }}>
        <Link to="/login" style={{ color: "red" }}>
          Logout
        </Link>
      </div>
    </div>
  );
}

export { NavBarPage };
