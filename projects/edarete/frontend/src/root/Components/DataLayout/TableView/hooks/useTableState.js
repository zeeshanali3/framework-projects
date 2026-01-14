import { useState, useEffect, useCallback, useRef } from "react";
import {
  initializeColumns,
  calculateAllColumnWidths,
  recalculateColumnsLayout,
} from "../helpers/tableHelpers";

export const useTableState = ({
  configProp,
  dataProp,
  additionalProp,
  enableCollapsibleRow,
  enableRowActions,
  shouldShowActionsColumn,
  expandColumnWidth = 50,
  actionColumnWidth = 160,
}) => {
  const isLocal = configProp?.features?.pagination?.operationalMode === "local";
  const dataGridRef = useRef();

  // Core state
  const [hiddenColumns, setHiddenColumns] = useState([]);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [loading, setLoading] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);
  const [allColumns, setAllColumns] = useState([]);
  const [hoveredRowId, setHoveredRowId] = useState(null);
  const [expandedRowId, setExpandedRowId] = useState(null);
  const [isTableOverflowing, setIsTableOverflowing] = useState(false);
  const [detailPanelPos, setDetailPanelPos] = useState(null);
  const [visibleColumns, setVisibleColumns] = useState([]);
  const [overflowedColumns, setOverflowedColumns] = useState([]);
  const [scrollerWidth, setScrollerWidth] = useState(0);
  const [columnOrder, setColumnOrder] = useState([]);
  const [editingCell, setEditingCell] = useState({ rowId: null, field: null });
  const [sortField, setSortField] = useState(null);
  const [sortOrder, setSortOrder] = useState(null);
  const [checkboxEnabled, setCheckboxEnabled] = useState(configProp?.grid?.checkBoxEnable);

  // Loading state management
  useEffect(() => {
    setLoading(true);
    setIsInitialLoad(true);
    const timeout = setTimeout(() => {
      const hasData = isLocal
        ? Array.isArray(additionalProp?.data) && additionalProp?.data.length > 0
        : Array.isArray(dataProp?.features?.parameters?.fields) &&
          dataProp?.features?.parameters?.fields.length > 0;
      setLoading(!hasData);
      setIsInitialLoad(false);
    }, 300);
    return () => clearTimeout(timeout);
  }, [additionalProp?.data, dataProp, isLocal]);

  // Mark initial load complete when columns ready
  useEffect(() => {
    if (loading || !isInitialLoad) return;
    const hasColumnsReady =
      Array.isArray(allColumns) && allColumns.length > 0 &&
      Array.isArray(visibleColumns) && visibleColumns.length > 0 &&
      Array.isArray(columnOrder) && columnOrder.length > 0;

    if (!hasColumnsReady) return;

    let cancelled = false;
    let checks = 0;
    let timerId = null;

    const runCheck = () => {
      if (cancelled) return;
      const grid = dataGridRef.current;
      const scroller = grid?.querySelector?.('.MuiDataGrid-virtualScroller')
        || grid?.querySelector?.('.MuiDataGrid-main')
        || grid;
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

    return () => {
      cancelled = true;
      if (timerId) clearTimeout(timerId);
    };
  }, [loading, isInitialLoad, allColumns, visibleColumns, columnOrder]);

  // Safety timeout
  useEffect(() => {
    const safetyTimer = setTimeout(() => {
      setIsInitialLoad(false);
      setLoading(false);
    }, 3000);
    return () => clearTimeout(safetyTimer);
  }, []);

  // Initialize columns when dataProp changes
  useEffect(() => {
    if (dataProp?.features?.parameters?.fields) {
      const columns = initializeColumns(dataProp.features.parameters.fields);
      setAllColumns(columns);
      setColumnOrder(columns.map((col) => col.field));
    }
  }, [dataProp?.features?.parameters?.fields, additionalProp?.data]);

  // Initialize columnOrder when allColumns change
  useEffect(() => {
    if (
      allColumns.length > 0 &&
      additionalProp?.data?.length > 0 &&
      columnOrder.length === 0
    ) {
      setColumnOrder(allColumns.map((col) => col.field));
    }
  }, [allColumns, columnOrder.length, additionalProp?.data]);

  // Calculate column widths
  const calculateColumnWidths = useCallback(() => {
    if (!dataProp?.features?.parameters?.fields || !additionalProp?.data) return [];
    return calculateAllColumnWidths(allColumns, additionalProp.data, columnOrder);
  }, [dataProp?.features?.parameters?.fields, additionalProp?.data, allColumns, columnOrder]);

  // Recalculate columns for visible/overflow split
  const recalculateColumns = useCallback(
    (allCalculatedColumns) => {
      const grid = dataGridRef.current;
      if (!grid) return { visCols: [], overCols: [] };

      return recalculateColumnsLayout({
        allCalculatedColumns,
        containerWidth: grid.offsetWidth || 1200,
        expandColumnWidth,
        actionColumnWidth,
        enableRowActions,
        shouldShowActionsColumn: shouldShowActionsColumn?.() || false,
        hiddenColumns,
        enableCollapsibleRow,
      });
    },
    [shouldShowActionsColumn, hiddenColumns, enableCollapsibleRow, enableRowActions, expandColumnWidth, actionColumnWidth]
  );

  // Update visible/overflow columns
  useEffect(() => {
    const allCalculated = calculateColumnWidths();
    const { visCols, overCols } = recalculateColumns(allCalculated);
    setVisibleColumns(visCols);
    setOverflowedColumns(overCols);
  }, [
    allColumns,
    hiddenColumns.length,
    recalculateColumns,
    additionalProp?.data,
    calculateColumnWidths,
  ]);

  // Check overflow
  useEffect(() => {
    const checkOverflow = () => {
      const grid = dataGridRef.current;
      if (grid) {
        const scroller =
          grid.querySelector(".MuiDataGrid-virtualScroller") ||
          grid.querySelector(".MuiDataGrid-main") ||
          grid.querySelector(".MuiDataGrid-window");
        if (scroller) {
          setScrollerWidth(scroller.scrollWidth);
          setIsTableOverflowing(scroller.scrollWidth > scroller.clientWidth);
        } else {
          setIsTableOverflowing(false);
        }
      }
    };
    checkOverflow();
    window.addEventListener("resize", checkOverflow);
    return () => window.removeEventListener("resize", checkOverflow);
  }, [dataProp, allColumns]);

  // Update checkbox enabled state
  useEffect(() => {
    setCheckboxEnabled(configProp?.grid?.checkBoxEnable);
  }, [configProp?.grid?.checkBoxEnable]);

  // Handlers
  const handleVisibilityClick = useCallback((columnField) => {
    if (columnField === "id") return;
    setHiddenColumns((prev) => [...prev, columnField]);
  }, []);

  const handleRestoreColumn = useCallback((columnField) => {
    setHiddenColumns((prev) => prev.filter((col) => col !== columnField));
  }, []);

  const handleMenuClick = useCallback((event, isMenuExternallyControlled) => {
    if (!isMenuExternallyControlled) {
      setAnchorEl(event.currentTarget);
    }
  }, []);

  const handleMenuClose = useCallback((isMenuExternallyControlled) => {
    if (!isMenuExternallyControlled) {
      setAnchorEl(null);
    }
  }, []);

  const handleColumnSort = useCallback((field) => {
    setSortField((prevField) => {
      if (prevField !== field) {
        setSortOrder("asc");
        return field;
      }
      setSortOrder((prevOrder) => {
        if (prevOrder === "asc") return "desc";
        if (prevOrder === "desc") {
          return null;
        }
        return "asc";
      });
      return prevOrder === "desc" ? null : field;
    });
  }, []);

  return {
    // Refs
    dataGridRef,

    // State
    hiddenColumns,
    setHiddenColumns,
    isInitialLoad,
    setIsInitialLoad,
    loading,
    setLoading,
    anchorEl,
    setAnchorEl,
    allColumns,
    setAllColumns,
    hoveredRowId,
    setHoveredRowId,
    expandedRowId,
    setExpandedRowId,
    isTableOverflowing,
    detailPanelPos,
    setDetailPanelPos,
    visibleColumns,
    setVisibleColumns,
    overflowedColumns,
    setOverflowedColumns,
    scrollerWidth,
    columnOrder,
    setColumnOrder,
    editingCell,
    setEditingCell,
    sortField,
    setSortField,
    sortOrder,
    setSortOrder,
    checkboxEnabled,
    setCheckboxEnabled,
    isLocal,

    // Computed
    showSkeleton: loading || isInitialLoad,

    // Methods
    calculateColumnWidths,
    recalculateColumns,
    handleVisibilityClick,
    handleRestoreColumn,
    handleMenuClick,
    handleMenuClose,
    handleColumnSort,
  };
};

export default useTableState;
