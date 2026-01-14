import React from "react";
import { TextField, Box, useTheme } from "@mui/material";
import { handleInputChange, initializeFieldValues, checkDependancy } from "./HelperFunctions";

export default function TimeField({
  field,
  formValues,
  setFormValues,
  currentStep,
  errors,
  setErrors,
  isRequired,
  isReadOnly,
  variant,
  parentValues,
  fields,
  parentFields,
}) {
  const theme = useTheme();
  const mode = theme.palette.mode; // 'light' or 'dark'
  const fieldTheme = theme.customTokens[mode].form.field;

  if (field.hidden) {
    initializeFieldValues(field, formValues[currentStep]);
    return null;
  }

  if (!checkDependancy(field, formValues, parentValues)) return null;

  // Prefill logic
  if (field.isPrefilled) {
    const toPrefill = field.prefillField;
    let fieldFound = undefined;

    const findField = (fld, key) => {
      if (fld.type === "section") {
        fld.childFields.map(child => findField(child, key));
      } else if (fld.dynamicKey === key) {
        fieldFound = fld;
      }
    };

    fields.forEach(step => step[0].forEach(f => findField(f, toPrefill)));
    parentFields.forEach(step => step[0].forEach(f => findField(f, toPrefill)));

    const findDependantValue = (values) => {
      for (let step in values) {
        if (values[step][field.prefillField] !== undefined) return values[step][field.prefillField];
      }
      return null;
    };

    const dependantFieldValue = findDependantValue(formValues) ?? findDependantValue(parentValues);

    if (fieldFound && field.type === fieldFound.type && dependantFieldValue) {
      formValues[currentStep][field.dynamicKey] = dependantFieldValue;
    }
  }

  initializeFieldValues(field, formValues[currentStep]);

  return (
    <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "flex-start", gap: 2, mb: 2 }}>
      <TextField
        key={field.name}
        name={field.name}
        label={field.label}
        InputLabelProps={{ shrink: true }}
        type="time"
        fullWidth
        margin="normal"
        variant={variant}
        value={formValues[currentStep]?.[field.dynamicKey] || ""}
        onChange={(e) =>
          handleInputChange(e, field, currentStep, formValues, setFormValues, errors, setErrors)
        }
        required={isRequired && field.required}
        disabled={field?.disabled || isReadOnly}
        error={Boolean(errors[field?.dynamicKey])}
        helperText={errors[field?.dynamicKey]}
        sx={{
          color: fieldTheme.color,
          backgroundColor: fieldTheme.backgroundColor,
          "& .MuiOutlinedInput-root": {
            "& fieldset": { borderColor: fieldTheme.borderColor },
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
    </Box>
  );
}
