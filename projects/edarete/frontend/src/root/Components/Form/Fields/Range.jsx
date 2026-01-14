import {
  Box,
  FormControl,
  TextField,
  useTheme,
} from "@mui/material";
import {
  handleInputChange,
  initializeFieldValues,
  checkDependancy,
} from "./HelperFunctions";

export default function RangeField({
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
      <FormControl fullWidth margin="normal">
        <TextField
          key={field.name}
          name={field.name}
          type="range"
          label={field.label} // ✅ use built-in label
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
          required={isRequired && field.required}
          disabled={field?.disabled || isReadOnly}
          variant={variant}
          inputProps={{
            min: field.min,
            max: field.max,
          }}
          error={Boolean(errors[field?.dynamicKey])}
          helperText={errors[field?.dynamicKey]}
          sx={{
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: fieldTheme?.inactiveColor,
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
                color: `${fieldTheme?.focusColor} !important`, 
              },
            },
          }}
        />
      </FormControl>
    </Box>
  );
}
