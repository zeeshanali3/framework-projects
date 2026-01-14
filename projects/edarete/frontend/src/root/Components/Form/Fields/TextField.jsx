import { TextField, Button, InputAdornment, useTheme } from "@mui/material";
import { useState } from "react";
import {
  handleInputChange,
  initializeFieldValues,
  checkDependancy,
} from "./HelperFunctions";

export default function Text({
  field,
  formValues,
  isRequired,
  isReadOnly,
  setFormValues,
  currentStep,
  errors,
  setErrors,
  variant,
  ancestorsInfo,
  formKeys,
  setFormKeys,
}) {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";

  // Get field appearance from theme
  const fieldAppearance = isDarkMode
    ? theme?.customTokens?.dark?.form?.field
    : theme?.customTokens?.light?.form?.field;

    // const fieldAppearanceeeee = theme?.customTokens[theme.palette.mode]?.form?.field;
    // console.log("fffffffffffffffffff", fieldAppearanceeeee);

  const [codeGenerated, setCodeGenerated] = useState(false);

  const generateRandomCode = () => {
    const length = field.numberofCodes || 4;
    const randomStr = Math.random().toString(36).substr(2, length).toUpperCase();
    setCodeGenerated(true);
    setFormValues((prev) => {
      const updatedValues = [...prev];
      updatedValues[currentStep] = {
        ...(updatedValues[currentStep] || {}),
        [field.dynamicKey]: randomStr,
      };
      return updatedValues;
    });
  };

  if (field.hidden) {
    initializeFieldValues(field, formValues[currentStep]);
    return null;
  }

  if (!checkDependancy(field, formValues)) {
    return null;
  } else {
    initializeFieldValues(field, formValues[currentStep]);
  }

  return (
    <TextField
      key={field?.name}
      type="text"
      fullWidth
      name={field?.name}
      label={field?.label}
      value={
        typeof formValues === "object"
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
        endAdornment:
          field.randomCodeGeneration && !isReadOnly ? (
            <InputAdornment position="end">
              <Button
                onClick={generateRandomCode}
                variant="outlined"
                size="small"
                disabled={!field?.multiCodeGeneration ? codeGenerated : false}
              >
                Generate
              </Button>
            </InputAdornment>
          ) : null,
        inputProps: {
          minLength: field?.min,
          maxLength: field?.max,
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
            color: fieldAppearance?.color,
          },
        },
        "& .MuiInputLabel-root": {
          color: fieldAppearance?.labelColor,
          "&.Mui-focused": {
            color: fieldAppearance?.focusColor,
          },
        },
        "& .MuiInputLabel-shrink": {
          color: fieldAppearance?.focusColor,
        },
      }}
    />
  );
}
