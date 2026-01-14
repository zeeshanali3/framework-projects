import React from "react";
import { ClipLoader } from "react-spinners";
import Box from "@mui/material/Box";

const Spinner = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100%",
      }}
    >
      <ClipLoader color="#2963E8" size={60} />
    </Box>
  );
};

export default Spinner;
