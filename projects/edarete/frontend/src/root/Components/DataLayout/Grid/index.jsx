import Grid from "@mui/material/Grid";
import { Grow } from "@mui/material";
import React, { useEffect, useState } from "react";
import GridCard from "./GridCard";
// import CustomGrid from "./../CustomGrid";

const Grids = ({
  CustomCard,
  dataProp,
  configProp,
  appearanceProp,
  additionalProp,
  onRowAction,
  onUpdateRefreshData,
}) => {
  const [data, setData] = useState(additionalProp?.data);

  useEffect(() => {
    setData(additionalProp?.data);
  }, [additionalProp?.data]);

  const entitiesPerRow = dataProp?.features?.grid?.entitiesPerRow || 3;
  return (
    <>
      <Grid
        container
        rowSpacing={2}
        justifyContent={{
          xs: "center",
          sm: "center",
          md: "flex-start",
          lg: "flex-start",
          xl: "flex-start",
        }}
        alignItems="stretch"
        columnSpacing={{ xs: 1, sm: 2, md: 3, lg: 3, xl: 4 }}
        sx={{ px: { xs: 1, sm: 2, md: 3, lg: 4, xl: 6 } }}
      >
        {data.map((member, i) => (
          <Grow in={true} key={i}>
            <Grid
              item
              xs={12}
              sm={12}
              md={12 / entitiesPerRow}
              lg={12 / entitiesPerRow}
              xl={12 / entitiesPerRow}
              sx={{
                // display: "flex",
                // flexDirection: "column",
                // justifyContent: "start",
                alignItems: "stretch",
                paddingY: 1,
              }}
            >
              {configProp?.features?.colaborator.enable ? (
                <CustomCard
                  data={member}
                  config={configProp}
                  appearance={appearanceProp}
                  onRowAction={onRowAction}
                  onUpdateRefreshData={onUpdateRefreshData}
                />
              ) : (
                <GridCard
                  member={member}
                  dataProp={dataProp}
                  configProp={configProp}
                  additionalProp={additionalProp}
                  appearanceProp={appearanceProp}
                  onRowAction={onRowAction}
                  onUpdateRefreshData={onUpdateRefreshData}
                />
              )}
            </Grid>
          </Grow>
        ))}
      </Grid>
    </>
  );
};

export default Grids;
