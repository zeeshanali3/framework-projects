
import {
  Box,
  MenuItem,
  TextField,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import {
  selectDependantField,
  handleInputChange,
  initializeFieldValues,
  checkDependancy,
} from "./HelperFunctions";

export default function SelectDependant({
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
  const theme = useTheme();
  const mode = theme.palette.mode; // light | dark
  const fieldTokens = theme.customTokens[mode].form.field;

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

      const findField = (fld, toPrefill) => {
        if (fld.type === "section") {
          fld.childFields.map((child) => {
            const found = findField(child, toPrefill);
            if (found) return found;
          });
        } else {
          if (fld.dynamicKey === toPrefill) {
            fieldFound = fld;
          }
        }
      };

      fields.map((step) => {
        step[0].map((fld) => {
          findField(fld, toPrefill);
        });
      });

      if (!fieldFound) {
        parentFields.map((step) => {
          step[0].map((fld) => {
            findField(fld, toPrefill);
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
    selectDependantField(field, formValues, currentStep, setFormValues);
  }

  return (
    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, mb: 2 }}>
      <TextField
        select
        fullWidth
        margin="normal"
        key={field.name}
        name={field.name}
        label={field.label}
        defaultValue={field.defaultValue}
        value={
          Array.isArray(formValues)
            ? formValues[currentStep]?.[field?.dynamicKey] || ""
            : formValues[field?.dynamicKey] || ""
        }
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
        variant={variant}
        required={isRequired && field.required}
        disabled={field.disabled || isReadOnly}
        error={Boolean(errors[field?.dynamicKey])}
        helperText={errors[field?.dynamicKey]}
        sx={{
          color: fieldTokens.color,
          backgroundColor: fieldTokens.backgroundColor,

          // 🔹 Border Handling (default, hover, focus)
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: fieldTokens?.inactiveColor,
            },
            
            "&.Mui-focused fieldset": {
              borderColor: `${fieldTokens.focusColor} !important`,
            },
          },

          // 🔹 Label Color
          "& .MuiInputLabel-root": {
            color: fieldTokens.labelColor,
            "&.Mui-focused": { color: fieldTokens.focusColor },
          },

          // 🔹 Dropdown Icon
          "& .MuiSelect-icon": {
            color: fieldTokens.iconcolor,
          },
        }}
      >
        {field.options &&
          field.options.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
      </TextField>
    </Box>
  );
}
