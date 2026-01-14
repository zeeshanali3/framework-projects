import {
  Box,
  MenuItem,
  TextField,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import {
  handleInputChange,
  initializeFieldValues,
  checkDependancy,
} from "./HelperFunctions";

export default function SelectOnFields({
  field,
  errors,
  setErrors,
  isRequired,
  isReadOnly,
  formValues,
  setFormValues,
  currentStep,
  variant,
  formKeys,
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
  }

  initializeFieldValues(field, formValues[currentStep]);

  const optionsAdded = formKeys.map((key) => ({
    value: key,
    label: key,
  }));

  field.options = optionsAdded;

  return (
    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, mb: 2 }}>
      <TextField
        select
        fullWidth
        margin="normal"
        key={field.name}
        name={field.name}
        label={field.label}
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
            "&:hover fieldset": {
              borderColor: fieldTokens.borderColor,
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

          // 🔹 Dropdown Icon Color
          "& .MuiSelect-icon": {
            color: fieldTokens.iconcolor,
          },
        }}
      >
        {field.options?.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
    </Box>
  );
}
