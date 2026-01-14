import React, { useState, useEffect } from "react";
import Button from '@mui/material/Button';
import styles from "./DarkAndLightMode.module.css";


const DarkAndLightMode = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const storedPreference = localStorage.getItem("theme");
    if (storedPreference === "dark") {
      setIsDarkMode(true);
    }
  }, []);

  const handleToggle = () => {
    setIsDarkMode(!isDarkMode);
  };

  useEffect(() => {
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");
    const htmlElement = document.querySelector("html");
    if (isDarkMode) {
      htmlElement.classList.add("dark");
    } else {
      htmlElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  return (
    <>
      <div className={styles.darkModeBox}>
        <h3>Dark/Light Mode</h3>

        <Button 
          onClick={handleToggle} 
          variant="contained"
          sx={{
            textTransform: 'capitalize'
          }}
          className="whiteColor"
        >
          Switch to {isDarkMode ? "Light Mode" : "Dark Mode"}
        </Button>
      </div>
    </>
  );
};

export default DarkAndLightMode;
