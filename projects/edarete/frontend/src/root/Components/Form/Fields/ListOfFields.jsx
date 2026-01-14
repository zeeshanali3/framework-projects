import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import { Button, IconButton } from "@mui/material";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Form } from "../Form";
import {
  handleAdditionofListOfFields,
  initializeFieldValues,
  updateDemoFormDataWithDynamicKeys,
  checkDependancy,
} from "./HelperFunctions";

const StyledTableCell = styled(TableCell)(({ theme, headerColor }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: headerColor || theme.palette.primary.dark, // Use the passed color or fallback to the theme color
    color: theme.palette.common.white,
    alignItems: "center",
    justifyContent: "space-between",
    textAlign: "center",
    whiteSpace: "normal",
    wordBreak: "break-word",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    textAlign: "center",
    whiteSpace: "normal",
    wordBreak: "break-word",
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function CustomizationTable({
  serverMode,
  field,
  inputFields,
  formValues,
  setFormValues,
  currentStep,
  formKeys,
  setFormKeys,
  parentValues,
  ancestorsInfo,
  fields,
  parentFields,
  appearance,
}) {
  // Helper function to parse and format JSON strings
  const parseAndFormatJSON = (value) => {
    // If value is a JSON string, try to parse it first
    if (
      typeof value === "string" &&
      (value.startsWith("[") || value.startsWith("{"))
    ) {
      try {
        value = JSON.parse(value);
      } catch (e) {
        return value; // If parsing fails, return original string
      }
    }

    // If it's an array, map items to safe strings
    if (Array.isArray(value)) {
      return value.map((item) => {
        if (item == null) return "";
        if (typeof item === "string" || typeof item === "number") return item;
        if (typeof item === "object") {
          // Prefer label then value then stringify
          if (item.label !== undefined) return item.label;
          if (item.value !== undefined) return item.value;
          try {
            return Object.entries(item)
              .map(([k, v]) => `${k}: ${v}`)
              .join(", ");
          } catch (e) {
            return String(item);
          }
        }
        return String(item);
      });
    }

    // If it's an object, try to pick a readable representation
    if (value && typeof value === "object") {
      if (value.label !== undefined) return value.label;
      if (value.value !== undefined) return value.value;
      try {
        return Object.entries(value)
          .map(([k, v]) => `${k}: ${v}`)
          .join(", ");
      } catch (e) {
        return String(value);
      }
    }

    // Primitive (string/number/boolean)
    return value;
  };

  const nameOfField = field.name;
  const dynamicKeyOfField = field.dynamicKey;
  let innital = [];
  const childName = field.name === "childFields" ? "childFields" : null;

  const childForDemoFields = [
    {
      name: "name",
      dynamicKey: "name",
      label: "Enter the name of the field",
      type: "textField",
      required: true,
    },
  ];

  const childFieldsTotal =
    field.name === childName
      ? childForDemoFields
      : field.childFields
      ? field.childFields
      : [];

  const calculateInitialForms = () => {
    const initialData =
      Array.isArray(formValues) &&
      formValues?.find((item) => item && item[dynamicKeyOfField]);

    if (!initialData || !initialData[dynamicKeyOfField]) return [];

    try {
      const parsedValue = JSON.parse(initialData[dynamicKeyOfField]);
      return Array.isArray(parsedValue) ? parsedValue : [parsedValue];
    } catch (error) {
      console.warn("Failed to parse form field JSON:", error);
      return [];
    }
  };

  Array.isArray(formValues) &&
    formValues?.forEach((item) => {
      if (item && item[dynamicKeyOfField]) {
        innital = item[dynamicKeyOfField];
      }
    });

  const [newColumnModalOpen, setNewColumnModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [submittedForms, setSubmittedForms] = useState(calculateInitialForms);
  const [editData, setEditData] = useState(null);
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    // Set the initial data only if submittedForms is empty to prevent overwriting on updates
    if (submittedForms.length === 0) {
      const initialForms = calculateInitialForms();
      setSubmittedForms([...initialForms]); // Spread to create a new reference
    }
  }, [formValues, dynamicKeyOfField]);

  const buildFieldsWithValues = (index, submittedForms, childFieldsTotal) => {
    const formObject = submittedForms[index]; // Object for the specified index

    // Helper function to recursively traverse fields
    const processFieldHierarchy = (fields, currentKeyPrefix = "") => {
      return fields.map((field) => {
        const { name, type, childFields } = field;
        let dynamicKey = currentKeyPrefix
          ? `${currentKeyPrefix}_${name}`
          : name;

        // If field is a section, recurse through its child fields
        if (type === "section") {
          return {
            ...field,
            childFields: processFieldHierarchy(childFields || [], dynamicKey),
          };
        }
        // Set value from submittedForms if it matches dynamicKey
        const value = formObject
          ? formObject[dynamicKey]
            ? formObject[dynamicKey]
            : null
          : null;

        return { ...field, value }; // Return field with the value set
      });
    };

    // Start processing the hierarchy from the root fields
    const processedFields = processFieldHierarchy(childFieldsTotal);

    return processedFields;
  };

  const handleObjectAdd = (formData, ancestorsFromForm) => {
    //updateFormKeys(formValues, formData, formKeys, setFormKeys);

    const dataToAdd = Array.isArray(formData)
      ? formData
      : Object.values(formData).map((innerObject) => ({ ...innerObject }));
    setSubmittedForms((prevForms) => {
      const newForms = [...prevForms, ...dataToAdd];
      handleAdditionofListOfFields(
        newForms,
        field,
        formValues,
        setFormValues,
        currentStep
      );
      return newForms;
    });

    if (formValues[0].type === "listOfFields") {
      let newKey = ancestorsFromForm;
      if (newKey) {
        setFormKeys((prevKeys) => {
          if (!prevKeys.includes(newKey)) {
            return [...prevKeys, newKey];
          }
          return prevKeys; // If the key already exists, return the existing array
        });
      }
    } else if (formData[0].type !== "section") {
      let newKey = ancestorsFromForm
        ? ancestorsFromForm + "_" + formData[0].name
        : formData[0].name;

      if (newKey) {
        setFormKeys((prevKeys) => {
          if (!prevKeys.includes(newKey)) {
            return [...prevKeys, newKey];
          }
          return prevKeys; // If the key already exists, return the existing array
        });
      }
    }

    updateDemoFormDataWithDynamicKeys(formData[0]);
  };

  useEffect(() => {
    if (childFieldsTotal) {
      const selectDependantFields = childFieldsTotal.filter(
        (child) => child.type === "selectDependant"
      );

      selectDependantFields.forEach((selectField) => {
        const dependOptions = selectField.dependOptionsOn;
        const keyMatch = selectField.dependOptionsKeymatch;

        selectField.selectDependantHandled = true;
        submittedForms.map((form) => {
          if (!form.dependOptionsPath) {
            form.dependOptionsPath = selectField.dependOptionsOn;
          }
          if (!form.dependOptionsKey) {
            form.dependOptionsKey = selectField.dependOptionsKeymatch;
          }
        });

        let valuesOfDependant = [];

        // Traverse through each object in formValues to find the dependOptions key
        formValues.forEach((formObj, index) => {
          if (formObj[dependOptions] !== undefined) {
            valuesOfDependant = formObj[dependOptions];
          }
        });

        let valuesHere = [];
        valuesOfDependant.forEach((depend) => {
          if (depend && typeof depend === "object") {
            if (Array.isArray(depend[keyMatch])) {
              depend[keyMatch].forEach((obj) => {
                if (obj && typeof obj === "object") {
                  const firstKey = Object.keys(obj)[0];
                  const label = obj[firstKey];
                  let newOption = { value: label, label: label };
                  valuesHere.push(newOption);
                }
              });
            } else {
              if (depend[keyMatch]) {
                const label = depend[keyMatch];
                let newOption = { value: label, label: label };
                valuesHere.push(newOption);
              }
            }
          }
        });
        selectField.options = valuesHere;
      });
    }
  }, [formValues]);

  const handleDeleteRow = (index) => {
    const keyToMatch = ancestorsInfo
      ? ancestorsInfo +
        "_" +
        formValues[0].name +
        "_" +
        submittedForms[index].name
      : formValues[0].name + "_" + submittedForms[index].name;

    setFormKeys((prevFormKeys) =>
      prevFormKeys.filter((key) => !key?.startsWith(keyToMatch))
    );

    setSubmittedForms((prevForms) => {
      const newForms = prevForms.filter((_, i) => i !== index);
      handleAdditionofListOfFields(
        newForms,
        field,
        formValues,
        setFormValues,
        currentStep
      );
      return newForms;
    });
  };

  const handleEditRow = (index) => {
    setEditData(buildFieldsWithValues(index, submittedForms, childFieldsTotal));
    setEditIndex(index);
    setEditModalOpen(true);
  };

  const handleEditSubmit = (formData, ancestorsFromForm) => {
    const keyToMatch = ancestorsInfo
      ? ancestorsInfo +
        "_" +
        formValues[0].name +
        "_" +
        submittedForms[editIndex].name
      : formValues[0].name + "_" + submittedForms[editIndex].name;

    setFormKeys((prevFormKeys) =>
      prevFormKeys.filter((key) => !key?.startsWith(keyToMatch))
    );

    const dataToUpdate = Array.isArray(formData) ? formData[0] : formData;

    if (editIndex !== null) {
      setSubmittedForms((prevForms) => {
        const newForms = prevForms.map((form, i) =>
          i === editIndex ? dataToUpdate : form
        );
        handleAdditionofListOfFields(
          newForms,
          field,
          formValues,
          setFormValues,
          currentStep
        ); // Pass newForms here
        return newForms; // Return the updated state
      });
    }
    setEditModalOpen(false);
    setEditData(null);
    setEditIndex(null);

    if (formValues[0].type === "listOfFields") {
      let newKey = ancestorsFromForm;

      if (newKey) {
        setFormKeys((prevKeys) => {
          if (!prevKeys.includes(newKey)) {
            return [...prevKeys, newKey];
          }
          return prevKeys; // If the key already exists, return the existing array
        });
      }
    } else if (formData[0].type !== "section") {
      let newKey = ancestorsFromForm
        ? ancestorsFromForm + "_" + formData[0].name
        : formData[0].name;

      if (newKey) {
        setFormKeys((prevKeys) => {
          if (!prevKeys.includes(newKey)) {
            return [...prevKeys, newKey];
          }
          return prevKeys; // If the key already exists, return the existing array
        });
      }
    }

    updateDemoFormDataWithDynamicKeys(formData[0]);
  };

  const updateChildKeys = (field, keys) => {
    if (field.type === "section") {
      field.childFields.forEach((child) => updateChildKeys(child, keys));
    } else {
      const newKey = `${field.dynamicKey}`;
      keys.push(newKey);
    }
  };

  const [childFieldsKeys, setChildFieldsKeys] = useState([]);

  useEffect(() => {
    if (field.dynamicKey === "childFields") {
      if (formValues[0].type === "listOfFields") {
        if (submittedForms.length > 0) {
          const keys = [];
          keys.push(...formKeys);
          submittedForms?.map((field, i) => {
            updateChildKeys(field, keys);
          });
          setChildFieldsKeys(keys);
        }
      }
    }
  }, [submittedForms]);

  const fieldModalProps = {
    data: {
      features: {
        submission: {
          steps: [
            {
              //step 1
              title: "",
              parameters: {
                fields: childFieldsTotal,
              },
              buttons: [
                {
                  type: "submit",
                  label: "Submit",
                },
                {
                  type: "close",
                  label: "Close",
                  onClick: () => setNewColumnModalOpen(false),
                },
              ],
              permission: "<permission>",
              onAction: handleObjectAdd,
              options: {
                submitMethod: "POST",
              },
            },
          ],
        },
      },
    },

    config: {
      viewMode: {
        presentation: "modalView",
        mode: "edit",
      },
      features: {
        submission: true,
      },
    },

    appearance: {
      features: {
        submission: {
          buttons: [
            {
              type: "submit",
              color: "#75ba75",
            },
            {
              type: "next",
              color: "#be95be",
            },
            {
              type: "previous",
              color: "#be95be",
            },
          ],
          inputFields: inputFields,
          // background: {
          //   color: "#efd6d6",
          // },
        },
      },
    },
  };

  const editModalProps = {
    ...fieldModalProps,
    config: {
      ...fieldModalProps.config,
      viewMode: {
        ...fieldModalProps.config.viewMode,
        mode: "edit",
      },
    },
    data: {
      ...fieldModalProps.data,
      features: {
        ...fieldModalProps.data.features,
        submission: {
          steps: [
            {
              ...fieldModalProps.data.features.submission[0],
              title: "Edit",
              parameters: {
                fields: editData,
              },
              buttons: [
                {
                  type: "submit",
                  label: "Submit",
                },
                {
                  type: "close",
                  label: "Close",
                  onClick: () => setEditModalOpen(false),
                },
              ],
              onAction: handleEditSubmit, // Link to edit submit handler
            },
          ],
        },
      },
    },
  };

  const flattenFields = (fields, prefix = "") => {
    let flatFields = [];
    fields.forEach((field) => {
      const path = prefix ? `${prefix}.${field.name}` : field.name;
      if (field.type === "section" && field.childFields) {
        // Recursive call for section
        flatFields = [...flatFields, ...flattenFields(field.childFields, path)];
      } else {
        flatFields.push({ ...field, path });
      }
    });
    return flatFields;
  };

  const flattenedFields = flattenFields(childFieldsTotal);

  useEffect(() => {
    if (field.isPrefilled) {
      const toPrefill = field.prefillField;
      let fieldFound = undefined;
      const findField = (field, toPrefill) => {
        if (field.type === "section") {
          field.childFields.map((child) => {
            const found = findField(child, toPrefill);
            if (found) return found;
          });
        } else {
          if (field.dynamicKey === toPrefill) {
            fieldFound = field;
          }
        }
      };

      fields.map((step) => {
        step[0].map((field) => {
          findField(field, toPrefill);
        });
      });

      if (!fieldFound) {
        parentFields.map((step) => {
          step[0].map((field) => {
            findField(field, toPrefill);
          });
        });
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
            formValues[currentStep][field.dynamicKey] = dependantFieldValue;
          }
        }
      }
    }
  }, []); //formValues[currentStep][field.prefillField]

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
    <Card
      sx={{
        boxShadow: "none",
        borderRadius: "10px",
        p: "25px",
        mb: "15px",
        width: "100%",
      }}
    >
      <Button
        variant="contained"
        onClick={() => setNewColumnModalOpen(true)}
        sx={{
          mt: 2, // Margin top to add spacing above the button
          mb: 2, // Margin bottom to add spacing below the button
          width: "100%", // Optional: makes the button full width
          display: "block", // Ensures the button appears on a new line
          padding: "5px 24px",
          backgroundColor: inputFields?.color || "defaultColor", // Set to a default color if it doesn't exist
          "&:hover": {
            backgroundColor: inputFields?.color || "defaultHoverColor", // Set hover color
          },
        }}
      >
        {field.label}
      </Button>
      {/* Conditional Logic */}
      {(() => {
        let listOfFieldsChildAdd = false;

        if (newColumnModalOpen || editModalOpen) {
          if (
            field.dynamicKey === "childFields" &&
            formValues[0].type === "listOfFields"
          ) {
            listOfFieldsChildAdd = true;
          }
        }

        return (
          <>
            {newColumnModalOpen && (
              <Form
                data={fieldModalProps.data}
                config={fieldModalProps.config}
                appearance={fieldModalProps.appearance}
                formKeysPass={listOfFieldsChildAdd ? childFieldsKeys : formKeys}
                setFormKeysPass={
                  listOfFieldsChildAdd ? setChildFieldsKeys : setFormKeys
                }
                parentValues={formValues}
                parentFields={fields}
                ancestorsInfo={
                  formValues[0]?.type == "section" ||
                  formValues[0]?.type == "listOfFields"
                    ? ancestorsInfo
                      ? ancestorsInfo + "_" + formValues[0]?.name
                      : formValues[0]?.name
                    : ancestorsInfo
                }
              />
            )}
            {editModalOpen && (
              <Form
                data={editModalProps.data}
                config={editModalProps.config}
                appearance={editModalProps.appearance}
                formKeysPass={listOfFieldsChildAdd ? childFieldsKeys : formKeys}
                setFormKeysPass={
                  listOfFieldsChildAdd ? setChildFieldsKeys : setFormKeys
                }
                parentValues={formValues}
                parentFields={fields}
                ancestorsInfo={
                  formValues[0].type == "section" ||
                  formValues[0].type == "listOfFields"
                    ? ancestorsInfo
                      ? ancestorsInfo + "_" + formValues[0].name
                      : formValues[0].name
                    : ancestorsInfo
                }
              />
            )}
          </>
        );
      })()}

      <TableContainer
        component={Paper}
        sx={{ mt: 2, width: "100%", overflowX: "auto", overflowY: "hidden" }}
      >
        <Table aria-label="customized table" sx={{ width: "100%", tableLayout: "fixed" }}>
          <TableHead>
            <TableRow>
              {flattenedFields.map((childField) => (
                <StyledTableCell
                  key={childField.path}
                  headerColor={inputFields?.color}
                >
                  {childField.label || childField.name}
                </StyledTableCell>
              ))}
              <StyledTableCell headerColor={inputFields?.color}>
                Actions
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Array.isArray(submittedForms) &&
              submittedForms?.map((form, index) => {
                return (
                  <StyledTableRow key={index}>
                    {flattenedFields.map((childField, ind) => {
                      const cellValue =
                        form[childField.dynamicKey || childField.name];
                      const displayValue = parseAndFormatJSON(cellValue);
                      if (childField.type === "listOfFields") {
                        return (
                          <StyledTableCell key={ind}>
                            {Array.isArray(displayValue) ? (
                              displayValue.map((item, i) => (
                                <span key={i}>
                                  {item}
                                  {i < displayValue.length - 1 ? ", " : ""}
                                </span>
                              ))
                            ) : (
                              <span>{displayValue}</span>
                            )}
                          </StyledTableCell>
                        );
                      } else if (childField.type === "file") {
                        return (
                          <StyledTableCell key={ind}>
                            {Array.isArray(cellValue) ? (
                              cellValue.map((file, i) => {
                                const fileName = file.path?.split("/").pop();
                                return (
                                  <span key={i}>
                                    {fileName}
                                    {i < cellValue.length - 1 ? ", " : ""}
                                  </span>
                                );
                              })
                            ) : (
                              <span>{cellValue?.path?.split("/").pop()}</span>
                            )}
                          </StyledTableCell>
                        );
                      } else {
                        return (
                          <StyledTableCell key={ind}>
                            {displayValue}
                          </StyledTableCell>
                        );
                      }
                    })}
                    <StyledTableCell>
                      <IconButton
                        color="primary"
                        onClick={() => handleEditRow(index)}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        color="error"
                        onClick={() => handleDeleteRow(index)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </StyledTableCell>
                  </StyledTableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  );
}
