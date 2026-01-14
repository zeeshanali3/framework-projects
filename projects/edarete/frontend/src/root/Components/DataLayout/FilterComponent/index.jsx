import React, { useEffect, useState } from "react";
import {
  IconButton,
  Box,
  Button,
  TextField,
  Checkbox,
  FormControlLabel,
  FormGroup,
  useTheme,
  Tooltip,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Badge,
  InputAdornment,
  Drawer,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import NavigateNextRoundedIcon from "@mui/icons-material/NavigateNextRounded";
// import FilterAltRoundedIcon from "@mui/icons-material/FilterAltRounded";
import ManageSearchRoundedIcon from "@mui/icons-material/ManageSearchRounded";
import dayjs from "dayjs";
//
//for search RElated
import SearchIcon from "@mui/icons-material/Search";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";

// Helper to get unique values and their counts from data
const getOptionCounts = (data, field) => {
  const counts = {};
  data.forEach((item) => {
    const value = item[field];
    if (value !== undefined && value !== null) {
      if (Array.isArray(value)) {
        value.forEach((v) => {
          counts[v] = (counts[v] || 0) + 1;
        });
      } else {
        counts[value] = (counts[value] || 0) + 1;
      }
    }
  });
  return counts;
};

const getFieldType = (field) => {
  if (!field) return "text";
  if (
    field.type === "dateTime" ||
    field.type === "date" ||
    field.type === "time"
  )
    return "date";
  if (field.type === "select") return "select";
  if (field.type === "number" || field.type === "integer") return "number";
  return "text";
};

const getFieldOptions = (field, data) => {
  // Prefer static options, else infer from data
  if (Array.isArray(field.options) && field.options.length > 0) {
    return field.options;
  }
  // Infer from data
  const counts = getOptionCounts(data, field.dynamicKey);
  return Object.keys(counts).map((v) => ({ value: v, label: v }));
};

const FilterField = ({ field, filterValue, setFilterValue, data }) => {
  const type = getFieldType(field);
  if (!field.visible) return null;
  if (type === "text") {
    return (
      <TextField
        label={field.label}
        value={filterValue || ""}
        onChange={(e) => setFilterValue(e.target.value)}
        fullWidth
        size="small"
        sx={{ mt: 1 }}
      />
    );
  }
  if (type === "number") {
    return (
      <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
        <TextField
          label="Min"
          type="number"
          value={filterValue?.min || ""}
          onChange={(e) =>
            setFilterValue({ ...filterValue, min: e.target.value })
          }
          size="small"
        />
        <TextField
          label="Max"
          type="number"
          value={filterValue?.max || ""}
          onChange={(e) =>
            setFilterValue({ ...filterValue, max: e.target.value })
          }
          size="small"
        />
      </Box>
    );
  }
  if (type === "date") {
    return (
      <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
        <TextField
          label="From"
          type="date"
          value={filterValue?.from || ""}
          onChange={(e) =>
            setFilterValue({ ...filterValue, from: e.target.value })
          }
          size="small"
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          label="To"
          type="date"
          value={filterValue?.to || ""}
          onChange={(e) =>
            setFilterValue({ ...filterValue, to: e.target.value })
          }
          size="small"
          InputLabelProps={{ shrink: true }}
        />
      </Box>
    );
  }
  if (type === "select") {
    const options = getFieldOptions(field, data);
    const counts = getOptionCounts(data, field.dynamicKey);
    return (
      <FormGroup sx={{ mt: 1 }}>
        {options.map((opt) => (
          <FormControlLabel
            key={opt.value}
            control={
              <Checkbox
                checked={
                  Array.isArray(filterValue) && filterValue.includes(opt.value)
                }
                onChange={(e) => {
                  if (e.target.checked) {
                    setFilterValue([...(filterValue || []), opt.value]);
                  } else {
                    setFilterValue(
                      (filterValue || []).filter((v) => v !== opt.value)
                    );
                  }
                }}
              />
            }
            label={`${opt.label} (${counts[opt.value] || 0})`}
          />
        ))}
      </FormGroup>
    );
  }
  return null;
};

export default function FilterComponent({
  color,
  bulkActions,
  data = [],
  setFilteredData,
  filterBy = [],
  permission = true,
  onAction,
  parameterFields = [],
  isServerDriven = false,
  setQueryParameters,
  serverCommunucation,
  onFilterApplied, // <-- new prop
  // search logic related
  // Search,
  // SearchIconWrapper,
  // StyledInputBase,
  searchPermission,
  searchIsServerDriven,
  handleSearchChange,
  // searchOpen,
  searchValue,
  // handleSearchClick,
  page,
  rowsPerPage,
  setPagination,
}) {
  // console.warn("data", data, "paramtersField", parameterFields);
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [filters, setFilters] = useState({}); // { dynamicKey: value }
  const appTheme = useTheme();
  const isDarkMode = appTheme.palette.mode === "dark";
  const [expanded, setExpanded] = useState(false);
  const [appliedFilters, setAppliedFilters] = useState({});
  const [originalData, setOriginalData] = useState(data);

  //
  let colorBase = "#FFFFFF";
  let colorBaseDark = "#40404F";
  let colorBaseDarkText = "#C7C6FF";
  let colorBaseText = "#260143";
  useEffect(() => {
    setOriginalData(data);
  }, [data]);

  // Extract all visible fields for filtering
  const filterFields = parameterFields?.filter(
    (f) =>
      f?.visible && (filterBy.length === 0 || filterBy?.includes(f.dynamicKey))
  );

  // Count active filters

  const activeFilterCount = Object.values(appliedFilters).filter(
    (v) =>
      v &&
      ((Array.isArray(v) && v.length > 0) ||
        (typeof v === "object" && (v.min || v.max || v.from || v.to)) ||
        (typeof v === "string" && v))
  ).length;
  //
  const Search = styled("div")(({ theme, open }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
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
    width: "250px",
  }));

  const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }));

  const StyledInputBase = styled(InputBase)(({ theme, open }) => ({
    color: "inherit",
    width: "100%",
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
  //
  const handleSearchClick = () => {
    setSearchOpen(!searchOpen);
  };
  // Filtering logic (client-side)
  const applyFilters = () => {
    if (!isServerDriven) {
      let filtered = data;
      filterFields.forEach((field) => {
        const type = getFieldType(field);
        const value = filters[field.dynamicKey];
        if (!value || (Array.isArray(value) && value.length === 0)) return;
        if (type === "text") {
          filtered = filtered.filter((item) => {
            const fieldValue = item[field.dynamicKey];
            return (
              typeof fieldValue === "string" &&
              fieldValue.toLowerCase().includes(value.toLowerCase())
            );
          });
        } else if (type === "number") {
          filtered = filtered.filter((item) => {
            const v = Number(item[field.dynamicKey]);
            const min = value.min ? Number(value.min) : -Infinity;
            const max = value.max ? Number(value.max) : Infinity;
            return v >= min && v <= max;
          });
        } else if (type === "date") {
          filtered = filtered.filter((item) => {
            const fieldValue = item[field.dynamicKey];
            if (!fieldValue) return false;
            const d = dayjs(fieldValue);
            if (!d.isValid()) return false;
            const from = value.from ? dayjs(value.from) : null;
            const to = value.to ? dayjs(value.to) : null;
            if (from && d.isBefore(from, "day")) return false;
            if (to && d.isAfter(to, "day")) return false;
            return true;
          });
        } else if (type === "select") {
          filtered = filtered.filter((item) =>
            value.includes(item[field.dynamicKey])
          );
        }
      });
      setFilteredData(filtered);
      // console.warn("filtered Data", filtered);
      if (onFilterApplied) onFilterApplied();
    } else {
      setFilteredData(filters);
      if (onFilterApplied) onFilterApplied();
    }
    setAppliedFilters(filters);
    setOpen(false);
    if (onAction) onAction();
  };
  // console.warn("filters", filters);
  const clearFilters = () => {
    setFilters({});
    setAppliedFilters({});
    if (isServerDriven) {
      setFilteredData([]);
    } else {
      // setPagination(`&page_size=${rowsPerPage}&page_no=${page + 1}`);
      // setQueryParameters(`&page_size=${rowsPerPage}&page_no=${page + 1}`);
      setFilteredData(originalData);
    }
    setOpen(false);
  };

  return (
    <>
      {/* <Tooltip title="Filter"> */}
      <IconButton
        sx={{
          color: { color },
          backgroundColor: bulkActions && "#4C49ED",
          alignItems: "center",
          padding: "4px",
          mr: bulkActions ? 0 : 1,
          // top: 12,
          // right: -10,
          boxShadow: bulkActions ? "0px 5px 10px rgba(0, 0, 0, 0.6)" : "none",
          "&:hover": {
            // backgroundColor: isDarkMode ? "#4F4F5C" : "#5B5B98",
            backgroundColor: bulkActions && "#4C49ED",
          },
        }}
        onClick={() => setOpen((prev) => !prev)}
      >
        <Badge badgeContent={activeFilterCount} color="error">
          <ManageSearchRoundedIcon sx={{ fontSize: 30 }} />{" "}
          {/* <img
              src="/icons/filter.png"
              alt="Filter"
              style={{
                filter:
                  " invert(9%) sepia(44%) saturate(6154%) hue-rotate(269deg) brightness(68%) contrast(110%)",
                width: 20,
              }}
            /> */}
        </Badge>
      </IconButton>
      {/* </Tooltip> */}

      <Drawer
        anchor="right"
        open={open}
        variant="persistent"
        onClose={() => setOpen(false)}
        sx={{
          // width: 20,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: 350,
            boxSizing: "border-box",
            // position: "relative",
            bgcolor: "background.paper",
            boxShadow: isDarkMode
              ? "0px 6px 15px rgba(0, 0, 0, 0.3)"
              : "0px 6px 15px rgba(0, 0, 0, 0.15)",
            borderRadius: "8px 0 0 8px",
            zIndex: 1350,
            // p: 3,
            maxHeight: "90%",
            // bottom: "0px",
            overflowY: "auto",
            direction: "rtl",

            marginRight: 1,
            marginTop: "5%",
            padding: 1,
            // paddingBottom:1,
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            width: "100%",
            alignItems: "center",
            direction: "ltr",
            gap: 1,
          }}
        >
          <Tooltip title="Close">
            <IconButton
              sx={{
                // fontSize: "20px",
                display: "flex",
                color: isDarkMode ? colorBaseDarkText : colorBaseText,
                // padding: "8px",
                "&:hover": {
                  backgroundColor: isDarkMode ? "#4F4F5C" : "#DCDCDC",
                },
              }}
              onClick={() => setOpen(false)}
            >
              <NavigateNextRoundedIcon sx={{ fontSize: 25 }} />
            </IconButton>
          </Tooltip>
          <Typography
            variant="h5"
            sx={{
              color: isDarkMode ? colorBaseDarkText : colorBaseText,
              ml: 3,
            }}
          >
            Search & Filter
          </Typography>
        </Box>
        {/* {searchPermission && ( */}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            height: "80px",
            width: "100%",
            direction: "ltr",
            // mb: 2,
          }}
        >
          <TextField
            size="small"
            fullWidth
            type="search"
            value={searchValue}
            onChange={handleSearchChange}
            sx={{
              mb: 2,
              transition: "all 0.2s ease",
              // width: expanded ? "100%" : "200px",
              width: "100%",
              "& .MuiOutlinedInput-root": {
                "&.Mui-focused fieldset": {
                  borderColor: isDarkMode ? colorBaseDarkText : colorBaseText, // Your custom focus color (indigo-600)
                  borderWidth: "1px", // Optional: adjust border width
                },
              },
            }}
            onFocus={() => setExpanded(true)}
            onBlur={() => !searchValue && setExpanded(false)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            placeholder={expanded ? "Search..." : ""}
          />
        </div>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
            // p: 3,
            mb: 2,
            borderTop: `1px solid ${
              isDarkMode ? colorBaseDarkText : colorBaseText
            }`,
            paddingTop: "10px",
            direction: "ltr",
          }}
        >
          {filterFields.map((field) => (
            <Accordion
              key={field.dynamicKey}
              sx={{
                mb: 1,
                borderBottom: isDarkMode ? "none" : "1px solid #c4c4c4",
                backgroundColor: isDarkMode ? colorBaseDark : "#FFFFFF",
                // backgroundColor:"#FFFFFF",
                borderRadius: isDarkMode ? ".5rem" : undefined,
                boxShadow: "none",
                "&:before": {
                  // Remove the default underline
                  display: "none",
                },
              }}
            >
              <AccordionSummary
                expandIcon={
                  <IconButton
                    size="12px"
                    sx={{
                      color: { color },

                      "&:hover": {
                        backgroundColor: isDarkMode ? "#4F4F5C" : "#DCDCDC",
                      },
                    }}
                  >
                    <ExpandMoreIcon />
                  </IconButton>
                  // </Tooltip>
                }
              >
                <Typography>{field.label}</Typography>
              </AccordionSummary>
              <AccordionDetails
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "&.Mui-focused fieldset": {
                      // color: isDarkMode ? colorBaseDarkText : colorBaseText,
                      borderColor: isDarkMode
                        ? colorBaseDarkText
                        : colorBaseText, // Your custom focus color (indigo-600)
                      // borderWidth: "1px", // Optional: adjust border width
                    },
                  },
                }}
              >
                <FilterField
                  field={field}
                  filterValue={filters[field.dynamicKey]}
                  // {isServerDriven && setFilterValue={
                  //     (val) =>
                  //       setFilters((prev) => ({
                  //         ...prev,
                  //         [field.dynamicKey]: val,
                  //       })) // eslint-disable-line
                  //   }}
                  setFilterValue={
                    (val) => {
                      // isServerDriven
                      //   ?
                      setFilters((prev) => ({
                        ...prev,
                        [field.dynamicKey]: val,
                      }));
                      //     : setFilters((prev) => ({
                      //         ...prev,
                      //         [field.dynamicKey]: val,
                      //       }));
                    } // eslint-disable-line
                  }
                  data={data}
                />
              </AccordionDetails>
            </Accordion>
          ))}
          <Box
            sx={{
              pb: "20px",
              pt: "20px",
              display: "flex",
              flexDirection: "row",
              gap: 20,
            }}
          >
            <Button
              variant="outlined"
              color="secondary"
              onClick={clearFilters}
              disabled={Object.keys(filters).length === 0}
            >
              Clear
            </Button>
            <Button
              variant="contained"
              color="success"
              onClick={applyFilters}
              disabled={!permission || Object.keys(filters).length === 0}
            >
              Apply
            </Button>
          </Box>
        </Box>
      </Drawer>
    </>
  );
}
