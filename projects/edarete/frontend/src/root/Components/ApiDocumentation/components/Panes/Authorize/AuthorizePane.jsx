import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";

export default function AuthorizePane({ paneValue, setPaneValue }) {
  const handleChange = (e) => {
    setPaneValue(e.target.value);
  };

  return (
    <Box>
      <Typography variant="h6" component="h4" gutterBottom>
        Authorization
      </Typography>
      <TextField
        value={paneValue}
        onChange={handleChange}
        placeholder="Enter authorization token or details"
        multiline
        rows={8} // approximately h-40 (40px * 8 = 320px)
        fullWidth
        sx={{
          "& .MuiOutlinedInput-root": {
            p: 2, // equivalent to p-2
            border: "1px solid", // border class
            borderColor: "divider", // default border color
            "&:hover": {
              borderColor: "text.primary", // hover state
            },
          },
        }}
      />
    </Box>
  );
}
