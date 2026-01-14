import { Box, FormControl, TextField } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { handleInputChange, initializeFieldValues, checkDependancy } from "./HelperFunctions";

export default function ColorField({
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
  variant,
  parentValues,
  fields,
  parentFields,
  appearance,
}) {
  const theme = useTheme();
  const colors = theme.customTokens[theme.palette.mode]?.form.field;

  // If field is hidden, initialize values and return null
  if (field.hidden) {
    initializeFieldValues(field, formValues[currentStep]);
    return null;
  }

  // Skip if dependency not met
  if (!checkDependancy(field, formValues, parentValues)) {
    return null;
  }

  // Prefill logic
  if (field.isPrefilled) {
    const toPrefill = field.prefillField;
    let fieldFound;

    const findField = (f, key) => {
      if (f.type === "section") {
        f.childFields.forEach((child) => findField(child, key));
      } else if (f.dynamicKey === key) {
        fieldFound = f;
      }
    };

    fields.forEach((step) => step[0].forEach((f) => findField(f, toPrefill)));
    if (!fieldFound) {
      parentFields.forEach((step) => step[0].forEach((f) => findField(f, toPrefill)));
    }

    let dependantFieldValue = null;
    const findDependantFieldValue = (values) => {
      for (let step in values) {
        if (values[step][field.prefillField] !== undefined) {
          return values[step][field.prefillField];
        }
      }
      return null;
    };

    dependantFieldValue = findDependantFieldValue(formValues) ?? (parentValues && findDependantFieldValue(parentValues));

    if (fieldFound && field.type === fieldFound.type && dependantFieldValue !== null) {
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
        mt: "-35px",
        marginBottom: "-20px",
      }}
    >
      <FormControl fullWidth margin="normal">
        <TextField
          key={field.name}
          name={field.name}
          type="color"
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
          fullWidth
          margin="normal"
          defaultValue={field.defaultValue}
          value={
            Array.isArray(formValues)
              ? formValues[currentStep]?.[field?.dynamicKey] || ""
              : formValues[field?.dynamicKey] || ""
          }
          variant={variant}
          required={isRequired && field.required}
          disabled={field.disabled || isReadOnly}
          InputLabelProps={{
            shrink: true,
          }}
          label={field.label}
          sx={{
            "& .MuiInputLabel-root.Mui-focused": {
              color: colors.focusColor,
            },
            "& .MuiOutlinedInput-root": {
              "& fieldset": { borderColor: colors?.inactiveColor },
              "&:hover fieldset": { borderColor: colors.focusColor },
              "&.Mui-focused fieldset": { borderColor: colors.focusColor },
              color: colors.color,
              backgroundColor: colors.backgroundColor,
            },
          }}
        />
      </FormControl>
    </Box>
  );
}
