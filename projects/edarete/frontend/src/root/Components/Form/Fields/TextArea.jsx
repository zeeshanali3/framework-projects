
import { TextField, Box, useTheme } from "@mui/material";
import { handleInputChange, initializeFieldValues, checkDependancy } from "./HelperFunctions";

export default function TextAreaField({
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
  appearance
}) {
  const theme = useTheme();
  const mode = theme.palette.mode || "light"; // current theme mode
  const fieldTokens = theme.customTokens?.[mode]?.form?.field || {};

  if (field.hidden) {
    initializeFieldValues(field, formValues[currentStep]);
    return null;
  }

  if (!checkDependancy(field, formValues, parentValues)) {
    return null;
  } else {
    if (field.isPrefilled) {
      const toPrefill = field.prefillField;
      let fieldFound = undefined;
      const findField = (field, toPrefill) => {
        if (field.type === "section") {
          field.childFields.map((child) => {
            const found = findField(child, toPrefill);
            if (found) return found;
          });
        } else {
          if (field.dynamicKey === toPrefill) {
            fieldFound = field;
          }
        }
      };

      fields.map((step) => {
        step[0].map((field) => {
          findField(field, toPrefill);
        });
      });

      if (!fieldFound) {
        parentFields.map((step) => {
          step[0].map((field) => {
            findField(field, toPrefill);
          });
        });
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

      dependantFieldValue = findDependantFieldValue(formValues);

      if (dependantFieldValue === null && parentValues) {
        dependantFieldValue = findDependantFieldValue(parentValues);
      }

      if (fieldFound) {
        if (field.type === fieldFound.type) {
          if (dependantFieldValue) {
            formValues[currentStep][field.dynamicKey] = dependantFieldValue;
          }
        }
      }
    }
    initializeFieldValues(field, formValues[currentStep]);
  }

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
        type="text"
        name={field.name}
        label={field.label}
        multiline
        rows={field.rows || 4}
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
        defaultValue={field.defaultValue}
        value={
          Array.isArray(formValues)
            ? formValues[currentStep]?.[field?.dynamicKey] || ""
            : formValues[field?.dynamicKey] || ""
        }
        variant={variant}
        required={isRequired && field.required}
        disabled={field.disabled || isReadOnly}
        error={Boolean(errors[field?.dynamicKey])}
        helperText={errors[field?.dynamicKey]}
        sx={{
          "& .MuiOutlinedInput-root": {
            backgroundColor: fieldTokens.backgroundColor, // 👈 background from theme
            "& fieldset": { borderColor: fieldTokens?.inactiveColor },
            "&:hover fieldset": { borderColor: fieldTokens.borderColor },
            "&.Mui-focused fieldset": { borderColor: fieldTokens.focusColor },
            "& textarea": { color: fieldTokens.color },
          },
          "& .MuiInputLabel-root": {
            color: fieldTokens.labelColor,
            "&.Mui-focused": { color: fieldTokens.focusColor },
          },
          "& .MuiInputLabel-shrink": { color: fieldTokens.labelColor },
        }}
      />
    </Box>
  );
}
