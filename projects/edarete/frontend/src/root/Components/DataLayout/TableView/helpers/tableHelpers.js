// Display value formatting - simple version
export const getDisplayValue = (value) => {
  if (value === undefined || value === null) return "-";
  if (typeof value === "object") {
    if (Array.isArray(value)) return value.join(", ");
    return value.label || value.name || JSON.stringify(value);
  }
  return value;
};

// Display value with date formatting
export const formatDisplayValue = (value, fieldKey) => {
  if (value === undefined || value === null || value === "") return "-";

  // Date handling
  if (
    (typeof fieldKey === "string" && fieldKey.toLowerCase().includes("date")) ||
    (typeof value === "string" &&
      (value.match(/^\d{4}-\d{2}-\d{2}/) || value.match(/^\d{2}\/\d{2}\/\d{4}/)))
  ) {
    let rawValue = value;
    if (typeof rawValue === "string" && rawValue.includes(" ")) {
      rawValue = rawValue.replace(" ", "T");
    }
    const dateObj = new Date(rawValue);
    if (!isNaN(dateObj.getTime())) {
      return dateObj.toLocaleDateString("en-GB", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      });
    }
    return "-";
  }

  if (typeof value === "object") {
    if (Array.isArray(value)) return value.join(", ");
    return value.label || value.name || JSON.stringify(value);
  }
  return value;
};

// Calculate column width based on content
export const calculateColumnWidth = (col, rows) => {
  const values = rows.map((row) => {
    const val = row[col.dynamicKey || col.name];
    if (val == null) return "";
    if (typeof val === "string") return val;
    if (typeof val === "number") return val.toString();
    if (typeof val === "object" && val.label) return val.label;
    return String(val);
  });

  const header = col.displayName || col.label || "-000";
  const allStrings = [header, ...values];
  const maxLen = allStrings.reduce((max, str) => Math.max(max, str.length), 0);

  let width = maxLen * 8 + 32;
  if (allStrings.length === 1) width = 50;
  width = Math.max(50, Math.min(width, 160));

  return width;
};

// Calculate width for overflowed columns (different min/max)
export const calculateOverflowedColumnWidth = (col, rows) => {
  const values = rows.map((row) => {
    const val = row[col.dynamicKey || col.name];
    if (val == null) return "";
    if (typeof val === "string") return val;
    if (typeof val === "number") return val.toString();
    if (typeof val === "object" && val.label) return val.label;
    return String(val);
  });

  const header = col.displayName || col.label || "-000";
  const allStrings = [header, ...values];
  const maxLen = allStrings.reduce((max, str) => Math.max(max, str.length), 0);

  let width = maxLen * 8 + 32;
  width = Math.max(120, Math.min(width, 180));
  return width;
};

// Calculate columns per row for overflow panel
export const calculateColumnsPerRow = (length) => {
  if (length % 5 === 0) return 5;
  if (length % 5 === 1) return 3;
  if (length % 5 <= 3) return 4;
  return 5;
};

// Calculate max content length for dynamic row height
export const getMaxContentLengthForRow = (row, columns, getDisplayValueFn = getDisplayValue) => {
  let maxHeight = 0;
  columns.forEach((col) => {
    const fieldKey = col.dynamicKey || col.field || col.name;
    const value = row[fieldKey];
    const displayValue = getDisplayValueFn(value);
    const contentLength = String(displayValue + row[fieldKey]).length;
    const threshold = col.contentThreshold || 15;
    const extraHeightPerChar = col.extraHeightPerChar || 0.45;
    const extra = contentLength > threshold ? (contentLength - threshold) * extraHeightPerChar : 0;
    maxHeight = Math.max(maxHeight, extra);
  });
  return maxHeight;
};

// Compute detail panel height based on content
export const computeDetailPanelHeight = ({ row, overflowedColumns, isXs, columnsPerRowFn }) => {
  if (!row || !overflowedColumns) return 80;

  const columnsPerRow = isXs ? 2 : (columnsPerRowFn ? columnsPerRowFn() : calculateColumnsPerRow(overflowedColumns.length));
  const numRows = Math.ceil(overflowedColumns.length / columnsPerRow);
  const baseRowHeight = 70;
  const extraHeight = getMaxContentLengthForRow(row, overflowedColumns);
  const rowHeight = baseRowHeight + extraHeight;

  return Math.max(80, numRows * rowHeight) + 10;
};

// Check for duplicate columns
export const hasDuplicateColumns = (fields) => {
  if (!Array.isArray(fields)) return false;
  const columnNames = fields
    .map((col) => col?.dynamicKey || col?.name)
    .filter((name) => name != null);
  const uniqueColumnNames = new Set(columnNames);
  return columnNames.length !== uniqueColumnNames.size;
};

