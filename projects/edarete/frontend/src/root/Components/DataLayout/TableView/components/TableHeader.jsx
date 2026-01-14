import React from "react";
import { Box, IconButton, Tooltip } from "@mui/material";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { ArrowUpward, ArrowDownward } from "@mui/icons-material";
import ArrowRightRoundedIcon from "@mui/icons-material/ArrowRightRounded";
import SortByAlphaRoundedIcon from "@mui/icons-material/SortByAlphaRounded";

// Draggable Header Cell Component
const DraggableHeaderCell = ({
  col,
  index,
  isDarkMode,
  customHeaderTextColor,
  sortField,
  sortOrder,
  headerTextColor,
  onColumnSort,
}) => {
  const isDraggable = col.field !== "id" && col.field !== "actions";

  if (!isDraggable) {
    return (
      <StaticHeaderCell
        col={col}
        isDarkMode={isDarkMode}
        customHeaderTextColor={customHeaderTextColor}
        sortField={sortField}
        sortOrder={sortOrder}
        onColumnSort={onColumnSort}
      />
    );
  }

  return (
    <Draggable key={col.field} draggableId={col.field} index={index}>
      {(provided, snapshot) => (
        <Box
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          sx={{
            width: col.width,
            minWidth: col.width,
            maxWidth: col.width + "70px",
            color: customHeaderTextColor,
            fontWeight: "bold",
            display: "flex",
            alignItems: "center",
            justifyContent: "flexStart",
            boxShadow: snapshot.isDragging ? "0 4px 12px rgba(0,0,0,0.2)" : undefined,
            borderTopLeftRadius: index === 0 ? 4 : undefined,
            borderRadius: snapshot.isDragging ? "12px" : undefined,
            height: "auto",
            cursor: snapshot.isDragging ? "grabbing" : "pointer",
            transition: "all 0.2s ease",
            transform: snapshot.isDragging ? "rotate(5deg) scale(1.05)" : "none",
            zIndex: snapshot.isDragging ? 1000 : "auto",
            opacity: snapshot.isDragging ? 0.8 : 1,
            position: "relative",
            "& .sort-icon": {
              opacity: 0,
              transition: "opacity 0.2s",
            },
            "&:hover .sort-icon": {
              opacity: 0.5,
            },
            "& .sort-icon.sorted": {
              opacity: 1,
            },
          }}
          onClick={() => onColumnSort(col.field)}
        >
          {col.field === "expand" ? "" : col.headerName}
          <SortIndicator
            field={col.field}
            sortField={sortField}
            sortOrder={sortOrder}
            isDarkMode={isDarkMode}
            headerTextColor={headerTextColor}
          />
        </Box>
      )}
    </Draggable>
  );
};

// Static Header Cell Component
const StaticHeaderCell = ({
  col,
  isDarkMode,
  customHeaderTextColor,
  sortField,
  sortOrder,
  onColumnSort,
}) => (
  <Box
    key={col.field}
    sx={{
      width: col.width,
      minWidth: col.width,
      maxWidth: col.width,
      color: customHeaderTextColor,
      fontWeight: "bold",
      display: "flex",
      alignItems: "center",
      justifyContent: "flexStart",
      borderTopLeftRadius: 0,
      borderTopRightRadius: 0,
      height: "auto",
      cursor: "pointer",
      position: "relative",
      "& .sort-icon": {
        opacity: 0,
        transition: "opacity 0.2s",
      },
      "&:hover .sort-icon": {
        opacity: 1,
      },
    }}
    onClick={() => onColumnSort(col.field)}
  >
    {col.headerName}
    <SortIndicator field={col.field} sortField={sortField} sortOrder={sortOrder} />
  </Box>
);

// Sort Indicator Component
const SortIndicator = ({ field, sortField, sortOrder, isDarkMode, headerTextColor }) => (
  <span
    className={`sort-icon${sortField === field ? " sorted" : ""}`}
    style={{
      marginLeft: "3px",
      marginTop: "2px",
      color: isDarkMode ? headerTextColor : "black",
    }}
  >
    {sortField === field ? (
      sortOrder === "asc" ? (
        <ArrowUpward fontSize="12px" />
      ) : sortOrder === "desc" ? (
        <ArrowDownward fontSize="12px" />
      ) : (
        <ArrowUpward fontSize="12px" />
      )
    ) : (
      <SortByAlphaRoundedIcon fontSize="25px" />
    )}
  </span>
);

// Expand Header Placeholder
const ExpandHeaderPlaceholder = ({ expandColumnWidth, customHeaderColor, customHeaderTextColor }) => (
  <Box
    key="expand-header"
    sx={{
      width: expandColumnWidth,
      minWidth: expandColumnWidth,
      maxWidth: expandColumnWidth,
      color: customHeaderTextColor,
      fontWeight: "bold",
      display: "flex",
      p: 1,
      alignItems: "flexStart",
      justifyContent: "center",
      borderTopLeftRadius: 0,
      borderTopRightRadius: 0,
      height: 10,
    }}
  >
    <IconButton
      size="medium"
      style={{
        opacity: 0,
        width: "80px",
        height: "100%",
      }}
    >
      <ArrowRightRoundedIcon />
    </IconButton>
  </Box>
);

