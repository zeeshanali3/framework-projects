import { parameters } from "./CRUD_parameters";
import generateFormProps  from "../../../Components/DataLayout/constants/generateFormProps";
import  serverCommunicationHelper from "../../../Components/DataLayout/constants/serverCommunicationHelper";
import constants from "../../../Common/Constants";

const listing_crud_props = {
  data: {
    features: {
      parameters: parameters,
      rowActions: {
        actions: [
          {
            name: "Edit",
            permission: 'admin_update_roles',
            onAction: () => console.log("Button pressed Edit"),
            form: generateFormProps({
              parameters: parameters,
              apiUrl: constants.crud +
              constants.roles +
              constants.version,
              requestType: "PUT",
              mode:"edit"
            }),
          },
          {
            name: "Delete",
            permission: 'admin_delete_roles',
            serverCommunication: serverCommunicationHelper({
              parameters: parameters,
              apiUrl:constants.crud + constants.roles + constants.version,
              requestType: "DELETE",
            }),
            onAction: () => console.log("Button pressed Delete"),
          },
          {
            name: "View",
            permission: 'admin_view_roles',
            onAction: () => console.log("Button pressed View"),
            form: generateFormProps({
              parameters: parameters,
              apiUrl: constants.crud+constants.roles+constants.version,
              requestType: "GET",
               mode:"view"
            }),
          },
        ],
      },
      bulkAction: {
        add: {
          permission: 'admin_add_roles',
          form: generateFormProps({
            parameters: parameters,
            apiUrl: constants.crud + constants.roles + constants.version,
            requestType: "POST",
             mode:"create"
          }),
        },
      },

      export: {
        permission: 'admin_export_roles',
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
        permission: 'admin_filter_roles',
        serverCommunication: serverCommunicationHelper({
          parameters: parameters,
          apiUrl: "/user/view",
          apiActionType: "hr_user_view",
          requestType: "GET",
          reduxActionType: "hr_user_view",
        }),
        onAction: (e) => console.log("Filter Action", e),
        options: {
          filterBy: [
            "roles_roleId",
            "roles_roleName",
            "roles_seniorRoleName",
            "roles_seniorRoleId",
            "roles_status",
            "roles_updatedBy",
            "roles_createdAt",
            "roles_updatedAt"
          ],
          statusOptions: ["active", "inactive"],
        },
        excludeFilter: [],
      },
      sort: {
        permission: 'admin_sort_roles',
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
        permission:'admin_list_roles',
        serverCommunication: serverCommunicationHelper({
          parameters: parameters,
          apiUrl:  constants.crud +
          constants.roles +
          constants.version,
          apiActionType: "",
          requestType: "GET",
          reduxActionType: "",
        }),
      },
      search: {
        permission: 'admin_search_roles',
        excludeSearch: ["image"],
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
      export: { enable: true, operationalMode: "server" ,permission:true},
      filter: { enable: true, operationalMode: "server",permission:true },
      sort: { enable: true, operationalMode: "server" ,permission:true},
      search: { enable: true, operationalMode: "server" ,permission:true},
      pagination: { enable: true, operationalMode: "server" },
      bulkAction: { enable: true, operationalMode: "server",permission:true },
      viewModes: { enable: true, operationalMode: "server" },
      grid: { enable: true, operationalMode: "server" },
      colaborator: { enable: false, operationalMode: "server" },
      rowActions: { enable: true, operationalMode: "server" ,permission:true},
      list: { enable: true, operationalMode: "server",permission:true },
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
