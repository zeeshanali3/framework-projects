import React from 'react';
import styles from "../assets/styles/PageTitle.module.css"
const PageHeader = ({ title, text }) => {
  return (
    <>
      <div className={styles.pageTitle}>
        <h1>{title}</h1>
        <ul>
            <li>
              <span >{text}</span>
            </li>
          <li>{title}</li>
        </ul>
      </div>

    </>
  );
};

export default PageHeader;
