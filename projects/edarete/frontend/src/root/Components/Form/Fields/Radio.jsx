import {
  Box,
  FormControl,
  FormControlLabel,
  RadioGroup,
  Radio,
  Typography
} from "@mui/material";
import { handleInputChange, initializeFieldValues, checkDependancy } from "./HelperFunctions";

export default function RadioField({
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

  if (field.hidden) {
    initializeFieldValues(field, formValues[currentStep])
    return null;
  }

  if (!checkDependancy(field, formValues, parentValues)) {
    return null; // Skip rendering if field is not dependent on any other field
  }
  else {
    if (field.isPrefilled) {
      const toPrefill = field.prefillField;
      let fieldFound = undefined;
      const findField = (field, toPrefill) => {
        if (field.type === "section") {
          field.childFields.map(child => {
            const found = findField(child, toPrefill)
            if (found) return found
          })
        }
        else {
          if (field.dynamicKey === toPrefill) {
            fieldFound = field
          }
        }
      }

      fields.map(step => {
        step[0].map(field => {
          findField(field, toPrefill)
        })
      })

      if (!fieldFound) {
        parentFields.map(step => {
          step[0].map(field => {
            findField(field, toPrefill)
          })
        })
      }

      let dependantFieldValue = null;

      // Function to search for dependantField in provided values object
      const findDependantFieldValue = (values) => {
        for (let step in values) {
          if (values[step][field.prefillField] !== undefined) {
            return values[step][field.prefillField];
          }
        }
        return null;
      };

      // First, try to find the value in formValues
      dependantFieldValue = findDependantFieldValue(formValues);

      // If not found, try to find the value in parentValues
      if (dependantFieldValue === null && parentValues) {
        dependantFieldValue = findDependantFieldValue(parentValues);
      }

      if (fieldFound) {
        if (field.type === fieldFound.type) {
          if (dependantFieldValue) {
            formValues[currentStep][field.dynamicKey] = dependantFieldValue
          }
        }
      }
    }
    initializeFieldValues(field, formValues[currentStep])
  }
  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "flex-start",
        gap: 2,
      }}
    >
      <FormControl
        fullWidth
        margin="normal"
        error={Boolean(errors[field?.dynamicKey])}
        disabled={field.disabled || isReadOnly}
      >
        <Typography
          sx={{
            color: inputFields?.color, // Label color
            fontSize: "16px",
            fontWeight: "bold",
            mb: 2,
          }}
        >
          {field.label}
        </Typography>

        <RadioGroup
          name={field.name}
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
        >
          {field.options.map((option) => (
            <FormControlLabel
              key={option.value}
              value={option.value}
              control={
                <Radio
                  sx={{
                    ...(inputFields && {
                      color: inputFields?.color, // Default color for unchecked
                      "&.Mui-checked": {
                        color: inputFields?.color, // Color when checked
                      },
                    }),
                  }}
                />
              }
              label={
                <Typography
                  sx={{
                    color: inputFields?.color, // Label color for each option
                  }}
                >
                  {option.label}
                </Typography>
              }
            />
          ))}
        </RadioGroup>

        {/* Show error message if present */}
        {errors[field.dynamicKey] && (
          <Typography color="error" variant="caption">
            {errors[field.dynamicKey]}
          </Typography>
        )}
      </FormControl>
    </Box>
  );
}
