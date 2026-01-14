import { parameters } from "./CRUD_parameters.js";
            import generateFormProps  from "../../../../Components/DataLayout/constants/generateFormProps.js";
            import  serverCommunicationHelper from "../../../../Components/DataLayout/constants/serverCommunicationHelper.js";
            export const listing_crud_props = {
                data: {
                features: {
                    parameters: parameters,
                    rowActions: {
                    actions: [
                        {
                        name: "Edit",
                        color: "blue",
                        permission: 'update_timeslots',
                        onAction: () => console.log("Button pressed Edit"),
                        form: generateFormProps({
                            parameters: parameters,
                            apiUrl: "/grouped/cruds/timeslots?version=1.0",
                            requestType: "PUT",
                            mode:"edit"
                        }),
                        },
                        {
                        name: "Delete",
                        color: "red",
                        permission: 'delete_timeslots',
                        serverCommunication: serverCommunicationHelper({
                            parameters: parameters,
                            apiUrl: "/grouped/cruds/timeslots?version=1.0",
                            requestType: "DELETE",
                        }),
                        onAction: () => console.log("Button pressed Delete"),
                        },
                        {
                        name: "View",
                        color: "grey",
                        permission: 'view_timeslots',
                        onAction: () => console.log("Button pressed View"),
                        form: generateFormProps({
                            parameters: parameters,
                            apiUrl: "/grouped/cruds/timeslots?version=1.0",
                            requestType: "GET",
                            mode:"view"
                        }),
                        },
                    ],
                    },
                    bulkAction: {
                    add: {
                        permission:'add_timeslots',
                        form: generateFormProps({
                        parameters: parameters,
                        apiUrl: "/grouped/cruds/timeslots?version=1.0",
                        requestType: "POST",
                        mode:"create"
                        }),
                    },
                    },

                    export: {
                      permission: 'export_timeslots',
                      serverCommunication: serverCommunicationHelper({
                          parameters: parameters,
                          apiUrl: "",
                          apiActionType: "",
                          requestType: "",
                          reduxActionType: "",
                    }),
                    onAction: (e) => console.log("Export Action", e),
                    options: {
                        formats: ["CSV", "PDF", "Excel"],
                        includeHeaders: true,
                        icon: "",
                    },
                    },
                    filter: {
                    permission: 'filter_timeslots',
                    serverCommunication: serverCommunicationHelper({
                        parameters: parameters,
                        apiUrl: "",
                        apiActionType: "",
                        requestType: "",
                        reduxActionType: "",
                    }),
                    onAction: (e) => console.log("Filter Action", e),
                    options: {
                        filterBy: [
                            "timeslots_timeSlotId", "timeslots_startTime", "timeslots_endTime", "timeslots_day", "timeslots_status", "timeslots_createdBy", "timeslots_updatedBy", "timeslots_createdAt", "timeslots_updatedAt"
                        ],
                        statusOptions: ["active", "inactive"],
                    },
                    excludeFilter: [],
                    },
                    sort: {
                    permission: 'sort_timeslots',
                    serverCommunication: serverCommunicationHelper({
                        parameters: parameters,
                        apiUrl: "",
                        apiActionType: "",
                        requestType: "",
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
                    permission:'list_timeslots',
                    serverCommunication: serverCommunicationHelper({
                        parameters: parameters,
                        apiUrl: "/grouped/cruds/timeslots?version=1.0",
                        apiActionType: "",
                        requestType: "GET",
                        reduxActionType: "",
                    }),
                    },
                    search: {
                    permission: 'search_timeslots',
                    excludeSearch: ["image"],
                    serverCommunication: serverCommunicationHelper({
                        parameters: parameters,
                        apiUrl: "",
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
                      permission: false,
                      serverCommunication: serverCommunicationHelper({
                          parameters: parameters,
                          apiUrl: "/crud/timeslots?version=1.0",
                          apiActionType: "timeslots_view",
                          requestType: "GET",
                          reduxActionType: "timeslots_view",
                      }),
                      options: {
                          pageSize: 10,
                          pageSizeOptions: [10, 20, 30 , 50, { label: "All", value: -1 }],
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
                    rowActions: { enable: true, operationalMode: "server" ,permission:true},
                    list: { enable: true, operationalMode: "server" ,permission:true},
                    parameters: { enable: true, operationalMode: "local" },
                },
                },
  appearance: {
        light: {
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
        dark: {
          grid: {
            image: {
              borderColor: "#6C63FF",
            },
            actionButtons: {
              color: "#a5a4c4",
            },
            button: {
              buttonColor: "#6C63FF",
              buttonVarient: "contained",
              buttonTextColor: "#ffffff",
            },
            header: {
              headColor: "#2d2d3d",
              headTextColor: "#c7c6ff",
            },
            cardFont: {
              headingSize: 15,
              headingWeight: 650,
              textSize: 13,
              textWeight: 500,
              heading: "#ffffff",
              color: "#c7c6ff",
            },
          },
        }
      }
            };