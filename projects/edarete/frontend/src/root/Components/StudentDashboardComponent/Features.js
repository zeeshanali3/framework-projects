import React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";

const Features = ({FeaturesData}) => {
  return (
    <>
      <Grid
        container
        justifyContent="left"
        rowSpacing={2}
        columnSpacing={{ xs: 1, sm: 2, md: 2 }}
      >
        {FeaturesData.map((feature) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={feature.id}>
            <Card
              sx={{
                boxShadow: "none",
                borderRadius: "10px",
                p: "25px",
                height: "200px",
                backgroundColor: `${feature.bgColor}`
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: "10px"
                }}
              >
                <Box>
                  <Typography
                    as="h1"
                    sx={{ fontSize: 28, fontWeight: 700 }}
                  >
                    {feature.number}
                  </Typography> 
                </Box>

                <Box>
                  <img src={feature.icon} alt="icon" />
                </Box>
              </Box>

              <Typography as="h3" fontSize={16} fontWeight={500} mb="5px" sx={{
              wordWrap: "break-word", 
              marginBottom:"10px"
            }}>
                {feature.subTitle}
              </Typography>

              <Typography
                as="p"
                sx={{
                  fontSize: "13px", 
                }}
              >
                {feature.helpText}
              </Typography>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default Features;
