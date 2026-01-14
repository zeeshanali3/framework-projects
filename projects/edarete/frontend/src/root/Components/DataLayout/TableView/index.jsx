import React, { useEffect, useState, useCallback, useRef, useMemo } from "react";
import { DataGrid } from "@mui/x-data-grid";
import {
  Typography,
  AvatarGroup,
  Avatar,
  Box,
  Menu,
  MenuItem,
  Button,
  IconButton,
  Tooltip,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import ActionButtons from "../ActionButtons";
import { HasPermission } from "../constants/permissionChecker";
import { useSelector } from "react-redux";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import WysiwygOutlinedIcon from "@mui/icons-material/WysiwygOutlined";
import ArrowRightRoundedIcon from "@mui/icons-material/ArrowRightRounded";
import { showWarningToast } from "../../../Common/ToastUtils";
import TableSkeleton from "../TableSkeleton";

// Import extracted components and helpers
import { EditableStatusCell } from "./components/EditableStatusCell";
import { DraggableTableHeader, StaticTableHeader } from "./components/TableHeader";
import { DraggableOverflowPanel, StaticOverflowPanel } from "./components/OverflowPanel";
import {
  getDisplayValue,
  calculateColumnWidth,
  calculateColumnsPerRow,
  computeDetailPanelHeight,
  hasDuplicateColumns,
  buildRowsWithDetailPanel,
  getRowSpecificActions,
  getDisabledActions,
} from "./helpers/tableHelpers";

const TableView = ({
  appearanceProp,
  configProp,
  dataProp,
  additionalProp,
  onRowAction,
  onUpdateRefreshData,
  isDarkMode,
  textColor,
  secondaryTextColor,
  themeStyles,
  showSearchIcon,
  externalMenuAnchorEl,
  onExternalMenuOpen,
  onExternalMenuClose,
  isMenuExternallyControlled = false,
  userStatusUpdationPermission,
  useDragAndDropFeature = true,
  enableRowActions = true,
  enableUserStatusUpdation = true,
  enableCollapsibleRow = true,
  rowActionsConfig = null,
}) => {
  const { currentUserPermissions } = useSelector((state) => state.main);
  const theme = useTheme();

  // Theme colors
  const headerBgColor = themeStyles?.header?.headColor || (isDarkMode ? "#2d2d3d" : "#f0f0f0");
  const headerTextColor = themeStyles?.header?.headTextColor || (isDarkMode ? "#ffffff" : "#000000");
  const borderColor = themeStyles?.image?.borderColor || (isDarkMode ? "#6C63FF" : "#7479ed");
  const actionButtonColor = themeStyles?.actionButtons?.color || (isDarkMode ? "#a5a4c4" : "#7b7a8c");

  const lightTable = theme?.customTokens?.light.table;
  const darkTable = theme?.customTokens?.dark.table;

  // Theme-based styles
  const customHeaderColor = isDarkMode ? darkTable?.header?.headColor : lightTable?.header?.headColor;
  const customHeaderTextColor = isDarkMode ? "white" : "black";
  const customHeaderTextWeight = lightTable?.header?.textWeight;
  const customHeaderTextSize = lightTable?.header?.textSize;
  const rowColor = isDarkMode ? darkTable?.row?.backgroundColor : lightTable?.row?.backgroundColor;
  const rowTextSize = lightTable?.row?.textSize;
  const rowTextWeight = lightTable?.row?.textWeight;
  const rowTextColor = isDarkMode ? darkTable?.row?.color : lightTable?.row?.color;
  const specialRow = lightTable?.specialRow;

  // Expandable row styles
  const expandableRowTextSize = lightTable?.expandableRow?.textSize;
  const expandableRowTextColor = isDarkMode ? darkTable?.expandableRow?.color : lightTable?.expandableRow?.color;
  const expandableRowHeadingTextSize = lightTable?.expandableRow?.headingSize;
  const expandableRowHeadingTextWeight = lightTable?.expandableRow?.headingWeight;
  const expandableRowTextWeight = lightTable?.expandableRow?.textWeight;
  const expandableRowColor = isDarkMode ? darkTable?.expandableRow?.backgroundColor : lightTable?.expandableRow?.backgroundColor;
  const expandableRowHeadingColor = isDarkMode ? darkTable?.expandableRow?.heading : lightTable?.expandableRow?.heading;

  // Config flags
  const rowActionsIsServerDriven = configProp?.features?.rowActions?.operationalMode === "server";
  const { setbulkActionArray } = additionalProp?.bulkActions || {};
  const isLocal = configProp?.features?.pagination?.operationalMode === "local";
  const shouldUseCustomHeaders = enableCollapsibleRow;

  // State
  const [hiddenColumns, setHiddenColumns] = useState([]);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [loading, setLoading] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);
  const [allColumns, setAllColumns] = useState([]);
  const [expandedRowId, setExpandedRowId] = useState(null);
  const [detailPanelPos, setDetailPanelPos] = useState(null);
  const [visibleColumns, setVisibleColumns] = useState([]);
  const [overflowedColumns, setOverflowedColumns] = useState([]);
  const [columnOrder, setColumnOrder] = useState([]);
  const [editingCell, setEditingCell] = useState({ rowId: null, field: null });
  const [sortField, setSortField] = useState(null);
  const [sortOrder, setSortOrder] = useState(null);
  const [checkboxEnabled, setCheckboxEnabled] = useState(configProp?.grid?.checkBoxEnable);

  const dataGridRef = useRef();
  const showSkeleton = loading || isInitialLoad;

  // Filtered actions based on permissions
  const filteredActions = useMemo(() => {
    return configProp?.features?.rowActions?.permission
      ? dataProp?.features?.rowActions?.actions?.filter((action) =>
          HasPermission(action.permission, currentUserPermissions)
        )
      : dataProp?.features?.rowActions?.actions;
  }, [configProp?.features?.rowActions?.permission, dataProp?.features?.rowActions?.actions, currentUserPermissions]);

  // Check if actions column should be shown
  const shouldShowActionsColumn = useCallback(() => {
    const hasVisibleDataColumns = allColumns.some((col) => !hiddenColumns.includes(col.field));
    const actionsEnabled = configProp?.features?.rowActions?.enable && filteredActions?.length > 0;
    const notViewMode = showSearchIcon?.toLowerCase() !== "view";
    return hasVisibleDataColumns && actionsEnabled && notViewMode;
  }, [allColumns, hiddenColumns, configProp, filteredActions, showSearchIcon]);

  // Calculate column widths
  const calculateColumnWidths = useCallback(() => {
    if (!dataProp?.features?.parameters?.fields || !additionalProp?.data) return [];
    const rows = additionalProp.data;

    let columns = allColumns.map((col) => ({
      ...col,
      field: col.dynamicKey || col.name,
      headerName: col.displayName || col.label || "-000",
      width: calculateColumnWidth(col, rows),
    }));

    if (columnOrder.length > 0) {
      columns = columnOrder.map((field) => columns.find((col) => col.field === field)).filter(Boolean);
    }
    return columns;
  }, [dataProp?.features?.parameters?.fields, additionalProp?.data, allColumns, columnOrder]);

  // Recalculate visible vs overflow columns
  const recalculateColumns = useCallback((allCalculatedColumns) => {
    const grid = dataGridRef.current;
    if (!grid) return { visCols: [], overCols: [] };
    if (!enableCollapsibleRow) return { visCols: allCalculatedColumns, overCols: [] };

    const containerWidth = grid.offsetWidth || 1200;
    let widthUsed = 50; // expand column width

    if (enableRowActions && shouldShowActionsColumn()) widthUsed += 160;

    const visCols = [];
    const overCols = [];

    for (let col of allCalculatedColumns) {
      if (hiddenColumns.includes(col.field)) continue;
      const colWidth = col.width || 120;
      if (widthUsed + colWidth <= containerWidth - 20) {
        visCols.push(col);
        widthUsed += colWidth;
      } else {
        overCols.push(col);
      }
    }
    return { visCols, overCols };
  }, [shouldShowActionsColumn, hiddenColumns, enableCollapsibleRow, enableRowActions]);

  // Update detail panel position
  const updateDetailPanelPosition = useCallback(() => {
    if (!expandedRowId) return;
    const grid = dataGridRef.current;
    if (!grid) return;

    const rowNode = grid.querySelector(`.MuiDataGrid-row[data-id="${expandedRowId}"]`);
    if (rowNode) {
      const rect = rowNode.getBoundingClientRect();
      const row = additionalProp?.data?.find((r) => r.id === expandedRowId);
      const isXs = typeof window !== "undefined" && window.innerWidth < 600;

      const detailPanelHeight = computeDetailPanelHeight({
        row,
        overflowedColumns,
        isXs,
        columnsPerRowFn: () => calculateColumnsPerRow(overflowedColumns.length),
      });

      setDetailPanelPos({
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX,
        width: rect.width,
        height: detailPanelHeight,
      });
    }
  }, [expandedRowId, overflowedColumns, additionalProp?.data]);

  const updateDetailPanelPositionRef = useRef(updateDetailPanelPosition);

  useEffect(() => {
    updateDetailPanelPositionRef.current = updateDetailPanelPosition;
  }, [updateDetailPanelPosition]);

  // Loading effect
  useEffect(() => {
    setLoading(true);
    setIsInitialLoad(true);
    const timeout = setTimeout(() => {
      const hasData = isLocal
        ? Array.isArray(additionalProp?.data) && additionalProp?.data.length > 0
        : Array.isArray(dataProp?.features?.parameters?.fields) && dataProp?.features?.parameters?.fields.length > 0;
      setLoading(!hasData);
      setIsInitialLoad(false);
    }, 300);
    return () => clearTimeout(timeout);
  }, [additionalProp?.data, dataProp, isLocal]);

  // Initial load completion check
  useEffect(() => {
    if (loading || !isInitialLoad) return;
    const hasColumnsReady = Array.isArray(allColumns) && allColumns.length > 0 &&
      Array.isArray(visibleColumns) && visibleColumns.length > 0 &&
      Array.isArray(columnOrder) && columnOrder.length > 0;

    if (!hasColumnsReady) return;

    let cancelled = false;
    let checks = 0;
    let timerId = null;

    const runCheck = () => {
      if (cancelled) return;
      const grid = dataGridRef.current;
      const scroller = grid?.querySelector?.('.MuiDataGrid-virtualScroller') || grid?.querySelector?.('.MuiDataGrid-main') || grid;
      const w = scroller?.scrollWidth || 0;
      const cw = scroller?.clientWidth || 0;
      const h = scroller?.scrollHeight || 0;

      timerId = window.setTimeout(() => {
        if (cancelled) return;
        const w2 = scroller?.scrollWidth || 0;
        const cw2 = scroller?.clientWidth || 0;
        const h2 = scroller?.scrollHeight || 0;
        const stable = w === w2 && cw === cw2 && h === h2;
        checks = stable ? checks + 1 : 0;
        if (checks >= 3) {
          setIsInitialLoad(false);
          return;
        }
        requestAnimationFrame(runCheck);
      }, 90);
    };

    runCheck();
    return () => { cancelled = true; if (timerId) clearTimeout(timerId); };
  }, [loading, isInitialLoad, allColumns, visibleColumns, columnOrder]);

  // Safety timeout
  useEffect(() => {
    const safetyTimer = setTimeout(() => {
      setIsInitialLoad(false);
      setLoading(false);
    }, 3000);
    return () => clearTimeout(safetyTimer);
  }, []);

  // Initialize columns
  useEffect(() => {
    if (dataProp?.features?.parameters?.fields) {
      const columns = dataProp.features.parameters.fields
        .filter((col) => col?.visible === true)
        .map((col, index) => {
          const base = {
            ...col,
            originalIndex: index,
            field: col.dynamicKey || col.name,
            headerName: col.displayName || col.label || "-000",
            width: col.width || 160,
          };
          if (col.type === "date" || col.type === "dateTime") {
            return {
              ...base,
              valueGetter: (params) => {
                if (!params || params.value == null) return undefined;
                if (params.value instanceof Date) return params.value;
                const date = new Date(params.value);
                return isNaN(date.getTime()) ? undefined : date;
              },
            };
          }
          return base;
        });
      setAllColumns(columns);
      setColumnOrder(columns.map((col) => col.field));
    }
  }, [dataProp?.features?.parameters?.fields, additionalProp?.data]);

  // Update visible/overflow columns
  useEffect(() => {
    const allCalculated = calculateColumnWidths();
    const { visCols, overCols } = recalculateColumns(allCalculated);
    setVisibleColumns(visCols);
    setOverflowedColumns(overCols);
    if (expandedRowId) updateDetailPanelPositionRef.current?.();
  }, [allColumns, hiddenColumns.length, recalculateColumns, expandedRowId, additionalProp?.data, calculateColumnWidths]);

  // Update detail panel on resize/scroll
  useEffect(() => {
    if (!expandedRowId) return;
    const handleResizeOrScroll = () => updateDetailPanelPosition();
    window.addEventListener("resize", handleResizeOrScroll);
    const grid = dataGridRef.current;
    if (grid) grid.addEventListener("scroll", handleResizeOrScroll);
    updateDetailPanelPosition();
    return () => {
      window.removeEventListener("resize", handleResizeOrScroll);
      if (grid) grid.removeEventListener("scroll", handleResizeOrScroll);
    };
  }, [expandedRowId, updateDetailPanelPosition, visibleColumns, overflowedColumns, allColumns]);

  // Checkbox state sync
  useEffect(() => {
    setCheckboxEnabled(configProp?.grid?.checkBoxEnable);
  }, [configProp?.grid?.checkBoxEnable]);

  // Drag cursor style
  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `
      [data-rfd-drag-handle-context-id] { cursor: pointer !important; }
      [data-rfd-drag-handle-context-id]:active { cursor: grabbing !important; }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  // Sorted rows
  const sortedRows = useMemo(() => {
    if (!sortField || !sortOrder) return additionalProp?.data || [];
    return [...(additionalProp?.data || [])].sort((a, b) => {
      if (a[sortField] < b[sortField]) return sortOrder === "asc" ? -1 : 1;
      if (a[sortField] > b[sortField]) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });
  }, [additionalProp?.data, sortField, sortOrder]);

  // Handlers
  const handleVisibilityClick = useCallback((columnField) => {
    if (columnField === "id") return;
    setHiddenColumns((prev) => [...prev, columnField]);
  }, []);

  const handleRestoreColumn = useCallback((columnField) => {
    setHiddenColumns((prev) => prev.filter((col) => col !== columnField));
  }, []);

  const handleMenuClick = useCallback((event) => {
    if (!isMenuExternallyControlled) setAnchorEl(event.currentTarget);
  }, [isMenuExternallyControlled]);

  const handleMenuClose = useCallback(() => {
    if (!isMenuExternallyControlled) setAnchorEl(null);
  }, [isMenuExternallyControlled]);

  const handleColumnSort = useCallback((field) => {
    if (sortField !== field) {
      setSortField(field);
      setSortOrder("asc");
    } else if (sortOrder === "asc") {
      setSortOrder("desc");
    } else if (sortOrder === "desc") {
      setSortField(null);
      setSortOrder(null);
    } else {
      setSortOrder("asc");
    }
  }, [sortField, sortOrder]);

  const handleCheckboxChange = useCallback((selectionModel) => {
    const selectedItems = additionalProp?.data?.filter((item) => selectionModel.includes(item.id));
    setbulkActionArray?.(selectedItems);
  }, [additionalProp?.data, setbulkActionArray]);

  const handleRowDoubleClick = useCallback(() => {
    if (configProp?.grid?.checkBoxEnable) setCheckboxEnabled((prev) => !prev);
  }, [configProp?.grid?.checkBoxEnable]);

  const handleAction = useCallback((action, row, index) => {
    if (onRowAction) {
      if (action.name !== "start") onRowAction(action, row, index);
    } else {
      onUpdateRefreshData?.(action, row, index);
    }
  }, [onRowAction, onUpdateRefreshData]);

  const handleStatusChange = useCallback((rowId, newValue) => {
    if (typeof additionalProp?.onStatusChange === "function") {
      additionalProp.onStatusChange(rowId, newValue);
    }
    setEditingCell({ rowId: null, field: null });
  }, [additionalProp]);

  const handleColumnDragEnd = useCallback((result) => {
    const { source, destination } = result;
    if (!destination) return;

    const getDraggable = (cols) => cols.filter((col) =>
      !hiddenColumns.includes(col.field) && col.field !== "id" && col.field !== "actions"
    );

    const visibleDraggables = getDraggable(visibleColumns);
    const overflowDraggables = getDraggable(overflowedColumns);
    const sourceCols = source.droppableId === "main-table" ? visibleDraggables : overflowDraggables;
    const movedCol = sourceCols[source.index];
    if (!movedCol) return;

    const newVisible = [...visibleDraggables];
    const newOverflow = [...overflowDraggables];

    if (source.droppableId === "main-table") newVisible.splice(source.index, 1);
    else newOverflow.splice(source.index, 1);

    if (destination.droppableId === "main-table") newVisible.splice(destination.index, 0, movedCol);
    else newOverflow.splice(destination.index, 0, movedCol);

    const newActive = [...newVisible, ...newOverflow].map((col) => col.field);
    const newColumnOrder = columnOrder.map((field) =>
      hiddenColumns.includes(field) ? field : newActive.shift()
    );

    setColumnOrder(newColumnOrder);
    setAllColumns((prev) => newColumnOrder.map((field) => prev.find((col) => col.field === field)).filter(Boolean));

    const { visCols, overCols } = recalculateColumns(allColumns.filter((col) => !hiddenColumns.includes(col.field)));
    setVisibleColumns(visCols);
    setOverflowedColumns(overCols);
    if (expandedRowId) updateDetailPanelPosition();
  }, [hiddenColumns, visibleColumns, overflowedColumns, columnOrder, allColumns, recalculateColumns, expandedRowId, updateDetailPanelPosition]);

  // Menu anchor
  const menuAnchorEl = isMenuExternallyControlled ? externalMenuAnchorEl : anchorEl;
  const menuHandleClose = isMenuExternallyControlled ? onExternalMenuClose : handleMenuClose;

  // Ordered visible columns
  const orderedVisibleColumns = useMemo(() => {
    const processedColumns = calculateColumnWidths()
      .filter((col) => !overflowedColumns?.some((o) => o?.field === col.field));

    return columnOrder
      .filter((field) => !hiddenColumns.includes(field))
      .map((field) => processedColumns.find((col) => col.field === field))
      .filter(Boolean);
  }, [calculateColumnWidths, columnOrder, hiddenColumns, overflowedColumns]);

  // Column definitions
  const expandColumn = useMemo(() => ({
    field: "expand",
    headerName: "",
    width: 50,
    sortable: false,
    renderCell: (params) => {
      if (!enableCollapsibleRow || overflowedColumns.length === 0 || params.row.isDetailPanel) return null;
      const isExpanded = expandedRowId === params.id;
      return (
        <IconButton
          size="small"
          onClick={(e) => {
            const rowNode = e.currentTarget.closest(".MuiDataGrid-row");
            if (rowNode) {
              if (isExpanded) {
                setExpandedRowId(null);
                setDetailPanelPos(null);
              } else {
                const rect = rowNode.getBoundingClientRect();
                setDetailPanelPos({ top: rect.bottom + window.scrollY, left: rect.left + window.scrollX, width: rect.width });
                setExpandedRowId(params.id);
                setTimeout(updateDetailPanelPosition, 0);
              }
            }
          }}
        >
          <Tooltip title={isExpanded ? "Collapse" : "Expand"}>
            <ArrowRightRoundedIcon
              fontSize="medium"
              style={{
                transform: isExpanded ? "rotate(90deg)" : "rotate(0deg)",
                transition: "transform 0.2s",
              }}
            />
          </Tooltip>
        </IconButton>
      );
    },
  }), [enableCollapsibleRow, overflowedColumns.length, expandedRowId, updateDetailPanelPosition]);

  const actionColumn = useMemo(() => ({
    field: "actions",
    headerName: "Actions",
    width: 160,
    sortable: false,
    renderCell: (params) => {
      if (params.row.isDetailPanel) return null;
      const rowSpecificActions = getRowSpecificActions(params.row, filteredActions, rowActionsConfig);
      const disabledActions = getDisabledActions(params.row, filteredActions, rowActionsConfig);

      return enableRowActions ? (
        <Box sx={{ display: "flex", mt: 0.8 }}>
          <ActionButtons
            displayMode="table"
            color={actionButtonColor}
            actions={rowSpecificActions}
            isDarkMode={isDarkMode}
            onAction={(action, index) => handleAction(action, params.row, index)}
            rowData={params.row}
            disabledActions={disabledActions}
          />
        </Box>
      ) : null;
    },
  }), [filteredActions, rowActionsConfig, enableRowActions, actionButtonColor, isDarkMode, handleAction]);

  // Custom columns with render cells
  const customColumns = useMemo(() => {
    const cols = [
      expandColumn,
      ...visibleColumns
        .filter((col) => col && !overflowedColumns?.some((o) => o?.field === col.field))
        .map((col) => {
          // Date column
          if (col.field === "users_dateOfBirth") {
            return {
              ...col,
              renderCell: (params) => {
                if (!params?.row) return <Box sx={{ display: "flex", alignItems: "center", width: "100%", height: "100%" }}>{"-"}</Box>;
                let rawValue = params.value ?? params.row[col.dynamicKey || col.name];
                if (!rawValue) return <Box sx={{ display: "flex", alignItems: "center", width: "100%", height: "100%" }}>{"-"}</Box>;
                if (typeof rawValue === "string" && rawValue.includes(" ")) rawValue = rawValue.replace(" ", "T");
                const dateObj = new Date(rawValue);
                return (
                  <Box sx={{ display: "flex", alignItems: "center", width: "100%", height: "100%" }}>
                    {!isNaN(dateObj.getTime()) ? (
                      <Typography sx={{ fontSize: 15 }}>{dateObj.toLocaleDateString("en-GB", { year: "numeric", month: "2-digit", day: "2-digit" })}</Typography>
                    ) : "-"}
                  </Box>
                );
              },
            };
          }
          // Image column
          if (col.type === "image") {
            return {
              ...col,
              renderCell: (params) => {
                if (params.row.isDetailPanel) return null;
                if (Array.isArray(params.value)) {
                  return (
                    <AvatarGroup max={3}>
                      {params.value.map((imageUrl, index) => (
                        <Avatar key={index} alt={`Image ${index + 1}`} src={imageUrl} style={{ border: `2px solid ${borderColor}` }} />
                      ))}
                    </AvatarGroup>
                  );
                }
                if (typeof params.value === "string" && params.value.startsWith("http")) {
                  return <Avatar alt="Single Image" src={params.value} />;
                }
                return <span>-</span>;
              },
            };
          }
          // Default column
          return {
            ...col,
            renderCell: (params) => {
              if (params.row.isDetailPanel) return null;
              // Email column
              if (col.field === "users_email") {
                return (
                  <Box sx={{ display: "flex", alignItems: "center", width: "100%", height: "100%", color: specialRow?.color, fontWeight: specialRow?.textWeight }}>
                    {params.value ? (
                      <a href={`mailto:${params.value}`} target="_blank" rel="noopener noreferrer" style={{ color: "#4A90E2", textDecoration: "none", fontWeight: 500 }}>
                        {params.value}
                      </a>
                    ) : "-"}
                  </Box>
                );
              }
              // Status column
              if (col.field === "users_status") {
                const isEditing = editingCell.rowId === params.id && editingCell.field === "users_status" && userStatusUpdationPermission && enableUserStatusUpdation;
                const statusOptions = col.options || [];
                const statusColors = isDarkMode
                  ? { active: appearanceProp?.dark?.grid?.statusActive, inactive: appearanceProp?.dark?.grid?.statusInactive }
                  : { active: appearanceProp?.light?.grid?.statusActive, inactive: appearanceProp?.light?.grid?.statusInactive };

                if (isEditing) {
                  return (
                    <EditableStatusCell
                      value={params.value}
                      statusOptions={statusOptions}
                      statusColors={statusColors}
                      onChange={(e) => handleStatusChange(params.id, e.target.value)}
                      onBlur={() => setEditingCell({ rowId: null, field: null })}
                    />
                  );
                }
                return (
                  <div
                    onClick={() => setEditingCell({ rowId: params.id, field: "users_status" })}
                    style={{
                      background: statusColors[params.value]?.background,
                      color: statusColors[params.value]?.color,
                      borderRadius: "1rem",
                      fontWeight: 300,
                      cursor: userStatusUpdationPermission && enableUserStatusUpdation ? "pointer" : "default",
                      padding: "4px 8px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      height: "50%",
                      width: "70%",
                      minWidth: "70px",
                    }}
                  >
                    {getDisplayValue(params.value)}
                  </div>
                );
              }
              // Object value
              if (params.value && typeof params.value === "object" && !Array.isArray(params.value)) {
                return <Box sx={{ display: "flex", alignItems: "center", width: "100%", height: "100%" }}>{getDisplayValue(params.value)}</Box>;
              }
              // Default
              return <Box sx={{ display: "flex", alignItems: "center", width: "100%", height: "100%" }}>{getDisplayValue(params.value) || "-"}</Box>;
            },
          };
        }),
      shouldShowActionsColumn() ? actionColumn : null,
    ].filter(Boolean);
    return cols;
  }, [expandColumn, visibleColumns, overflowedColumns, actionColumn, shouldShowActionsColumn, editingCell, userStatusUpdationPermission, enableUserStatusUpdation, isDarkMode, appearanceProp, specialRow, borderColor, handleStatusChange]);

  // Row height calculation
  const getRowHeight = useCallback((params) => {
    if (params.model?.isDetailPanel) {
      const overflowedCols = params.model.overflowedColumns || [];
      const row = params.model.originalRow || {};
      const isXs = typeof window !== "undefined" && window.innerWidth < 600;
      return computeDetailPanelHeight({ row, overflowedColumns: overflowedCols, isXs, columnsPerRowFn: () => calculateColumnsPerRow(overflowedCols.length) });
    }
    return null;
  }, []);

  // DataGrid styles
  const dataGridStyles = useMemo(() => ({
    border: "none",
    "--unstable_DataGrid-radius": "0px",
    "& .MuiDataGrid-root": { color: theme.palette.text.primary, backgroundColor: isDarkMode ? theme.palette.background.paper : "#FFFFFF", border: "none !important", overflowX: "auto" },
    "& .MuiDataGrid-cell": { whiteSpace: "normal !important", wordBreak: "break-word", backgroundColor: rowColor, color: rowTextColor, fontSize: rowTextSize, fontWeight: rowTextWeight, padding: enableCollapsibleRow ? 0 : "0px 10px", lineHeight: "2.2", minHeight: "48px", display: "block", borderBottom: isDarkMode ? "1px solid rgba(255, 255, 255, 0.1)" : "1px solid rgba(112, 45, 122,0.4)", alignContent: "center" },
    "& .MuiDataGrid-cell:focus-within": { outline: "none" },
    "& .MuiDataGrid-row:hover": { backgroundColor: isDarkMode ? "rgba(255, 255, 255, 0.04)" : "rgba(0, 0, 0, 0.04)" },
    "& .MuiDataGrid-container--top [role='row']": { backgroundColor: `${customHeaderColor} !important`, color: `${customHeaderTextColor} !important`, lineHeight: "normal" },
    "& .MuiDataGrid-columnHeaders": { lineHeight: "normal", borderBottom: isDarkMode ? "2px solid rgba(255,255,255,0.1)" : "2px solid rgba(112, 45, 122, 0.6)", ...(shouldUseCustomHeaders ? { display: "none !important" } : {}) },
    "& .MuiDataGrid-columnHeader": { ...(shouldUseCustomHeaders ? { display: "none !important" } : {}) },
    "& .MuiDataGrid-columnHeaderTitle": { ...(shouldUseCustomHeaders ? { display: "none !important" } : {}), fontWeight: customHeaderTextWeight, fontSize: customHeaderTextSize },
    "& .MuiDataGrid-virtualScroller": { "&::-webkit-scrollbar": { width: "10px", height: "10px" }, "&::-webkit-scrollbar-thumb": { backgroundColor: headerBgColor, borderRadius: "10px" }, "&::-webkit-scrollbar-track": { backgroundColor: isDarkMode ? "rgba(255, 255, 255, 0.05)" : "rgba(0, 0, 0, 0.05)" } },
    "& .MuiDataGrid-footerContainer": { display: "none" },
    "& .MuiCheckbox-root": { color: isDarkMode ? "#a5a4c4" : "#5C5B98" },
    "& .MuiDataGrid-columnSeparator": { display: "none" },
    "--DataGrid-rowBorderColor": "transparent",
  }), [theme, isDarkMode, rowColor, rowTextColor, rowTextSize, rowTextWeight, enableCollapsibleRow, customHeaderColor, customHeaderTextColor, customHeaderTextWeight, customHeaderTextSize, headerBgColor, shouldUseCustomHeaders]);

  // Early returns
  if (hasDuplicateColumns(dataProp?.features?.parameters?.fields)) {
    return showWarningToast("Cannot display a table with more than one same parameters");
  }

  if (!additionalProp?.data?.length && !dataProp?.features?.parameters?.fields?.length) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <Typography variant="h6" sx={{ color: textColor || (isDarkMode ? "#c7c6ff" : "#260143") }}>No data found</Typography>
      </div>
    );
  }

  // Common props for overflow panel
  const overflowPanelProps = useMemo(() => ({
    overflowedColumns,
    hiddenColumns,
    detailPanelPos,
    isDarkMode,
    headerBgColor,
    data: additionalProp?.data,
    expandableRowHeadingColor,
    expandableRowTextColor,
    expandableRowTextWeight,
    expandableRowTextSize,
    expandableRowHeadingTextWeight,
    expandableRowHeadingTextSize,
  }), [overflowedColumns, hiddenColumns, detailPanelPos, isDarkMode, headerBgColor, additionalProp?.data, expandableRowHeadingColor, expandableRowTextColor, expandableRowTextWeight, expandableRowTextSize, expandableRowHeadingTextWeight, expandableRowHeadingTextSize]);

  // Common props for header
  const headerProps = useMemo(() => ({
    orderedVisibleColumns,
    expandColumn,
    actionColumn,
    customHeaderColor,
    customHeaderTextColor,
    headerTextColor,
    isDarkMode,
    sortField,
    sortOrder,
    onColumnSort: handleColumnSort,
    shouldShowActionsColumn: shouldShowActionsColumn(),
    enableRowActions,
  }), [orderedVisibleColumns, expandColumn, actionColumn, customHeaderColor, customHeaderTextColor, headerTextColor, isDarkMode, sortField, sortOrder, handleColumnSort, shouldShowActionsColumn, enableRowActions]);

  // Render header using extracted components
  const renderHeader = () => {
    if (!shouldUseCustomHeaders) return null;

    const expandedRow = expandedRowId ? additionalProp?.data?.find((r) => r.id === expandedRowId) : null;
    const showOverflowPanel = expandedRowId && detailPanelPos?.height && overflowedColumns.length > 0 && expandedRow;

    if (useDragAndDropFeature) {
      return (
        <DraggableTableHeader
          {...headerProps}
          onColumnDragEnd={handleColumnDragEnd}
          overflowPanel={
            showOverflowPanel ? (
              <DraggableOverflowPanel {...overflowPanelProps} row={expandedRow} />
            ) : null
          }
        />
      );
    }
    return (
      <>
        <StaticTableHeader {...headerProps} />
        {showOverflowPanel && <StaticOverflowPanel {...overflowPanelProps} row={expandedRow} />}
      </>
    );
  };

  return (
    <div ref={dataGridRef} style={{ width: "100%", position: "relative" }}>
      {/* Skeleton overlay */}
      {showSkeleton && (
        <Box sx={{ position: "absolute", inset: 0, zIndex: 1300, backgroundColor: isDarkMode ? theme.palette.background.paper : "#FFFFFF", display: "flex", alignItems: "stretch", pointerEvents: "none" }}>
          <Box sx={{ flex: 1 }}><TableSkeleton /></Box>
        </Box>
      )}

      {/* Column visibility button */}
      {!isMenuExternallyControlled && (
        <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 1 }}>
          <Button onClick={handleMenuClick} startIcon={<WysiwygOutlinedIcon />} sx={{ color: headerTextColor, backgroundColor: headerBgColor, "&:hover": { backgroundColor: isDarkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)" } }} />
        </Box>
      )}

      {/* Header */}
      {renderHeader()}

      {/* Column visibility menu */}
      <Menu
        anchorEl={menuAnchorEl}
        open={Boolean(menuAnchorEl)}
        onClose={menuHandleClose}
        sx={{
          "& .MuiPaper-root": { backgroundColor: isDarkMode ? "#1E1E2F" : "#E5E5E5", maxHeight: "300px", border: isDarkMode ? "1px solid rgba(255, 255, 255, 0.12)" : "1px solid rgba(0, 0, 0, 0.12)", borderRadius: "8px" },
          "& .MuiMenuItem-root": { color: headerTextColor, padding: "8px 16px", margin: "2px 8px", borderRadius: "6px", "&:hover": { backgroundColor: isDarkMode ? "rgba(255, 255, 255, 0.08)" : "rgba(0, 0, 0, 0.04)" } },
        }}
      >
        {allColumns.map((col, index) => (
          <MenuItem
            key={col.field || col.dynamicKey || col.name || index}
            onClick={() => hiddenColumns.includes(col.field) ? handleRestoreColumn(col.field) : handleVisibilityClick(col.field)}
            sx={{ display: "flex", alignItems: "center", gap: 1 }}
          >
            {hiddenColumns.includes(col.field) ? <VisibilityOffIcon style={{ fontSize: "16px", color: "rgb(216, 23, 23)" }} /> : <VisibilityIcon style={{ fontSize: "16px" }} />}
            {col.displayName || col.label || "-000"}
          </MenuItem>
        ))}
      </Menu>

      {/* DataGrid */}
      {loading || allColumns.length === 0 ? (
        <TableSkeleton />
      ) : allColumns.every((col) => hiddenColumns.includes(col.field)) ? (
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "200px", border: isDarkMode ? "1px solid rgba(255, 255, 255, 0.12)" : "1px solid rgba(0, 0, 0, 0.12)", borderRadius: "4px", backgroundColor: theme.palette.background.paper }}>
          <Typography variant="h6" sx={{ color: textColor || (isDarkMode ? "#c7c6ff" : "#260143") }}>All Columns are hidden by you.</Typography>
        </Box>
      ) : (
        <DataGrid
          rows={buildRowsWithDetailPanel(sortedRows, expandedRowId, overflowedColumns)}
          columns={customColumns
            .filter((col) => {
              if (col.field === "id") return true;
              if (col.field === "expand" && !enableCollapsibleRow) return false;
              if (col.field === "actions" && !enableRowActions) return false;
              return col.field === "expand" || col.field === "actions" || (orderedVisibleColumns.some((c) => c.field === col.field) && !hiddenColumns.includes(col.field));
            })
            .sort((a, b) => {
              if (a.field === "expand") return -1;
              if (b.field === "expand") return 1;
              if (a.field === "actions") return 1;
              if (b.field === "actions") return -1;
              return columnOrder.indexOf(a.field) - columnOrder.indexOf(b.field);
            })
            .map((col) => {
              const visibleCol = orderedVisibleColumns.find((c) => c.field === col.field);
              return { ...col, width: visibleCol?.width ?? col.width };
            })}
          getRowId={(row) => row.id}
          getRowHeight={getRowHeight}
          autoHeight
          rowCount={isLocal ? (additionalProp?.data?.length ?? 0) : (additionalProp?.meta?.totalRecords ?? additionalProp?.meta?.total ?? dataProp?.meta?.total ?? additionalProp?.data?.length ?? 0)}
          pagination
          paginationMode={isLocal ? "client" : "server"}
          disableColumnMenu
          disableVirtualization={false}
          checkboxSelection={checkboxEnabled}
          disableRowSelectionOnClick
          onSelectionModelChange={handleCheckboxChange}
          onRowDoubleClick={handleRowDoubleClick}
          sx={dataGridStyles}
        />
      )}
    </div>
  );
};

export default TableView;