// Actions Header
const ActionsHeader = ({ actionColumnWidth, customHeaderTextColor, headerName }) => (
  <Box
    sx={{
      width: actionColumnWidth,
      minWidth: actionColumnWidth,
      maxWidth: actionColumnWidth,
      color: customHeaderTextColor,
      fontWeight: "bold",
      display: "flex",
      alignItems: "center",
      justifyContent: "flexStart",
      borderTopLeftRadius: 0,
      borderTopRightRadius: 4,
      height: "auto",
      ml: 1,
    }}
  >
    {headerName}
  </Box>
);

// Draggable Table Header (with DragDropContext)
export const DraggableTableHeader = ({
  orderedVisibleColumns,
  expandColumn,
  actionColumn,
  customHeaderColor,
  customHeaderTextColor,
  headerTextColor,
  isDarkMode,
  sortField,
  sortOrder,
  onColumnSort,
  onColumnDragEnd,
  shouldShowActionsColumn,
  enableRowActions,
  overflowPanel,
}) => (
  <DragDropContext onDragEnd={onColumnDragEnd}>
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        minHeight: "60px",
        fontSize: "1rem",
        borderBottom: isDarkMode
          ? "2px solid rgba(255, 255, 255, 0.1)"
          : "2px solid rgba(112, 45, 122,0.4)",
      }}
    >
      <Droppable droppableId="main-table" direction="horizontal">
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            style={{
              display: "flex",
              border: snapshot.isDraggingOver
                ? `2px dashed ${isDarkMode ? "#6C63FF" : "#7479ed"}`
                : "none",
              borderRadius: snapshot.isDraggingOver ? "8px" : "4px",
              backgroundColor: customHeaderColor,
              padding: snapshot.isDraggingOver ? "4px" : "0px",
              transition: "all 0.2s ease",
              width: "100%",
            }}
          >
            <ExpandHeaderPlaceholder
              expandColumnWidth={expandColumn.width}
              customHeaderColor={customHeaderColor}
              customHeaderTextColor={customHeaderTextColor}
            />

            {orderedVisibleColumns.map((col, index) => (
              <DraggableHeaderCell
                key={col.field}
                col={col}
                index={index}
                isDarkMode={isDarkMode}
                customHeaderTextColor={customHeaderTextColor}
                sortField={sortField}
                sortOrder={sortOrder}
                headerTextColor={headerTextColor}
                onColumnSort={onColumnSort}
              />
            ))}

            {shouldShowActionsColumn && enableRowActions && (
              <ActionsHeader
                actionColumnWidth={actionColumn.width}
                customHeaderTextColor={customHeaderTextColor}
                headerName={actionColumn.headerName}
              />
            )}

            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </Box>
    {overflowPanel}
  </DragDropContext>
);

// Static Table Header (without drag and drop)
export const StaticTableHeader = ({
  orderedVisibleColumns,
  expandColumn,
  actionColumn,
  customHeaderColor,
  customHeaderTextColor,
  headerTextColor,
  isDarkMode,
  sortField,
  sortOrder,
  onColumnSort,
  shouldShowActionsColumn,
  enableRowActions,
}) => (
  <Box
    sx={{
      display: "flex",
      flexDirection: "row",
      minHeight: "60px",
      background: customHeaderColor,
      color: customHeaderTextColor,
      borderBottom: isDarkMode
        ? "2px solid rgba(255, 255, 255, 0.1)"
        : "2px solid rgba(112, 45, 122,0.4)",
      fontSize: "1rem",
    }}
  >
    <ExpandHeaderPlaceholder
      expandColumnWidth={expandColumn.width}
      customHeaderColor={customHeaderColor}
      customHeaderTextColor={customHeaderTextColor}
    />

    {orderedVisibleColumns.map((col, index) => (
      <Box
        key={col.field}
        sx={{
          width: col.width,
          minWidth: col.width,
          maxWidth: col.width + "70px",
          color: customHeaderTextColor,
          fontWeight: "bold",
          display: "flex",
          alignItems: "center",
          justifyContent: "flexStart",
          borderTopLeftRadius: index === 0 ? 4 : undefined,
          height: "auto",
          cursor: "pointer",
          position: "relative",
          "& .sort-icon": {
            opacity: 0,
            transition: "opacity 0.2s",
          },
          "&:hover .sort-icon": {
            opacity: 0.5,
          },
          "& .sort-icon.sorted": {
            opacity: 1,
          },
        }}
        onClick={() => onColumnSort(col.field)}
      >
        {col.headerName}
        <SortIndicator
          field={col.field}
          sortField={sortField}
          sortOrder={sortOrder}
          isDarkMode={isDarkMode}
          headerTextColor={headerTextColor}
        />
      </Box>
    ))}

    {shouldShowActionsColumn && enableRowActions && (
      <ActionsHeader
        actionColumnWidth={actionColumn.width}
        customHeaderTextColor={customHeaderTextColor}
        headerName={actionColumn.headerName}
      />
    )}
  </Box>
);

export default DraggableTableHeader;
