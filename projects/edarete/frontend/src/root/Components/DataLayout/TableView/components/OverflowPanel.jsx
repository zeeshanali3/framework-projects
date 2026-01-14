import React from "react";
import ReactDOM from "react-dom";
import { Box, Typography, Fade, Grow } from "@mui/material";
import { Droppable, Draggable } from "@hello-pangea/dnd";
import { formatDisplayValue, calculateOverflowedColumnWidth, calculateColumnsPerRow } from "../helpers/tableHelpers";

// Single overflow column item
const OverflowColumnItem = ({
  col,
  idx,
  row,
  isDarkMode,
  data,
  expandableRowHeadingColor,
  expandableRowTextColor,
  expandableRowTextWeight,
  expandableRowTextSize,
  expandableRowHeadingTextWeight,
  expandableRowHeadingTextSize,
}) => (
  <Draggable key={col.field} draggableId={col.field} index={idx}>
    {(provided, snapshot) => (
      <Box
        ref={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        sx={{
          background: snapshot.isDragging
            ? isDarkMode
              ? "rgba(255,255,255,0.1)"
              : "rgba(0,0,0,0.1)"
            : "transparent",
          p: 1,
          m: 0.2,
          whiteSpace: "normal",
          maxWidth: calculateOverflowedColumnWidth(col, data || []),
          minWidth: 120,
          display: "flex",
          flexDirection: "row",
          justifyContent: "flexStart",
          borderRadius: snapshot.isDragging ? "8px" : "4px",
          boxShadow: snapshot.isDragging ? "0 4px 12px rgba(0,0,0,0.2)" : undefined,
          cursor: snapshot.isDragging ? "grabbing" : "pointer",
          transition: "all 0.2s ease",
          transform: snapshot.isDragging ? "rotate(5deg) scale(1.05)" : "none",
          zIndex: snapshot.isDragging ? 1000 : "auto",
          opacity: snapshot.isDragging ? 0.8 : 1,
        }}
      >
        <Grow
          in={true}
          style={{
            transformOrigin: "center",
            transitionDelay: `${idx * 120}ms`,
          }}
          timeout={400 + idx * 120}
        >
          <Fade in={true} timeout={400 + idx * 120}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "flexStart",
                width: "100%",
              }}
            >
              <Typography
                variant="subtitle2"
                sx={{
                  fontWeight: expandableRowHeadingTextWeight,
                  color: expandableRowHeadingColor,
                  fontSize: expandableRowHeadingTextSize,
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "flexStart",
                }}
              >
                {col.headerName}:
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: expandableRowTextColor,
                  fontWeight: expandableRowTextWeight,
                  fontSize: expandableRowTextSize,
                  ml: 1,
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  wordBreak: "break-word",
                }}
              >
                {formatDisplayValue(row[col.field], col.dynamicKey)}
              </Typography>
            </Box>
          </Fade>
        </Grow>
      </Box>
    )}
  </Draggable>
);

