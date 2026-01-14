
import React from "react";
import { TextField, Box, useTheme } from "@mui/material";
import InputMask from "react-input-mask";

const InputMaskFieldRender = ({
  field,
  formValues,
  setFormValues,
  errors = {},
  setErrors = () => {},
  variant = "outlined",
}) => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";

  // Get field appearance from theme
  const fieldAppearance = isDarkMode
    ? theme.customTokens.dark.form.field
    : theme?.customTokens?.light?.form?.field;

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));

    let errorMessage = "";
    if (field.regexPattern) {
      const regex = new RegExp(field.regexPattern);
      if (!regex.test(value)) {
        errorMessage = "Invalid format";
      }
    }

    setErrors((prev) => ({
      ...prev,
      [name]: errorMessage,
    }));
  };

  const mask = (field.placeholder || "").replace(/#/g, "9");
  const value = formValues?.[field.dynamicKey] ?? "";

  return (
    <Box sx={{ mb: 2 }}>
      <InputMask mask={mask} value={value} onChange={handleChange} maskChar={null}>
        {(inputProps) => (
          <TextField
            {...inputProps}
            fullWidth
            name={field.dynamicKey}
            label={field.label}
            variant={variant}
            required={field.required}
            placeholder={field.placeholder}
            error={Boolean(errors?.[field.dynamicKey])}
            helperText={errors?.[field.dynamicKey]}
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: fieldAppearance?.inactiveColor },
                "&:hover fieldset": { borderColor: fieldAppearance?.focusColor },
                "&.Mui-focused fieldset": { borderColor: fieldAppearance?.focusColor },
                "& input": { color: fieldAppearance?.color },
              },
              "& .MuiInputLabel-root": {
                color: fieldAppearance?.labelColor,
                "&.Mui-focused": { color: fieldAppearance?.focusColor },
              },
              "& .MuiInputLabel-shrink": {
                color: fieldAppearance?.focusColor,
              },
            }}
          />
        )}
      </InputMask>
    </Box>
  );
};

export default InputMaskFieldRender;
