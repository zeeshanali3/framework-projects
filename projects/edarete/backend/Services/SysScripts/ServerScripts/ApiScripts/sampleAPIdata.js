const sampleApiData = [
    {
      id: 'inventory',
      name: "Inventory",
      type: "folder",
      children: [
        {
          id: 'login-apis',
          name: "Login APIs",
          type: "subfolder",
          children: [
            {
              id: uuidv4(),
              name: "User Login",
              url: "/api/auth/login", 
              method: "POST",
              headers: [{ key: "Content-Type", value: "application/json" }],
              body: {"username": "", "password": ""},
              description: "Authenticate user credentials"
            },
            {
              id: uuidv4(),
              name: "Refresh Token",
              url: "/api/auth/refresh",
              method: "GET",
              headers: [{ key: "Authorization", value: "Bearer {token}" }],
              body: "",
              description: "Refresh authentication token"
            }
          ]
        },
        {
          id: 'dashboard-apis',
          name: "Dashboard APIs",
          type: "subfolder",
          children: [
            {
              id: uuidv4(),
              name: "Summary Statistics",
              url: "/api/dashboard/stats",
              method: "GET",
              headers: [],
              body: "",
              description: "Get dashboard summary statistics"
            },
            {
              id: uuidv4(),
              name: "Recent Activities",
              url: "/api/dashboard/activities",
              method: "GET",
              headers: [],
              body: "",
              description: "Get recent user activities"
            }
          ]
        }
      ]
    },
    {
      id: 'product',
      name: "Product Management",
      type: "folder",
      children: [
        {
          id: uuidv4(),
          name: "List Products",
          url: "/api/products",
          method: "GET",
          headers: [],
          body: "",
          description: "Get all products"
        },
        {
          id: uuidv4(),
          name: "Create Product",
          url: "/api/products",
          method: "POST",
          headers: [{ key: "Content-Type", value: "application/json" }],
          body: {"name": "", "price": 0, "stock": 0},
          description: "Create new product"
        }
      ]
    },
  ];