
import React, { useState } from "react";
import { Box, FormControl, TextField, Checkbox, FormControlLabel, useTheme } from "@mui/material";

import { handleInputChange, initializeFieldValues, checkDependancy } from "./HelperFunctions";

export default function PasswordField({
  serverMode,
  field,
  errors,
  setErrors,
  isRequired,
  isReadOnly,
  formValues,
  setFormValues,
  currentStep,
  variant,
  parentValues,
  fields,
  parentFields,
}) {
  const [showPassword, setShowPassword] = useState(false);
  const theme = useTheme();
  const mode = theme.palette.mode; // 'light' or 'dark'
  const fieldTheme = theme.customTokens[mode].form.field;

  if (field.hidden) {
    initializeFieldValues(field, formValues[currentStep]);
    return null;
  }

  if (!checkDependancy(field, formValues, parentValues)) {
    return null;
  }

  if (field.isPrefilled) {
    const toPrefill = field.prefillField;
    let fieldFound = undefined;

    const findField = (fld, key) => {
      if (fld.type === "section") {
        fld.childFields.map(child => findField(child, key));
      } else {
        if (fld.dynamicKey === key) fieldFound = fld;
      }
    };

    fields.map(step => step[0].map(f => findField(f, toPrefill)));
    parentFields.map(step => step[0].map(f => findField(f, toPrefill)));

    let dependantFieldValue = null;
    const findDependantFieldValue = (values) => {
      for (let step in values) {
        if (values[step][field.prefillField] !== undefined) {
          return values[step][field.prefillField];
        }
      }
      return null;
    };

    dependantFieldValue = findDependantFieldValue(formValues) ?? findDependantFieldValue(parentValues);
    if (fieldFound && field.type === fieldFound.type && dependantFieldValue) {
      formValues[currentStep][field.dynamicKey] = dependantFieldValue;
    }
  }

  initializeFieldValues(field, formValues[currentStep]);

  return (
    <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "flex-start", gap: 2, mb: 2 }}>
      <FormControl key={field.name} fullWidth>
        <TextField
          fullWidth
          key={field.name}
          type={showPassword ? "text" : "password"}
          name={field.name}
          label={field.label}
          onChange={(e) =>
            handleInputChange(e, field, currentStep, formValues, setFormValues, errors, setErrors)
          }
          value={formValues[currentStep]?.[field.dynamicKey] || ""}
          margin="normal"
          variant={variant}
          required={isRequired && field.required}
          disabled={field.disabled || isReadOnly}
          error={Boolean(errors[field.dynamicKey])}
          helperText={errors[field.dynamicKey]}
          sx={{
            color: fieldTheme.color,
            backgroundColor: fieldTheme.backgroundColor,
            "& .MuiOutlinedInput-root": {
              "& fieldset": { borderColor: fieldTheme?.inactiveColor },
              "&:hover fieldset": { borderColor: fieldTheme.focusColor },
              "&.Mui-focused fieldset": { borderColor: fieldTheme.focusColor },
              "& input": { color: fieldTheme.color },
            },
            "& .MuiInputLabel-root": {
              color: fieldTheme.labelColor,
              "&.Mui-focused": { color: fieldTheme.focusColor },
            },
            "& .MuiInputLabel-shrink": { color: fieldTheme.labelColor },
          }}
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={showPassword}
              onChange={() => setShowPassword(!showPassword)}
              sx={{ color: fieldTheme.color }}
            />
          }
          label="Show Password"
        />
      </FormControl>
    </Box>
  );
}
