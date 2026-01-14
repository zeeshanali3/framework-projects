import React from "react";
import { Box, Typography, Paper } from "@mui/material";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";

export default function NoDashboardFallback() {
  return (
    <Paper
      elevation={3}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        p: 4,
        textAlign: "center",
        backgroundColor: "#fef7e0",
        borderRadius: 4,
      }}
    >
      <WarningAmberIcon sx={{ fontSize: 60, color: "#f57c00", mb: 2 }} />
      <Typography variant="h5" sx={{ fontWeight: 500, color: "#5d4037" }}>
        No Dashboard Available
      </Typography>
      <Typography variant="body1" sx={{ mt: 1, color: "#6d4c41" }}>
        This role currently doesn't have a dashboard assigned.
      </Typography>
    </Paper>
  );
}
