import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";

const Search = styled("div")(({ theme, isDarkMode }) => ({
  position: "relative",
  borderRadius: 100,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: 0,
  marginLeft: "15px",
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginRight: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme, isDarkMode }) => ({
  color: isDarkMode ? theme.palette.primary.light : "#757FEF",
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  right: "0",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: "5",
}));

const StyledInputBase = styled(InputBase)(({ theme, isDarkMode }) => ({
  color: isDarkMode ? theme.palette.text.primary : "#333333",
  "& .MuiInputBase-input": {
    backgroundColor: isDarkMode ? theme.palette.background.default : "#F5F7FA",
    borderRadius: "30px",
    padding: theme.spacing(1.4, 0, 1.4, 2),
    // vertical padding + font size from searchIcon
    paddingRight: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    color: isDarkMode ? theme.palette.text.primary : "#333333",
    [theme.breakpoints.up("sm")]: {
      width: "260px",
      "&:focus": {
        width: "280px",
      },
    },
  },
  "&.MuiInputBase-root": {
    "& input::placeholder": {
      color: isDarkMode ? theme.palette.text.secondary : "#757575",
      opacity: 1,
    },
  },
}));

export default function SearchForm({ isDarkMode, theme }) {
  return (
    <>
      <Search className="search-form" isDarkMode={isDarkMode}>
        <SearchIconWrapper sx={{display: { xs: 'none', sm: 'inline-flex' }}} isDarkMode={isDarkMode}>
          <SearchIcon />
        </SearchIconWrapper>

        <StyledInputBase
          placeholder="Search here.."
          inputProps={{ "aria-label": "search" }}
          isDarkMode={isDarkMode}
        />
      </Search>
    </>
  );
}
