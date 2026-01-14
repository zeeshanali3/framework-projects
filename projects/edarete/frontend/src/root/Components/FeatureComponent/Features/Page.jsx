import React from "react";
import Grid from "@mui/material/Grid";
import FeatureTabs from "../../Components/FeatureTabs"
export default function Page({ selectedComponent }) {
  var json = require("../../Utils/" + selectedComponent + ".js");
  const features = json.data["features"] ?? [];
  const tabsData = features.map(feature => ({
    label: feature.title,
    description: feature.description,
    content: feature.modules
  }));
  return (
    <>
      <Grid
        container
        rowSpacing={1}
        columnSpacing={{ xs: 2, sm: 2, md: 2, lg: 1, xl: 1 }}
      >
      <FeatureTabs tabs={tabsData}/>
      </Grid>
    </>
  );
}
