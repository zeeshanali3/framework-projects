
import React, { useRef } from "react";
import { TextField, InputAdornment, IconButton, Box, useTheme } from "@mui/material";
import { Add, Remove } from "@mui/icons-material";

const UnitFieldRender = ({
  field,
  formValues,
  setFormValues,
  errors = {},
  setErrors = () => {},
  variant = "outlined",
}) => {
  const {
    label,
    required = false,
    disabled = false,
    placeholder = "",
    unit = "",
    min = "",
    max = "",
    dynamicKey,
  } = field;

  const inputRef = useRef();
  const value = Number(formValues?.[dynamicKey] ?? 0);

  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";

  // Theme-driven field appearance
  const fieldAppearance = isDarkMode
    ? theme.customTokens.dark.form.field
    : theme?.customTokens?.light?.form?.field;

  const handleChange = (e) => {
    const inputValue = e.target.value;
    const numericValue = parseFloat(inputValue);

    if (!isNaN(numericValue)) {
      if (max !== "" && numericValue > Number(max)) return;
      if (min !== "" && numericValue < Number(min)) return;
    }

    setFormValues((prev) => ({ ...prev, [dynamicKey]: inputValue }));

    if (required && inputValue === "") {
      setErrors((prev) => ({ ...prev, [dynamicKey]: "This field is required." }));
    } else {
      setErrors((prev) => ({ ...prev, [dynamicKey]: "" }));
    }
  };

  const focusInput = () => {
    inputRef?.current?.focus();
  };

  const increment = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const newValue = value + 1;
    if (max && newValue > Number(max)) return;
    setFormValues((prev) => ({ ...prev, [dynamicKey]: newValue }));
    focusInput();
  };

  const decrement = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const newValue = value - 1;
    if (min && newValue < Number(min)) return;
    setFormValues((prev) => ({ ...prev, [dynamicKey]: newValue }));
    focusInput();
  };

  return (
    <Box sx={{ mb: 2 }}>
      <TextField
        name={dynamicKey}
        label={label}
        variant={variant}
        required={required}
        disabled={disabled}
        placeholder={placeholder}
        type="number"
        value={value}
        onChange={handleChange}
        inputRef={inputRef}
        fullWidth
        margin="dense"
        error={Boolean(errors?.[dynamicKey])}
        helperText={errors?.[dynamicKey]}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <IconButton
                onClick={decrement}
                size="small"
                disabled={disabled || (min && value <= Number(min))}
                sx={{ color: fieldAppearance?.color }}
              >
                <Remove />
              </IconButton>
            </InputAdornment>
          ),
          endAdornment: (
            <>
              {unit && (
                <InputAdornment position="end" sx={{ mr: 0.5 }}>
                  {unit}
                </InputAdornment>
              )}
              <InputAdornment position="end">
                <IconButton
                  onClick={increment}
                  size="small"
                  disabled={disabled || (max && value >= Number(max))}
                  sx={{ color: fieldAppearance?.color }}
                >
                  <Add />
                </IconButton>
              </InputAdornment>
            </>
          ),
          inputProps: {
            min,
            max,
            step: 1,
          },
        }}
        sx={{
          "& .MuiOutlinedInput-root": {
            "& fieldset": { borderColor: fieldAppearance?.inactiveColor },
            "&.Mui-focused fieldset": { borderColor: fieldAppearance?.focusColor },
            "& input": {
              color: disabled ? fieldAppearance?.inactiveColor : fieldAppearance?.color,
              MozAppearance: "textfield", // Remove Firefox arrows
              "&::-webkit-outer-spin-button": { WebkitAppearance: "none", margin: 0 },
              "&::-webkit-inner-spin-button": { WebkitAppearance: "none", margin: 0 },
            },
          },
          "& .MuiInputLabel-root": {
            color: disabled ? fieldAppearance?.inactiveColor : fieldAppearance?.labelColor,
            "&.Mui-focused": { color: fieldAppearance?.focusColor },
          },
          "& .MuiInputLabel-shrink": { color: fieldAppearance?.focusColor },
        }}
      />
    </Box>
  );
};

export default UnitFieldRender;