// Overflow Panel with Drag and Drop
export const DraggableOverflowPanel = ({
  row,
  overflowedColumns,
  hiddenColumns,
  detailPanelPos,
  isDarkMode,
  headerBgColor,
  data,
  expandableRowHeadingColor,
  expandableRowTextColor,
  expandableRowTextWeight,
  expandableRowTextSize,
  expandableRowHeadingTextWeight,
  expandableRowHeadingTextSize,
}) => {
  if (!row) return null;

  const columnsPerRow = calculateColumnsPerRow(overflowedColumns.length);

  return ReactDOM.createPortal(
    <Droppable droppableId="overflow-panel" direction="horizontal">
      {(provided, snapshot) => (
        <Box
          ref={provided.innerRef}
          {...provided.droppableProps}
          sx={{
            background: isDarkMode ? headerBgColor : "#DCDCDC",
            boxShadow: isDarkMode && "10px 20px 20px rgba(0, 0, 0, 0.3)",
            mt: 0,
            mb: 0,
            position: "absolute",
            left: detailPanelPos.left,
            top: detailPanelPos.top,
            width: detailPanelPos.width,
            height: detailPanelPos.height,
            maxWidth: "100vw",
            display: "grid",
            gridTemplateColumns: {
              xs: "repeat(2, 1fr)",
              sm: "repeat(2, 1fr)",
              md: `repeat(${columnsPerRow}, 1fr)`,
            },
            flexWrap: "wrap",
            gap: 0.5,
            justifyContent: "flexStart",
            alignItems: "center",
            borderTop: !isDarkMode && "1px solid rgba(32, 16, 16, 0.12)",
            border: snapshot.isDraggingOver
              ? `2px dashed ${isDarkMode ? "#6C63FF" : "#7479ed"}`
              : isDarkMode && "1px solid rgba(255,255,255,0.1) ",
            borderRadius: snapshot.isDraggingOver ? "8px" : undefined,
            transition: "all 0.2s ease",
            padding: snapshot.isDraggingOver ? "12px" : "2px",
          }}
        >
          {overflowedColumns
            .filter((col) => col && col.field && !hiddenColumns.includes(col.field))
            .map((col, idx) => (
              <OverflowColumnItem
                key={col.field}
                col={col}
                idx={idx}
                row={row}
                isDarkMode={isDarkMode}
                data={data}
                expandableRowHeadingColor={expandableRowHeadingColor}
                expandableRowTextColor={expandableRowTextColor}
                expandableRowTextWeight={expandableRowTextWeight}
                expandableRowTextSize={expandableRowTextSize}
                expandableRowHeadingTextWeight={expandableRowHeadingTextWeight}
                expandableRowHeadingTextSize={expandableRowHeadingTextSize}
              />
            ))}
          {provided.placeholder}
        </Box>
      )}
    </Droppable>,
    document.body
  );
};

// Static Overflow Panel (without drag and drop)
export const StaticOverflowPanel = ({
  row,
  overflowedColumns,
  hiddenColumns,
  detailPanelPos,
  isDarkMode,
  headerBgColor,
  expandableRowHeadingColor,
  expandableRowTextColor,
  expandableRowTextWeight,
  expandableRowTextSize,
  expandableRowHeadingTextWeight,
  expandableRowHeadingTextSize,
}) => {
  if (!row) return null;

  const columnsPerRow = calculateColumnsPerRow(overflowedColumns.length);

  return ReactDOM.createPortal(
    <Box
      sx={{
        background: isDarkMode ? headerBgColor : "#DCDCDC",
        boxShadow: isDarkMode && "10px 20px 20px rgba(0, 0, 0, 0.3)",
        mt: 0,
        mb: 0,
        position: "absolute",
        left: detailPanelPos.left,
        top: detailPanelPos.top,
        width: detailPanelPos.width,
        height: detailPanelPos.height,
        maxWidth: "100vw",
        display: "grid",
        gridTemplateColumns: {
          xs: "repeat(2, 1fr)",
          sm: "repeat(2, 1fr)",
          md: `repeat(${columnsPerRow}, 1fr)`,
        },
        flexWrap: "wrap",
        gap: 0.5,
        justifyContent: "flexStart",
        alignItems: "center",
        borderTop: !isDarkMode && "1px solid rgba(32, 16, 16, 0.12)",
        border: isDarkMode && "1px solid rgba(255,255,255,0.1) ",
        transition: "all 0.2s ease",
        padding: "2px",
      }}
    >
      {overflowedColumns
        .filter((col) => col && col.field && !hiddenColumns.includes(col.field))
        .map((col, idx) => (
          <Grow
            key={col.field}
            in={true}
            style={{
              transformOrigin: "center",
              transitionDelay: `${idx * 120}ms`,
            }}
            timeout={400 + idx * 120}
          >
            <Fade in={true} timeout={400 + idx * 120}>
              <Box
                sx={{
                  p: 1,
                  m: 0.2,
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "flexStart",
                  minWidth: 120,
                }}
              >
                <Typography
                  variant="subtitle2"
                  sx={{
                    fontWeight: expandableRowHeadingTextWeight,
                    color: expandableRowHeadingColor,
                    fontSize: expandableRowHeadingTextSize,
                  }}
                >
                  {col.headerName}:
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: expandableRowTextColor,
                    fontWeight: expandableRowTextWeight,
                    fontSize: expandableRowTextSize,
                    ml: 1,
                    wordBreak: "break-word",
                  }}
                >
                  {formatDisplayValue(row[col.field], col.dynamicKey)}
                </Typography>
              </Box>
            </Fade>
          </Grow>
        ))}
    </Box>,
    document.body
  );
};

export default DraggableOverflowPanel;
