import React, { useState } from 'react'
import {
    Stack,
} from '@mui/material'
import TextFieldComponent from './Fields/TextField'
import SelectComponent from './Fields/Select'
import ButtonComponent from './Button'

const FormComponent = ({ fields = [], cancelLabel = 'Cancel', confirmLabel = 'Confirm', handleOnSubmit, onCancel }) => {
    const [formValues, setFormValues] = useState(
        fields.reduce((acc, field) => {
            acc[field.id] = field.value || "";
            return acc;
        }, {})
    );

    const handleChange = (id, newValue) => {
        setFormValues((prev) => ({
            ...prev,
            [id]: newValue,
        }));
    };

    console.log("Form Fields", fields);
    console.log("Form Values", formValues);

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                handleOnSubmit(formValues);
            }}
        >
            <Stack
                direction="column"
                spacing={3}
            >
                <Stack
                    direction="column"
                    spacing={2}
                >
                    {
                        fields.map((field) => {
                            if (field.type === "text") {
                                return (
                                    <TextFieldComponent
                                        key={field.id}
                                        id={field.id}
                                        label={field.label}
                                        placeholder={field.placeholder}
                                        value={formValues[field.id] || ""}
                                        isRequired={field.required}
                                        variant="outlined"
                                        size="small"
                                        isFullWidth={true}
                                        autoFocus={false}
                                        handleChange={(event) => handleChange(field.id, event.target.value)}
                                        fontSize="17px"
                                        fontWeight={500}
                                        padding="6px 8px"
                                        borderRadius="8px"
                                        hideOutline={false}
                                    />
                                );
                            } else if (field.type === "select") {
                                return (
                                    <SelectComponent
                                        key={field.id}
                                        id={field.id}
                                        label={field.label}
                                        value={formValues[field.id] || ""}
                                        isRequired={field.required}
                                        variant="outlined"
                                        size="small"
                                        isFullWidth={true}
                                        handleChange={(event) => handleChange(field.id, event.target.value)}
                                        fontSize="17px"
                                        fontWeight={500}
                                        padding="13px 8px"
                                        borderRadius="8px"
                                        hideOutline={false}
                                        options={field.options}
                                    />
                                );
                            }
                            return null;
                        })
                    }
                </Stack>
                <Stack
                    direction="row"
                    spacing="10px"
                    sx={{
                        justifyContent: "space-between"
                    }}
                >
                    <ButtonComponent variant='outlined' label={cancelLabel} handleClick={onCancel} />
                    <ButtonComponent type='submit' variant='contained' label={confirmLabel} />
                </Stack>
            </Stack>
        </form>
    )
}

export default FormComponent