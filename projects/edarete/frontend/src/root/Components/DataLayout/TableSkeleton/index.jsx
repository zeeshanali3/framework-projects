import React from "react";
import { Box, Typography } from "@mui/material";
import Skeleton from "@mui/material/Skeleton";
const TableSkeleton = () => {
  const getDeviceArrayLength = () => {
    if (window.innerWidth < 600) return 2; // Mobile (XS)
    if (window.innerWidth < 900) return 4; // Tablet (SM/MD)
    if (window.innerWidth < 1300) return 5;
    return 6; // Desktop (LG+)
  };
  const arr = Array.from({ length: 7 });
  const arr2 = Array.from({ length: getDeviceArrayLength() });
  // console.log("arr2", arr2);
  return (
    <Box
      sx={{
        width: "100%",
        paddingLeft: 6,
        paddingRight: 6,
        height: "60vh",
        display: "flex",
        gap: 1,
        flexDirection: "column",
        // marginTop: "10vh",
      }}
    >
      <Box
        sx={{
          display: "flex",
          width: "100%",
          height: "100px",
          flexDirection: "row",
          gap: 1,
          justifyContent: "space-evenly",
        }}
      >
        {arr2.map((item, index) => (
          <Typography component="div" key={index} variant="h3">
            <Skeleton height="100%" width="130px" />
          </Typography>
        ))}
      </Box>
      {arr.map((item, index) => (
        <Skeleton key={index} width="100%" height="100%" animation="wave" />
      ))}
      <Skeleton />
      {/* <Skeleton animation="wave" />
      <Skeleton animation={false} /> */}
    </Box>
  );
};

export default TableSkeleton;
