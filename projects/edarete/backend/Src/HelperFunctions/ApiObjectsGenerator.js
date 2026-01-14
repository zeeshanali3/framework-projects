const logMessage = require("../../Services/SysFunctions/LogFunctions/consoleLog.js");
async function apiObjectGenerator(config, data, response, req) {
  // Determine the operation type (Add, View, Update, Delete) based on `req.method`
  let operation = null;
  switch (req.method) {
    case "POST":
      operation = "Add";
      break;
    case "GET":
      operation = "List";
      break;
    case "PUT":
      operation = "Update";
      break;
    case "DELETE":
      operation = "Delete";
      break;
    default:
      throw new Error(`Unsupported request method: ${req.method}`);
  }
  logMessage(["req.query", req.query]);
  if (req?.query?.id !== undefined && req.method === "GET") {
    operation = "View";
  }

  logMessage(["OPERATION: ", operation]);
  // Initialize a new parameters array
  let updatedParameters = [];
  let temp = [];
  if (operation == "Add" || operation == "Update" || true) {
    //logMessage(["data.parameters", data.parameters]);
    temp = await flattenFieldsFromSteps(data.parameters);
    updatedParameters = [temp || []];
  }
  // logMessage(["updatedParameters", updatedParameters]);
  // Update parameters based on operation
  if (
    operation === "View" ||
    operation === "Update" ||
    operation === "Delete" ||
    operation === "List"
  ) {
    updatedParameters = [
      {
        name: "id",
        validations: [],
        required: operation === "Update" || operation === "Delete", // True for Update/Delete, False for View
        source: "req.query",
      },
    ];

    // For Update, retain existing parameters alongside the added "id"
    if (operation === "Update" || true) {
      updatedParameters = [
        ...updatedParameters,
        ...temp.filter((field) => field.name !== "id"),
      ];
    }
  }

  // Determine the query payload for View based on `id` presence
  let queryPayload = data.apiInfo.query.queryPayload[operation] || "";
  logMessage(["Query Payload Post API Generator Function: ", queryPayload]);

  // Update data inline based on the operation
  const updatedData = {
    ...data,
    parameters: { fields: updatedParameters },
    columnMapper: data?.parameters?.colMapper,
    apiInfo: {
      ...data.apiInfo,
      query: {
        ...data.apiInfo.query,
        queryPayload: queryPayload,
      },
    },
    requestMetaData: {
      ...data.requestMetaData,
      pagination: operation === "Add" ? false : { pageSize: 10 },
      requestMethod: data.requestMetaData.requestMethod
        ? data.requestMetaData.requestMethod[operation] ||
          data.requestMetaData.requestMethod
        : null,
      permission: data.requestMetaData.permission
        ? data.requestMetaData.permission[operation] ||
          data.requestMetaData.permission
        : null,
    },
  };
  //logMessage(["ApiObjectGenerator after modification:", updatedData]);

  return { config, data: updatedData, response };
}

function flattenFieldsFromSteps(data) {
  // Deep clone the input data to avoid mutating the original object
  const clonedData = JSON.parse(JSON.stringify(data || {}));

  // Initialize a single fields array to store all flattened fields
  let allFields = [];

  clonedData?.steps?.forEach((step) => {
    if (step.parameters && step.parameters.fields) {
      const flattened = flattenFields(step.parameters.fields); // Flatten fields for this step
      allFields = allFields.concat(flattened); // Combine with the main fields array
    }
  });
  return allFields; // Return the single unified fields array
}

function flattenFields(fields) {
  let flattenedFields = [];

  const clonedFields = JSON.parse(JSON.stringify(fields));

  clonedFields.forEach((field) => {
    if (field?.type === "section") {
      if (field.childFields && Array.isArray(field.childFields)) {
        flattenedFields = flattenedFields.concat(
          flattenFields(field.childFields)
        );
      }
    } else {
      // Remove the 'name' property and rename 'dynamicKey' to 'name'
      const { dynamicKey, ...rest } = field; // Extract dynamicKey, name, and the rest of the properties
      flattenedFields.push({
        ...rest, // Add all other properties
        name: dynamicKey,
      });
    }
  });

  return flattenedFields;
}

module.exports = apiObjectGenerator;
