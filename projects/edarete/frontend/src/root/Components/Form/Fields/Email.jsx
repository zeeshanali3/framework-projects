import { TextField, Typography, useTheme } from "@mui/material";
import { handleInputChange, initializeFieldValues, checkDependancy } from "./HelperFunctions";

export default function Email({
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
  ancestorsInfo,
  formKeys,
  setFormKeys,
  fields,
  parentFields,
}) {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";

  // Get field appearance from theme
  const fieldAppearance = isDarkMode
    ? theme?.customTokens?.dark.form.field
    : theme?.customTokens?.light.form.field;

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
    <>
      <TextField
        key={field?.name}
        type="email"
        fullWidth
        name={field?.name}
        label={field?.label}
        value={
          Array.isArray(formValues)
            ? formValues[currentStep]?.[field?.dynamicKey] || ""
            : formValues[field?.dynamicKey] || ""
        }
        margin="normal"
        onChange={(e) =>
          handleInputChange(
            e,
            field,
            currentStep,
            formValues,
            setFormValues,
            errors,
            setErrors,
            ancestorsInfo,
            formKeys,
            setFormKeys
          )
        }
        variant={variant}
        required={isRequired && field.required}
        disabled={field?.disabled || isReadOnly}
        error={Boolean(errors[field?.dynamicKey])}
        helperText={errors[field?.dynamicKey]}
        InputProps={{
          inputProps: {
            minLength: field?.min,
            maxLength: field?.max,
            pattern: "[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}",
          },
        }}
        sx={{
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: fieldAppearance?.inactiveColor,
            },
           
            "&.Mui-focused fieldset": {
              borderColor: fieldAppearance?.focusColor,
            },
            "& input": {
              color: field?.disabled || isReadOnly
                ? fieldAppearance?.inactiveColor
                : fieldAppearance?.color,
            },
          },
          "& .MuiInputLabel-root": {
            color: field?.disabled || isReadOnly
              ? fieldAppearance?.inactiveColor
              : fieldAppearance?.labelColor,
            "&.Mui-focused": {
              color: fieldAppearance?.focusColor,
            },
          },
          "& .MuiInputLabel-shrink": {
            color: fieldAppearance?.focusColor,
          },
        }}
      />
      <Typography color="error" variant="caption">
        {errors[field.dynamicKey]}
      </Typography>
    </>
  );
}
