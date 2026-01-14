import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import RatingsChart from "./RatingsChart";
import { useTheme } from "@mui/material";

const Ratings = ({ data }) => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';

  useEffect(()=>{
  }, [data])
  return (
    <>
      <Card
        sx={{
          boxShadow: "none",
          borderRadius: "10px",
          p: "25px",
          mb: "15px",
          backgroundColor: isDarkMode ? theme.palette.background.paper : '#fff',
          color: isDarkMode ? theme.palette.text.primary : 'inherit',
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box>
            <Typography
              variant="h1"
              sx={{ 
                fontSize: 18, 
                fontWeight: 500, 
                mb: "10px",
                color: isDarkMode ? theme.palette.primary.light : theme.palette.primary.dark
              }}
            >
              {/* Ratings tab Nmae */}
              {data?.name || "Unknown"}
            </Typography>

            <Typography
              sx={{
                fontSize: '13px',
                fontWeight: 500,
                color: isDarkMode ? theme.palette.text.secondary : "#A9A9C8",
                mb: "10px",
              }}
            >
              {/* YEAR OF 2022 */}
            </Typography>

            <Typography
              sx={{
                fontSize: 24,
                fontWeight: 700,
                color: isDarkMode ? theme.palette.text.primary : "#260944",
                mb: "5px",
              }}
              as="h3"
            >
              {/* 8.14k number of total user */}
              {data?.count || "0"}
              <Typography
                component="span"
                sx={{ fontSize: 13, color: isDarkMode ? theme.palette.text.secondary : "#A9A9C8" }}
              >

              </Typography>
            </Typography>

            <Typography
              sx={{ 
                fontSize: '12px', 
                fontWeight: 500, 
                color: isDarkMode ? theme.palette.text.secondary : "#5B5B98" 
              }}
            >


              <Typography
                component="span"
                sx={{ 
                  fontWeight: 500, 
                  fontSize: '13px', 
                  ml: "2px",
                  color: isDarkMode ? theme.palette.primary.light : theme.palette.primary.main
                }}
                className="primaryColor"
              >
                {/* +15.6% new user number */}
              </Typography>{" "}
              {/* From previous period  for new user*/}
            </Typography>
          </Box>

          <Box>
            <RatingsChart data={data} />
          </Box>
        </Box>
      </Card>
    </>
  );
};

export default Ratings;
