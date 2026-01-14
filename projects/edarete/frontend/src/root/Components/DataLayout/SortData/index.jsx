import React, { useState, useEffect, useRef } from "react";
import { Sort, ArrowUpward, ArrowDownward } from "@mui/icons-material";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Fade from "@mui/material/Fade";

const customSort = (array, activeSorts) => {
  return [...array].sort((a, b) => {
    for (let { name, order } of activeSorts) {
      if (a[name] < b[name]) return order === "asc" ? -1 : 1;
      if (a[name] > b[name]) return order === "asc" ? 1 : -1;
    }
    return 0;
  });
};

export default function SortData({
  data,
  speedDial,
  setData,
  dataHeaders,
  excludeSort = [],
  buttonColor = "default",
  options = {
    defaultSortField: null,
    defaultSortOrder: "asc",
    multiColumnSort: true,
  },
  permission = true,
  isServerDriven,
  onAction,
}) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [activeSorts, setActiveSorts] = useState([]);
  const [longestHeaderWidth, setLongestHeaderWidth] = useState(0);
  const headerRefs = useRef([]);
  const clickTimers = useRef({});
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    if (!permission) {
      onAction("Permission denied: sorting is disabled.");
      return;
    }
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => setAnchorEl(null);

  const shouldExclude = (key) =>
    excludeSort?.some(
      (excludeKey) => excludeKey?.toLowerCase() === key?.toLowerCase()
    );

  const handleSortToggle = (name) => {
    if (!permission) {
      onAction("Permission denied: sorting is disabled.");
      return;
    }

    if (options.multiColumnSort) {
      if (clickTimers.current[name]) {
        clearTimeout(clickTimers.current[name]);
        clickTimers.current[name] = null;

        const updatedSorts = activeSorts.filter((sort) => sort.name !== name);
        setActiveSorts(updatedSorts);
        onAction(`Sorting removed from field: ${name}`);
        return;
      }

      clickTimers.current[name] = setTimeout(() => {
        clickTimers.current[name] = null;

        const existingSortIndex = activeSorts.findIndex(
          (sort) => sort.name === name
        );
        let updatedSorts;

        if (existingSortIndex >= 0) {
          const updatedSort = {
            ...activeSorts[existingSortIndex],
            order:
              activeSorts[existingSortIndex].order === "asc" ? "desc" : "asc",
          };
          updatedSorts = [...activeSorts];
          updatedSorts[existingSortIndex] = updatedSort;
        } else {
          updatedSorts = [...activeSorts, { name, order: "asc" }];
        }

        setActiveSorts(updatedSorts);
        onAction(
          `Sorting toggled on field: ${name} with order: ${
            updatedSorts[updatedSorts.length - 1].order
          }`
        );
      }, 300);
    } else {
      const existingSort = activeSorts.find((sort) => sort.name === name);
      const newOrder =
        existingSort && existingSort.order === "asc" ? "desc" : "asc";
      const newSorts = [{ name, order: newOrder }];
      setActiveSorts(newSorts);
      onAction(`Sorting toggled on field: ${name} with order: ${newOrder}`);
    }
  };
  const handleServerDrivenSortToggle = (name) => {
    
    if (!permission) {
      onAction("Permission denied: sorting is disabled.");
      return;
    }
    const existingSort = activeSorts.find((sort) => sort.name === name);
    const newOrder =
      existingSort && existingSort.order === "asc" ? "desc" : "asc";
    const newSorts = [{ name, order: newOrder }];
    setActiveSorts(newSorts);
    if (isServerDriven) {
      onAction(`&sort_by=${name}&sort_order=${newOrder}`); // Trigger server-driven update
    } else {
      onAction(`Sorting toggled on field: ${name} with order: ${newOrder}`);
    }
  };

  useEffect(() => {
    if (options.defaultSortField && activeSorts.length === 0) {
      const initialSort = {
        name: options.defaultSortField,
        order: options.defaultSortOrder,
      };
      setActiveSorts([initialSort]);
      setData(customSort(data, [initialSort]));
    }
  }, [options.defaultSortField, options.defaultSortOrder]);

  useEffect(() => {
    const widths = headerRefs.current.map((ref) => ref?.offsetWidth || 0);
    if (widths.length == 0) {
      setLongestHeaderWidth(Math.max(...widths) || 100);
    } else if (widths[0] !== longestHeaderWidth + 18) {
      setLongestHeaderWidth(Math.max(...widths) || 100);
    }
  }, [JSON.stringify(data)]);

  useEffect(() => {
    if (!isServerDriven) {
      setData(customSort(data, activeSorts));
    }
  }, [activeSorts, isServerDriven]);

  return (
    <div>
      <Button
        id="fade-button"
        aria-controls={open ? "fade-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        style={{ color: buttonColor }}
        sx={{
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
          gap: speedDial ? 1 : 0,
          paddingLeft: speedDial ? 6 : 0,
          "&:hover": {
            backgroundColor: "transparent", // Removes hover background color
            color: buttonColor, // Keeps the text color consistent
          },
        }}
      >
        {speedDial && "Sort"}
        <Sort
          sx={{
            mr: speedDial ? 0 : 0.5,
          }}
        />
      </Button>

      <Menu
        id="fade-menu"
        MenuListProps={{ "aria-labelledby": "fade-button" }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
        sx={{
          zIndex: 1600,
          // right: "30px",
          "& .MuiMenuItem-root": {
            marginRight: 4,
            // zIndex: 1600,
          },
          "& .fade-menu": {
            zIndex: 1600,
          },
        }}
      >
        {dataHeaders
          ?.filter(
            (element) => !shouldExclude(element?.dynamicKey || element?.name)
          )
          .map((element, index) => {
            const activeSort = activeSorts?.find(
              (sort) => sort?.name === element?.dynamicKey
            );
            return (
              <MenuItem
                key={index}
                onClick={() =>
                  isServerDriven
                    ? handleServerDrivenSortToggle(
                        element?.dynamicKey || element?.name
                      )
                    : handleSortToggle(element?.dynamicKey || element?.name)
                }
                style={{ width: longestHeaderWidth + 50 || 200 }}
              >
                <div
                  ref={(el) => (headerRefs.current[index] = el)}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    width: "100%",
                  }}
                >
                  <span
                    style={{
                      minWidth: longestHeaderWidth || 200,
                      textAlign: "left",
                    }}
                  >
                    {element?.label}
                  </span>
                  {activeSort ? (
                    activeSort.order === "asc" ? (
                      <ArrowUpward style={{ marginLeft: 5 }} />
                    ) : (
                      <ArrowDownward style={{ marginLeft: 5 }} />
                    )
                  ) : null}
                </div>
              </MenuItem>
            );
          })}
      </Menu>
    </div>
  );
}
