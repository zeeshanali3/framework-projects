import React, { useEffect, useState } from "react";
import Profile from "../Account/Profile";
import ChangePassword from "../Account/ChangePassword";
import PrivacyPolicy from "../Account/PrivacyPolicyContent";
import NavBar from "../NavBar";
import Card from "@mui/material/Card";
import { Typography } from "@mui/material";

export default function Account({selectedComponent}) {
  const [component, setComponent] = useState(selectedComponent);
  useEffect(() => {
    setComponent(selectedComponent);
  }
  , [selectedComponent]);

  // Function to render components dynamically
  const renderComponent = (component) => {
    switch (component) {
      case "account":
        return <Profile />;
      case "security":
        return <ChangePassword />;
      case "privacy-policy":
        return <PrivacyPolicy />;
      default:
        return <div>Select a component from the navigation bar</div>;
    }
  };

  return (
    <>
      <Card
        sx={{
          boxShadow: "none",
          borderRadius: "10px",
          p: "25px",
          mb: "15px",
        }}
      >
        <Typography
          as="h3"
          sx={{
            fontSize: 18,
            fontWeight: 500,
            borderBottom: "1px solid #EEF0F7",
            paddingBottom: "5px",
            mb: "15px",
          }}
          className="for-dark-bottom-border"
        >
          Settings
        </Typography>

        {/* NavBar */}
        <NavBar onSelect={(componentName) => setComponent(componentName)} />

        {/* Render selected component */}
        {renderComponent(component)}
      </Card>
    </>
  );
}
