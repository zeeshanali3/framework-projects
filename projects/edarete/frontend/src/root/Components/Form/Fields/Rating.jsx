import React, { useState } from 'react';
import {
    Box,
    Rating,
} from '@mui/material';
import { handleInputChange, initializeFieldValues, checkDependancy } from "./HelperFunctions";

const RatingFieldRender = ({
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

}) => {
    console.log("hay", formValues)
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
    //  ---------- Initialize Values ----------
    initializeFieldValues(field, formValues[currentStep]);


    // ---------- On Change ----------
    const handleChange = (event, newValue) => {
        handleInputChange(
            { target: { name: field.name, value: newValue } },
            field,
            currentStep,
            formValues,
            setFormValues,
            errors,
            setErrors
        );
    };

    const value = Array.isArray(formValues)
        ? formValues[currentStep]?.[field?.dynamicKey] || 0
        : formValues[field?.dynamicKey] || 0;



    return (
        <Box 
        sx={{ mb: 2 }}
        >
            <Rating
                name={field?.name || "star-rating"}
                value={value}
                precision={field?.precision || 0.5}
                // min={field.min || 0}
                max={field?.max || 5}
                onChange={handleChange}
                readOnly={field?.disabled || isReadOnly}
            />
            <Box 
            sx={{ display: "flex",
             gap: "5px", 
             alignItems: "center" }}>
                <Box>
                    {value} / {field?.max || 5}
                </Box>
                {errors[field?.dynamicKey] && (
                    <Box sx={{ color: "red", fontSize: "0.8rem", mt: 0.5, display: "inline" }}>
                        {errors[field?.dynamicKey]}
                    </Box>
                )}
            </Box>


        </Box>
    )
}

export default RatingFieldRender

