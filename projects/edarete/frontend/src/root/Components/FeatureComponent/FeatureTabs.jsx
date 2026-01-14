import React from "react";
import Card from "@mui/material/Card";
import { Typography } from "@mui/material";
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import FeatureModules from "./FeatureModules/FeatureModules";
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

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs({ tabs }) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Card
      sx={{
        boxShadow: "none",
        borderRadius: "10px",
        p: "25px",
        mb: "15px",
        justifyContent: "center",
        width: '100%',
        backgroundColor:'transparent'
      }}
    >
      <Box sx={{ width: '100%', justifyContent: "center" }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider',justifyContent: "center"}}>
          <Tabs value={value} onChange={handleChange} aria-label="dynamic tabs example" sx={{justifyContent:'center'}}>
            {tabs.map((tab, index) => (
              <Tab key={index} label={tab.label} {...a11yProps(index)} style={{fontSize:17}}/>
            ))}
          </Tabs>
        </Box>
        {tabs.map((tab, index) => (
          <TabPanel key={index} value={value} index={index}>
            <FeatureModules module={tab}/>
          </TabPanel>
        ))}
      </Box>
    </Card>
  );
}

BasicTabs.propTypes = {
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      content: PropTypes.node.isRequired,
    })
  ).isRequired,
};
