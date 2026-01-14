import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";

import List from "../../DataLayout/ParentComp";

import generateFormProps from "../../DataLayout/constants/generateFormProps";
import serverCommunicationHelper from "../../DataLayout/constants/serverCommunicationHelper";

import {
  initializeFieldValues,
  handleAdditionofTableOfField,
  checkDependancy,
} from "./HelperFunctions";

import { getSectionValue } from "./HelperFunctions";

export default function TableOfFields(props) {
  const {
    serverMode,
    field,
    inputFields,
    formValues,
    setFormValues,
    currentStep,
    stepsData,
    formKeys,
    setFormKeys,
    parentValues,
    ancestorsInfo,
    fields,
    parentFields,

    config,
    boxWidth,
    appearance

  } = props;
  
  let temp = currentStep > 0 ? currentStep - 1 : currentStep;
  const sectionValue = getSectionValue(null, temp, formValues, fields);
  useEffect(() => {
    
  }, [sectionValue]);

  const parameters = {
    steps: [
      {
        title: "Step 1",
        parameters: {
          fields: field?.childFields,
        },
        buttons: [
          {
            type: "submit",
            label: "Submit",
          },
        ],
      },
    ],
    colMapper: field.colMapper,
  };
  /* Frontend Parameters for table: roles */

  const [errors, setErrors] = useState({});
  const [valuesAre, setValuesAre] = useState([]);
  useEffect(() => {
    console.log("Values are in form WHICH WE UPDATE", formValues, valuesAre);
    handleAdditionofTableOfField(
      valuesAre,
      field,
      formValues,
      setFormValues,
      currentStep
    );
  }, [valuesAre]);
  const list = {
    data: {
      features: {
      
        parameters: parameters,
        rowActions: {
          actions: [
            {
              name: "Edit",
              color: "blue",
              permission: "update_device_otp",
              onAction: () => console.log("Button pressed Edit"),
              form: generateFormProps({
                parameters: parameters,
                apiUrl: field?.selectServerUrl,
                requestType: "PUT",
                mode: "edit",
              }),
            },
            {
              name: "Delete",
              color: "red",
              permission: "delete_device_otp",
              serverCommunication: serverCommunicationHelper({
                parameters: parameters,
                apiUrl: field?.selectServerUrl,
                requestType: "DELETE",
              }),
              onAction: () => console.log("Button pressed Delete"),
            },
            {
              name: "View",
              color: "grey",
              permission: "view_device_otp",
              onAction: () => console.log("Button pressed View"),
              form: generateFormProps({
                parameters: parameters,
                apiUrl: field?.selectServerUrl,
                requestType: "GET",
                mode: "view",
              }),
            },
          ],
        },
        bulkAction: {
          add: {
            permission: "add_device_otp",
            form: generateFormProps({
              parameters: parameters,
              apiUrl: "/grouped/cruds/users?version=1.0",
              requestType: "POST",
              mode: "create",
            }),
          },
        },

        list: {
          permission: "list_device_otp",
          serverCommunication: serverCommunicationHelper({
            parameters: parameters,
            apiUrl: field?.selectServerUrl,
            apiActionType: "",
            requestType: "GET",
            reduxActionType: "",
          }),
        },
      },
    },
    config: {
      viewMode: {
        presentation: ["Table"],
      },
      features: {
        export: { enable: false, operationalMode: "local", permission: true },
        filter: { enable: false, operationalMode: "local", permission: true },
        sort: { enable: false, operationalMode: "local", permission: true },
        search: { enable: false, operationalMode: "local", permission: true },
        pagination: { enable: true, operationalMode: "server" },
        speedDial: { enable: false },
        bulkAction: {
          enable: true,
          operationalMode: "local",
          permission: true,
        },
        viewModes: { enable: false, operationalMode: "local" },
        grid: { enable: false, operationalMode: "local" },
        colaborator: { enable: false, operationalMode: "local" },
        rowActions: {
          enable: true,
          operationalMode: "local",
          permission: true,
        },
        list: { enable: true, operationalMode: "server", permission: true },
        parameters: { enable: true, operationalMode: "local" },
      },
    },
    appearance: {
      width: 175,
      export: {
        button: [
          {
            type: "confirm",
            backgroundColor: "#007bff",
            color: "#fff",
          },
          {
            type: "cancel",
            backgroundColor: "#ccc",
            color: "#333",
          },
        ],
      },
      filter: [
        {
          type: "text",
          backgroundColor: "#007bff",
          color: "#fff",
        },
        {
          type: "dropdown",
          backgroundColor: "#007bff",
          color: "#fff",
        },
        {
          type: "date",
          backgroundColor: "#007bff",
          color: "#fff",
        },
      ],
      parent: {
        appBarColor: "#f8faFE",
        appBarTextColor: "#7479ed",
      },
      grid: {
        image: {
          borderColor: "#7479ed",
        },
        actionButtons: {
          color: "#7b7a8c",
        },
        button: {
          buttonColor: "#818093",
          buttonVarient: "contained",
          buttonTextColor: "#ffffff",
        },
        header: {
          headColor: "#e5e5e5",
          headTextColor: "#260143",
        },
        cardFont: {
          headingSize: 15,
          headingWeight: 650,
          textSize: 13,
          textWeight: 500,
          heading: "#260143",
          color: "#5a5897",
        },
      },
    },
  };
  // console.log("component table of field", field, formValues[currentStep]);
  if (field?.hidden) {
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
        width: 500, // Important
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        boxSizing: "border-box", // Includes padding in width

        p: 2, // Use padding shorthand (instead of paddingRight)
      }}
    >
     
      {
        <List
          config={list.config}
          data={list.data}
          appearance={list.appearance}
          formValues={formValues}
          setFormValues={setFormValues}
          setUpdatedDataFromList={setValuesAre}
          showSearchIcon={config?.viewMode?.mode}
          sectionValue={sectionValue}
          currentStep={currentStep}
          isTableOfField={true}
        />
      }
    </Card>
  );
}
