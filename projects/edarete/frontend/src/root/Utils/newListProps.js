export const newListProps = {
  data: {
    features: {
      parameters: {
        fields: [
          {
            name: "presentation",
            displayName: "departmentName",
            visible: true,
            dynamicKey: "presentation",
          },
        ],
      },
      rowActions: {
        actions: [
          {
            name: "Edit",
            permissions: "admin_edit_users",
            onAction: "",
            actionType: "form",
            serverCommunication: {
              apiUrl: "https://test.com",
              apiActionType: "",
              reduxActionType: "",
            },
            fileName: "tempFile",
            dynamicKey: "Edit",
          },
        ],
      },
      export: {
        serverCommunication: {
          apiUrl: "https://test.com",
          apiActionType: "",
          reduxActionType: "",
        },
        permission: "fasfdsa",
        onSuccess: "console.log('Export successful!')",
        onFailure: "console.log('Export failed: '.concat(e.message))",
      },
      filter: {
        serverCommunication: {
          apiUrl: "https://test.com",
          apiActionType: "",
          reduxActionType: "",
        },
        permission: "fasfdsa",
        excludeFilter: "",
      },
      sort: {
        serverCommunication: {
          apiUrl: "https://test.com",
          apiActionType: "",
          reduxActionType: "",
        },
        permission: "",
        onAction: "(res)=>{console.log('Sort Action', res)}",
        options: {
          defaultSortOrder: "asc",
          multiColumnSort: true,
        },
        excludeSort: "['image']",
      },
      list: {
        permission: "",
        serverCommunication: {
          apiUrl: "https://test.com",
          apiActionType: "",
          reduxActionType: "",
        },
      },
      pagination: {
        permission: "fasfdsa",
        serverCommunication: {
          apiUrl: "https://test.com",
          apiActionType: "",
          reduxActionType: "",
        },
        onAction: "(res)=>{console.log('Pagination Action', res)}",
      },
      search: {
        permission: "fasfdsa",
      },
    },
  },
  config: {
    viewMode: {
      presentation: ["Table"],
    },
    features: {
      export: {
        enable: true,
        operationalMode: "server",
        permission: true,
      },
      filter: {
        enable: true,
        operationalMode: "server",
        permission: true,
      },
      sort: {
        enable: true,
        operationalMode: "server",
        permission: true,
      },
      search: {
        enable: true,
        operationalMode: "server",
        permission: true,
      },
      pagination: {
        enable: true,
        operationalMode: "server",
        permission: true,
      },
      bulkAction: {
        enable: true,
        operationalMode: "server",
        permission: true,
      },
      grid: {
        enable: true,
        operationalMode: "server",
        permission: true,
      },
      colaborator: {
        enable: true,
        operationalMode: "server",
        permission: true,
      },
      rowActions: {
        enable: true,
        operationalMode: "server",
        permission: true,
      },
      list: {
        enable: true,
        operationalMode: "server",
        permission: true,
      },
      parameters: {
        enable: true,
        operationalMode: "server",
        permission: true,
      },
    },
  },
  appearance: {},
};
