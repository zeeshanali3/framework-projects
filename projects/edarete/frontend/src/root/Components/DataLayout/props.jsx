import { Edit, Delete, Cloud } from "@mui/icons-material";

export const data = {
  features: {
    rowActions: {
      actions: [
        {
          name: "Edit",
          serverCommunication: {
            data: {
              parameters: {
                fields: [
                  { name: "Id", required: true, validation: {} },
                  { name: "Name", required: true, validation: {} },
                  { name: "Email", required: true, validation: {} },
                ],
              },
              sagaCommunication: {
                apiActionType: "<Action>",
                permission: true,
                requestType: "POST",
                apiUrl: "https://api.example.com/export",
                metaData: true,
                body: {},
                reduxActionType: "<Action>",
                onSuccess: (res) => console.log("Success:", res),
                onFailure: (err) => console.log("Error:", err),
              },
            },
            config: {
              features: {
                tokenAuthentication: true,
                permission: true,
              },
            },
            response: {},
          },
          permission: true,
          onAction: () => console.log("Button pressed Edit"),
          options: {
            icon: (color) => {
              return (
                <Edit
                  fontSize="10"
                  sx={{
                    color: color,
                  }}
                />
              );
            },
            backgroundColor: "#757fef",
            color: "#fff",
          },
        },
        {
          name: "Delete",
          permission: true,
          serverCommunication: {
            data: {
              parameters: {
                fields: [
                  { name: "Id", required: true, validation: {} },
                  { name: "Name", required: true, validation: {} },
                  { name: "Email", required: true, validation: {} },
                ],
              },
              sagaCommunication: {
                apiActionType: "<Action>",
                permission: true,
                requestType: "POST",
                apiUrl: "https://api.example.com/export",
                metaData: true,
                body: {},
                reduxActionType: "<Action>",
                onSuccess: (res) => console.log("Success:", res),
                onFailure: (err) => console.log("Error:", err),
              },
            },
            config: {
              features: {
                tokenAuthentication: true,
                permission: true,
              },
            },
            response: {},
          },
          onAction: () => console.log("Button pressed Delete"),
          options: {
            icon: (color) => {
              return (
                <Delete
                  fontSize="10"
                  sx={{
                    color: color,
                  }}
                />
              );
            },
            backgroundColor: "#ee368c",
            color: "#fff",
          },
        },
        {
          name: "Cloud",
          permission: true,
          serverCommunication: {
            data: {
              parameters: {
                fields: [
                  { name: "Id", required: true, validation: {} },
                  { name: "Name", required: true, validation: {} },
                  { name: "Email", required: true, validation: {} },
                ],
              },
              sagaCommunication: {
                apiActionType: "<Action>",
                permission: true,
                requestType: "POST",
                apiUrl: "https://api.example.com/export",
                metaData: true,
                body: {},
                reduxActionType: "<Action>",
                onSuccess: (res) => console.log("Success:", res),
                onFailure: (err) => console.log("Error:", err),
              },
            },
            config: {
              features: {
                tokenAuthentication: true,
                permission: true,
              },
            },
            response: {},
          },
          onAction: () => console.log("Button pressed Cloud"),
          options: {
            icon: (color) => {
              return (
                <Cloud
                  fontSize="10"
                  sx={{
                    color: color,
                  }}
                />
              );
            },
            backgroundColor: "#ee6c4d",
            color: "#fff",
          },
        },
      ],
    },
    export: {
      serverCommunication: null,
      parameters: null,
      permission: true,
      onAction: console.log,
      options: {
        formats: ["CSV", "PDF"],
        includeHeaders: true,
        icon: "",
      },
      onSuccess: "console.log('Export successful!')",
      onFailure: "console.log('Export failed: '.concat(e.message))",
    },
    filter: {
      parameters: {},
      serverCommunication: null,
      permission: true,
      onAction: console.log,
      options: {
        // filterBy: ["componentID", "Name"],
        statusOptions: ["active", "inactive"],
      },
      excludeFilter: [],
    },
    sort: {
      serverCommunication: null,
      parameters: null,
      permission: true,
      onAction: console.log,
      options: {
        defaultSortField: "ComponentID",
        defaultSortOrder: "asc",
        multiColumnSort: true,
      },
      excludeSort: [],
    },
    list: {
      serverCommunication: {
        data: {
          parameters: {
            fields: [
              { name: "Id", required: true, validation: {} },
              { name: "Name", required: true, validation: {} },
              { name: "Email", required: true, validation: {} },
            ],
          },
          sagaCommunication: {
            apiActionType: "EXPORT_DATA",
            permission: true,
            requestType: "POST",
            apiUrl: "https://api.example.com/export",
            metaData: true,
            body: {},
            reduxActionType: "EXPORT_DATA",
            onSuccess: (res) => console.log("Success:", res),
            onFailure: (err) => console.log("Error:", err),
          },
        },
        config: {
          features: {
            tokenAuthentication: true,
            permission: true,
          },
        },
        response: {},
      },

      parameters: {
        autoWidth: false,
        minWidth: 150,
        fields: [
          //* The new Headers
          {
            type: "text",
            name: "ComponentID", //! change it to name
            label: "ID", //! change it to label
            width: 100,
            visible: true, //! change it to something like card visibility
            isImage: false,
            // !add type
          },
          {
            type: "text",
            name: "email", //! change it to name
            label: "Email", //! change it to label
            width: 250,
            visible: true, //! change it to something like card visibility
            isImage: false,
            // !add type
          },
          {
            type: "text",
            name: "name",
            label: "Name",
            width: 150,
            visible: true,
          },
          {
            type: "text",
            name: "last_login",
            label: "Last Login",
            width: 200,
            visible: true,
          },

          {
            type: "text",
            name: "status",
            label: "Status",
            width: 130,
            visible: true,
          },
          {
            type: "text",
            name: "phone_no",
            label: "Phone Number",
            width: 200,
            visible: true,
          },
          {
            type: "text",
            name: "created_at",
            label: "Created At",
            width: 250,
            visible: true,
          },
          {
            type: "text",
            name: "updated_at",
            label: "Updated At",
            width: 250,
            visible: true,
          },
        ],

        data: [
          {
            ComponentID: 1,
            email: "john.doe@example.com",
            name: "John Doe",
            last_login: "2023-10-10T14:30:00Z",
            status: "Active",
            phone_no: "+1234567890",
            created_at: "2021-05-15T10:00:00Z",
            updated_at: "2023-10-01T09:00:00Z",
          },
          {
            ComponentID: 2,

            email: "jane.smith@example.com",
            name: "Jane Smith",
            last_login: "2023-10-09T08:15:00Z",
            status: "Inactive",
            phone_no: "+0987654321",
            created_at: "2020-08-20T11:30:00Z",
            updated_at: "2023-09-25T12:45:00Z",
          },
          {
            ComponentID: 3,
            email: "alice.johnson@example.com",
            name: "Alice Johnson",
            last_login: "2023-10-08T16:45:00Z",
            status: "Active",
            phone_no: "+1122334455",
            created_at: "2022-01-10T09:15:00Z",
            updated_at: "2023-10-02T14:20:00Z",
          },
          {
            ComponentID: 4,
            email: "bob.brown@example.com",
            name: "Bob Brown",
            last_login: "2023-10-07T11:00:00Z",
            status: "Suspended",
            phone_no: "+2233445566",
            created_at: "2019-12-05T08:30:00Z",
            updated_at: "2023-09-30T15:00:00Z",
          },
          {
            ComponentID: 5,
            email: "charlie.white@example.com",
            name: "Charlie White",
            last_login: "2023-10-06T17:00:00Z",
            status: "Active",
            phone_no: "+3344556677",
            created_at: "2021-03-12T14:00:00Z",
            updated_at: "2023-10-03T10:30:00Z",
          },
          {
            ComponentID: 6,
            email: "david.green@example.com",
            name: "David Green",
            last_login: "2023-10-05T12:00:00Z",
            status: "Active",
            phone_no: "+4455667788",
            created_at: "2021-07-25T09:45:00Z",
            updated_at: "2023-09-29T11:15:00Z",
          },
          {
            ComponentID: 7,
            email: "emma.adams@example.com",
            name: "Emma Adams",
            last_login: "2023-10-04T15:30:00Z",
            status: "Inactive",
            phone_no: "+5566778899",
            created_at: "2020-11-30T10:20:00Z",
            updated_at: "2023-09-28T13:00:00Z",
          },
          {
            ComponentID: 8,
            email: "frank.miller@example.com",
            name: "Frank Miller",
            last_login: "2023-10-03T09:00:00Z",
            status: "Active",
            phone_no: "+6677889900",
            created_at: "2022-02-15T08:10:00Z",
            updated_at: "2023-10-01T14:50:00Z",
          },
          {
            ComponentID: 9,
            email: "grace.lee@example.com",
            name: "Grace Lee",
            last_login: "2023-10-02T11:20:00Z",
            status: "Suspended",
            phone_no: "+7788990011",
            created_at: "2019-09-05T07:30:00Z",
            updated_at: "2023-09-27T16:25:00Z",
          },
          {
            ComponentID: 10,
            email: "henry.jones@example.com",
            name: "Henry Jones",
            last_login: "2023-10-01T13:40:00Z",
            status: "Active",
            phone_no: "+8899001122",
            created_at: "2021-04-22T12:00:00Z",
            updated_at: "2023-09-26T10:15:00Z",
          },
          {
            ComponentID: 11,
            email: "isabella.brown@example.com",
            name: "Isabella Brown",
            last_login: "2023-09-30T15:00:00Z",
            status: "Inactive",
            phone_no: "+9900112233",
            created_at: "2020-02-14T10:00:00Z",
            updated_at: "2023-09-20T09:00:00Z",
          },
        ],
      },
      permission: true,
      onAction: "console.log('')",
      options: {
        columns: ["Name", "Email", "Status", "Actions"],
      },
    },
    colaborator: {
      rowSacing: "",
      contributors: [
        {
          name: "Usama Bin Shakeel",
          role: "Supervisor",
          designation: "Teacher",
          email: "ubs@itu.edu.pk",
          description:
            "Supervisor for FYP on the University management system ",
          image: "/Inventory/Images/UBS.png",
        },
        {
          name: "Sarfraz Raza",
          role: "Co Supervisor",
          designation: "Teacher",
          email: "sarfraz.raza@itu.edu.pk",
          description:
            "Co-Supervisor for FYP on the  University management system",
          image: "/Inventory/Images/Sarfraz_Raza.png",
        },
        {
          name: "Afaq Khawar",
          role: "Developer",
          designation: "Student",
          email: "bsce21026@itu.edu.pk",
          description: "Doing FYP on university management system",
          image: "/afaq_Inventory.png",
        },
        {
          name: "Muhammad Raza Dastagir",
          role: "Developer",
          designation: "Student",
          email: "bsce21021@itu.edu.pk",
          description: "Doing FYP on university management system",
          image: "/raza_Inventory.png",
        },

        {
          name: "Awais Fayyaz",
          role: "Stakeholder",
          designation: "IT department",
          email: "awais.fayyaz@itu.edu.pk",
          description: "Maintaining the inventory system",
          image: "/awais_Inventory.png",
        },
        {
          name: "Usman Saleem ",
          role: "Stakeholder",
          designation: "Head of HR department",
          email: "usman.saleem@itu.edu.pk",
          description: "Controlling the HR department",
          image: "/Usman_Inventory.png",
        },
      ],
    },
    pagination: {
      parameters: null,
      permission: "<data>",
      serverCommunication: null,
      options: {
        pageSize: 4,
        pageSizeOptions: [4, 5, 10, 20, { label: "All", value: -1 }],
      },
      onAction: console.log,
    },
    bulkAction: {
      parameters: {
        fields: [
          { name: "Id", required: true, visibility: false, validation: {} },
          { name: "Name", required: true, visibility: true, validation: {} },
          { name: "Email", required: true, visibility: true, validation: {} },
        ],
      },
      permission: true,
      serverCommunication: {
        data: {
          parameters: {
            fields: [
              { name: "Id", required: true, validation: {} },
              { name: "Name", required: true, validation: {} },
              { name: "Email", required: true, validation: {} },
            ],
          },
          sagaCommunication: {
            apiActionType: "<Action>",
            permission: true,
            requestType: "POST",
            apiUrl: "https://api.example.com/export",
            metaData: true,
            body: {},
            reduxActionType: "<Action>",
            onSuccess: (res) => console.log("Success:", res),
            onFailure: (err) => console.log("Error:", err),
          },
        },
        config: {
          features: {
            tokenAuthentication: true,
            permission: true,
          },
        },
        response: {},
      },
      options: {
        actions: ["Delete", "Archive"],
      },
      onAction: "console.log('')",
    },
    search: {
      excludeSearch: ["image"],
    },
    grid: {
      entitiesPerRow: 2,
      buttonEnable: true,
      checkBoxEnable: true,
      actionButtonEnable: true,
    },
  },
};

export const config = {
  viewMode: {
    presentation: ["Grid", "Table"],
  },
  features: {
    export: true,
    filter: true,
    sort: true,
    search: true,
    pagination: true,
    bulkAction: true,
    viewModes: true,
    grid: true,
    colaborator: false,
    actionButtonEnabled: false,
  },
};

export const appearance = {
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
    appBarColor: "#F8FAFE",
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
      buttonTextColor: "#ffffff", //optional
    },
    header: {
      headColor: "#e5e5e5",
      headTextColor: "#260143",
    },
    cardFont: {
      headingSize: 15, // default admash font size
      headingWeight: 650,
      textSize: 13, // default admash font size
      textWeight: 500, // default weight
      heading: "#260143",
      color: "#5a5897",
    },
  },
  colaborator: {
    colaboratorAppearance: [
      { type: "nameColor", color: "" },
      { type: "roleColor", color: "" },
      { type: "designationColor", color: "" },
      { type: "emailColor", color: "" },
      { type: "descriptionColor", color: "" },
    ],
  },
};
