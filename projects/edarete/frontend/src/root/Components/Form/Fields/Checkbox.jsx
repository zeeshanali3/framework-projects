
import { Box, FormControl, FormControlLabel, Checkbox, Typography, useTheme } from "@mui/material";
import { handleInputChange, initializeFieldValues, checkDependancy } from "./HelperFunctions";

export default function CheckboxField({
  serverMode,
  field,
  inputFields,
  formValues,
  isRequired,
  isReadOnly,
  setFormValues,
  currentStep,
  errors,
  setErrors,
  parentValues,
  fields,
  parentFields,
  appearance
}) {
  const theme = useTheme();

  // ---------- Hidden ----------
  if (field.hidden) {
    initializeFieldValues(field, formValues[currentStep]);
    return null;
  }

  // ---------- Dependency ----------
  if (!checkDependancy(field, formValues, parentValues)) {
    return null;
  }

  // ---------- Prefill ----------
  if (field.isPrefilled) {
    const toPrefill = field.prefillField;
    let fieldFound = undefined;

    const findField = (f, toPrefill) => {
      if (f.type === "section") {
        f.childFields.forEach(child => findField(child, toPrefill));
      } else {
        if (f.dynamicKey === toPrefill) fieldFound = f;
      }
    };

    fields.forEach(step => step[0].forEach(f => findField(f, toPrefill)));
    if (!fieldFound) {
      parentFields.forEach(step => step[0].forEach(f => findField(f, toPrefill)));
    }

    const findDependantFieldValue = (values) => {
      for (let step in values) {
        if (values[step][field.prefillField] !== undefined) return values[step][field.prefillField];
      }
      return null;
    };

    let dependantFieldValue = findDependantFieldValue(formValues);
    if (dependantFieldValue === null && parentValues) {
      dependantFieldValue = findDependantFieldValue(parentValues);
    }

    if (fieldFound && field.type === fieldFound.type && dependantFieldValue !== null) {
      formValues[currentStep][field.dynamicKey] = dependantFieldValue;
    }
  }

  initializeFieldValues(field, formValues[currentStep]);

  // ---------- Theme-driven colors ----------
  const fieldColor = theme?.customTokens?.[theme?.palette?.mode]?.form?.field?.color;
  const errorColor = "#FF6B6B"; // You can also add this to your theme if needed
  const checkboxColor = theme?.customTokens?.[theme?.palette?.mode]?.form?.field?.PenColor || theme?.palette?.primary?.main;

  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "flex-start",
        gap: 2,
        mb: "-30px",
        mt: "-10px",
      }}
    >
      <FormControl key={field.name} fullWidth margin="normal">
        <FormControlLabel
          control={
            <Checkbox
              defaultChecked={!!formValues[currentStep][field.dynamicKey]}
              checked={!!formValues[currentStep][field.dynamicKey]}
              onChange={(e) =>
                handleInputChange(
                  e,
                  field,
                  currentStep,
                  formValues,
                  setFormValues,
                  errors,
                  setErrors
                )
              }
              name={field.name}
              required={isRequired && field.required}
              disabled={field.disabled || isReadOnly}
              sx={{
                color: checkboxColor,
                '&.Mui-checked': {
                  color: checkboxColor,
                },
              }}
            />
          }
          label={
            <Typography
              sx={{
                color: fieldColor,
              }}
            >
              {field.label}
              {isRequired && <span style={{ color: errorColor }}> *</span>}
            </Typography>
          }
        />
        {errors[field?.dynamicKey] && (
          <Typography color={errorColor} variant="caption">
            {errors[field?.dynamicKey]}
          </Typography>
        )}
      </FormControl>
    </Box>
  );
}
