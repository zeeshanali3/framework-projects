import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import AppContainer from "./AppContainer";
import reportWebVitals from "./reportWebVitals";
import { ThemeProvider, CssBaseline, Container } from "@mui/material";
import mainTheme from "./assets/styles/theme/index";
import landingTheme from "./root/Theme/theme";
import LandingPage from "./root/Pages/Home";

const hostname = window.location.hostname;
const path = window.location.pathname;

const RootWrapper = () => {
  const isLandingDomain =
    hostname === "edarete.com" || hostname === "www.edarete.com";
  const isLandingPath = path === "/";

  if (isLandingDomain && isLandingPath) {
    return (
      <ThemeProvider theme={landingTheme}>
        <Container maxWidth="2xl" disableGutters>
          <CssBaseline />
          <LandingPage />
        </Container>
      </ThemeProvider>
    );
  }

  // Render original project
  return (
    // <React.StrictMode>
    <ThemeProvider theme={mainTheme}>
      <CssBaseline />
      <AppContainer />
    </ThemeProvider>
    // </React.StrictMode>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RootWrapper />);

reportWebVitals();
