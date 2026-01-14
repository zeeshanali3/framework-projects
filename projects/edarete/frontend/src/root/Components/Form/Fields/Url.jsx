import { TextField, Box, useTheme } from "@mui/material";
import { handleInputChange, initializeFieldValues, checkDependancy } from "./HelperFunctions";

export default function URLField({
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
  const fieldTheme = theme.customTokens[theme.palette.mode]?.form?.field;

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
          field.childFields.map(child => {
            const found = findField(child, toPrefill);
            if (found) return found;
          });
        } else {
          if (field.dynamicKey === toPrefill) {
            fieldFound = field;
          }
        }
      };

      fields.map(step => {
        step[0].map(field => {
          findField(field, toPrefill);
        });
      });

      if (!fieldFound) {
        parentFields.map(step => {
          step[0].map(field => {
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

      if (fieldFound && field.type === fieldFound.type && dependantFieldValue) {
        formValues[currentStep][field.dynamicKey] = dependantFieldValue;
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
        name={field.name}
        label={field.label}
        type="url"
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
        disabled={field?.disabled || isReadOnly}
        error={Boolean(errors[field?.dynamicKey])}
        helperText={errors[field?.dynamicKey]}
        sx={{
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: fieldTheme?.inactiveColor,
            },
            "&:hover fieldset": {
              borderColor: fieldTheme?.focusColor,
            },
            "&.Mui-focused fieldset": {
              borderColor: fieldTheme?.focusColor,
            },
            "& input": {
              color: fieldTheme?.color,
            },
          },
          "& .MuiInputLabel-root": {
            color: fieldTheme?.labelColor,
            "&.Mui-focused": {
              color: fieldTheme?.focusColor,
            },
          },
          "& .MuiInputLabel-shrink": {
            color: fieldTheme?.labelColor,
          },
          backgroundColor: fieldTheme?.backgroundColor,
        }}
      />
    </Box>
  );
}
