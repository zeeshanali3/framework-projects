import { TextField, Box, useTheme } from "@mui/material";
import {
  handleInputChange,
  initializeFieldValues,
  checkDependancy,
} from "./HelperFunctions";

export default function NumberField({
  serverMode,
  field,
  formValues,
  isRequired,
  isReadOnly,
  setFormValues,
  currentStep,
  errors,
  setErrors,
  variant,
  parentValues,
  fields,
  parentFields,
}) {
  const theme = useTheme(); // Get the current theme
  const fieldTheme =
    theme?.customTokens?.[theme?.palette?.mode]?.form?.field || {
      color: theme.palette.text.primary,
      backgroundColor: theme.palette.background.paper,
      inactiveColor: theme.palette.divider,
      focusColor: theme.palette.primary.main,
      labelColor: theme.palette.text.secondary,
    };

  if (field.hidden) {
    initializeFieldValues(field, formValues[currentStep]);
    return null;
  }

  if (!checkDependancy(field, formValues, parentValues)) return null;

  if (field.isPrefilled) {
    const toPrefill = field.prefillField;
    let fieldFound;

    const findField = (field, toPrefill) => {
      if (field.type === "section") {
        field.childFields.map((child) => findField(child, toPrefill));
      } else if (field.dynamicKey === toPrefill) {
        fieldFound = field;
      }
    };

    fields.map((step) => step[currentStep].map((f) => findField(f, toPrefill)));
    if (!fieldFound) {
      parentFields.map((step) => step[currentStep].map((f) => findField(f, toPrefill)));
    }

    const findDependantFieldValue = (values) => {
      for (let step in values) {
        if (values[step][field.prefillField] !== undefined)
          return values[step][field.prefillField];
      }
      return null;
    };

    let dependantFieldValue = findDependantFieldValue(formValues);
    if (dependantFieldValue === null && parentValues) {
      dependantFieldValue = findDependantFieldValue(parentValues);
    }

    if (fieldFound && field.type === fieldFound.type && dependantFieldValue) {
      formValues[currentStep][field.dynamicKey] = dependantFieldValue;
    }
  }

  initializeFieldValues(field, formValues[currentStep]);

  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "flex-start",
        gap: 2,
        mb: 2,
      }}
    >
      <TextField
        key={field.name}
        fullWidth
        type="number"
        name={field.name}
        label={field.label}
        defaultValue={field.defaultValue}
        value={formValues[currentStep]?.[field?.dynamicKey] || ""}
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
        margin="normal"
        variant={variant}
        required={isRequired && field.required}
        disabled={field.disabled || isReadOnly}
        error={Boolean(errors[field?.dynamicKey])}
        helperText={errors[field?.dynamicKey]}
        InputProps={{
          inputProps: { min: field.min, max: field.max },
        }}
        sx={{
          color: fieldTheme.color,
          backgroundColor: fieldTheme.backgroundColor,
          "& .MuiOutlinedInput-root": {
            "& fieldset": { borderColor: fieldTheme?.inactiveColor },
            "&.Mui-focused fieldset": { borderColor: fieldTheme.focusColor },
            "& input": { color: fieldTheme.color },
          },
          "& .MuiInputLabel-root": {
            color: fieldTheme.labelColor,
            "&.Mui-focused": { color: fieldTheme.focusColor },
          },
          "& .MuiInputLabel-shrink": { color: fieldTheme.labelColor },
          // Hide number input spinner buttons
          "& input[type=number]": {
            "-moz-appearance": "textfield",
            "&::-webkit-outer-spin-button, &::-webkit-inner-spin-button": {
              "-webkit-appearance": "none",
              margin: 0,
            },
          },
        }}
      />
    </Box>
  );
}
