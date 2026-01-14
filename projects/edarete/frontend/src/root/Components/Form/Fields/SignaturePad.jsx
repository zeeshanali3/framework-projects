import React, { useState, useEffect, useRef } from 'react';
import {
    Box,
    Typography,
    Button,
    useTheme
} from '@mui/material';
import { handleInputChange, initializeFieldValues, checkDependancy } from "./HelperFunctions";
import SignatureCanvas from 'react-signature-canvas';

// Note: Ensure you have react-signature-canvas installed
// npm install react-signature-canvas@1.0.6

const SignaturePadFieldRender = ({
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
    const theme = useTheme();
    const [canvasWidth, setCanvasWidth] = useState(500);
    const canvasHeight = 200;
    const containerRef = useRef();
    const sigCanvasRef = useRef();

    // ---------- Responsive Canvas ----------
    useEffect(() => {
        if (containerRef.current) {
            const updateSize = () => {
                setCanvasWidth(containerRef.current.offsetWidth);
            };
            updateSize();
            window.addEventListener('resize', updateSize);
            return () => window.removeEventListener('resize', updateSize);
        }
    }, []);

    // ---------- Hidden ----------
    if (field.hidden) {
        initializeFieldValues(field, formValues[currentStep]);
        return null;
    }

    // ---------Dependency---------------
    if (!checkDependancy(field, formValues, parentValues)) {
        return null;
    }

    // ---------- Prefill ----------
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

    // ---------- Initialize ----------
    initializeFieldValues(field, formValues[currentStep]);

    // ---------- Clear Signature ----------
    const clearSignature = () => {
        sigCanvasRef.current.clear();
        handleInputChange(
            { target: { name: field.name, value: "" } },
            field,
            currentStep,
            formValues,
            setFormValues,
            errors,
            setErrors
        );
    };

    // ---------- Save Signature ----------
    const handleSignatureEnd = () => {
        const signatureData = sigCanvasRef.current.getTrimmedCanvas().toDataURL("image/png");
        handleInputChange(
            { target: { name: field.name, value: signatureData } },
            field,
            currentStep,
            formValues,
            setFormValues,
            errors,
            setErrors
        );
    };

    // Current value
    const value = Array.isArray(formValues)
        ? formValues[currentStep]?.[field?.dynamicKey] || ""
        : formValues[field?.dynamicKey] || "";

    // ---------- Theme Colors ----------
    const labelColor = theme.customTokens[theme.palette.mode].form.field.labelColor;
    const borderColor = theme.customTokens[theme.palette.mode].form.field.borderColor;
    const backgroundColor = theme.customTokens[theme.palette.mode].form.field.backgroundColor;
    const buttonColor = theme.customTokens[theme.palette.mode].form.field.buttonColor || theme.palette.primary.main;
    const buttonTextColor = theme.customTokens[theme.palette.mode].form.field.buttonTextColor || "#fff";
    const errorColor = "#FF6B6B"; // you can also make it theme-driven

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: 'column',
                mb: 2,
                gap: 1,
            }}
        >
            {field?.label && (
                <Typography
                    variant="h6"
                    sx={{
                        fontWeight: 'bold',
                        fontSize: '17px',
                        color: labelColor
                    }}
                >
                    {field.label} {isRequired && <span style={{ color: "red" }}>*</span>}
                </Typography>
            )}

            <Box
                ref={containerRef}
                sx={{
                    border: `1px solid ${borderColor}`,
                    borderRadius: '8px',
                    width: '100%',
                    overflow: 'hidden',
                    backgroundColor: backgroundColor,
                }}
            >
                <SignatureCanvas
                    ref={sigCanvasRef}
                    penColor={field?.penColor || theme.customTokens[theme.palette.mode].form.field.PenColor}
                    minWidth={field?.minWidth || 1}
                    maxWidth={field?.maxWidth || 3}
                    clearOnResize={false}
                    onEnd={handleSignatureEnd}
                    canvasProps={{
                        width: canvasWidth,
                        height: canvasHeight,
                        className: 'sigCanvas',
                        style: { display: 'block', userSelect: 'none' }
                    }}
                />

            </Box>

            {!isReadOnly && (
                <Box sx={{ display: "flex", justifyContent: 'flex-end' }}>
                    <Button
                        variant="contained"
                        size="small"
                        onClick={clearSignature}
                        sx={{
                            backgroundColor: buttonColor,
                            color: buttonTextColor,
                            '&:hover': {
                                backgroundColor: theme.palette.mode === 'dark' ? "#5C5B8A" : "#5B5B98"
                            }
                        }}
                    >
                        {field?.clearLabel || "Clear Signature"}
                    </Button>
                </Box>
            )}

            {errors[field?.dynamicKey] && (
                <Box sx={{ color: errorColor, fontSize: "0.8rem" }}>
                    {errors[field?.dynamicKey]}
                </Box>
            )}

            {/* Optional preview */}
            {/* {value && (
                <Box>
                    <img src={value} alt="Signature Preview" style={{ maxWidth: '100%' }} />
                </Box>
            )} */}
        </Box>
    );
};

export default SignaturePadFieldRender;
