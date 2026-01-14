import React from "react";
import Grid from "@mui/material/Grid";
export default function Page({ data,config,appearance }) {
//   var json = require("../../Utils/" + selectedComponent + ".js");
//   const features = json.data["features"] ?? [];

  // const tabsData = data?.features?.featuresTable?.data?.map(feature => ({
  //   label: feature.title,
  //   description: feature.description,
  //   content: feature.modules,
  //   appearance:appearance
  // }));

  return (
    <>
      <Grid
        container
        rowSpacing={1}
        columnSpacing={{ xs: 2, sm: 2, md: 2, lg: 1, xl: 1 }}
      >
        {console.log("main config", data,config,appearance)}
      {/* {config.features.featuresTable && (<FeatureTabs tabs={tabsData} appearance={appearance} config={config}/>)} */}
      </Grid>
    </>
  );
}
