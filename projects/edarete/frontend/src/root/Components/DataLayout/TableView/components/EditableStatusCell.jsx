import React, { useState, useEffect, useRef } from "react";
import { Select, MenuItem } from "@mui/material";

export const EditableStatusCell = ({
  value,
  statusOptions,
  statusColors,
  onChange,
  onBlur,
}) => {
  const [open, setOpen] = useState(true);
  const selectRef = useRef(null);

  useEffect(() => {
    setOpen(true);
    if (selectRef.current) {
      selectRef.current.focus();
    }
  }, []);

  const handleClose = () => {
    setOpen(false);
    if (onBlur) onBlur();
  };

  return (
    <Select
      ref={selectRef}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      open={open}
      onClose={handleClose}
      onOpen={() => setOpen(true)}
      autoFocus
      sx={{
        padding: "4px 8px",
        borderRadius: ".7rem",
        background: "white",
        color: statusColors[value]?.color,
        fontWeight: 500,
        boxShadow: "none",
        "&.Mui-focused": {
          background: statusColors[value]?.background,
          color: statusColors[value]?.color,
        },
        "& .MuiSelect-select": {
          padding: "4px 8px",
        },
        "&:focus": {
          outline: "none",
        },
      }}
      MenuProps={{
        PaperProps: {
          style: {
            background: "white",
            minHeight: 80,
            alignContent: "center",
            color: "white",
          },
        },
      }}
    >
      {statusOptions.map((opt) => (
        <MenuItem
          key={opt.value || opt.label || opt}
          value={opt.value}
          style={{
            width: "80px",
            height: "25px",
            margin: ".4rem",
            color: "#8d5795",
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.background = "#E0E3EB";
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.background = "transparent";
            e.currentTarget.style.fontWeight = "normal";
          }}
        >
          {opt.label}
        </MenuItem>
      ))}
    </Select>
  );
};

export default EditableStatusCell;
