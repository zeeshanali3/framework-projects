import React from "react";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

function CustomTextField({
  label,
  icon,
  showPassword,
  onTogglePassword,
  value,
  onChange,
  onKeyDown,
}) {
  return (
    <TextField
      className="uppercase block w-full p-4 text-lg rounded-full"
      type={label === "Password" ? (showPassword ? "text" : "password") : "text"}
      value={value}
      onChange={onChange}
      fullWidth
      margin="dense"
      sx={{ border: "none" }} 
      select={false}
      onKeyDown={onKeyDown}
      InputProps={{
        endAdornment: label === "Password" && (
          <IconButton onClick={onTogglePassword}>
            {showPassword ? <VisibilityOff /> : <Visibility />}
          </IconButton>
        ),
      }}
    />
  );
}

export default CustomTextField;
