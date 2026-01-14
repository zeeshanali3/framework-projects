import React, { useEffect } from "react";
import Card from "@mui/material/Card";
import { Typography } from "@mui/material";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

export default function BasicTabs({ tabs, activeStep = 0 }) {
  const [currentStep, setCurrentStep] = React.useState(activeStep);
  useEffect(() => {
    console.log(activeStep)
    setCurrentStep(activeStep);
  }, [activeStep]);

  const a11yProps = (index) => ({
    id: `scrollable-auto-tab-${index}`,
    "aria-controls": `scrollable-auto-panel-${index}`,
  });
  return (
    <Box
      sx={{
        width: "70%",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Tabs
        value={currentStep}
        variant="scrollable"
        scrollButtons="auto"
        aria-label="scrollable controlled tabs example"
        sx={{
          "& .MuiTabs-flexContainer": {
            justifyContent: "flex-start", // Centers the tabs horizontally
          },
          "& .MuiTabs-indicator": {
            backgroundColor: "#1976D2",
          },
        }}
      >
        {tabs.map((tab, index) => (
          <Tab
            key={index}
            label={
              tab.title.length > 20
                ? tab.title.substring(0, 20) + "..."
                : tab.title
            }
            {...a11yProps(index)}
            style={{
              fontSize: 17,
              marginRight:5,
              color:
                currentStep === index
                  ? "#1976D2"
                  : index < activeStep
                  ? "#1976D2"
                  : "#D3D3D3",
                  borderBottom: index <= activeStep ? "3px solid #1976D2" : "none", // Add underline for previous and active steps

            }}
          />
        ))}
      </Tabs>
    </Box>
  );
}

BasicTabs.propTypes = {
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired, // Fixed prop name
      content: PropTypes.node.isRequired,
    })
  ).isRequired,
  activeStep: PropTypes.number.isRequired,
};
