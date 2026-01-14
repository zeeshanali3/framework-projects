import { parameters } from "./CRUD_parameters";
import generateFormProps from "./../../../../../Components/DataLayout/constants/generateFormProps"; //Enter your Path to helper function
import serverCommunicationHelper from "../../../../../Components/DataLayout/constants/serverCommunicationHelper"; //Enter your Patth to helper function

export const listing_crud_props = {
  data: {
    features: {
      parameters: parameters,
      rowActions: {
        actions: [
          {
            name: "Edit",
            permission: 'admin_update_departments',
            color:'blue',
            onAction: () => console.log("Button pressed Edit"),
            form: generateFormProps({
              parameters: parameters,
              apiUrl: "/crud/departments?version=1.0",
              apiActionType: "",
              requestType: "PUT",
              reduxActionType: "",
            }),
          },
          {
            name: "Delete",
            permission: 'admin_delete_departments',
            color:'red',
            serverCommunication: serverCommunicationHelper({
              parameters: parameters,
              apiUrl: "/crud/departments?version=1.0",
              apiActionType: "",
              requestType: "DELETE",
              reduxActionType: "",
            }),
            onAction: () => console.log("Button pressed Delete"),
          },
          {
            name: "View",
            permission: 'admin_list_departments',
            color:"grey",
            onAction: () => console.log("Button pressed View"),
            form: generateFormProps({
              parameters: parameters,
              apiUrl: "/crud/departments?version=1.0",
              apiActionType: "",
              requestType: "GET",
              reduxActionType: "",
            }),
          },
        ],
      },
      bulkAction: {
        add: {
          permission: 'admin_add_departments',
          form: generateFormProps({
            parameters: parameters,
            apiUrl: "/crud/departments?version=1.0",
            apiActionType: "",
            requestType: "POST",
            reduxActionType: "",
            mode: "create",
          }),
        },
      },

      export: {
        permission: 'admin_export_departments',
        serverCommunication: serverCommunicationHelper({
          parameters: parameters,
          apiUrl: "/departments/add",
          apiActionType: "departments_departments_add",
          requestType: "POST",
          reduxActionType: "departments_departments_update",
        }),
        onAction: (e) => console.log("Export Action", e),
        options: {
          formats: ["CSV", "PDF"],
          includeHeaders: true,
          icon: "",
        },
      },
      filter: {
        permission: 'admin_filter_departments',
        serverCommunication: serverCommunicationHelper({
          parameters: parameters,
          apiUrl: "/departments/view",
          apiActionType: "departments_departments_view",
          requestType: "GET",
          
          reduxActionType: "departments_departments_view",
        }),
        onAction: (e) => console.log("Filter Action", e),
        options: {
          filterBy: [
            "departments_departmentId","departments_status","departments_updatedBy","departments_departmentName",
          ],
          statusOptions: ["active", "inactive"],
        },
        excludeFilter: [],
      },
      sort: {
        permission: 'admin_sort_departments',
        serverCommunication: serverCommunicationHelper({
          parameters: parameters,
          apiUrl: "/departments",
          apiActionType: "",
          requestType: "GET",
          reduxActionType: "",
        }),
        onAction: (e) => console.log("Sort Action", e),
        options: {
          defaultSortField: "id",
          defaultSortOrder: "asc",
          multiColumnSort: true,
        },
        excludeSort: [],
      },
      list: {
        permission:'admin_list_departments',
        serverCommunication: serverCommunicationHelper({
          parameters: parameters,
          apiUrl: "/crud/departments?version=1.0",
          apiActionType: "",
          requestType: "GET",
          reduxActionType: "",
        }),
      },
      search: {
        permission: 'admin_search_departments',
        excludeSearch: ["image"],
        serverCommunication: serverCommunicationHelper({
          parameters: parameters,
          apiUrl: "/crud/departments?version=1.0",
          apiActionType: "",
          requestType: "",
          reduxActionType: "",
        }),
      },
      grid: {
        entitiesPerRow: 2,
        buttonEnable: true,
        checkBoxEnable: true,
        actionButtonEnable: true,
      },
      pagination: {
        parameters: null,
        permission: true,
        serverCommunication: serverCommunicationHelper({
          parameters: parameters,
          apiUrl: "/departments/view",
          apiActionType: "departments_departments_view",
          requestType: "GET",
          reduxActionType: "departments_departments_view",
        }),
        options: {
          pageSize: 10,
          pageSizeOptions: [4, 5, 10, 20, { label: "All", value: -1 }],
        },
        onAction: (e) => {
          console.log("Pagination Action", e);
        },
      },
    },
  },
  config: {
    viewMode: {
      presentation: ["Table", "Grid"],
    },
    features: {
      export: { enable: true, operationalMode: "server",permission:true },
      filter: { enable: true, operationalMode: "server" ,permission:true},
      sort: { enable: true, operationalMode: "server" ,permission:true},
      search: { enable: true, operationalMode: "server" ,permission:true},
      pagination: { enable: true, operationalMode: "server" },
      bulkAction: { enable: true, operationalMode: "server" ,permission:true},
      viewModes: { enable: true, operationalMode: "server" },
      grid: { enable: true, operationalMode: "server" },
      colaborator: { enable: false, operationalMode: "server" },
      rowActions: { enable: true, operationalMode: "server",permission:true },
      list: { enable: true, operationalMode: "server" ,permission:true},
      parameters: { enable: true, operationalMode: "local" },
    },
  },
  appearance: {
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
