import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import serverCommunicationHelper from "../../constants/serverCommunicationHelper";
import { getServerResponse } from "../../../Helpers/getServerResponse";

// Color constants
export const colorBase = "#FFFFFF";
export const colorBaseDark = "#40404F";
export const colorBaseDarkText = "#fff";
export const colorBaseText = "#000000";

// Styled Components
export const Search = styled("div")(({ theme, open }) => ({
  position: "relative",
  backgroundColor: open
    ? alpha(theme.palette.common.white, 0.15)
    : "transparent",
  "&:hover": {
    backgroundColor: open
      ? alpha(theme.palette.common.white, 0.25)
      : "transparent",
  },
  marginLeft: 0,
  display: "flex",
  alignItems: "center",
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.shortest,
  }),
  width: open ? "250px" : "40px",
}));

export const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

export const StyledInputBase = styled(InputBase)(({ theme, open }) => ({
  color: "inherit",
  width: open ? "100%" : "0px",
  opacity: open ? 1 : 0,
  transition: theme.transitions.create(["width", "opacity"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.shortest,
  }),
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
  },
}));

// Helper function to update user status
export async function updateUserStatus({
  userId,
  apiUrl,
  fullUser,
  actionPerformerURDD,
  onSuccess,
  onFailure,
}) {
  const config = serverCommunicationHelper({
    apiActionType: "Update",
    requestType: "PUT",
    apiUrl: apiUrl,
    body: {
      ...fullUser,
      ...(actionPerformerURDD && { actionPerformerURDD }),
    },
    onSuccess,
    onFailure,
  });
  const queryParam = `?id=${userId}`;
  try {
    const response = await getServerResponse(config, queryParam);
    if (onSuccess) onSuccess(response);
  } catch (err) {
    if (onFailure) onFailure(err);
  }
}

// Check if color is a standard MUI color
export const isStandardColor = (color) =>
  ["inherit", "primary", "secondary", "default"].includes(color);

// Clean query string to remove duplicates
export const cleanQueryString = (queryString) => {
  const params = new URLSearchParams(queryString);
  const uniqueParams = {};

  params.forEach((value, key) => {
    if (!uniqueParams[key]) {
      uniqueParams[key] = value;
    }
  });

  return new URLSearchParams(uniqueParams).toString();
};

// Build page size options
export const buildPageSizeOptions = (configuredOptions, parameterData, rowsPerPage) => {
  let pageSizeOptions = Array.isArray(configuredOptions) && configuredOptions.length > 0
    ? configuredOptions
    : [5, 10, 25, 50, 100, -1];

  if (parameterData && parameterData.length === 0) {
    pageSizeOptions = Array.from(new Set([...(pageSizeOptions || []), rowsPerPage || 1]));
  } else {
    if (!pageSizeOptions.includes(rowsPerPage)) {
      pageSizeOptions = Array.from(new Set([...(pageSizeOptions || []), rowsPerPage]));
    }
  }

  return pageSizeOptions;
};

// Calculate pagination display values
export const calculatePaginationDisplay = (rowsPerPage, localFilteredDataCount, page) => {
  const isAll = rowsPerPage === -1;
  const safeCount = localFilteredDataCount && !isNaN(localFilteredDataCount)
    ? localFilteredDataCount
    : 0;

  const startIndex = isAll
    ? safeCount > 0 ? 1 : 0
    : safeCount > 0 ? Math.max(1, page * rowsPerPage + 1) : 0;

  const endIndex = isAll
    ? safeCount
    : safeCount > 0 ? Math.min((page + 1) * rowsPerPage, safeCount) : 0;

  return { startIndex, endIndex, safeCount };
};
