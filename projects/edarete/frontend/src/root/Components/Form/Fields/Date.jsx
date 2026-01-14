
import { TextField, Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { handleInputChange, initializeFieldValues, checkDependancy } from "./HelperFunctions";

export default function DateField({
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
  const theme = useTheme();
  const colors = theme.customTokens[theme.palette.mode]?.form.field;

  const today = new Date().toISOString().split("T")[0];
  const minDate = field.minDate === "today" ? today : field.minDate;
  const maxDate = field.maxDate === "today" ? today : field.maxDate;

  // Hidden field
  if (field.hidden) {
    initializeFieldValues(field, formValues[currentStep]);
    return null;
  }

  // Dependency check
  if (!checkDependancy(field, formValues, parentValues)) return null;

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

    const findDependantFieldValue = (values) => {
      for (let step in values) {
        if (values[step][field.prefillField] !== undefined) return values[step][field.prefillField];
      }
      return null;
    };

    let dependantFieldValue =
      findDependantFieldValue(formValues) ?? (parentValues && findDependantFieldValue(parentValues));

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
        mb: 2,
      }}
    >
      <TextField
        key={field.name}
        name={field.name}
        label={field.label}
        type="date"
        InputLabelProps={{ shrink: true }}
        inputProps={{ min: minDate, max: maxDate }}
        onChange={(e) =>
          handleInputChange(e, field, currentStep, formValues, setFormValues, errors, setErrors)
        }
        fullWidth
        margin="normal"
        defaultValue={field.defaultValue}
        value={
          Array.isArray(formValues) && formValues[currentStep]?.[field?.dynamicKey]
            ? new Date(formValues[currentStep]?.[field?.dynamicKey]).toISOString().split("T")[0]
            : formValues[field?.dynamicKey]
            ? new Date(formValues[field?.dynamicKey]).toISOString().split("T")[0]
            : ""
        }
        variant={variant}
        required={isRequired && field.required}
        disabled={field?.disabled || isReadOnly}
        error={Boolean(errors[field?.dynamicKey])}
        helperText={errors[field?.dynamicKey]}
        sx={{
          "& .MuiOutlinedInput-root": {
            "& fieldset": { borderColor: colors?.inactiveColor },
            "&.Mui-focused fieldset": { borderColor: colors.focusColor },

            // Input text color & background
            "& input[type=date]": {
              color: colors.color, // text inside input
              backgroundColor: colors.backgroundColor,
              WebkitTextFillColor: colors.color, // Chrome hack for text color
            },

            // Calendar icon color
            "& input::-webkit-calendar-picker-indicator": {
              filter: theme.palette.mode === "dark" ? "invert(1)" : "invert(0)",
              opacity: 1,
              cursor: "pointer",
            },
            "& input::-moz-calendar-picker-indicator": {
              filter: theme.palette.mode === "dark" ? "invert(1)" : "invert(0)",
              cursor: "pointer",
            },
          },
          "& .MuiInputLabel-root": {
            color: colors.labelColor,
            "&.Mui-focused": { color: colors.focusColor },
          },
          "& .MuiInputLabel-shrink": { color: colors.labelColor },
        }}
      />
    </Box>
  );
}
