import React from 'react';
import { Box, useTheme } from '@mui/material';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { handleInputChange, initializeFieldValues, checkDependancy } from "./HelperFunctions";

const PhoneNumberFieldRender = ({
    field,
    formValues,
    currentStep,
    errors,
    setFormValues,
    setErrors,
    isRequired,
    isReadOnly,
    parentValues,
    fields,
    parentFields,
    inputFields
}) => {
    const theme = useTheme();
    const isDarkMode = theme.palette.mode === "dark";

    const fieldAppearance = isDarkMode
        ? theme.customTokens.dark.form.field
        : theme?.customTokens?.light?.form?.field;

    // ---------- Handle Hidden ----------
    if (field.hidden) {
        initializeFieldValues(field, formValues[currentStep]);
        return null;
    }

    // ---------- Handle Dependency ----------
    if (!checkDependancy(field, formValues, parentValues)) {
        return null;
    }

    // ---------- Handle Prefill ----------
    if (field.isPrefilled) {
        const toPrefill = field.prefillField;
        let fieldFound = undefined;

        const findField = (f, toPrefill) => {
            if (f.type === "section") {
                f.childFields.forEach((child) => {
                    const found = findField(child, toPrefill);
                    if (found) return found;
                });
            } else {
                if (f.dynamicKey === toPrefill) {
                    fieldFound = f;
                }
            }
        };

        fields.forEach((step) => {
            step[currentStep].forEach((f) => {
                findField(f, toPrefill);
            });
        });

        if (!fieldFound) {
            parentFields.forEach((step) => {
                step[currentStep].forEach((f) => {
                    findField(f, toPrefill);
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

        if (fieldFound && field.type === fieldFound.type) {
            if (dependantFieldValue) {
                formValues[currentStep][field.dynamicKey] = dependantFieldValue;
            }
        }
    }

    // ---------- Initialize Values ----------
    initializeFieldValues(field, formValues[currentStep]);

    // ---------- On Change ----------
    const handleChange = (value) => {
        handleInputChange(
            { target: { name: field.name, value } },
            field,
            currentStep,
            formValues,
            setFormValues,
            errors,
            setErrors
        );
    };

    return (
        <Box
            sx={{
                mb: 2,
                "& .react-tel-input": { width: "100%" },
                "& .react-tel-input .form-control": {
                    width: "100%",
                    height: 56,
                    borderRadius: "8px",
                    backgroundColor: inputFields?.color || fieldAppearance?.backgroundColor,
                    color: fieldAppearance?.color,
                    border: `1px solid ${fieldAppearance?.inactiveColor}`,
                    "&:focus": {
                        borderColor: fieldAppearance?.focusColor,
                        boxShadow: `0 0 0 2px ${fieldAppearance?.focusColor}33`,
                        outline: "none",
                    },
                },
                // ---------- Dropdown menu ----------
                "& .react-tel-input .country-list": {
                    backgroundColor: fieldAppearance?.backgroundColor,
                    color: fieldAppearance?.color,
                },
                "& .react-tel-input .country-list li:hover": {
                    backgroundColor: fieldAppearance?.HoverColor, // theme-driven hover
                    color: fieldAppearance?.color,
                },

            }}
        >
            <PhoneInput
                country={'us'}
                value={
                    Array.isArray(formValues)
                        ? formValues[currentStep]?.[field?.dynamicKey] || ""
                        : formValues[field?.dynamicKey] || ""
                }
                onChange={handleChange}
                inputProps={{
                    name: field.name,
                    required: isRequired && field.required,
                    disabled: field.disabled || isReadOnly,
                }}
                dropdownStyle={{
                    backgroundColor: fieldAppearance?.backgroundColor, // dropdown background
                    color: fieldAppearance?.color,                      // dropdown text
                }}

            />
            {errors[field?.dynamicKey] && (
                <Box sx={{ color: "red", fontSize: "0.8rem", mt: 0.5 }}>
                    {errors[field?.dynamicKey]}
                </Box>
            )}
        </Box>
    );
};

export default PhoneNumberFieldRender;
