import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  useTheme,
} from "@mui/material";
import { useState, useEffect } from "react";
import {
  handleInputChange,
  initializeFieldValues,
  checkDependancy,
} from "./HelperFunctions";
import { getServerResponse } from "../../Helpers/getServerResponse";

export default function SelectField({
  serverMode,
  field,
  errors,
  setErrors,
  isRequired,
  isReadOnly,
  inputFields,
  formValues,
  setFormValues,
  currentStep,
  variant,
  parentValues,
  config,
  appearance,
}) {
  const [options, setOptions] = useState(field?.options || []);
  const [isFetching, setIsFetching] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";

  const fieldAppearance = isDarkMode
    ? theme?.customTokens?.dark?.form?.field
    : theme?.customTokens?.light?.form?.field;

  const searchBoxAppearance = isDarkMode
    ? theme?.customTokens?.dark?.form?.searchBox
    : theme?.customTokens?.light?.form?.searchBox;

  useEffect(() => {
    if (config?.viewMode?.mode === "edit") {
      handleFetchData();
    }
  }, [config?.viewMode?.mode]);

  const handleFetchData = async () => {
    if ((!isFetching && options.length === 0) || !options[0].label) {
      let apiUrl = field.selectServerUrl;

      if (Array.isArray(field.dependentOn) && field.dependentOn.length > 0) {
        field.dependentOn.forEach((dependency) => {
          const dependentValue = formValues[currentStep][dependency];
          if (dependentValue) {
            apiUrl += `&${dependency}=${dependentValue}`;
          }
        });
      } else {
        if (field.dependentOn && formValues[currentStep][field.dependentOn]) {
          apiUrl += `&${field.dependentOn}=${formValues[currentStep][field.dependentOn]}`;
        }
      }

      const sagaCommunication = {
        apiActionType: "",
        permission: true,
        requestType: "GET",
        apiUrl: apiUrl,
        metaData: true,
        body: {},
        reduxActionType: "",
        onSuccess: (res) => setOptions(res.return),
        onFailure: (err) => console.error("Error from Server:", err),
      };

      setIsFetching(true);
      await getServerResponse(sagaCommunication, "", "", setIsFetching);
    }
  };

  const handleChange = (e) => {
    const selectedOption = options.find((opt) => opt.value === e.target.value);
    const customEvent = {
      target: {
        name: field.dynamicKey,
        value: {
          value: selectedOption?.value || "",
          label: selectedOption?.label || "",
        },
      },
    };

    handleInputChange(
      customEvent,
      field,
      currentStep,
      formValues,
      setFormValues,
      errors,
      setErrors
    );

    if (Array.isArray(field.hasDependents)) {
      field.hasDependents.forEach((dependentKey) => {
        setFormValues((prevValues) => ({
          ...prevValues,
          [dependentKey]: "",
        }));
      });
    }
  };

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
        mt: 2,
      }}
    >
      <FormControl fullWidth margin="none" variant="outlined">
        <InputLabel
          sx={{
            px: 0.5,
            color: field?.disabled || isReadOnly
              ? fieldAppearance?.inactiveColor
              : fieldAppearance?.labelColor,
            "&.Mui-focused": {
              color: fieldAppearance?.focusColor,
            },
            "&.MuiInputLabel-shrink": {
              px: 0.5,
            },
          }}
        >
          {field?.label}
        </InputLabel>

        <Select
          key={field?.name}
          name={field?.name}
          label={field?.label}
          // Ensure the Select's value matches one of the available option values.
          // If the currently stored value isn't present in `options`, fall back to an empty string
          value={(() => {
            const rawVal =
              formValues &&
              formValues[currentStep] &&
              formValues[currentStep][field?.dynamicKey]?.value !== undefined
                ? formValues[currentStep][field?.dynamicKey]?.value
                : formValues[currentStep][field?.dynamicKey] || "";

            // If options are available, only return a value that exists in options
            if (Array.isArray(options) && options.length > 0) {
              const found = options.find((opt) => opt?.value === rawVal);
              return found ? rawVal : "";
            }

            // No options available yet: avoid returning a non-empty controlled value
            // because MUI will warn if the Select's value isn't present in the options.
            // Return empty string until options are loaded.
            return "";
          })()}
          onChange={handleChange}
          onOpen={() => {
            setIsDropdownOpen(true);
            formValues &&
              formValues[currentStep] &&
              field?.selectServer &&
              handleFetchData();
          }}
          onClose={() => setIsDropdownOpen(false)}
          variant={variant}
          required={isRequired && field.required}
          disabled={field?.disabled || isReadOnly}
          error={Boolean(errors[field?.dynamicKey])}
          sx={{
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: fieldAppearance?.inactiveColor,
            },
          
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: fieldAppearance?.focusColor,
            },
            "& .MuiSelect-icon": {
              color: field?.disabled || isReadOnly
                ? fieldAppearance?.inactiveColor
                : fieldAppearance?.color,
            },
            color: field?.disabled || isReadOnly
              ? fieldAppearance?.inactiveColor
              : fieldAppearance?.color,
          }}
        >
          <Box sx={{ p: 1 }} onClick={(e) => e.stopPropagation()}>
            <TextField
              fullWidth
              variant="standard"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              sx={{
                paddingLeft: "6px",
                mb: 1,
                backgroundColor: searchBoxAppearance?.backgroundColor,
                input: {
                  color: searchBoxAppearance?.color,
                },
              }}
              onClick={(e) => e.stopPropagation()}
              onKeyDown={(e) => e.stopPropagation()}
            />
          </Box>

          {Array.isArray(options) && options.length > 0 ? (
            options.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option?.label}
              </MenuItem>
            ))
          ) : (
            <MenuItem disabled>
              {isFetching ? "Loading..." : "No options available"}
            </MenuItem>
          )}
        </Select>
      </FormControl>
    </Box>
  );
}
