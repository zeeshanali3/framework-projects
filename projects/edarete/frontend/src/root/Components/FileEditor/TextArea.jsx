import React, { useState, useEffect } from 'react';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextAreaField from '../Form/Fields/TextArea';
import { jsPDF } from "jspdf";

const field = {
    alias: "document.text",
    dependancyCheck: false,
    disabled: false,
    dynamicKey: "document_text",
    hideInCreateForm: false,
    hideInViewForm: false,
    isMultiple: false,
    isPrefilled: false,
    label: "",
    max: "",
    min: "",
    name: "documentText",
    required: true,
    rows: 12,
    selectServer: false,
    source: "req.body",
    title: "",
    type: "textarea",
    validations: [],
    visible: true,
    defaultValue: "",
};

const TextArea = ({ editableText = "", setEditableText }) => {
    const dynamicKey = field.dynamicKey;
    const [formValues, setFormValues] = useState([
        {
            [dynamicKey]: editableText,
        }
    ]);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        const value = formValues[0]?.[dynamicKey];
        if (value.trim()) {
            setEditableText(value);
        }
    }, [formValues[0]?.[dynamicKey]]);

    const handleRestore = () => {
        setFormValues([
            {
                [dynamicKey]: editableText,
            }
        ])
    }

    const handleReset = () => {
        setFormValues([
            {
                [dynamicKey]: "",
            }
        ])
    }

    const handleSubmit = () => {
        const text = formValues[0]?.[dynamicKey]?.trim();
        const doc = new jsPDF();
        const pageWidth = doc.internal.pageSize.getWidth();
        const pageHeight = doc.internal.pageSize.getHeight();
        const margin = 10;
        const maxLineWidth = pageWidth - margin * 2;
        const lines = doc.splitTextToSize(text, maxLineWidth);
        const lineHeight = 7;
        let cursorY = 20;
        lines.forEach(line => {
            if (cursorY + lineHeight > pageHeight - margin) {
                doc.addPage();
                cursorY = 20;
            }
            doc.text(line, margin, cursorY);
            cursorY += lineHeight;
        });
        doc.save("document.pdf");
    }

    // ---------- Logs ----------
    console.log("Text Area Value", formValues);
    console.log("Text Extracted From File Upload", editableText);

    return (
        <Stack
            direction={"column"}
        >
            <Stack
                direction={"row"}
                sx={{
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                <Stack
                    direction={"column"}
                    spacing="5px"
                >
                    <Typography
                        variant="h2"
                        fontSize={"17px"}
                        fontWeight={700}
                    >
                        Text Content
                    </Typography>
                    <Typography
                        variant="p"
                        fontSize={"17px"}
                        fontWeight={"normal"}
                    >
                        Review and edit the extracted text, or replace it with your own.
                    </Typography>
                </Stack>
                <Stack
                    direction={"row"}
                    spacing="10px"
                >
                    {
                        !formValues[0]?.[dynamicKey].trim() && (
                            <Button
                                variant="outlined"
                                onClick={handleRestore}
                            >
                                Restore
                            </Button>
                        )
                    }
                    <Button
                        variant="outlined"
                        disabled={formValues[0]?.[dynamicKey].length === 0}
                        onClick={handleReset}
                    >
                        Reset
                    </Button>
                </Stack>
            </Stack>
            <Box>
                <TextAreaField
                    serverMode={false}
                    field={field}
                    inputFields={{}}
                    formValues={formValues}
                    isRequired={field.required}
                    isReadOnly={false}
                    setFormValues={setFormValues}
                    currentStep={0}
                    errors={errors}
                    setErrors={setErrors}
                    variant="outlined"
                    parentValues={undefined}
                    fields={[]}
                    parentFields={undefined}
                />
            </Box>
            <Stack
                direction={"row"}
                sx={{
                    justifyContent: "center",
                }}
            >
                <Button
                    variant="contained"
                    disabled={formValues[0]?.[dynamicKey].trim().length === 0}
                    onClick={handleSubmit}
                >
                    Save Changes
                </Button>
            </Stack>
        </Stack>
    )
}

export default TextArea;