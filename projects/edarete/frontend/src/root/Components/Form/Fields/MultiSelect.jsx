import {Box,Checkbox,Accordion,AccordionSummary,AccordionDetails,ListItemText,Typography,TextField,InputAdornment,Chip,MenuItem,} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SearchIcon from "@mui/icons-material/Search";
import { useEffect, useState, useRef } from "react";
import { useTheme } from "@mui/material/styles";
import {handleInputChange,initializeFieldValues,checkDependancy,} from "./HelperFunctions";
import { getServerResponse } from "../../Helpers/getServerResponse";

export default function MultiSelectField({
  serverMode,
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
  const appTheme = useTheme();
  const isDarkMode = appTheme.palette.mode === "dark";
  const fieldAppearance = isDarkMode
    ? appTheme?.customTokens?.dark?.form?.field
    : appTheme?.customTokens?.light?.form?.field;

  const [options, setOptions] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [filteredOptions, setFilteredOptions] = useState([]);
  const searchInputRef = useRef(null);

  // Fetch options from server or use field options
  useEffect(() => {
    if (field.selectServer) {
      const sagaCommunication = {
        apiActionType: "",
        permission: true,
        requestType: "GET",
        apiUrl: field.selectServerUrl,
        metaData: true,
        body: {},
        reduxActionType: "",
        onSuccess: (res) => {
          if (Array.isArray(res.return)) {
            setOptions(res.return);
            setFilteredOptions(res.return);
          }
        },
        onFailure: (err) => console.log("Error from server:", err),
      };
      getServerResponse(sagaCommunication, "", "");
    } else {
      setOptions(field?.options || []);
      setFilteredOptions(field?.options || []);
    }
  }, [field]);

  // Filter options based on search
  useEffect(() => {
    if (!searchText.trim()) {
      setFilteredOptions(options);
      return;
    }
    const searchLower = searchText.toLowerCase();
    const filtered = options.filter((option) => {
      if (Array.isArray(option.value)) {
        return (
          option.label?.toLowerCase().includes(searchLower) ||
          option.value.some((child) =>
            child.label?.toLowerCase().includes(searchLower)
          )
        );
      }
      return option.label?.toLowerCase().includes(searchLower);
    });
    setFilteredOptions(filtered);
  }, [searchText, options]);

  const handleSearchChange = (event) => setSearchText(event.target.value);
  const handleSearchClick = (event) => event.stopPropagation();
  const handleSelectOpen = () => {
    setTimeout(() => {
      searchInputRef.current?.focus();
    }, 10);
  };

  if (field.hidden) {
    initializeFieldValues(field, formValues[currentStep]);
    return null;
  }

  if (!checkDependancy(field, formValues, parentValues)) return null;

  initializeFieldValues(field, formValues[currentStep]);

  const handleChildOptionChange = (event, value) => {
    const newValue = [...(formValues[currentStep][field.dynamicKey] || [])];
    if (event.target.checked) newValue.push(value);
    else {
      const index = newValue.indexOf(value);
      if (index > -1) newValue.splice(index, 1);
    }
    setFormValues((prev) => {
      const updated = [...prev];
      updated[currentStep] = {
        ...updated[currentStep],
        [field.dynamicKey]: newValue,
      };
      return updated;
    });
  };

  const handleAllSelected = (event, option) => {
    const checked = event.target.checked;
    const newValue = [...(formValues[currentStep][field.dynamicKey] || [])];
    if (checked) {
      option.value.forEach((child) => {
        if (!newValue.includes(child.value)) newValue.push(child.value);
      });
    } else {
      option.value.forEach((child) => {
        const index = newValue.indexOf(child.value);
        if (index > -1) newValue.splice(index, 1);
      });
    }
    setFormValues((prev) => {
      const updated = [...prev];
      updated[currentStep] = {
        ...updated[currentStep],
        [field.dynamicKey]: newValue,
      };
      return updated;
    });
  };

  const renderOptions = (options) =>
    options.map((option) => {
      if (Array.isArray(option.value)) {
        const selectedValues = formValues[currentStep]?.[field.dynamicKey] || [];
        const allChecked =
          Array.isArray(selectedValues) &&
          option.value.every((val) => selectedValues.includes(val.value));

        return (
          <Accordion key={option.label} sx={{ boxShadow: "none" }}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              sx={{
                display: "flex",
                justifyContent: "flex-start",
                flexDirection: "row-reverse",
              }}
            >
              <Checkbox
                checked={allChecked}
                onChange={(e) => handleAllSelected(e, option)}
              />
              <Typography sx={{ marginTop: "10px" }}>
                {option.label}
              </Typography>
            </AccordionSummary>
            <AccordionDetails
              sx={{ marginTop: "-20px", marginBottom: "-10px", marginLeft: "30px" }}
            >
              {option.value.map((childOption) => (
                <MenuItem key={childOption.value} value={childOption.value}>
                  <Checkbox
                    checked={Array.isArray(
                      formValues[currentStep]?.[field.dynamicKey]
                    )
                      ? formValues[currentStep][field.dynamicKey].includes(
                          childOption.value
                        )
                      : false}
                    onChange={(e) =>
                      handleChildOptionChange(e, childOption.value)
                    }
                  />
                  <ListItemText primary={childOption.label} />
                </MenuItem>
              ))}
            </AccordionDetails>
          </Accordion>
        );
      } else {
        return (
          <MenuItem key={option.value} value={option.value}>
            <Checkbox
              checked={formValues[currentStep][field.dynamicKey]?.includes(
                option.value
              )}
            />
            <ListItemText primary={option.label} />
          </MenuItem>
        );
      }
    });

  return (
    <Box
      sx={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 2, mb: 2 }}
    >
      <TextField
        key={field.name}
        name={field.name}
        select
        label={field.label}
        fullWidth
        margin="normal"
        error={Boolean(errors[field?.dynamicKey])}
        helperText={errors[field?.dynamicKey] || ""}
        SelectProps={{
          multiple: true,
          value: Array.isArray(formValues[currentStep]?.[field.dynamicKey])
            ? formValues[currentStep][field.dynamicKey]
            : [],
          defaultValue: field.defaultValue || [],
          onChange: (e) =>
            handleInputChange(
              e,
              field,
              currentStep,
              formValues,
              setFormValues,
              errors,
              setErrors
            ),
          onOpen: handleSelectOpen,
          renderValue: (selectedValues) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selectedValues.map((selectedValue) => {
                const foundOption = options
                  .flatMap((option) =>
                    Array.isArray(option.value) ? option.value : [option]
                  )
                  .find((opt) => opt.value === selectedValue);
                return foundOption ? (
                  <Chip key={selectedValue} label={foundOption.label} />
                ) : null;
              })}
            </Box>
          ),
          MenuProps: {
            PaperProps: { sx: { maxHeight: 300, overflowY: "auto" } },
          },
        }}
        variant={variant}
        required={isRequired && field.required}
        disabled={field.disabled || isReadOnly}
        sx={{
          "& .MuiOutlinedInput-root": {
            color: fieldAppearance?.color,
            "& fieldset": { borderColor: fieldAppearance?.inactiveColor },
            "&.Mui-focused fieldset": {
              borderColor: fieldAppearance?.focusColor, 
            },
          },
          "& .MuiInputLabel-root": {
            color: fieldAppearance?.labelColor,
            "&.Mui-focused": {
              color: fieldAppearance?.focusColor, 
            },
          },
          "& .MuiSelect-icon": {
            color: fieldAppearance?.color,
          },
        }}
      >
        {/* Search Box */}
        <Box
          sx={{
            position: "sticky",
            top: 0,
            zIndex: 1,
            p: 1,
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          }}
          onClick={handleSearchClick}
        >
          <TextField
            inputRef={searchInputRef}
            autoFocus
            placeholder="Search..."
            variant="outlined"
            size="small"
            fullWidth
            value={searchText}
            onChange={handleSearchChange}
            onClick={handleSearchClick}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: fieldAppearance?.color }} />
                </InputAdornment>
              ),
            }}
            sx={{
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: fieldAppearance?.inactiveColor,
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: fieldAppearance?.borderColor,
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: fieldAppearance?.focusColor,
              },
            }}
          />
        </Box>
        {renderOptions(filteredOptions)}
      </TextField>
    </Box>
  );
}
