import { parameters } from "./CRUD_parameters.js";
import generateFormProps  from "../../../Components/DataLayout/constants/generateFormProps.js";
import  serverCommunicationHelper from "../../../Components/DataLayout/constants/serverCommunicationHelper.js";
import constants from "../../../Common/Constants";

const listing_crud_props = {
  data: {
    features: {
      parameters: parameters,
      rowActions: {
        actions: [
          {
            name: "Edit",
            permission: 'admin_update_users',
            onAction: () => console.log("Button pressed Edit"),
            form: generateFormProps({
              parameters: parameters,
              apiUrl: constants.crud+
              constants.users +
              constants.version,
              requestType: "PUT",
              mode:"edit"
            }),
          },
          {
            name: "Delete",
            permission: 'admin_delete_users',
            serverCommunication: serverCommunicationHelper({
              parameters: parameters,
              apiUrl:constants.crud + constants.users + constants.version,
              requestType: "DELETE",
            }),
            onAction: () => console.log("Button pressed Delete"),
          },
          {
            name: "View",
            permission: 'admin_view_users',
            onAction: () => console.log("Button pressed View"),
            form: generateFormProps({
              parameters: parameters,
              apiUrl: constants.crud+constants.users+constants.version,
              requestType: "GET",
               mode:"view"
            }),
          },
        ],
      },
      bulkAction: {
        add: {
          permission: 'admin_add_users',
          form: generateFormProps({
            parameters: parameters,
            apiUrl: constants.crud + constants.users + constants.version,
            requestType: "POST",
             mode:"create"
          }),
        },
      },

      export: {
        permission: 'admin_export_users',
        serverCommunication: serverCommunicationHelper({
          parameters: parameters,
          apiUrl: "/user/add",
          apiActionType: "hr_user_add",
          requestType: "POST",
          reduxActionType: "hr_user_update",
        }),
        onAction: (e) => console.log("Export Action", e),
        options: {
          formats: ["CSV", "PDF"],
          includeHeaders: true,
          icon: "",
        },
      },
      filter: {
        serverCommunication: serverCommunicationHelper({
          parameters: parameters,
          apiUrl: "/user/view",
          apiActionType: "hr_user_view",
          requestType: "GET",
          reduxActionType: "hr_user_view",
        }),
        permission: 'admin_filter_users',
        onAction: (e) => console.log("Filter Action", e),
        options: {
          filterBy: [
            "users_email",
            "users_firstName",
            "users_lastName",
            "users_phoneNum",
            "users_cnic",
            "users_gender",
            "users_fatherName",
            "users_address",
            "users_dob",
            "users_bloodGroup",
            "users_religion",
            "roleInfo_role",
            "roleInfo_startDate",
            "roleInfo_endDate"
          ]
          ,
          statusOptions: ["active", "inactive"],
        },
        excludeFilter: [],
      },
      sort: {
        permission:'admin_sort_users',
        serverCommunication: serverCommunicationHelper({
          parameters: parameters,
          apiUrl: "/user/view",
          apiActionType: "hr_user_view",
          requestType: "GET",
          reduxActionType: "hr_user_view",
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
        permission:'admin_list_users',
        serverCommunication: serverCommunicationHelper({
          parameters: parameters,
          apiUrl:  constants.crud +
          constants.users +
          constants.version,
          apiActionType: "",
          requestType: "GET",
          reduxActionType: "",
        }),
      },
      search: {
        excludeSearch: ["image"],
        permission: 'admin_search_users',
        serverCommunication: serverCommunicationHelper({
          parameters: parameters,
          apiUrl: "/user/view",
          apiActionType: "hr_user_view",
          requestType: "GET",
          reduxActionType: "hr_user_view",
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
          apiUrl: "/user/view",
          apiActionType: "hr_user_view",
          requestType: "GET",
          reduxActionType: "hr_user_view",
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
      filter: { enable: true, operationalMode: "server",permission:true },
      sort: { enable: true, operationalMode: "server",permission:true },
      search: { enable: true, operationalMode: "server",permission:true },
      pagination: { enable: true, operationalMode: "server" },
      bulkAction: { enable: true, operationalMode: "server" ,permission:true },
      viewModes: { enable: true, operationalMode: "server" },
      grid: { enable: true, operationalMode: "server" },
      colaborator: { enable: false, operationalMode: "server" },
      rowActions: { enable: true, operationalMode: "server",permission:true },
      list: { enable: true, operationalMode: "server" },
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
export default listing_crud_props;
