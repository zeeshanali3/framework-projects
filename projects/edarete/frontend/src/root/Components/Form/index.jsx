import React, { useState } from "react";
//import FormBuilder from "./FormBuilder";
import { Form } from "./Form";
import { Grid } from "@mui/material";


function FormDashboard() {
  
  const [form, setForm] = useState({
    data: {
      features: {
        submission: {
          steps: [
            {
              //step 1: config
              title: "Config",
              parameters: {
                fields: [
                  {
                    name: "viewMode",
                    title: "View Modes",
                    type: "section",
                    childFields: [                      
                      {
                        name: "multiSelect",
                        label: "Multi Select",
                        type: "multiSelect",
                        options: [
                          {
                            label: "simpleOption",
                            value: "simpleOption"
                          },
                          {
                            label: "Section 1",
                            value: [
                              { value: "opt", label: "Option 1" },
                              { value: "opt1", label: "Option 2" },
                            ],
                          },
                          {
                            label: "Section 2",
                            value: [
                              { value: "optt", label: "Option A" },
                              { value: "optt1", label: "Option B" },
                            ],
                          },
                        ]
                      },
                      {
                        name: "Email",
                        label: "Email",
                        type: "email",
                      },
                      {
                        name: "ReportType",
                        label: "ReportType",
                        type: "report",
                      },
                      {
                        name: "presentation",
                        label: "Presentation Modes",
                        type: "radio",
                        required: true,
                        options: [
                          {
                            label: "Form View",
                            value: "formView",
                          },
                          {
                            label: "Modal View",
                            value: "modalView",
                          },
                        ],
                      },
                      {
                        name: "mode",
                        label: "Mode",
                        type: "radio",
                        required: true,
                        options: [
                          {
                            label: "Create",
                            value: "create",
                          },
                          {
                            label: "Edit",
                            value: "edit",
                          },
                          {
                            label: "View",
                            value: "view",
                          },
                        ],
                      },
                    ],
                  },
                  {
                    name: "features",
                    title: "Features",
                    type: "section",
                    childFields:[
                      {
                        name: "submission",
                        label: "Submission",
                        type: "checkbox",
                        value: true
                      }
                    ]
                  }
                ],
              },
              buttons: [],
            },
            {
              //step 2: data
              title: "Data",
              parameters: {
                fields: [
                  {
                    name: "features",
                    title: "Features",
                    type: "section",
                    childFields: [
                      {
                        name: "submission",
                        title: "Submission",
                        type: "section",
                        dependancyCheck: true,
                        dependancy: {
                          dependant: "features_submission",
                          dependValue: [
                            { value: true }
                          ],
                        },
                        childFields: [
                          {
                            name: "steps",
                            label: "Add Step",
                            type: "listOfFields",
                            childFields: [
                              {
                                name: "title",
                                label: "Enter the name of the step",
                                type: "textField",
                                required: true,
                              },
                              {
                                name:"parameters",
                                title: "Parameters",
                                type: "section",
                                childFields: [
                                  {
                                    name: "fields",
                                    label: "Add New Field",
                                    type: "listOfFields",
                                    childFields: [
                                      {
                                        name: "name",
                                        label: "Enter the name of the field",
                                        type: "textField",
                                        required: true,
                                      },
                                      {
                                        name: "label",
                                        label: "Enter the label of the field",
                                        type: "textField",
                                        required: true,
                                      },
                                      {
                                        type: "textField",
                                        name: "title",
                                        label: "Title Of Field",
                                        dependancyCheck: true,
                                        dependancy: {
                                          dependant: "type",
                                          dependValue: [
                                            { value: "section" }
                                          ],
                                        }
                                      },
                                      {
                                        name: "type",
                                        label: "Enter the type of the field",
                                        type: "select",
                                        options: [
                                          { value: "section", label: "Section" },
                                          { value: "listOfFields", label: "List of Fields" },
                                          { value: "textField", label: "Text Field" },
                                          { value: "select", label: "Select" },
                                          { value: "email", label: "Email" },
                                          { value: "multiSelect", label: "Multi Select" },
                                          { value: "number", label: "Number" },
                                          { value: "textArea", label: "Text Area" },
                                          { value: "file", label: "File" },
                                          { value: "checkbox", label: "Checkbox" },
                                          { value: "date", label: "Date" },
                                          { value: "time", label: "Time" },
                                          { value: "dateTime", label: "Date and Time" },
                                          { value: "color", label: "Color" },
                                          { value: "url", label: "URL" },
                                          { value: "range", label: "Range" },
                                          {
                                            value: "radio",
                                            label: "Radio (single Select Checkbox)",
                                          },
                                          { value: "password", label: "Password" },
                                          { value: "selectDependant", label: "Select Dependant"}
                                        ],
                                        required: true,
                                      },
                                      {
                                        name: "required",
                                        label: "Is the field required",
                                        type: "checkbox",
                                      },
                                      {
                                        name: "disabled",
                                        label: "Is the field disabled",
                                        type: "checkbox",
                                      },
                                      {
                                        name: "dependOptionsOn",
                                        label: "Field path for Depend options",
                                        type: "textField", 
                                        dependancyCheck: true,
                                        dependancy: {
                                          dependant: "type",
                                          dependValue: [
                                            { value: "selectDependant" },
                                          ],
                                        }
                                      },
                                      {
                                        name: "dependOptionsKeymatch",
                                        label: "Key to match",
                                        type: "textField", 
                                        dependancyCheck: true,
                                        dependancy: {
                                          dependant: "type",
                                          dependValue: [
                                            { value: "selectDependant" },
                                          ],
                                        }
                                      },
                                      {
                                        type: "listOfFields",
                                        name: "childFields",
                                        label: "Add Child Fields",
                                        dependancyCheck: true,
                                        dependancy: {
                                          dependant: "type",
                                          dependValue: [
                                            { value: "section" },
                                            { value: "listOfFields" }
                                          ],
                                        }
                                      },
                                      {
                                        type: "listOfFields",
                                        name: "options",
                                        label: "Add Options",
                                        dependancyCheck: true,
                                        dependancy: { 
                                          dependant: "type",
                                          dependValue: [
                                            { value: "radio" },
                                            { value: "select" },
                                            { value: "multiselect" },
                                          ],
                                        },
                                        childFields: [
                                          {
                                            type: "textField",
                                            name: "value",
                                            label: "Enter Value",
                                            required: true,
                                          },
                                          {
                                            type: "textField",
                                            name: "label",
                                            label: "Enter Label",
                                            required: true,
                                          }
                                        ]
                                      },
                                      {
                                        type: "checkbox",
                                        name: "multiple",
                                        label: "Enable multiple File Upload?",
                                        dependancyCheck: true,
                                        dependancy: {
                                          dependant: "type",
                                          dependValue: [
                                            { value: "file" }
                                          ],
                                        }
                                      },
                                      {
                                        type: "number",
                                        name: "min",
                                        label: "Minimum Value",
                                        dependancyCheck: true,
                                        dependancy: {
                                          dependant: "type",
                                          dependValue: [
                                            { value: "textField" },
                                            { value: "number" },
                                            { value: "textArea" },
                                          ],
                                        }
                                      },
                                      {
                                        type: "number",
                                        name: "max",
                                        label: "Maximum Value",
                                        dependancyCheck: true,
                                        dependancy: {
                                          dependant: "type",
                                          dependValue: [
                                            { value: "textField" },
                                            { value: "number" },
                                            { value: "textArea" }
                                          ],
                                        }
                                      },
                                      {
                                        type: "date",
                                        name: "minDate",
                                        label: "Minimum Date",
                                        dependancyCheck: true,
                                        dependancy: { 
                                          dependant: "type",
                                          dependValue: [
                                            { value: "date" }
                                          ],
                                        }
                                      },
                                      {
                                        type: "date",
                                        name: "maxDate",
                                        label: "Maximum Date",
                                        dependancyCheck: true,
                                        dependancy: {
                                          dependant: "type",
                                          dependValue: [
                                            { value: "date" }
                                          ],
                                        }
                                      },
                                      {
                                        type: "dateTime",
                                        name: "minDateTime",
                                        label: "Minimum Date and Time",
                                        dependancyCheck: true,
                                        dependancy: {
                                          dependant: "type",
                                          dependValue: [
                                            { value: "dateTime" }
                                          ],
                                        }
                                      },
                                      {
                                        type: "dateTime",
                                        name: "maxDateTime",
                                        label: "Maximum Date and Time",
                                        dependancyCheck: true,
                                        dependancy: {
                                          dependant: "type",
                                          dependValue: [
                                            { value: "dateTime" }
                                          ],
                                        }
                                      },
                                      {
                                        name: "validations",
                                        label: "Validations",
                                        type: "multiSelect",
                                        options: []
                                      },
                                      {
                                        name: "dependancyCheck",
                                        label: "Is this Field Dependant?",
                                        type : "checkbox",
                                      },
                                      {
                                        name: "dependancy",
                                        title: "Dependancy",
                                        type : "section",
                                        dependancyCheck: true,
                                        dependancy: {
                                          dependant: "dependancyCheck",
                                          dependValue: [
                                            { value: "true" }
                                          ],
                                        },
                                        childFields: [
                                          {
                                            name: "dependant",
                                            label: "This is Field is Dependent on",
                                            type: "selectOnFields",
                                          },
                                          {
                                            name: "dependValue",
                                            label: "values Of dependant",
                                            type: "listOfFields",
                                            childFields: [
                                              {
                                                name: "value",
                                                type: "textField",
                                                label: "Value",
                                              }
                                            ]
                                          },
                                        ]
                                      },
                                      {
                                        name: "isPrefilled",
                                        label: "Is this field prefilled?",
                                        type: "checkbox",
                                      },
                                      {
                                        name: "prefillField",
                                        label: "Field Prefilled On",
                                        type: "selectOnFields",
                                        dependancyCheck: true,
                                        dependancy: {
                                          dependant: "isPrefilled",
                                          dependValue: [
                                            { value: "true" }
                                          ],
                                        },
                                      },
                                      {
                                        name: "source",
                                        label: "Source",
                                        type: "select",
                                        hidden: true,
                                        options: [
                                          { label: "Body", value: "req.body" },
                                          { label: "Query", value: "req.query" },
                                        ],
                                        value: "req.body"
                                      }
                                    ],
                                  },
                                ],
                              },
                            ],
                            value: [
                              {
                                title: "Config",
                              },
                              {
                                title: "Data",
                              },
                              {
                                title: "Appearence",
                              }
                            ]
                          },
                        ],
                      },
                    ]
                  },
                ],
  
                buttons: [],
              },
              buttons: [],
            },
            {
              //step 3: Appearence
              title: "Appearence",
              parameters: {
                fields: [
                  {
                    name: "features",
                    title: "Features",
                    type: "section",
                    childFields: [
                      {
                        name: "submission",
                        title: "Submission",
                        type: "section",
                        dependancyCheck: true,
                        dependancy: {
                          dependant: "features_submission",
                          dependValue: [
                            { value: true }
                          ],
                        },
                        childFields: [
                          {
                            name: "inputFields",
                            type: "section",
                            title: "Input Fields",
                            childFields: [
                              {
                                name: "color",
                                type: "color",
                                label: "Input Fields Color",
                              }
                            ]
                          },
                          {
                            name: "background",
                            type: "section",
                            title: "Background",
                            childFields: [
                              {
                                name: "color",
                                type: "color",
                                label: "Background Color",
                              }
                            ]
                          },
                          {
                            name: "button",
                            label: "Button",
                            type: "listOfFields",
                            childFields: [
                              {
                                name: "type",
                                label: "Type",
                                type: "select",
                                options: [
                                  {
                                    label: "next",
                                    value: "next",
                                  },
                                  {
                                    label: "previous",
                                    value: "previous",
                                  },
                                  {
                                    label: "submit",
                                    value: "submit",
                                  }
                                ],
                                required: true,
                              },
                              {
                                name: "backgroundColor",
                                label: "Background Color",
                                type: "color",
                                required: true,
                              },
                              {
                                name: "color",
                                label: "Color",
                                type: "color",
                                required: true,
                              },
                            ],
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
              buttons: [

              ],
            },
            {
              title: "versions",
              parameters: {
                fields: [
                  {
                    name: "versionData",
                    title: "Version Data",
                    label: "Version Data",
                    type: "listOfFields",
                    childFields: [
                      {
                        name: "=1.0",
                        title: "=1.0",
                        type: "section",
                        childFields: [
                          {
                            name: "steps",
                            title: "Steps",
                            label: "Steps",
                            type: "listOfFields",
                            childFields: [
                              {
                                name: "config",
                                title: "Config",
                                type: "section",
                                childFields: [
                                  {
                                    name: "features",
                                    title: "Features",
                                    type: "section",
                                    childFields: [
                                      {
                                        name: "multistep",
                                        label: "Enable Multistep",
                                        type: "checkbox",
                                        required: false
                                      },
                                      {
                                        name: "parameters",
                                        label: "Include Parameters",
                                        type: "checkbox",
                                        required: false
                                      },
                                      {
                                        name: "pagination",
                                        label: "Enable Pagination",
                                        type: "checkbox",
                                        required: false
                                      }
                                    ]
                                  },
                                  {
                                    name: "communication",
                                    title: "Communication",
                                    type: "section",
                                    childFields: [
                                      {
                                        name: "encryption",
                                        title: "Encryption",
                                        type: "section",
                                        childFields: [
                                          {
                                            name: "platformEncryption",
                                            label: "Platform Encryption",
                                            type: "checkbox",
                                            required: false
                                          },
                                          {
                                            name: "accessTokenEncryption",
                                            label: "Access Token Encryption",
                                            type: "checkbox",
                                            required: false
                                          }
                                        ]
                                      }
                                    ]
                                  },
                                  {
                                    name: "verification",
                                    title: "Verification",
                                    type: "section",
                                    childFields: [
                                      {
                                        name: "otp",
                                        label: "Require OTP Verification",
                                        type: "checkbox",
                                        required: false
                                      },
                                      {
                                        name: "accessToken",
                                        label: "Require Access Token",
                                        type: "checkbox",
                                        required: false
                                      }
                                    ]
                                  }
                                ]
                              },
                              {
                                name: "data",
                                title: "Data",
                                type: "section",
                                childFields: [
                                  {
                                    name: "parameters",
                                    title: "Parameters",
                                    label: "Parameters",
                                    type: "listOfFields",
                                    isPrefilled: true,
                                    prefillField: "",

                                    childFields: [
                                      {
                                        name: "name",
                                        label: "Name",
                                        type: "textField",
                                      },
                                      {
                                        name: "validations",
                                        label: "Validations",
                                        type: "textField",
                                      },
                                      {
                                        name: "required",
                                        label: "Required",
                                        type: "checkbox",
                                      },
                                      {
                                        name: "source",
                                        label: "Source",
                                        type: "select",
                                        options: [
                                          { label: "Body", value: "req.body" },
                                          { label: "Query", value: "req.query" },
                                        ],
                                        value: "req.body"
                                      }
                                    ]
                                  },
                                  {
                                    name: "apiInfo",
                                    title: "API Info",
                                    type: "section",
                                    childFields: [
                                      {
                                        name: "query",
                                        title: "Query",
                                        type: "section",
                                        childFields: [
                                          {
                                            name: "queryNature",
                                            label: "Query Nature",
                                            type: "textField",
                                            required: false
                                          },
                                          {
                                            name: "queryPayload",
                                            label: "Query Payload",
                                            type: "textArea",
                                            required: true,
                                            defaultValue:
                                              "insert into users (name, email, phoneNo, password)values ({{name}}, {{email}}, {{phoneNo}}, {{password}})"
                                          },
                                          {
                                            name: "database",
                                            label: "Database",
                                            type: "textField",
                                            required: true,
                                            defaultValue: "projectDB"
                                          }
                                        ]
                                      },
                                      {
                                        name: "utilityFunctions",
                                        title: "Utility Functions",
                                        type: "section",
                                        childFields: [
                                          {
                                            name: "callbackFunction",
                                            label: "Callback Function",
                                            type: "textField",
                                            required: false
                                          },
                                          {
                                            name: "payloadFunction",
                                            label: "Payload Function",
                                            type: "listOfFields",
                                            childFields: []
                                          }
                                        ]
                                      }
                                    ]
                                  },
                                  {
                                    name: "requestMetaData",
                                    title: "Request Meta Data",
                                    type: "section",
                                    childFields: [
                                      {
                                        name: "requestMethod",
                                        label: "Request Method",
                                        type: "select",
                                        options: [
                                          { label: "POST", value: "POST" },
                                          { label: "GET", value: "GET" },
                                          { label: "PUT", value: "PUT" },
                                          { label: "DELETE", value: "DELETE" }
                                        ],
                                        required: true,
                                        defaultValue: "POST"
                                      },
                                      {
                                        name: "permission",
                                        label: "Permission",
                                        type: "textField",
                                        required: false
                                      },
                                      {
                                        name: "pagination",
                                        title: "Pagination",
                                        type: "section",
                                        childFields: [
                                          {
                                            name: "pageSize",
                                            label: "Page Size",
                                            type: "number",
                                            required: true,
                                            defaultValue: 10
                                          }
                                        ]
                                      }
                                    ]
                                  }
                                ]
                              },
                              {
                                name: "response",
                                title: "Response",
                                type: "section",
                                childFields: [
                                  {
                                    name: "successMessage",
                                    label: "Success Message",
                                    type: "textField",
                                    required: true,
                                    defaultValue: "Configuration generated successfully!"
                                  },
                                  {
                                    name: "errorMessage",
                                    label: "Error Message",
                                    type: "textField",
                                    required: true,
                                    defaultValue: "There was an error generating the configuration."
                                  }
                                ]
                              }
                            ]
                          }
                        ]
                      }
                    ]
                  }
                ]
              },
              buttons: [
                {
                  type: "submit",
                  label: "Submit"
                }
              ]
            }
          ],
        
        }
      },
    },
    config: {
      viewMode: {
        presentation: "formView",
        mode: "edit",
      },
      features: { submission: true },
    },
    appearance: {
      features: {
        submission: {
          button: [
            {
              type: "confirm",
              backgroundColor: "#fff",
              color: "#fff",
            },
          ],
        },
      },
    },
  });
  
  return (
    // add an outer grid and add button upload here
    <Grid>
      {/* <FormBuilder
        data={form.data}
        config={form.config}
        appearance={form.config}
        component={"form"}
      ></FormBuilder> */}
      <Form
        data={form.data}
        config={form.config}
        appearance={form.config}
      ></Form>
    </Grid>
  );
}

export default FormDashboard;

/*

{
  type: "section",
  component: "Section",
  inlineProps: {
    name: "abc",
    label: "abc",
    inputFields: "inputFields",
    
  },
}
  

*/