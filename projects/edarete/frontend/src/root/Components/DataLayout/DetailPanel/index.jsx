import {
  Typography,
  Box,
} from "@mui/material";
import React from "react";
const DetailPanelWrapper = ({
  row,
  overflowedColumns,
  onHeightChange,
  innerRef,
  droppableProps,
}) => {
  const measuringRef = React.useRef(null);

  // Safe display value
  const getDisplayValue = (value) => {
    if (value === undefined || value === null) return "-";
    if (typeof value === "object") {
      if (Array.isArray(value)) return value.join(", ");
      return value.label || value.name || JSON.stringify(value);
    }
    return value;
  };

  // Dynamically measure height only on inner wrapper
  React.useEffect(() => {
    if (!measuringRef.current) return;

    const observer = new window.ResizeObserver((entries) => {
      for (const entry of entries) {
        const measured = entry.contentRect.height;
        if (measured > 0) {
          onHeightChange(measured);
        }
      }
    });

    observer.observe(measuringRef.current);
    return () => observer.disconnect();
  }, [row.id, overflowedColumns, onHeightChange]);

  return (
    <Box
      ref={innerRef}
      {...droppableProps}
      sx={{
        p: 2,
        width: "100%",
        overflow: "hidden",
      }}
    >
      {/* Inner element for height measurement — safe from DnD */}
      <Box
        ref={measuringRef}
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 2,
          whiteSpace: "normal",
          wordBreak: "break-word",
          overflowWrap: "break-word",
        }}
      >
        {overflowedColumns.map((col) => (
          <Box key={col.field} sx={{ width: 210 }}>
            <Typography variant="caption" color="text.secondary">
              {col.headerName}
            </Typography>
            <Typography variant="body2">
              {getDisplayValue(row[col.field])}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default DetailPanelWrapper;
