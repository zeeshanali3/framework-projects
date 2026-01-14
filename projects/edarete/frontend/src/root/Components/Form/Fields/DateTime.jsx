import { TextField, Box, useTheme } from "@mui/material";
import {
  handleInputChange,
  initializeFieldValues,
  checkDependancy,
} from "./HelperFunctions";

export default function DateTimeField({
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
  const isDarkMode = theme.palette.mode === "dark";

  const fieldAppearance = isDarkMode
    ? theme?.customTokens?.dark?.form?.field
    : theme?.customTokens?.light?.form?.field;

  const rawValue = formValues[currentStep]?.[field.dynamicKey];
  const parsedValue = rawValue
    ? new Date(rawValue)?.toISOString()?.slice(0, 16)
    : "";

  if (field.hidden) {
    initializeFieldValues(field, formValues[currentStep]);
    return null;
  }

  if (!checkDependancy(field, formValues, parentValues)) {
    return null;
  } else {
    initializeFieldValues(field, formValues[currentStep]);
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "flex-start",
        mb: 2,
      }}
    >
      <TextField
        key={field.name}
        name={field.name}
        label={field.label}
        InputLabelProps={{ shrink: true }}
        type="datetime-local"
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
        value={parsedValue}
        variant={variant}
        required={isRequired && field.required}
        disabled={field?.disabled || isReadOnly}
        error={Boolean(errors[field?.dynamicKey])}
        helperText={errors[field?.dynamicKey]}
        sx={{
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor:
                field?.disabled || isReadOnly
                  ? fieldAppearance?.inactiveColor
                  : fieldAppearance?.borderColor,
            },
          
            "&.Mui-focused fieldset": {
              borderColor: fieldAppearance?.focusColor,
            },
            "& input": {
              color:
                field?.disabled || isReadOnly
                  ? fieldAppearance?.inactiveColor
                  : fieldAppearance?.color,
            },
          },
          "& .MuiInputLabel-root": {
            color:
              field?.disabled || isReadOnly
                ? fieldAppearance?.inactiveColor
                : fieldAppearance?.labelColor,
            "&.Mui-focused": {
              color: fieldAppearance?.focusColor,
            },
          },
          "& .MuiInputLabel-shrink": {
            color:
              field?.disabled || isReadOnly
                ? fieldAppearance?.inactiveColor
                : fieldAppearance?.labelColor,
          },
        }}
      />
    </Box>
  );
}
