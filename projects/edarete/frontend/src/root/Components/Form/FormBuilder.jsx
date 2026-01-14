import React, { useEffect, useState } from 'react';
import {Form} from './Form';
import { Grid, Button, InputAdornment, Container, Box, Typography } from "@mui/material";
import JsonFormater from '../../JsonFormatter/JsonFormatter';
import BasicTabs from "../../Tabs/BasicTabs"
import Graph from '../Graph/GraphBuilder';
import Listing from '../Listing/ParentComp';
import Timeline from '../Timeline/Timeline';

import _ from 'lodash';


function FormBuilder({ data, config, appearance, component, }) {




    data.features.submission.steps = data.features.submission?.steps?.map((item, index) => ({
        ...item,
        onAction:
            ((index == 0)
                ? generateConfigProps
                : ((index == 1)
                    ? generateConfigProps
                    : ((index == 2)
                        ? generateConfigProps :
                        ((index==3)?generateConfigProps:
                        () => {  }))))
    }))


    const [form, setForm] = useState({
        data: data,
        config: config,
        appearance: appearance
    });
const [fieldsGot, setFieldsGot] = useState([]);
    const [formDatareturned, setFormDatareturend] = useState([]);

    // Recursive function to set initial values from formData
    function setInitialValues(formData, form) {
        // Helper function to update fields with matching values
        function updateFieldValues(fields, formData) {
            return fields.map(field => {
                // Construct dynamicKey for matching with formData
                const dynamicKey = field.dynamicKey;

                // If there's a matching key in formData, add a 'value' key to the field
                if (formData.hasOwnProperty(dynamicKey)) {
                    field.value = formData[dynamicKey];
                }

                // If field type is 'section', check childFields recursively
                if (field.type === "section" && field.childFields && field.childFields.length > 0) {
                    field.childFields = updateFieldValues(field.childFields, formData);
                }

                return field;
            });
        }

        // Process each step and update fields with values from formData
        const updatedSteps = form.data.features.submission.steps.map((step, index) => {
            const stepFormData = formData[index] || {};  // Get formData for the current step
            const updatedFields = updateFieldValues(step.parameters.fields, stepFormData);

            return {
                ...step,
                parameters: {
                    ...step.parameters,
                    fields: updatedFields,
                },
            };
        });

        // Return updated form with new field values
        return {
            ...form,
            data: {
                ...form.data,
                features: {
                    ...form.data.features,
                    submission: {
                        ...form.data.features.submission,
                        steps: updatedSteps,
                    },
                },
            },
        };
    }

    useEffect(() => {
        const newForm = setInitialValues(formDatareturned, form);
        setForm(newForm); // If you want to update the state

    }, [formDatareturned]);

    const handleAddSagaCommunication = (formData) => {
        const newServerCommunication = {
            sagaCommunication: formData,
        };

        setGeneratedProps((prevProps) => {
            const lastSubmissionIndex = prevProps.data.features.submission?.steps?.length - 1;

            return {
                ...prevProps,
                data: {
                    ...prevProps.data,
                    features: {
                        ...prevProps.data.features,
                        submission: prevProps.data.features.submission?.steps?.list.map((submission, index) => {
                            if (index === lastSubmissionIndex) {

                                return {
                                    ...submission,
                                    serverCommunication: newServerCommunication,
                                };
                            }
                            return submission;
                        }),
                    },
                },
            };
        });
    };

    const [generatedProps, setGeneratedProps] = useState(
        { data: {}, config: {}, appearance: {},api:{} }
    );
    useEffect(() => {

    }, [generatedProps]);
    function generateConfigProps(formData, ancestorsInfo, currentStep) {

        let updatedDemoFormData = {};

        // Helper function to create the nested config object
        function buildConfigObject(obj) {
            
            const config = {};

            for (const key in obj) {

                // if (key.startsWith("dependOptions")) continue;

                const segments = key.split('_');
                let tempObj = config;

                segments.forEach((segment, index) => {
                    if (index === segments.length - 1) {
                        // If it's an array or object, recursively build nested structures
                        if (Array.isArray(obj[key])) {
                            tempObj[segment] = obj[key].map((item) =>
                                typeof item === 'object' ? buildConfigObject(item) : item
                            );
                        } 
                        else if (typeof obj[key] === 'object' && obj[key] !== null) {
                            tempObj[segment] = buildConfigObject(obj[key]);
                        } 
                        else {
                            tempObj[segment] = obj[key];
                        }
                    } 
                    else {
                        // If the intermediate segment doesn't exist, create an empty object
                        tempObj[segment] = tempObj[segment] || {};
                        tempObj = tempObj[segment];
                    }
                });

            }

            return config;
        }

        const config = buildConfigObject(formData[currentStep]);
        const flattenFields = (fields, prefix = "") => {
            let flatFields = [];
            fields?.forEach((field) => {
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
        
        if (currentStep == 1) {
            const steps = formData[currentStep].features_submission_steps;
            const fields = [];
            steps?.map((step) => {
                let field = step.parameters_fields;

                const flattenedFields = flattenFields(field);
                if (Array.isArray(flattenedFields)) {
                    fields.push(...flattenedFields);
                }
            })
            const thatList = form?.data?.features?.submission?.steps?.[3]?.parameters?.fields || [];
            const thatField = 
              thatList?.[0]?.childFields?.[0]?.childFields?.[0]?.childFields?.[1]?.childFields?.[0] || [];            
            thatField.value = fields;
            setFieldsGot(fields);
        }


        switch (currentStep) {
            
            case 0:
                setGeneratedProps((prev) => ({
                    ...prev,
                    config: config,       // Overwrite only `config`
                    // Preserve `data` and `appearance`
                    data: prev.data,
                    appearance: prev.appearance,
                }));
                break;
            case 1:
                setGeneratedProps((prev) => ({
                    ...prev,
                    data: config,
                    // Preserve `config` and `appearance`
                    config: prev.config,
                    appearance: prev.appearance,
                }));
                break;
            case 2:
                setGeneratedProps((prev) => ({
                    ...prev,
                    appearance: config,   // Overwrite only `appearance`
                    // Preserve `config` and `data`
                    config: prev.config,
                    data: prev.data,
                }));
            
                break;
            case 3:
                setGeneratedProps((prev) => ({
                    ...prev,
                    api: config,   // Overwrite only `appearance`
                    // Preserve `config` and `data`
                    config: prev.config,
                    data: prev.data,
                }));
                default:
                break;
        }
        setFormDatareturend(formData);
    }

    const [selectedFile, setSelectedFile] = useState(null); // State to hold the selected file

    useEffect(() => {
        if (selectedFile) {
            const reader = new FileReader();
            reader.onload = (event) => {
                try {
                    const jsonData = JSON.parse(event.target.result);
                    setGeneratedProps(jsonData)
                }
                catch (error) {
                    console.error("Error parsing JSON:", error);
                    alert("Failed to parse JSON. Please ensure the file is valid.");
                }
            };
            reader.readAsText(selectedFile);
        }

    }, [selectedFile]);

    // Function to handle file input change
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedFile(file);
        }
    };


    function removeDuplicateFields(generatedProps) {
      
        const clonedProps = JSON.parse(JSON.stringify(generatedProps));
    
       
        const steps = clonedProps?.data?.features?.submission?.steps || [];
    
        steps.forEach((step) => {
            if (step?.parameters?.fields) {
                const uniqueFields = [];
                const fieldNames = new Set();
    
          
                step.parameters.fields.forEach((field) => {
                    if (!fieldNames.has(field.name)) {
                        fieldNames.add(field.name);
                        uniqueFields.push(field);
                    }
                });
    
              
                step.parameters.fields = uniqueFields;
            }
        });
    
        return clonedProps;
    }

    const JsonView = () => {
        return (
            <Box
                sx={{
                    width: '100%', // Makes the component occupy full width
                    padding: 3,
                    marginTop: 3,
                    overflowX: 'auto', // Allows horizontal scrolling if content overflows
                }}
            >
                <JsonFormater
                    data={generatedProps.data}
                    config={generatedProps.config}
                    appearance={generatedProps.appearance}
                    component={component}
                    api={component === "Api" ? generatedProps.api : null}
                />
            </Box>
        );
    };

    function configuration() {
        return (
            <>
                <Grid
                    container
                    sx={{
                        width: '100%',
                        height: '100%',
                        overflow: 'auto',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: '2rem'
                    }}
                >
                    <Grid item xs={6} sm={12} md={10}>
                        <Grid container sx={{
                            justifyContent: 'space-between',
                            width: "100%",
                        }}>

                            <Button
                                variant="contained"
                                component="label"
                                sx={{ width: "100%" }}
                            >
                                Upload JSON
                                <input
                                    type="file"
                                    hidden
                                    accept=".json"
                                    onChange={handleFileChange}
                                />

                            </Button>
                        </Grid>
                        <Form
                            data={form.data}
                            config={form.config}
                            appearance={form.appearance}
                            demoView={true}
                        />
                    </Grid>
                </Grid>
            </>
        );
    }

    function view() {
        return (
            <>
                <Grid
                    container
                    sx={{
                        width: '100%',
                        height: '100%',
                        overflow: 'auto',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: '2rem'
                    }}
                >
                    <Grid item xs={12}>
                        {component == "Form" &&
                            <Form
                                data={removeDuplicateFields(generatedProps).data}
                                config={removeDuplicateFields(generatedProps).config}
                                appearance={removeDuplicateFields(generatedProps).appearance}
                            />}
                        {component == "Graph" &&
                            <Graph
                                data={removeDuplicateFields(generatedProps).data}
                                config={removeDuplicateFields(generatedProps).config}
                                appearance={removeDuplicateFields(generatedProps).appearance}
                            />}
                        {component == "Listing" &&

                            <Listing
                                dataProp={removeDuplicateFields(generatedProps).data}
                                configProp={removeDuplicateFields(generatedProps).config}
                                appearanceProp={removeDuplicateFields(generatedProps).appearance}
                            />

                        }
                        {
                            component == "Timeline" &&
                            <Timeline
                                data={removeDuplicateFields(generatedProps).data}
                                config={removeDuplicateFields(generatedProps).config}
                                appearance={removeDuplicateFields(generatedProps).appearance}
                            />
                        }

                    </Grid>

                </Grid>
            </>
        );
    }


    function json() {
        return (<>
            <Grid
                container
                sx={{
                    width: '100%',
                    height: '100%',
                    overflow: 'auto',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: '2rem'
                }}
            >
                <JsonView  />

            </Grid>
        </>)
    }

    function api() {
        const ApiJson = () => {
            return (
                <Box
                    sx={{
                        width: '100%', // Makes the component occupy full width
                        padding: 3,
                        marginTop: 3,
                        overflowX: 'auto', // Allows horizontal scrolling if content overflows
                    }}
                >
                    <JsonFormater
                        data={generatedProps.api}
                        config={{}}
                        appearance={{}}
                        component={component}
                        tabName="Api"
                        api={component === "Api" ? generatedProps.api : null}
                    />
                </Box>
            );
        };
        function ApiJsonViewer() {
            return (<>
                <Grid
                    container
                    sx={{
                        width: '100%',
                        height: '100%',
                        overflow: 'auto',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: '2rem'
                    }}
                >
                    <ApiJson  />
    
                </Grid>
            </>)
        }


        return (
            <>
                <Grid
                    container
                    sx={{
                        width: '100%',
                        height: '100%',
                        overflow: 'auto',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: '2rem'
                    }}
                >
                    <Grid item xs={6} sm={12} md={10}>
                   <ApiJsonViewer/>
                    </Grid>
                </Grid>
            </>
        )
    }

    const tabsData = [
        {
          label: "Configurations",
          content: configuration,
        },
        ...(component !== "Api" && component !== "CRUD"
          ? [
              {
                label: "View",
                content: view,
              },
            ]
          : []),
        {
          label: "JSON",
          content: json,
        },
        ...(component !== "CRUD"
          ? [
              {
                label: "Api",
                content: api,
              },
            ]
          : []),
      ];
      

    return (
        <Container maxWidth="lg" sx={{ padding: '2rem' }}>
            <Grid container spacing={2} direction="column"  >
                <Grid item>
                    <BasicTabs title="Form Builder" tabs={tabsData} />
                </Grid>
            </Grid>
        </Container>
    );

}

export default FormBuilder;