// Build rows with detail panel inserted
export const buildRowsWithDetailPanel = (data = [], expandedRowId, overflowedColumns) => {
  if (!data) return [];
  const rows = [];
  for (let i = 0; i < data.length; i++) {
    const row = data[i];
    rows.push(row);
    if (row.id === expandedRowId && overflowedColumns.length > 0) {
      rows.push({
        id: `detail-panel-${row.id}`,
        overflowedColumns: overflowedColumns,
        isDetailPanel: true,
        originalRow: row,
      });
    }
  }
  return rows;
};

// Initialize columns from field configuration
export const initializeColumns = (fields, additionalData) => {
  if (!fields) return [];

  return fields
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
};

// Calculate all column widths
export const calculateAllColumnWidths = (allColumns, rows, columnOrder) => {
  if (!allColumns || !rows) return [];

  let columns = allColumns.map((col) => ({
    ...col,
    field: col.dynamicKey || col.name,
    headerName: col.displayName || col.label || "-000",
    width: calculateColumnWidth(col, rows),
  }));

  if (columnOrder && columnOrder.length > 0) {
    columns = columnOrder
      .map((field) => columns.find((col) => col.field === field))
      .filter(Boolean);
  }

  return columns;
};

// Recalculate visible vs overflow columns based on container width
export const recalculateColumnsLayout = ({
  allCalculatedColumns,
  containerWidth,
  expandColumnWidth,
  actionColumnWidth,
  enableRowActions,
  shouldShowActionsColumn,
  hiddenColumns,
  enableCollapsibleRow,
}) => {
  if (!enableCollapsibleRow) {
    return { visCols: allCalculatedColumns, overCols: [] };
  }

  let widthUsed = expandColumnWidth || 50;

  if (enableRowActions && shouldShowActionsColumn) {
    widthUsed += actionColumnWidth || 100;
  }

  const visCols = [];
  const overCols = [];

  for (let col of allCalculatedColumns) {
    if (hiddenColumns.includes(col.field)) continue;

    const colWidth = col.width || 120;
    const fudge = 20;

    if (widthUsed + colWidth <= containerWidth - fudge) {
      visCols.push(col);
      widthUsed += colWidth;
    } else {
      overCols.push(col);
    }
  }

  return { visCols, overCols };
};

// Get row-specific actions based on configuration
export const getRowSpecificActions = (row, filteredActions, rowActionsConfig) => {
  if (rowActionsConfig && Array.isArray(rowActionsConfig.conditions)) {
    const baseActions = filteredActions || [];

    for (const condition of rowActionsConfig.conditions) {
      const fieldValue = row[condition.field];
      const matchesCondition = evaluateCondition(fieldValue, condition);

      if (matchesCondition) {
        if (condition.actionsToShow && condition.actionsToShow.length > 0) {
          return baseActions.filter((action) =>
            condition.actionsToShow.includes(action.name)
          );
        } else if (condition.actionsToHide && condition.actionsToHide.length > 0) {
          return baseActions.filter((action) =>
            !condition.actionsToHide.includes(action.name)
          );
        }
      }
    }

    return rowActionsConfig.defaultActions || baseActions;
  }

  // Legacy fallback
  const rowStatus = row.status || row.enrollements_status || row.subcomponents_status || "active";
  const baseActions = filteredActions || [];

  switch (rowStatus.toLowerCase()) {
    case "inactive":
      return baseActions.filter((action) => !["Edit", "Delete"].includes(action.name));
    case "active":
      return baseActions;
    case "pending":
      return baseActions.filter((action) => action.name === "View");
    default:
      return baseActions;
  }
};

// Get disabled actions based on configuration
export const getDisabledActions = (row, filteredActions, rowActionsConfig) => {
  if (rowActionsConfig && Array.isArray(rowActionsConfig.conditions)) {
    for (const condition of rowActionsConfig.conditions) {
      const fieldValue = row[condition.field];
      const matchesCondition = evaluateCondition(fieldValue, condition);

      if (matchesCondition) {
        if (condition.actionsToDisable && condition.actionsToDisable.length > 0) {
          return condition.actionsToDisable;
        }
        if (condition.actionsToShow && condition.actionsToShow.length > 0) {
          const baseActions = filteredActions || [];
          return baseActions
            .map((action) => action.name)
            .filter((actionName) => !condition.actionsToShow.includes(actionName));
        }
        if (condition.actionsToHide && condition.actionsToHide.length > 0) {
          return condition.actionsToHide;
        }
      }
    }
    return rowActionsConfig.disabledActionsByDefault || [];
  }

  // Legacy fallback
  const rowStatus = row.status || row.enrollements_status || row.subcomponents_status || "active";
  switch (rowStatus.toLowerCase()) {
    case "inactive":
      return ["Edit", "Delete"];
    case "pending":
      return ["Edit", "Delete", "start"];
    default:
      return [];
  }
};

// Helper to evaluate condition
const evaluateCondition = (fieldValue, condition) => {
  switch (condition.operator) {
    case "equals":
      return fieldValue === condition.value;
    case "not_equals":
      return fieldValue !== condition.value;
    case "contains":
      return String(fieldValue).includes(condition.value);
    case "in":
      return condition.value.includes(fieldValue);
    default:
      return false;
  }
};
