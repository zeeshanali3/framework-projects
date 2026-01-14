import React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Link, useNavigate } from "react-router-dom";
import { Card } from "@mui/material";
import { useTheme } from "@mui/material";
import { tokens } from "../../../../assets/styles/theme/custome";

const StatCard = (props) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();

  const handleRoute = (route) => {
    console.log(route);
    navigate(route);
  };

  return (
    <>
      <Grid
        container
        justifyContent="center"
        rowSpacing={2}
        columnSpacing={{ xs: 1, sm: 2, md: 2 }}
      >
        {props?.statCardData ? (
          props?.statCardData?.map((feature) => (
            <Grid item xs={12} sm={6} md={6} lg={6} xl={3} key={feature.id}>
              <Link to={feature.routePath} style={{ textDecoration: "none" }}>
                <Card
                  sx={{
                    boxShadow: "none",
                    borderRadius: "10px",
                    p: "25px",
                    cursor: "pointer", // Add cursor pointer for better UX
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <Box
                      sx={{
                        width: "84px",
                        height: "84px",
                        borderRadius: "100%",
                      }}
                      className="mr-15px"
                    >
                      <img src={feature.image} alt="Icon" />
                    </Box>

                    <Box>
                      <Typography
                        variant="h1"
                        sx={{ fontSize: 28, fontWeight: 700, mb: "5px" }}
                      >
                        {feature.title}
                      </Typography>

                      {/* <Typography variant="p" sx={{ fontSize: 14 }}>
                        View
                      </Typography> */}
                    </Box>
                  </Box>
                </Card>
              </Link>
            </Grid>
          ))
        ) : (
          <h1>No Data To Show</h1>
        )}
      </Grid>
    </>
  );
};

export default StatCard;
