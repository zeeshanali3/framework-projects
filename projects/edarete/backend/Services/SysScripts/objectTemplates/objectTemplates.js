const logMessage = require("../../SysFunctions/LogFunctions/consoleLog.js");
const generateFormProps = require("../jsonTranslate/generateFormProjs");
const serverCommunicationHelper = require("../jsonTranslate/serverCommunicationHelper");
const capitalizeFirstLetter = (string) =>
  string.charAt(0).toUpperCase() + string.slice(1);

const snakeToCamel = (str) => {
  return str?.replace(/_([a-z])/g, (match, group1) => group1.toUpperCase());
};
const lowerSnakeToCamel = (str) => {
  return str
    .replace(/_([a-z])/g, (match, group1) => group1.toUpperCase())
    .replace(/^([A-Z])/, (match) => match?.toLowerCase());
};

function snakeToSeparatedWords(snakeCaseStr) {
  return snakeCaseStr
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function genParameters(table, columns, allColumns, analysis, apiUrl) {
  return `{
                                              "name": "id",
                                              "label": "id",
                                              "title": "",
                                              "type": "textField",
                                              "required": false,
                                              "hideInCreateForm": true,
                                              "hideInViewForm" : true,
                                              "visible": true,
                                              "disabled": false,
                                              "dependancyCheck": false,
                                              "isPrefilled": false,
                                              "source": "req.query",
                                              "min": "",
                                              "max": "",
                                              "selectServer": false,
                                              "dynamicKey": "id"
                                            },
                                            ${columns
                                              .filter(
                                                (col) =>
                                                  ![
                                                    "status",
                                                    "created_at",
                                                    "updated_at",
                                                    "created_by",
                                                    "updated_by",
                                                    columns.find(
                                                      (col) =>
                                                        col.COLUMN_KEY === "PRI"
                                                    )?.COLUMN_NAME,
                                                  ].includes(col.COLUMN_NAME) &&
                                                  !col.REFERENCED_TABLE_NAME &&
                                                  col.DATA_TYPE != "datetime" &&
                                                  !col.NAME_COLUMN
                                              )
                                              .map(
                                                (col) => `
                                                ,
                                                {
                                                    "name": "${lowerSnakeToCamel(
                                                      col.COLUMN_NAME
                                                    )}",
                                                    "label": "${snakeToSeparatedWords(
                                                      col.COLUMN_NAME
                                                    )}",
                                                    "title": "",
                                                    "type": "${
                                                      col.DATA_TYPE == "enum"
                                                        ? "select"
                                                        : col.DATA_TYPE ==
                                                          "tinyint"
                                                        ? "checkbox"
                                                        : col.DATA_TYPE == "int"
                                                        ? "number"
                                                        : "textField"
                                                    }",
                                                    "required": ${
                                                      col.IS_NULLABLE == "YES"
                                                        ? false
                                                        : true
                                                    },
                                                    "hideInCreateForm": false,
                                                    "visible": true,
                                                    "disabled": false,
                                                    "dependancyCheck": false,
                                                    "isPrefilled": false,
                                                    "source": "req.body",
                                                    "min": "",
                                                    "max": "",
                                                    "validations": [],
                                                    "selectServer": false,
                                                    "dynamicKey": "${snakeToCamel(
                                                      table
                                                    )}_${lowerSnakeToCamel(
                                                  col.COLUMN_NAME
                                                )}",
                                                    "alias" : "${table}.${
                                                  col.COLUMN_NAME
                                                }",
                                                    "options": ${JSON.stringify(
                                                      col.DATA_TYPE == "enum"
                                                        ? col.COLUMN_TYPE.match(
                                                            /enum\((.+)\)/
                                                          )[1]
                                                            .split(",")
                                                            .map((v) =>
                                                              v
                                                                .trim()
                                                                .replace(
                                                                  /^'(.*)'$/,
                                                                  "$1"
                                                                )
                                                            )
                                                            .map((v) => ({
                                                              value: v,
                                                              label: v,
                                                            }))
                                                        : "[]"
                                                    )}
  
                                                }`
                                              )}
                                            ${columns
                                              .filter(
                                                (col) =>
                                                  ![
                                                    "status",
                                                    "created_at",
                                                    "updated_at",
                                                    "created_by",
                                                    "updated_by",
                                                    columns.find(
                                                      (col) =>
                                                        col.COLUMN_KEY === "PRI"
                                                    )?.COLUMN_NAME,
                                                  ].includes(col.COLUMN_NAME) &&
                                                  !col.REFERENCED_TABLE_NAME &&
                                                  col.DATA_TYPE != "datetime" &&
                                                  col.NAME_COLUMN
                                              )
                                              .map(
                                                (col) => `
                                                ,
                                                {
                                                    "name": "${lowerSnakeToCamel(
                                                      col.COLUMN_NAME
                                                    )}",
                                                    "label": "${snakeToSeparatedWords(
                                                      col.COLUMN_NAME
                                                    )}",
                                                    "title": "",
                                                    "type": "${
                                                      col.DATA_TYPE == "enum"
                                                        ? "select"
                                                        : col.DATA_TYPE ==
                                                          "tinyint"
                                                        ? "checkbox"
                                                        : col.DATA_TYPE == "int"
                                                        ? "number"
                                                        : "textField"
                                                    }",
                                                    "required": ${
                                                      col.IS_NULLABLE == "YES"
                                                        ? false
                                                        : true
                                                    },
                                                    "hideInCreateForm": true,
                                                    "visible": true,
                                                    "disabled": false,
                                                    "dependancyCheck": false,
                                                    "isPrefilled": false,
                                                    "source": "req.body",
                                                    "min": "",
                                                    "max": "",
                                                    "validations": [],
                                                    "selectServer": false,
                                                    "dynamicKey": "${snakeToCamel(
                                                      col.NAME_COLUMN
                                                    )}_${lowerSnakeToCamel(
                                                  col.COLUMN_NAME
                                                )}",
                                                    "alias" : "${
                                                      col.NAME_COLUMN
                                                    }.${col.COLUMN_NAME}",
                                                    "options": [ ${JSON.stringify(
                                                      col.DATA_TYPE == "enum"
                                                        ? col.COLUMN_TYPE.match(
                                                            /enum\((.+)\)/
                                                          )[1]
                                                            .split(",")
                                                            .map((v) =>
                                                              v
                                                                .trim()
                                                                .replace(
                                                                  /^'(.*)'$/,
                                                                  "$1"
                                                                )
                                                            )
                                                            .map((v) => ({
                                                              value: v,
                                                              label: v,
                                                            }))
                                                        : ""
                                                    )}]
  
                                                }`
                                              )}
                                            ,
                                                {
                                                  "type": "tableOfFields",
                                                  "name": "${snakeToCamel(
                                                    table
                                                  )}",
                                                  "label": "Add ${snakeToSeparatedWords(
                                                    table
                                                  )}",
                                                  "hideInCreateForm": ${!(
                                                    !analysis[table]
                                                      ?.UniqueTable &&
                                                    table != "tasks"
                                                  )},
                                                 "selectServerUrl":"${apiUrl}",
                                                  "hideInViewForm": false,
                                                  "title": "Select ${snakeToSeparatedWords(
                                                    table
                                                  )}",
                                                  "dependancyCheck": false,
                                                  "childFields": [
                                                  {
                                                  "name": "${snakeToCamel(
                                                    table
                                                  )}", 
                                                  "type": "section",
                                                  "hideInCreateForm": false,
                                                  "visible": true,
                                                  "required": false,
                                                  "disabled": false,
                                                  "validations": "",
                                                  "dependancyCheck": false,
                                                  "isPrefilled": false,
                                                  "source": "req.body",
                                                  "title": "${snakeToSeparatedWords(
                                                    table
                                                  )}",
                                                  "childFields":[
                                                
                                                  ${columns
                                                    .filter((col) => {
                                                      // logMessage([//   "BASE_TABLE:",
                                                      //   col,
                                                      //   "REFERENCED_TABLE_NAME:",
                                                      //   col.REFERENCED_TABLE_NAME,
                                                      //   "REFERENCED_COLUMN_NAME:",
                                                      //   col.REFERENCED_COLUMN_NAME,
                                                      //   "Table Name:",
                                                      //   table,
                                                      //   "  12313 ",
                                                      //   col.REFERENCED_TABLE_NAME ||
                                                      //     col.REFERENCED_TABLE_NAME ==
                                                      //       null
                                                      //]);
                                                      return (
                                                        ![
                                                          "status",
                                                          "created_at",
                                                          "updated_at",
                                                          "created_by",
                                                          "updatedBy",
                                                          "updated_by",
                                                          columns.find(
                                                            (col) =>
                                                              col.COLUMN_KEY ===
                                                              "PRI"
                                                          )?.COLUMN_NAME,
                                                        ].includes(
                                                          col.COLUMN_NAME
                                                        ) &&
                                                        col.REFERENCED_TABLE_NAME &&
                                                        !analysis[table]
                                                          ?.UniqueTable &&
                                                        table != "tasks"
                                                      );
                                                    })

                                                    .map((col) => {
                                                      return col.REFERENCED_TABLE_NAME ==
                                                        "attachments"
                                                        ? `
                                                    ,
                                                    {
                                                      "name": "attachmentId",
                                                      "label": "Attachment",
                                                      "title": "",
                                                      "type": "file",
                                                      "required": false,
                                                      "isMultiple" : false,
                                                      "hideInCreateForm": false,
                                                      "hideInViewForm": false,
                                                      "fetchSubmitUrl": "/get/file/url/local?step=1",
                                                      "getFileUrl": "/get/file?step=1&token=",
                                                      "visible": true,
                                                      "disabled": false,
                                                      "dependancyCheck": false,
                                                      "isPrefilled": false,
                                                      "source": "req.body",
                                                      "min": "",
                                                      "max": "",
                                                      "validations": [],
                                                      "dynamicKey" : "${snakeToCamel(
                                                        table
                                                      )}_${lowerSnakeToCamel(
                                                            col.COLUMN_NAME
                                                          )}",
                                                      "selectServer": false,
                                                      "alias" : "${snakeToCamel(
                                                        table
                                                      )}.${lowerSnakeToCamel(
                                                            col.COLUMN_NAME
                                                          )}"
                                                    }
                                                    `
                                                        : `
                                                    ,
                                                    {
                                                        "name": "${lowerSnakeToCamel(
                                                          col.COLUMN_NAME
                                                        )}",
                                                        "label": "${snakeToSeparatedWords(
                                                          col.COLUMN_NAME
                                                        )}",
                                                        "title": "",
                                                        "type": "${
                                                          col.REFERENCED_TABLE_NAME ||
                                                          col.DATA_TYPE ==
                                                            "enum"
                                                            ? "select"
                                                            : col.DATA_TYPE ==
                                                              "tinyint"
                                                            ? "checkbox"
                                                            : col.DATA_TYPE ==
                                                              "int"
                                                            ? "number"
                                                            : "textField"
                                                        }",
                                                    "required": ${
                                                      col.IS_NULLABLE == "YES"
                                                        ? false
                                                        : true
                                                    },
                                                        "hideInCreateForm": false,
                                                        "hideInViewForm": true,
                                                        "visible": false,
                                                        "disabled": false,
                                                        "dependancyCheck": false,
                                                        "isPrefilled": false,
                                                        "source": "req.body",
                                                        "min": "",
                                                        "max": "",
                                                        "validations": [],
                                                        "selectServer": ${
                                                          col.REFERENCED_TABLE_NAME
                                                            ? true
                                                            : false
                                                        },
                                                        "dynamicKey": "${snakeToCamel(
                                                          table
                                                        )}_${lowerSnakeToCamel(
                                                            col.COLUMN_NAME
                                                          )}",
                                                        "selectServerUrl": ${
                                                          col.REFERENCED_TABLE_NAME
                                                            ? `"/${col.REFERENCED_TABLE_NAME}/dropdown?version=1.0"`
                                                            : false
                                                        },
                                                        "alias" : "${table}.${
                                                            col.COLUMN_NAME
                                                          }"
                                                    },
                                                     {
                                                        "name": "${lowerSnakeToCamel(
                                                          col.REFERENCED_TABLE_NAME
                                                        )}Name",
                                                        "label": "${snakeToSeparatedWords(
                                                          col.REFERENCED_TABLE_NAME
                                                        )}Name",
                                                        "title": "",
                                                        "type": "textField",
                                                    "required": ${
                                                      col.IS_NULLABLE == "YES"
                                                        ? false
                                                        : true
                                                    },
                                                        "hideInCreateForm": true,
                                                        "hideInViewForm": true,
                                                        "visible": true,
                                                        "disabled": false,
                                                        "dependancyCheck": false,
                                                        "isPrefilled": false,
                                                        "source": "req.body",
                                                        "min": "",
                                                        "max": "",
                                                        "validations": [],
                                                        "selectServer": ${
                                                          col.REFERENCED_TABLE_NAME
                                                            ? true
                                                            : false
                                                        },
                                                        "dynamicKey": "${snakeToCamel(
                                                          table
                                                        )}_${lowerSnakeToCamel(
                                                            col.REFERENCED_TABLE_NAME
                                                          )}Name",
                                                        "selectServerUrl": ${
                                                          col.REFERENCED_TABLE_NAME
                                                            ? `"/${col.REFERENCED_TABLE_NAME}/dropdown?version=1.0"`
                                                            : false
                                                        },
                                                        "alias" : "${table}.${
                                                            col.REFERENCED_TABLE_NAME
                                                          }Name"
                                                    }
                                                    `;
                                                    })}



 ${columns
   .filter(
     (col) =>
       col.DATA_TYPE == "datetime" &&
       !["created_at", "updated_at"].includes(col.COLUMN_NAME)
   )
   .map(
     (col) => `
                                                ,
                                              {
                                                  "name": "${lowerSnakeToCamel(
                                                    col.COLUMN_NAME
                                                  )}",
                                                  "label": "${snakeToSeparatedWords(
                                                    col.COLUMN_NAME
                                                  )}",
                                                  "title": "",
                                                  "type": "dateTime",
                                                    "required": ${
                                                      col.IS_NULLABLE == "YES"
                                                        ? false
                                                        : true
                                                    },
                                                  "hideInCreateForm": false,
                                                  "visible": true,
                                                  "disabled": false,
                                                  "dependancyCheck": false,
                                                  "isPrefilled": false,
                                                  "source": "req.body",
                                                  "min": "",
                                                  "max": "",
                                                  "validations": [],
                                                  "selectServer": false,
                                                  "dynamicKey": "${snakeToCamel(
                                                    table
                                                  )}_${lowerSnakeToCamel(
       col.COLUMN_NAME
     )}"
                                              }`
   )}
                                                ]
                                              }
                                            ${columns
                                              .filter(
                                                (col) =>
                                                  ![
                                                    "status",
                                                    "created_at",
                                                    "updated_at",
                                                    "created_by",
                                                    "updatedBy",
                                                    "updated_by",
                                                    columns.find(
                                                      (col) =>
                                                        col.COLUMN_KEY === "PRI"
                                                    )?.COLUMN_NAME,
                                                  ].includes(col.COLUMN_NAME) &&
                                                  col.REFERENCED_TABLE_NAME &&
                                                  (analysis[table]
                                                    ?.UniqueTable ||
                                                    table == "tasks")
                                              )
                                              .map((col) => {
                                                return col.REFERENCED_TABLE_NAME ==
                                                  "attachments"
                                                  ? `
                                                    ,
                                                    {
                                                      "name": "attachmentId",
                                                      "label": "Attachment",
                                                      "title": "",
                                                      "type": "file",
                                                      "required": false,
                                                      "isMultiple" : false,
                                                      "hideInCreateForm": false,
                                                      "hideInViewForm": false,
                                                      "fetchSubmitUrl": "/get/file/url/local?step=1",
                                                      "getFileUrl": "/get/file?step=1&token=",
                                                      "visible": true,
                                                      "disabled": false,
                                                      "dependancyCheck": false,
                                                      "isPrefilled": false,
                                                      "source": "req.body",
                                                      "min": "",
                                                      "max": "",
                                                      "validations": [],
                                                      "dynamicKey" : "${snakeToCamel(
                                                        table
                                                      )}_${lowerSnakeToCamel(
                                                      col.COLUMN_NAME
                                                    )}",
                                                      "selectServer": false,
                                                      "alias" : "${snakeToCamel(
                                                        table
                                                      )}.${lowerSnakeToCamel(
                                                      col.COLUMN_NAME
                                                    )}"
                                                    }
                                                    `
                                                  : `
                                                    ,
                                                    {
                                                        "name": "${lowerSnakeToCamel(
                                                          col.COLUMN_NAME
                                                        )}",
                                                        "label": "${snakeToSeparatedWords(
                                                          col.COLUMN_NAME
                                                        )}",
                                                        "title": "",
                                                        "type": "${
                                                          col.REFERENCED_TABLE_NAME ||
                                                          col.DATA_TYPE.toLowerCase() ==
                                                            "enum"
                                                            ? "select"
                                                            : col.DATA_TYPE ==
                                                              "tinyint"
                                                            ? "checkbox"
                                                            : col.DATA_TYPE ==
                                                              "int"
                                                            ? "number"
                                                            : "textField"
                                                        }",
                                                    "required": ${
                                                      col.IS_NULLABLE == "YES"
                                                        ? false
                                                        : true
                                                    },
                                                        "hideInCreateForm": false,
                                                        "hideInViewForm": true,
                                                        "visible": ${
                                                          col.REFERENCED_TABLE_NAME
                                                            ? false
                                                            : true
                                                        },
                                                        "disabled": false,
                                                        "dependancyCheck": false,
                                                        "isPrefilled": false,
                                                        "source": "req.body",
                                                        "min": "",
                                                        "max": "",
                                                        "validations": [],
                                                        "selectServer": ${
                                                          col.REFERENCED_TABLE_NAME
                                                            ? true
                                                            : false
                                                        },
                                                        "dynamicKey": "${snakeToCamel(
                                                          table
                                                        )}_${lowerSnakeToCamel(
                                                      col.COLUMN_NAME
                                                    )}",
                                                        "selectServerUrl": ${
                                                          col.REFERENCED_TABLE_NAME
                                                            ? `"/${col.REFERENCED_TABLE_NAME}/dropdown?version=1.0"`
                                                            : false
                                                        },
                                                        "alias" : "${table}.${
                                                      col.COLUMN_NAME
                                                    }"
                                                    }
                                                    `;
                                              })}
                                           
                                               ]}
    
                                            ${columns
                                              .filter((col) =>
                                                [
                                                  "created_at",
                                                  "updated_at",
                                                ].includes(col.COLUMN_NAME)
                                              )
                                              .map(
                                                (col) => `
                                                ,
                                                {
                                                    "name": "${lowerSnakeToCamel(
                                                      col.COLUMN_NAME
                                                    )}",
                                                    "label": "${snakeToSeparatedWords(
                                                      col.COLUMN_NAME
                                                    )}",
                                                    "title": "",
                                                    "type": "dateTime",
                                                    "required": ${
                                                      col.IS_NULLABLE == "YES"
                                                        ? false
                                                        : true
                                                    },
                                                    "hideInCreateForm": true,
                                                    "hideInViewForm" : true,
                                                    "visible": false,
                                                    "disabled": false,
                                                    "dependancyCheck": false,
                                                    "isPrefilled": false,
                                                    "source": "req.body",
                                                    "min": "",
                                                    "max": "",
                                                    "validations": [],
                                                    "selectServer": false,
                                                    "dynamicKey": "${snakeToCamel(
                                                      table
                                                    )}_${lowerSnakeToCamel(
                                                  col.COLUMN_NAME
                                                )}",
                                                    "alias" : "${table}.${
                                                  col.COLUMN_NAME
                                                }"
                                                }`
                                              )}
                                              ${columns
                                                .filter(
                                                  (col) =>
                                                    ["status"].includes(
                                                      col.COLUMN_NAME
                                                    ) &&
                                                    !col.REFERENCED_TABLE_NAME
                                                )
                                                .map(
                                                  (col) => `
                                                  ,
                                                {
                                                    "name": "${lowerSnakeToCamel(
                                                      col.COLUMN_NAME
                                                    )}",
                                                    "label": "${snakeToSeparatedWords(
                                                      col.COLUMN_NAME
                                                    )}",
                                                    "title": "",
                                                    "type": "select",
                                                    "required": false,
                                                    "hideInCreateForm": true,
                                                    "visible": false,
                                                    "disabled": false,
                                                    "dependancyCheck": false,
                                                    "isPrefilled": false,
                                                    "source": "req.body",
                                                    "min": "",
                                                    "max": "",
                                                    "validations": [],
                                                    "selectServer": false,
                                                    "dynamicKey": "${snakeToCamel(
                                                      table
                                                    )}_${lowerSnakeToCamel(
                                                    col.COLUMN_NAME
                                                  )}",
                                                    options:[
                                                        {value:'inactive',label:'inactive'},
                                                        {value:'active',label:'active'}
                                                    ],
                                                    "alias" : "${table}.${
                                                    col.COLUMN_NAME
                                                  }"
                                                }
                                                 `
                                                )}
    `;
}
function genCrudParameters(table, columns, allColumns, analysis, apiUrl) {
  // logMessage(["table name for gencrudParameters", table]);
  return `
        {
          "name": "id",
          "label": "id",
          "title": "",
          "type": "textField",
          "required": false,
          "hideInCreateForm": true,
          "hideInViewForm" : true,
          "visible": true,
          "disabled": false,
          "dependancyCheck": false,
          "isPrefilled": false,
          "source": "req.query",
          "min": "",
          "max": "",
          "selectServer": false,
          "dynamicKey": "id"
        }
        ${columns
          .filter(
            (col) =>
              ![
                "status",
                "created_at",
                "updated_at",
                "created_by",
                "updated_by",
                columns.find(
                  (col) =>
                    col.COLUMN_KEY === "PRI"
                )?.COLUMN_NAME,
              ].includes(col.COLUMN_NAME) &&
              col.DATA_TYPE?.toLowerCase() != "datetime" &&
              !col.NAME_COLUMN
          )
          .map(
            (col) => `
            ,
            {
                "name": "${lowerSnakeToCamel(
                  col.COLUMN_NAME
                )}",
                "label": "${snakeToSeparatedWords(
                  col.COLUMN_NAME
                )}",
                "title": "",
                "type": "${
                  col.DATA_TYPE?.toLowerCase() == "enum" ||
                  col.REFERENCED_COLUMN_NAME
                    ? "select"
                    : col.DATA_TYPE ==
                      "tinyint"
                    ? "checkbox"
                    : col.DATA_TYPE == "int"
                    ? "number"
                    : "textField"
                }",
                "required": ${
                  col.IS_NULLABLE == "YES"
                    ? false
                    : true
                },
                "hideInCreateForm": false,
                "visible": true,
                "disabled": false,
                "dependancyCheck": false,
                "isPrefilled": false,
                "source": "req.body",
                "min": "",
                "max": "",
                "validations": [],
                "selectServer": ${
                  col.REFERENCED_COLUMN_NAME
                    ? true
                    : false
                },
                "selectServerUrl":"/${
                  col.REFERENCED_TABLE_NAME
                }/dropdown?version=1.0",
                "dynamicKey": "${snakeToCamel(
                  table
                )}_${lowerSnakeToCamel(
                  col.COLUMN_NAME
                )}",
                "alias" : "${table}.${
                  col.COLUMN_NAME
                }",
                "options": ${JSON.stringify(
                  col.DATA_TYPE?.toLowerCase() == "enum"
                    ? col.COLUMN_TYPE.match(
                        /enum\((.+)\)/
                      )[1]
                        .split(",")
                        .map((v) =>
                          v
                            .trim()
                            .replace(
                              /^'(.*)'$/,
                              "$1"
                            )
                        )
                        .map((v) => ({
                          value: v,
                          label: v,
                        }))
                    : []
                )}

            }`
          ).join("")}  
        ${columns
          .filter(
            (col) =>
              ![
                "status",
                "created_at",
                "updated_at",
                "created_by",
                "updated_by",
                columns.find(
                  (col) =>
                    col.COLUMN_KEY === "PRI"
                )?.COLUMN_NAME,
              ].includes(col.COLUMN_NAME) &&
              !col.REFERENCED_TABLE_NAME &&
              col.DATA_TYPE != "datetime" &&
              col.NAME_COLUMN
          )
          .map(
            (col) => `
            ,
            {
                "name": "${lowerSnakeToCamel(
                  col.COLUMN_NAME
                )}",
                "label": "${snakeToSeparatedWords(
                  col.COLUMN_NAME
                )}",
                "title": "",
                "type": "${
                  col.DATA_TYPE?.toLowerCase() == "enum"
                    ? "select"
                    : col.DATA_TYPE?.toLowerCase() ==
                      "tinyint"
                    ? "checkbox"
                    : col.DATA_TYPE?.toLowerCase() == "int"
                    ? "number"
                    : "textField"
                }",
                "required": ${
                  col.IS_NULLABLE == "YES"
                    ? false
                    : true
                },
                "hideInCreateForm": true,
                "visible": true,
                "disabled": false,
                "dependancyCheck": false,
                "isPrefilled": false,
                "source": "req.body",
                "min": "",
                "max": "",
                "validations": [],
                "selectServer": false,
                "dynamicKey": "${snakeToCamel(
                  col.NAME_COLUMN
                )}_${lowerSnakeToCamel(
              col.COLUMN_NAME
            )}",
                "alias" : "${
                  col.NAME_COLUMN
                }.${col.COLUMN_NAME}",
                "options": [ ${JSON.stringify(
                  col.DATA_TYPE?.toLowerCase() == "enum"
                    ? col.COLUMN_TYPE.match(
                        /enum\((.+)\)/
                      )[1]
                        .split(",")
                        .map((v) =>
                          v
                            .trim()
                            .replace(
                              /^'(.*)'$/,
                              "$1"
                            )
                        )
                        .map((v) => ({
                          value: v,
                          label: v,
                        }))
                    : ""
                )}]

            }`
          ).join("")}  
            
        ${columns
          .filter(
            (col) =>
              ![
                "status",
                "created_at",
                "updated_at",
                "created_by",
                "updatedBy",
                "updated_by",
                columns.find(
                  (col) =>
                    col.COLUMN_KEY === "PRI"
                )?.COLUMN_NAME,
              ].includes(col.COLUMN_NAME) &&
              col.REFERENCED_TABLE_NAME &&
              table == "tasks"
          )
          .map((col) => {
            return col.REFERENCED_TABLE_NAME ==
              "attachments"
              ? `
                ,
                {
                  "name": "attachmentId",
                  "label": "Attachment",
                  "title": "",
                  "type": "file",
                  "required": false,
                  "isMultiple" : false,
                  "hideInCreateForm": false,
                  "hideInViewForm": false,
                  "fetchSubmitUrl": "/get/file/url/local?step=1",
                  "getFileUrl": "/get/file?step=1&token=",
                  "visible": true,
                  "disabled": false,
                  "dependancyCheck": false,
                  "isPrefilled": false,
                  "source": "req.body",
                  "min": "",
                  "max": "",
                  "validations": [],
                  "dynamicKey" : "${snakeToCamel(
                    table
                  )}_${lowerSnakeToCamel(
                  col.COLUMN_NAME
                )}",
                  "selectServer": false,
                  "alias" : "${snakeToCamel(
                    table
                  )}.${lowerSnakeToCamel(
                  col.COLUMN_NAME
                )}"
                }
                `
              : `
                ,
                {
                    "name": "${lowerSnakeToCamel(
                      col.COLUMN_NAME
                    )}",
                    "label": "${snakeToSeparatedWords(
                      col.COLUMN_NAME
                    )}",
                    "title": "",
                    "type": "${
                      col.REFERENCED_TABLE_NAME ||
                      col.DATA_TYPE ==
                        "enum"
                        ? "select"
                        : col.DATA_TYPE ==
                          "tinyint"
                        ? "checkbox"
                        : col.DATA_TYPE ==
                          "int"
                        ? "number"
                        : "textField"
                    }",
                    "required": ${
                      col.IS_NULLABLE == "YES"
                        ? false
                        : true
                    },
                    "hideInCreateForm": false,
                    "hideInViewForm": true,
                    "visible": ${
                      col.REFERENCED_TABLE_NAME
                        ? false
                        : true
                    },
                    "disabled": false,
                    "dependancyCheck": false,
                    "isPrefilled": false,
                    "source": "req.body",
                    "min": "",
                    "max": "",
                    "validations": [],
                    "selectServer": ${
                      col.REFERENCED_TABLE_NAME
                        ? true
                        : false
                    },
                    "dynamicKey": "${snakeToCamel(
                      table
                    )}_${lowerSnakeToCamel(
                  col.COLUMN_NAME
                )}",
                    "selectServerUrl": ${
                      col.REFERENCED_TABLE_NAME
                        ? `"/${col.REFERENCED_TABLE_NAME}/dropdown?version=1.0"`
                        : false
                    },
                    "alias" : "${table}.${
                  col.COLUMN_NAME
                }"
                }
                `;
          })}
        ${columns
          .filter(
            (col) =>
              col.DATA_TYPE == "datetime" &&
              ![
                "created_at",
                "updated_at",
              ].includes(col.COLUMN_NAME)
          )
          .map(
            (col) => `
          ,
          {
              "name": "${lowerSnakeToCamel(
                col.COLUMN_NAME
              )}",
              "label": "${snakeToSeparatedWords(
                col.COLUMN_NAME
              )}",
              "title": "",
              "type": "dateTime",
                "required": ${
                  col.IS_NULLABLE == "YES"
                    ? false
                    : true
                },
              "hideInCreateForm": false,
              "visible": true,
              "disabled": false,
              "dependancyCheck": false,
              "isPrefilled": false,
              "source": "req.body",
              "min": "",
              "max": "",
              "validations": [],
              "selectServer": false,
              "dynamicKey": "${snakeToCamel(
                table
              )}_${lowerSnakeToCamel(
              col.COLUMN_NAME
            )}"
          }`
          ).join("")}  
          ${columns
            .filter((col) =>
              ["created_at", "updated_at"].includes(col.COLUMN_NAME)
            )
            .map(
              (col) => `
                ,
                {
                  "name": "${lowerSnakeToCamel(col.COLUMN_NAME)}",
                  "label": "${snakeToSeparatedWords(col.COLUMN_NAME)}",
                  "title": "",
                  "type": "dateTime",
                  "required": ${col.IS_NULLABLE == "YES" ? false : true},
                  "hideInCreateForm": true,
                  "hideInViewForm" : true,
                  "visible": false,
                  "disabled": false,
                  "dependancyCheck": false,
                  "isPrefilled": false,
                  "source": "req.body",
                  "min": "",
                  "max": "",
                  "validations": [],
                  "selectServer": false,
                  "dynamicKey": "${snakeToCamel(table)}_${lowerSnakeToCamel(
                    col.COLUMN_NAME
                  )}",
                  "alias" : "${table}.${col.COLUMN_NAME}"
                }`
            )
            .join("")}  

          ${columns
            .filter(
              (col) =>
                ["status"].includes(
                  col.COLUMN_NAME
                ) &&
                !col.REFERENCED_TABLE_NAME
            )
            .map(
              (col) => `
            ,
            {
                "name": "${lowerSnakeToCamel(
                  col.COLUMN_NAME
                )}",
                "label": "${snakeToSeparatedWords(
                  col.COLUMN_NAME
                )}",
                "title": "",
                "type": "select",
                "required": false,
                "hideInCreateForm": true,
                "visible": false,
                "disabled": false,
                "dependancyCheck": false,
                "isPrefilled": false,
                "source": "req.body",
                "min": "",
                "max": "",
                "validations": [],
                "selectServer": false,
                "dynamicKey": "${snakeToCamel(
                  table
                )}_${lowerSnakeToCamel(
                col.COLUMN_NAME
              )}",
                "options":[
                    {"value":"inactive","label":"inactive"},
                    {"value":"active","label":"active"}
                ],
                "alias" : "${table}.${
                col.COLUMN_NAME
              }"
            }`
            ).join("")}
    `;
}
const frontEndTemplate = {
  object: (table, columns, parameters) => {

    const filterClause = columns
      .map((col) => `"${table}_${snakeToCamel(col.COLUMN_NAME)}"`)
      .join(", ");

    return `
            import { parameters } from "../../../Src/Apis/GeneratedApis/Versions/Crud_Objects/CRUD_parameters";
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
                        permission: 'update_${table}',
                        onAction: () => logMessage(["Button pressed Edit"]),
                        form: ${table} generateFormProps({
                            parameters: parameters,
                            apiUrl: "/crud/${table}?version=1.0",
                            requestType: "PUT",
                            mode:"edit"
                        }),
                        },
                        {
                        name: "Delete",
                        color: "red",
                        permission: 'delete_${table}',
                        serverCommunication: serverCommunicationHelper({
                            parameters: parameters,
                            apiUrl:"/crud/${table}?version=1.0",
                            requestType: "DELETE",
                        }),
                        onAction: () => logMessage(["Button pressed Delete"]),
                        },
                        {
                        name: "View",
                        color: "grey",
                        permission: 'view_${table}',
                        onAction: () => logMessage(["Button pressed View"]),
                        form: generateFormProps({
                            parameters: parameters,
                            apiUrl: "/crud/${table}?version=1.0",
                            requestType: "GET",
                            mode:"view"
                        }),
                        },
                    ],
                    },
                    bulkAction: {
                    add: {
                        permission:'add_${table}',
                        form: generateFormProps({
                        parameters: parameters,
                        apiUrl: "/crud/${table}?version=1.0",
                        requestType: "POST",
                        mode:"create"
                        }),
                    },
                    },
  
                    export: {
                      permission: 'export_${table}',
                      serverCommunication: serverCommunicationHelper({
                          parameters: parameters,
                          apiUrl: "",
                          apiActionType: "",
                          requestType: "",
                          reduxActionType: "",
                    }),
                    onAction: (e) => logMessage(["Export Action", e]),
                    options: {
                        formats: ["CSV", "PDF"],
                        includeHeaders: true,
                        icon: "",
                    },
                    },
                    filter: {
                    permission: 'filter_${table}',
                    serverCommunication: serverCommunicationHelper({
                        parameters: parameters,
                        apiUrl: "",
                        apiActionType: "",
                        requestType: "",
                        reduxActionType: "",
                    }),
                    onAction: (e) => logMessage(["Filter Action", e]),
                    options: {
                        filterBy: [
                            ${filterClause}
                        ],
                        statusOptions: ["active", "inactive"],
                    },
                    excludeFilter: [],
                    },
                    sort: {
                    permission: 'sort_${table}',
                    serverCommunication: serverCommunicationHelper({
                        parameters: parameters,
                        apiUrl: "",
                        apiActionType: "",
                        requestType: "",
                        reduxActionType: "",
                    }),
                    onAction: (e) => logMessage(["Sort Action", e]),
                    options: {
                        defaultSortField: "id",
                        defaultSortOrder: "asc",
                        multiColumnSort: true,
                    },
                    excludeSort: [],
                    },
                    list: {
                    permission:'list_${table}',
                    serverCommunication: serverCommunicationHelper({
                        parameters: parameters,
                        apiUrl:  "/crud/${table}?version=1.0",
                        apiActionType: "",
                        requestType: "GET",
                        reduxActionType: "",
                    }),
                    },
                    search: {
                    permission: 'search_${table}',
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
                    permission: true,
                    serverCommunication: serverCommunicationHelper({
                        parameters: parameters,
                        apiUrl: "/crud/${table}?version=1.0",
                        apiActionType: "${table}_view",
                        requestType: "GET",
                        reduxActionType: "${table}_view",
                    }),
                    options: {
                        pageSize: 10,
                        pageSizeOptions: [4, 5, 10, 20, { label: "All", value: -1 }],
                    },
                    onAction: (e) => {
                        logMessage(["Pagination Action", e]);
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
        `;
  },
  parameters: (
    table,
    columns,
    objectName,
    primaryKey,
    allColumns,
    analysis
  ) => {
    let extraColumns = [];

    columns.forEach((col) => {
      if (
        col.COLUMN_NAME.endsWith("_id") &&
        !col.COLUMN_NAME.includes("attachment")
      ) {
        const referencedTable = col.REFERENCED_TABLE_NAME;

        if (referencedTable === table) {
          console.warn(
            `Self-referencing foreign key detected in table ${table}: ${col.COLUMN_NAME} references ${primaryKey}`
          );
          return; // Don't forget to return if you want to skip the rest
        }

        if (allColumns[referencedTable]) {
          let nameColumn = allColumns[referencedTable].find((c) =>
            c.COLUMN_NAME.endsWith("_name") || c.COLUMN_NAME.endsWith("name")
          );
          if (nameColumn) {
            // Create a shallow copy so the original object is untouched
            let shallowCopy = { ...nameColumn };
            shallowCopy.NAME_COLUMN = col.REFERENCED_TABLE_NAME;
            extraColumns.push(shallowCopy);
          }
        }
      }
    });

    columns = [...columns, ...extraColumns];
    const aliasedColumns = columns
      .map(
        (col) =>
          ` '${snakeToCamel(table)}_${snakeToCamel(col.COLUMN_NAME)}' : '${
            col.COLUMN_NAME
          }'`
      )
      .join(", ");
    const apiUrl = `/crud/${table}?version=1.0`;

    return `
            export const parameters = {
                "steps": [
                    {
                    "title": "${snakeToCamel(table)} Info",
                    "parameters": {
                        "fields": [
                        {
                            "name": "${snakeToCamel(table)}",
                            "type": "section",
                            "hideInCreateForm": false,
                            "visible": false,
                            "required": false,
                            "disabled": false,
                            "validations": "",
                            "dependancyCheck": false,
                            "isPrefilled": false,
                            "source": "req.body",
                            "title": "${snakeToSeparatedWords(objectName)}",
                            "childFields": [
                                  ${genCrudParameters(
                                    table,
                                    columns,
                                    allColumns,
                                    analysis,
                                    apiUrl
                                  )}
                            ]
                        }
                        ]
                    },
                    "buttons": [
                        {
                        "type": "submit",
                        "label": "Submit"
                        }
                    ]
                    }
                ],
                "colMapper": "{${aliasedColumns}}"
                };
            `;
  },
  sideBarProps: (allGroups) => {
    //logMessage([allGroups]);

    return `
        import PersonIcon from '@mui/icons-material/Person';
        import SchoolIcon from "@mui/icons-material/School";
        import DashboardIcon from "@mui/icons-material/Dashboard";
        import GroupIcon from "@mui/icons-material/Group"; 
        import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
        import LockIcon from "@mui/icons-material/Lock";
        import GroupWorkIcon from "@mui/icons-material/GroupWork";
        import EmailIcon from "@mui/icons-material/Email";
        import ArticleIcon from "@mui/icons-material/Article";
        import AccountTreeIcon from '@mui/icons-material/AccountTree';
        import ListAltIcon from '@mui/icons-material/ListAlt';
    
        const iconMapping = {
          "Dashboard" : <DashboardIcon sx={{color: "#FF6347"}}/>,
          ${Object.keys(allGroups)
            .map(
              (groupKey) =>
                `"${capitalizeFirstLetter(
                  snakeToSeparatedWords(groupKey)
                )}": <GroupIcon sx={{color: "#FF6347"}}/>`
            )
            .join(",\n        ")},
          "Profile" : <PersonIcon sx={{color: "#FF6347"}}/>,
  
        };
    
        const data = {
          features: {
            sidebarItems: [
              {
                title: "Dashboard",
                icon: iconMapping["Dashboard"],
                permission: ["dashboard","operations_list_attachments"],
                path: "/dashboard",
              },
              {
                title: "Api Documentation",
                icon: iconMapping["Dashboard"],
                permission: ["dashboard","operations_list_attachments"],
                path: "/ApiDocumentation",
              },
              ${Object.entries(allGroups)
                .map(
                  ([groupKey, groupTables]) =>
                    `
              {
                title: "${capitalizeFirstLetter(
                  snakeToSeparatedWords(groupKey)
                )} Management",
                icon: iconMapping["${capitalizeFirstLetter(
                  snakeToSeparatedWords(groupKey)
                )}"],
                path: "/${capitalizeFirstLetter(
                  snakeToCamel(groupKey)
                )}-managements/${capitalizeFirstLetter(groupKey)}",
                permission: ["view_${groupKey}"],
                subNav: [
                  ${groupTables
                    .map(
                      (table) => `
                      {
                        title: "${capitalizeFirstLetter(
                          snakeToSeparatedWords(table)
                        )}",
                        path: "/${capitalizeFirstLetter(
                          snakeToCamel(groupKey)
                        )}-managements/${capitalizeFirstLetter(table)}",
                        permission: ["view_${table}"]
                      }
                    `
                    )
                    .join(",")}
                ]
              }`
                )
                .join(",")}
              ,
              {
                title: "Profile",
                icon: iconMapping["Profile"],
                path: "/profile/account",
                permission: ["profile","operations_account"],
                subNav: [
                  {
                    title: "Account",
                    path: "/profile/account",
                    permission: ["account","operations_account"],
                  },
                  {
                    title: "Security",
                    path: "/profile/security",
                    permission: ["security","operations_security"],
                  },
                  {
                    title: "Privacy Policy",
                    path: "/profile/privacy-policy",
                    permission: ["privacy_policy","operations_privacy_policy"],
                  },
                ],
              },
            ]
          },
          onSelect: (selectedTab) => { logMessage([selectedTab]); },
        };
    
        const config = {
          viewMode: {
            presentation: ["sidebar", "collapsible"],
            mode: ["view", "edit"],
            isOpen: true,
            mobileBreakpoint: "(max-width:768px)",
          },
          features: {
            tokenAuthentication: true,
            permission: true,
          },
        };
    
      const appearance = {
              features: {
                styling: {
                  background: "#f5f5f5",
                  width: "280px",
                  boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
                  logoWidth: "120px",
                  logoHeight: "80px",
                  fontSize: "14px",
                  fontSizeSmall: "13px",
                  fontWeight: 500,
                  activeFontWeight: 600,
                  borderRadius: "8px",
                  light: {
                    background: "#f5f5f5",
                    boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
                    activeTextColor: "#4C49ED",
                    inactiveTextColor: "#5C5B98",
                    activeBackgroundColor: "rgba(76, 73, 237, 0.12)",
                    hoverBackgroundColor: "rgba(76, 73, 237, 0.08)",
                    accentColor: "#4C49ED",
                    secondaryAccentColor: "#FF6347",
                  },
                  dark: {
                    background: "#1E1E2F",
                    boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.4)",
                    activeTextColor: "#C7C6FF",
                    inactiveTextColor: "#A5A4C4",
                    activeBackgroundColor: "rgba(76, 73, 237, 0.25)",
                    hoverBackgroundColor: "rgba(76, 73, 237, 0.15)",
                    accentColor: "#6C63FF",
                    secondaryAccentColor: "#FF8571",
                  },
                },
              },
        };  
        export { data, config, appearance };
      `;
  },
  json: (table, columns, parameters) =>{
    let tab = false;
    let tab_content =  
    {
      "permission": "filter_${table.toLowerCase()}_by_tabs",
      "name": "status",
      "label": "Status",
      "alias": "${table.toLowerCase()}.status",
      "serverCommunication": {
        "parameters": "parameters",
        "apiUrl": "",
        "apiActionType": "",
        "requestType": "",
        "reduxActionType": "",
      },
      "onAction": "(e) => logMessage(['Tab Action', e])",
      "options": [
        { value: "active", label: "active" },
        { value: "inactive", label: "inactive" },
      ],
    }
    const filterClause = columns
      .map((col) => `"${table}_${snakeToCamel(col.COLUMN_NAME)}"`)
      .join(", ");

    parameters?.forEach((e) => {
      if (e.type == "select" && !tab){
        tab = true
        tab_content.name = e.name
        tab_content.label = e.label
        tab_content.alias = `${table.toLowerCase()}.${e.name}`
        tab_content.options = e.options
      }
    })
    return `
          {
            "data": {
            "features": {
                "tabs": ${JSON.stringify(tab_content)},
                "parameters": "parameters",
                "rowActions": {
                "actions": [
                    {
                      "name": "Edit",
                      "color": "blue",
                      "permission": "update_${table}",
                      "form": {
                        "parameters":"parameters",
                         ${table == "user_roles_designations_department" ? `"additionAttributes" : {
                            "apiUrl": "http://localhost:3002/api/spec/attributes/urdd?version=1.0",
                            "requestType": "GET",
                            "isEncrypted":false,
                            "useBaseURL":false
                          }, `: ""}
                          "apiUrl": "/crud/${table}?version=1.0",
                        "requestType": "PUT",
                        "mode":"edit"
                      }
                    },
                    {
                      "name": "Delete",
                      "color": "red",
                      "permission": "delete_${table}",
                      "serverCommunication": {
                        "parameters":"parameters",
                        "apiUrl":"/crud/${table}?version=1.0",
                        "requestType": "DELETE"
                      }
                    },
                    {
                      "name": "View",
                      "color": "grey",
                      "permission": "view_${table}",
                      "form": {
                        "parameters":"parameters",
                        "apiUrl": "/crud/${table}?version=1.0",
                        "requestType": "GET",
                        "mode":"view"
                      }
                    }
                  ]
                },
                "bulkAction": {
                  "add": {
                    "permission":"add_${table}",
                    "form": {
                      "parameters":"parameters",
                      ${table == "user_roles_designation_deparmtent" ? "additionAttributes" 
                         `{
                            "apiUrl": "http://localhost:3002/api/spec/attributes/urdd?version=1.0",
                            "requestType": "GET",
                            "isEncrypted":false,
                            "useBaseURL":false
                          }, `: ""}
                      "apiUrl": "/crud/${table}?version=1.0",
                      "requestType": "POST",
                      "mode":"create"
                    }
                  }
                },
                "columnVisibility": {
                    "permission": "column_visibility_users"
                },
                "userStatusUpdation": {
                  "permission": "status_updation_users",
                  "serverCommunication": {
                    "parameters": "parameters",
                    "apiUrl": "/crud/users",
                    "apiActionType": "Update",
                    "requestType": "PUT",
                    "reduxActionType": ""
                  }
                },
                "export": {
                  "permission": "export_${table}",
                      "serverCommunication": {
                      "parameters":"parameters",
                      "apiUrl": "",
                      "apiActionType": "",
                      "requestType": "",
                      "reduxActionType": ""
                    },
                  "options": {
                      "formats": ["CSV", "PDF"],
                      "includeHeaders": true,
                      "icon": ""
                  }
                },
                "filter": {
                  "permission": "filter_${table}",
                      "serverCommunication": {
                      "parameters":"parameters",
                      "apiUrl": "",
                      "apiActionType": "",
                      "requestType": "",
                      "reduxActionType": ""
                    },
                  "options": {
                      "filterBy": [
                          ${filterClause}
                      ],
                      "statusOptions": ["active", "inactive"]
                  },
                  "excludeFilter": []
                },
                "sort": {
                  "permission": "sort_${table}",
                      "serverCommunication": {
                      "parameters":"parameters",
                      "apiUrl": "",
                      "apiActionType": "",
                      "requestType": "",
                      "reduxActionType": ""
                    },
                  "options": {
                      "defaultSortField": "id",
                      "defaultSortOrder": "asc",
                      "multiColumnSort": true
                  },
                  "excludeSort": []
                },
                "list": {
                  "permission":"list_${table}",
                      "serverCommunication": {
                      "parameters":"parameters",
                      "apiUrl":  "/crud/${table}?version=1.0",
                      "apiActionType": "",
                      "requestType": "GET",
                      "reduxActionType": ""
                    }
                  },
                  "search": {
                  "permission": "search_${table}",
                  "excludeSearch": ["image"],
                      "serverCommunication": {
                      "parameters":"parameters",
                      "apiUrl": "",
                      "apiActionType": "",
                      "requestType": "",
                      "reduxActionType": ""
                  }
                },
                "grid": {
                  "entitiesPerRow": 2,
                  "buttonEnable": true,
                  "checkBoxEnable": true,
                  "actionButtonEnable": true
                },
                "pagination": {
                  "parameters": null,
                  "permission": true,
                    "serverCommunication": {
                      "parameters":"parameters",
                      "apiUrl": "/crud/${table}?version=1.0",
                      "apiActionType": "${table}_view",
                      "requestType": "GET",
                      "reduxActionType": "${table}_view"
                    },
                  "options": {
                      "pageSize": 10,
                      "pageSizeOptions": [4, 5, 10, 20, { "label": "All", "value": -1 }]
                  }
                }
              }
            },
          "config": {
            "viewMode": {
                "presentation": ["Table", "Grid"]
            },
            "features": {
                "export": { "enable": true, "operationalMode": "server","permission":true },
                "filter": { "enable": true, "operationalMode": "server" ,"permission":true},
                "sort": { "enable": true, "operationalMode": "server" ,"permission":true},
                "search": { "enable": true, "operationalMode": "server" ,"permission":true},
                "pagination": { "enable": true, "operationalMode": "server" },
                "bulkAction": { "enable": false, "operationalMode": "server" ,"permission":true},
                "viewModes": { "enable": true, "operationalMode": "server" },
                "grid": { "enable": true, "operationalMode": "server" },
                "colaborator": { "enable": false, "operationalMode": "server" },
                "rowActions": { "enable": true, "operationalMode": "server" ,"permission":true},
                "list": { "enable": true, "operationalMode": "server" ,"permission":true},
                "parameters": { "enable": true, "operationalMode": "local" },
                "tabs": { "enable": false, "operationalMode": "server", "permission": false },
                "dragAndDrop": { "enable": true },
                "expandableRow": { "enable": true },
                "speedDial": { "enable": true },
                "columnVisibility": {
                  "enable": true,
                  "operationalMode": "local",
                  "permission": true
                },
                "userStatusUpdation": {
                  "enable": true,
                  "operationalMode": "server",
                  "permission": true
                }
            }
          },
          "appearance": {
            "light": {
              "grid": {
                "image": {
                  "borderColor": "#7479ed"
                },
                "actionButtons": {
                  "color": "#7b7a8c"
                },
                "button": {
                  "buttonColor": "#818093",
                  "buttonVarient": "contained",
                  "buttonTextColor": "#ffffff"
                },
                "header": {
                  "headColor": "#e5e5e5",
                  "headTextColor": "#260143"
                },
                "cardFont": {
                  "headingSize": 15,
                  "headingWeight": 650,
                  "textSize": 13,
                  "textWeight": 500,
                  "heading": "#260143",
                  "color": "#5a5897"
                }
              }
            },
            "dark": {
              "grid": {
                "image": {
                  "borderColor": "#6C63FF"
                },
                "actionButtons": {
                  "color": "#a5a4c4"
                },
                "button": {
                  "buttonColor": "#6C63FF",
                  "buttonVarient": "contained",
                  "buttonTextColor": "#ffffff"
                },
                "header": {
                  "headColor": "#2d2d3d",
                  "headTextColor": "#c7c6ff"
                },
                "cardFont": {
                  "headingSize": 15,
                  "headingWeight": 650,
                  "textSize": 13,
                  "textWeight": 500,
                  "heading": "#ffffff",
                  "color": "#c7c6ff"
                }
              }
            }
          }
        }
    `;
  }
};
const crudTemplates = {
  object: (
    table,
    columns,
    objectName,
    primaryKey,
    allColumns,
    permission = true,
    dbName
  ) => {
    const aliasedColumns = columns
      .map(
        (col) =>
          `${table}.${col.COLUMN_NAME} as ${snakeToCamel(table)}_${snakeToCamel(
            col.COLUMN_NAME
          )}`
      )
      .join(",");

    const setClause = columns
      .filter(
        (col) =>
          ![
            primaryKey,
            "status",
            "created_at",
            "updated_at",
            "created_by",
            "updated_by",
          ].includes(col.COLUMN_NAME)
      )
      .map(
        (col) =>
          `${col.COLUMN_NAME} = {{${snakeToCamel(table)}_${snakeToCamel(
            col.COLUMN_NAME
          )}}}`
      )
      .join(", ");

    let joins = [];
    let extraSelects = [];

    columns.forEach((col) => {
      if (col.COLUMN_NAME.endsWith("_id")) {
        const referencedTable = col.REFERENCED_TABLE_NAME; // Derive table name
        logMessage(["Found Foreign Key ", col.COLUMN_NAME , "References: ", referencedTable, " In Table ", table])
        if (referencedTable === table) {
          console.warn(
            `Self-referencing foreign key detected in table ${table}: ${col.COLUMN_NAME} references ${primaryKey}`
          );
        } else if (allColumns[referencedTable]) {
          // Find a column matching *_name in the referenced table
          const nameColumn = allColumns[referencedTable].find((c) =>
            c.COLUMN_NAME.endsWith("_name") || c.COLUMN_NAME.endsWith("name")
          );
          if (nameColumn) {
            joins.push(
              `LEFT JOIN ${referencedTable} ON ${table}.${col.COLUMN_NAME} = ${referencedTable}.${col.REFERENCED_COLUMN_NAME}`
            );
            extraSelects.push(
              `${referencedTable}.${
                nameColumn.COLUMN_NAME
              } as ${referencedTable}_${snakeToCamel(nameColumn.COLUMN_NAME)}`
            );
          }
        }
      }
    });

    // Combine SELECT fields
    const selectFields = [
      `${table}.${primaryKey} as ${snakeToCamel(table)}_id`,
      `${table}.${primaryKey} as id`,
      aliasedColumns,
      extraSelects,
    ]
      .join(", ")
      .replace(/,\s*$/, "");

    return `
      const parameters = require('../../../Src/Apis/GeneratedApis/Versions/Crud_Objects/CRUD_parameters');
      global.Crud${objectName}_object = {
        versions: {
          versionData: [
            {
              "*": {
                steps: [
                  {
                  platform:
                    [
                      {       
                        platformIP : ['*'],              
                        supported: ['*'],
                        config: {
                          features: {
                            multistep: false,
                            parameters: true,
                            pagination: true,
                          },
                          communication: {
                            encryption: {
                              platformEncryption: true,
                              accessToken: true
                            },
                          },
                          verification: {
                            otp: false,
                            accessToken: false,
                          }
                        }
                      }
                    ],
                    data: {
                      parameters: parameters,
                      apiInfo: {
                      
                        query: {
                        queryNature: { Add: "INSERT", Update: "UPDATE", View: "SELECT", Delete: "DELETE", List: "SELECT" },
                          preProcessFunction: [],
                          queryPayload: {
                            Add: async(req, decryptedPayload) => { return "INSERT INTO ${table} (${columns
      .filter(
        (col) =>
          ![
            primaryKey,
            "status",
            "created_at",
            "updated_at",
            "created_by",
            "updated_by",
          ].includes(col.COLUMN_NAME)
      )
      .map((col) => col.COLUMN_NAME)
      .join(", ")}, created_by, updated_by) VALUES (${columns
      .filter(
        (col) =>
          ![
            primaryKey,
            "status",
            "created_at",
            "updated_at",
            "created_by",
            "updated_by",
          ].includes(col.COLUMN_NAME)
      )
      .map(
        (col) => `{{${snakeToCamel(table)}_${snakeToCamel(col.COLUMN_NAME)}}}`
      )
      .join(", ")}, {{actionPerformerURDD}}, {{actionPerformerURDD}})"},
                            Update: async(req, decryptedPayload) => { return "UPDATE ${table} SET ${setClause} WHERE ${primaryKey} = {{id}}"},
                            List: async(req, decryptedPayload) => { return "SELECT COUNT(*) OVER () AS table_count, ${selectFields} FROM ${table} ${joins.join(
      " "
    )} Where ${table}.status != 'inactive' "},
                            View: async(req, decryptedPayload) => { return "SELECT ${selectFields} FROM ${table} ${joins.join(
      " "
    )} WHERE ${primaryKey} = {{id}} OR ${primaryKey} IS NULL"},
                            Delete: async(req, decryptedPayload) => { return"UPDATE ${table} SET status = 'inactive' WHERE ${primaryKey} = {{id}}"},           
                            database: "${dbName ? dbName : "mainDb"}"

                            ,
                          }
                        },
                        utilityFunctions: {
                          callbackFunction: null,
                          payloadFunction: [],
                          crudFunction: "crudApiGenerator"
                        },
                        postProcessFunction: null,
                      },
                      requestMetaData: {
                        requestMethod: { Add: "POST", View: "GET", Update: "PUT", Delete: "DELETE", List: "GET" },
                        permission: ${permission? `{ Add: "add_${table}", View: "view_${table}", Update: "update_${table}", Delete: "delete_${table}", List: "list_${table}" }` : null},
                        providedPermissions: false,
                        pagination: { pageSize: 10 },
                      },
                    },
                    response: {
                      successMessage: "${objectName} CRUD Hit successfully!",
                      errorMessage: "Failed to retrieve ${objectName}.",
                    },
                  },
                ],
              },
            },
          ],
        },
      };
      module.exports = {Crud${objectName}_object}
      `;
  },
  parameters: (table, columns, objectName, primaryKey) => {
    const aliasedColumns = columns
      .map(
        (col) =>
          ` '${table}_${snakeToCamel(col.COLUMN_NAME)}' : '${col.COLUMN_NAME}'`
      )
      .join(", ");

    return `
          const parameters = {
              "steps": [
                  {
                  "title": "${snakeToSeparatedWords(table)} Crud",
                  "parameters": {
                      "fields": [
                      {
                          "name": "${table}",
                          "type": "section",
                          "title": "${snakeToSeparatedWords(table)} CRUD",
                          "hideInCreateForm": false,
                          "visible": false, 
                          "required": false,
                          "disabled": false,
                          "validations": "",
                          "dependancyCheck": false,
                          "isPrefilled": false,
                          "source": "req.body",
                          "title": "${objectName}",
                          "childFields": [
                                {
                                  "name": "${snakeToCamel(table)}_id",
                                  "label": "id",
                                  "title": "",
                                  "type": "textField",
                                  "required": false,
                                  "hideInCreateForm": true,
                                  "visible": true,
                                  "disabled": false,
                                  "dependancyCheck": false,
                                  "isPrefilled": false,
                                  "source": "req.query",
                                  "min": "",
                                  "max": "",
                                  "selectServer": false,
                                  "dynamicKey": "${snakeToCamel(table)}_id"
                                },
                               {
                                  "name": "actionPerformerURDD",
                                  "label": "actionPerformerURDD",
                                  "title": "",
                                  "type": "textField",
                                  "required": false,
                                  "hideInCreateForm": false,
                                  "visible": true,
                                  "disabled": false,
                                  "dependancyCheck": false,
                                  "isPrefilled": false,
                                  "source": "req.body",
                                  "min": "",
                                  "max": "",
                                  "selectServer": false,
                                  "dynamicKey": "actionPerformerURDD",
                                  "alias" : "actionPerformerURDD",
                                },
                              ${columns
                                .filter(
                                  (col) =>
                                    ![
                                      "status",
                                      "created_at",
                                      "updated_at",
                                      "created_by",
                                      "updated_by",
                                    ].includes(col.COLUMN_NAME) && col.COLUMN_KEY !== "PRI"
                                )
                                .map(
                                  (col) => `
                                  {
                                  "name": "${col.COLUMN_NAME}",
                                  "label": "${snakeToSeparatedWords(
                                    col.COLUMN_NAME
                                  )}",
                                  "title": "",
                                  "type": "textField",
                                  "required": false,
                                  "hideInCreateForm": false,
                                  "visible": true,
                                  "disabled": false,
                                  "dependancyCheck": false,
                                  "isPrefilled": false,
                                  "source": "req.body",
                                  "min": "",
                                  "max": "",
                                  "selectServer": false,
                                  "dynamicKey": "${snakeToCamel(
                                    table
                                  )}_${snakeToCamel(col.COLUMN_NAME)}",
                                  "alias" : "${table}.${col.COLUMN_NAME}",
                                  }`
                                )
                                .join(",")},
                                  
                          ]
                      }
                      ]
                  },
                  "buttons": [
                      {
                      "type": "submit",
                      "label": "Submit"
                      }
                  ]
                  }
              ],
              "colMapper": "{${aliasedColumns}}"
              };
              module.exports = parameters;
          `;
  },
};
const groupedFrontTemplates = {
    object: (table, columns, objectName) => {
      const filterClause = columns
        .map((col) => `"${table}_${snakeToCamel(col.COLUMN_NAME)}"`)
        .join(", ");
      return `
            import { parameters } from "../../../Src/Apis/GeneratedApis/Versions/Crud_Objects/CRUD_parameters";
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
                        permission: 'update_${table}',
                        onAction: () => logMessage(["Button pressed Edit"]),
                        form: generateFormProps({
                            parameters: parameters,
                            apiUrl: "/grouped/cruds/${table}?version=1.0",
                            requestType: "PUT",
                            mode:"edit"
                        }),
                        },
                        {
                        name: "Delete",
                        color: "red",
                        permission: 'delete_${table}',
                        serverCommunication: serverCommunicationHelper({
                            parameters: parameters,
                            apiUrl: "/grouped/cruds/${table}?version=1.0",
                            requestType: "DELETE",
                        }),
                        onAction: () => logMessage(["Button pressed Delete"]),
                        },
                        {
                        name: "View",
                        color: "grey",
                        permission: 'view_${table}',
                        onAction: () => logMessage(["Button pressed View"]),
                        form: generateFormProps({
                            parameters: parameters,
                            apiUrl: "/grouped/cruds/${table}?version=1.0",
                            requestType: "GET",
                            mode:"view"
                        }),
                        },
                    ],
                    },
                    bulkAction: {
                    add: {
                        permission:'add_${table}',
                        form: generateFormProps({
                        parameters: parameters,
                        apiUrl: "/grouped/cruds/${table}?version=1.0",
                        requestType: "POST",
                        mode:"create"
                        }),
                    },
                    },

                    export: {
                      permission: 'export_${table}',
                      serverCommunication: serverCommunicationHelper({
                          parameters: parameters,
                          apiUrl: "",
                          apiActionType: "",
                          requestType: "",
                          reduxActionType: "",
                    }),
                    onAction: (e) => logMessage(["Export Action", e]),
                    options: {
                        formats: ["CSV", "PDF", "Excel"],
                        includeHeaders: true,
                        icon: "",
                    },
                    },
                    filter: {
                    permission: 'filter_${table}',
                    serverCommunication: serverCommunicationHelper({
                        parameters: parameters,
                        apiUrl: "",
                        apiActionType: "",
                        requestType: "",
                        reduxActionType: "",
                    }),
                    onAction: (e) => logMessage(["Filter Action", e]),
                    options: {
                        filterBy: [
                            ${filterClause}
                        ],
                        statusOptions: ["active", "inactive"],
                    },
                    excludeFilter: [],
                    },
                    sort: {
                    permission: 'sort_${table}',
                    serverCommunication: serverCommunicationHelper({
                        parameters: parameters,
                        apiUrl: "",
                        apiActionType: "",
                        requestType: "",
                        reduxActionType: "",
                    }),
                    onAction: (e) => logMessage(["Sort Action", e]),
                    options: {
                        defaultSortField: "id",
                        defaultSortOrder: "asc",
                        multiColumnSort: true,
                    },
                    excludeSort: [],
                    },
                    list: {
                    permission:'list_${table}',
                    serverCommunication: serverCommunicationHelper({
                        parameters: parameters,
                        apiUrl: "/grouped/cruds/${table}?version=1.0",
                        apiActionType: "",
                        requestType: "GET",
                        reduxActionType: "",
                    }),
                    },
                    search: {
                    permission: 'search_${table}',
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
                          apiUrl: "/crud/${table}?version=1.0",
                          apiActionType: "${table}_view",
                          requestType: "GET",
                          reduxActionType: "${table}_view",
                      }),
                      options: {
                          pageSize: 10,
                          pageSizeOptions: [10, 20, 30 , 50, { label: "All", value: -1 }],
                      },
                      onAction: (e) => {
                          logMessage(["Pagination Action", e]);
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
        `;
    },
    parameters: (groupTables, allColumns, objectName, analysis) => {
      // let groupTables = group;
      let table = groupTables[0];
      let nameTable = [];
      // let temp = [];

      groupTables.forEach((currTable) => {
        const columns = [...(allColumns[currTable] || [])]; // shallow copy
        if (!columns.length) {
          logMessage([`Columns for table ${table} not found.`]);
          return;
        }
        let foreignKeyColumns = columns
          .filter(
            (col) =>
              col.REFERENCED_COLUMN_NAME &&
              !["created_by", "updated_by"].includes(col.COLUMN_NAME)
          )
          .map((col) => ({ ...col })); // shallow copy each column

        const isBridgeTable = foreignKeyColumns.length >= 2;
        const nameColumn = columns.find((col) =>
          ["name", "description", "title"].some((keyword) =>
            col.COLUMN_NAME.toLowerCase().includes(keyword)
          )
        );

        if (isBridgeTable && !nameColumn) {
          let index = 0;
          while (index < foreignKeyColumns.length) {
            const fk = foreignKeyColumns[index++];
            const refTable = fk.REFERENCED_TABLE_NAME;
            const refColumns = [...(allColumns[refTable] || [])]; // shallow copy

            const nameCol = refColumns.find((col) =>
              ["name", "description", "title"].some((keyword) =>
                col.COLUMN_NAME.toLowerCase().includes(keyword)
              )
            );
            if (!nameCol) {
              const moreCols = refColumns
                .filter(
                  (col) =>
                    col.REFERENCED_COLUMN_NAME &&
                    !["created_by", "updated_by"].includes(col.COLUMN_NAME)
                )
                .map((col) => ({ ...col, BASE_TABLE: col.TABLE_NAME })); // clone and add base

              foreignKeyColumns.push(...moreCols);
            }
            if (!groupTables.includes(refTable)) {
              nameTable.push(refTable);
            }
          }
        }
      });
      let nameCols = nameTable
        .map((table) => {
          const col = allColumns[table]?.find((col) =>
            ["name", "description", "title"].some((keyword) =>
              col.COLUMN_NAME.toLowerCase().includes(keyword)
            )
          );
          return col || null;
        })
        .filter(Boolean);
      // logMessage(["name columns are", nameCols]);

      // groupTables = new Set([...groupTables, ...nameTable]);
      // groupTables = [...groupTables];
      // logMessage(["temp Cruds", groupTables[0], groupTables]);
      // logMessage(["what is here groupTables", groupTables]);
      const aliasedColumns = groupTables
        .map((table) => {
          const columns = allColumns[table];
          return columns
            .map(
              (col) =>
                ` '${table}_${snakeToCamel(col.COLUMN_NAME)}' : '${
                  col.COLUMN_NAME
                }'`
            )
            .join(", ");
        })
        .join(", ");
      return `
              export const parameters = {
                  "steps": [
                    ${groupTables
                      .map((table, index) => {
                        let columns = allColumns[table];
                        columns = [...columns];
                        const firstTable = groupTables[0];

                        return `
                        {
                            "title": "${table} Info",
                            "parameters": {
                                "fields": [
                                    {
                                        "name": "${snakeToCamel(table)}",
                                        "type": "section",
                                        "hideInCreateForm": false,
                                        "visible": false,
                                        "required": false,
                                        "disabled": false,
                                        "validations": "",
                                        "dependancyCheck": false,
                                        "isPrefilled": false,
                                        "source": "req.body",
                                        "title": "${snakeToSeparatedWords(
                                          objectName
                                        )}",
                                        "childFields": [
                                            ${genParameters(
                                              table,
                                              columns,
                                              allColumns,
                                              analysis,
                                              `/grouped/cruds/${firstTable}?version=1.0`
                                            )}
                                        ]
                                    }
                                ]
                            },
                            "permission": "view_${table}"
                        }`;
                      })
                      .join(",")}
                  ],
                  "colMapper": {${aliasedColumns}}
              };
          `;
    },
  sideBarProps: (allGroups) => {
    logMessage([allGroups]);

    return `
        import PersonIcon from '@mui/icons-material/Person';
        import SchoolIcon from "@mui/icons-material/School";
        import DashboardIcon from "@mui/icons-material/Dashboard";
        import GroupIcon from "@mui/icons-material/Group"; 
        import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
        import LockIcon from "@mui/icons-material/Lock";
        import GroupWorkIcon from "@mui/icons-material/GroupWork";
        import EmailIcon from "@mui/icons-material/Email";
        import ArticleIcon from "@mui/icons-material/Article";
        import AccountTreeIcon from '@mui/icons-material/AccountTree';
        import ListAltIcon from '@mui/icons-material/ListAlt';
    
        const iconMapping = {
          "Dashboard" : <DashboardIcon sx={{color: "#FF6347"}}/>,
          ${Object.keys(allGroups)
            .map(
              (groupKey) =>
                `"${capitalizeFirstLetter(
                  snakeToSeparatedWords(groupKey)
                )}": <GroupIcon sx={{color: "#FF6347"}}/>`
            )
            .join(",\n        ")},
          "Profile" : <PersonIcon sx={{color: "#FF6347"}}/>,
  
        };
    
        const data = {
          features: {
            sidebarItems: [
              {
                title: "Dashboard",
                icon: iconMapping["Dashboard"],
                permission: ["dashboard","operations_list_attachments"],
                path: "/dashboard",
              },
              ${Object.entries(allGroups)
                .map(
                  ([groupKey, groupTables]) =>
                    `
              {
                title: "${capitalizeFirstLetter(
                  snakeToSeparatedWords(groupKey)
                )} Management",
                icon: iconMapping["${capitalizeFirstLetter(
                  snakeToSeparatedWords(groupKey)
                )}"],
                path: "/${capitalizeFirstLetter(
                  snakeToCamel(groupKey)
                )}-managements/${capitalizeFirstLetter(groupKey)}",
                permission: ["view_${groupKey}"],
                subNav: [
                  ${groupTables
                    .map(
                      (table) => `
                      {
                        title: "${capitalizeFirstLetter(
                          snakeToSeparatedWords(table)
                        )}",
                        path: "/${capitalizeFirstLetter(
                          snakeToCamel(groupKey)
                        )}-managements/${capitalizeFirstLetter(table)}",
                        permission: ["view_${table}"]
                      }
                    `
                    )
                    .join(",")}
                ]
              }`
                )
                .join(",")}
              ,
              {
                title: "Profile",
                icon: iconMapping["Profile"],
                path: "/profile/account",
                permission: ["profile","operations_account"],
                subNav: [
                  {
                    title: "Account",
                    path: "/profile/account",
                    permission: ["account","operations_account"],
                  },
                  {
                    title: "Security",
                    path: "/profile/security",
                    permission: ["security","operations_security"],
                  },
                  {
                    title: "Privacy Policy",
                    path: "/profile/privacy-policy",
                    permission: ["privacy_policy","operations_privacy_policy"],
                  },
                ],
              },
            ]
          },
          onSelect: (selectedTab) => { logMessage([selectedTab]); },
        };
    
        const config = {
          viewMode: {
            presentation: ["sidebar", "collapsible"],
            mode: ["view", "edit"],
            isOpen: true,
            mobileBreakpoint: "(max-width:768px)",
          },
          features: {
            tokenAuthentication: true,
            permission: true,
          },
        };
    
      const appearance = {
              features: {
                styling: {
                  background: "#f5f5f5",
                  width: "280px",
                  boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
                  logoWidth: "120px",
                  logoHeight: "80px",
                  fontSize: "14px",
                  fontSizeSmall: "13px",
                  fontWeight: 500,
                  activeFontWeight: 600,
                  borderRadius: "8px",
                  light: {
                    background: "#f5f5f5",
                    boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
                    activeTextColor: "#4C49ED",
                    inactiveTextColor: "#5C5B98",
                    activeBackgroundColor: "rgba(76, 73, 237, 0.12)",
                    hoverBackgroundColor: "rgba(76, 73, 237, 0.08)",
                    accentColor: "#4C49ED",
                    secondaryAccentColor: "#FF6347",
                  },
                  dark: {
                    background: "#1E1E2F",
                    boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.4)",
                    activeTextColor: "#C7C6FF",
                    inactiveTextColor: "#A5A4C4",
                    activeBackgroundColor: "rgba(76, 73, 237, 0.25)",
                    hoverBackgroundColor: "rgba(76, 73, 237, 0.15)",
                    accentColor: "#6C63FF",
                    secondaryAccentColor: "#FF8571",
                  },
                },
              },
        };  
        export { data, config, appearance };
      `;
  },
};
function buildLabelQuery(groupTable, table, allColumns) {
  const columns = [...(allColumns[table] || [])]; // shallow copy
  let concatelable = [];
  if (!columns.length) {
    logMessage([`Columns for table ${table} not found.`]);
    return null;
  }

  const primaryKey = columns.find(
    (col) => col.COLUMN_KEY === "PRI"
  )?.COLUMN_NAME;

  let foreignKeyColumns = columns
    .filter(
      (col) =>
        col.REFERENCED_COLUMN_NAME &&
        !["created_by", "updated_by"].includes(col.COLUMN_NAME)
    )
    .map((col) => ({ ...col })); // shallow copy each column

  const isBridgeTable = foreignKeyColumns.length >= 2;

  const nameColumn = columns.find((col) =>
    ["name", "description", "title"].some((keyword) =>
      col.COLUMN_NAME.toLowerCase().includes(keyword)
    )
  );

  if (isBridgeTable && !nameColumn) {
    const joins = [];
    const nameFields = [];
    let baseTable;
    let index = 0;

    while (index < foreignKeyColumns.length) {
      const fk = foreignKeyColumns[index++];
      const refTable = fk.REFERENCED_TABLE_NAME;
      const refColumns = [...(allColumns[refTable] || [])]; // shallow copy

      const nameCol = refColumns.find((col) =>
        ["name", "description", "title"].some((keyword) =>
          col.COLUMN_NAME.toLowerCase().includes(keyword)
        )
      );

      baseTable = fk.TABLE_NAME;

      if (nameCol) {
        nameFields.push(`LEFT(${refTable}.${nameCol.COLUMN_NAME}, 10)`);
      } else {
        const moreCols = refColumns
          .filter(
            (col) =>
              col.REFERENCED_COLUMN_NAME &&
              !["created_by", "updated_by"].includes(col.COLUMN_NAME)
          )
          .map((col) => ({ ...col, BASE_TABLE: col.TABLE_NAME }));

        foreignKeyColumns.push(...moreCols);
      }

      joins
        .push
        // `LEFT JOIN ${refTable} ON ${baseTable}.${fk.COLUMN_NAME} = ${refTable}.${fk.REFERENCED_COLUMN_NAME}`
        ();
      concatelable.push(fk.REFERENCED_COLUMN_NAME);
    }

    // logMessage(["concatelable are", concatelable]);
    const nameConcat = nameFields.length
      ? `CONCAT_WS(' ', ${nameFields.join(", ")}) AS `
      : "'' AS label";

    return `${nameConcat} ${snakeToCamel(groupTable)}_${snakeToCamel(
      table
    )}Name,`;
  } else {
    return "";
  }
}

const groupedTemplates = {
  object: async (group, allColumns, objectName, permission) => {
    const setClauses = {};
    const aliasedColumns = {};
    let secondaryAliasedColumns = {};
    let groupTables = group;
    let table = groupTables[0];
    let nameTable = [];

    groupTables.forEach((currTable) => {
      const columns = [...(allColumns[currTable] || [])]; // shallow copy
      if (!columns.length) {
        logMessage([`Columns for table ${table} not found.`]);
        return;
      }
      let foreignKeyColumns = columns
        .filter(
          (col) =>
            col.REFERENCED_COLUMN_NAME &&
            !["created_by", "updated_by"].includes(col.COLUMN_NAME)
        )
        .map((col) => ({ ...col })); // shallow copy each column

      const isBridgeTable = foreignKeyColumns.length >= 2;
      const nameColumn = columns.find((col) =>
        ["name", "description", "title"].some((keyword) =>
          col.COLUMN_NAME.toLowerCase().includes(keyword)
        )
      );

      if (isBridgeTable && !nameColumn) {
        let index = 0;
        while (index < foreignKeyColumns.length) {
          const fk = foreignKeyColumns[index++];
          const refTable = fk.REFERENCED_TABLE_NAME;
          // logMessage(["refrencese table name", refTable]);
          const refColumns = [...(allColumns[refTable] || [])]; // shallow copy

          const nameCol = refColumns.find((col) =>
            ["name", "description", "title"].some((keyword) =>
              col.COLUMN_NAME.toLowerCase().includes(keyword)
            )
          );
          if (!nameCol) {
            const moreCols = refColumns
              .filter(
                (col) =>
                  col.REFERENCED_COLUMN_NAME &&
                  !["created_by", "updated_by"].includes(col.COLUMN_NAME)
              )
              .map((col) => ({ ...col, BASE_TABLE: col.TABLE_NAME })); // clone and add base

            foreignKeyColumns.push(...moreCols);
          }

          nameTable.push(refTable);
        }
      }
    });
    const query = buildLabelQuery(groupTables[1], nameTable[0], allColumns);
    // logMessage(["what is query", query]);
    groupTables = new Set([...groupTables, ...nameTable]);
    groupTables = [...groupTables];
    // logMessage(["temp Cruds", groupTables[0], groupTables]);

    // logMessage(["temp Cruds", groupTables[0], groupTables, nameTable]);
    groupTables.forEach((table) => {
      const columns = allColumns[table];

      if (!columns) {
        console.warn(`Columns for table ${table} not found.`);
        return;
      }

      aliasedColumns[table] = columns
        .filter(
          (col) =>
            ![
              columns.find((col) => col.COLUMN_KEY === "PRI")?.COLUMN_NAME,
              "status",
              "created_at",
              "updated_at",
              "created_by",
              "updated_by",
            ].includes(col.COLUMN_NAME)
        )
        .map(
          (col) =>
            `${table}.${col.COLUMN_NAME} as ${snakeToCamel(
              table
            )}_${snakeToCamel(col.COLUMN_NAME)}`
        )
        .join(", ");

      secondaryAliasedColumns[table] = columns
        .filter(
          (col) =>
            ![
              columns.find((col) => col.COLUMN_KEY === "PRI")?.COLUMN_NAME,
              "status",
              "created_at",
              "updated_at",
              "created_by",
              "updated_by",
            ].includes(col.COLUMN_NAME)
        )
        ?.map(
          (col) =>
            `${table}.${col.COLUMN_NAME}  ${snakeToCamel(
              nameTable.includes(table) ? "XYZ" : table
            )}_${snakeToCamel(col.COLUMN_NAME)}`
        )
        .join(", ");

      setClauses[table] = columns
        .filter(
          (col) =>
            ![
              columns.find((col) => col.COLUMN_KEY === "PRI")?.COLUMN_NAME,
              "status",
              "created_at",
              "updated_at",
            ].includes(col.COLUMN_NAME)
        )
        .map(
          (col) =>
            `${col.COLUMN_NAME} = {{${snakeToCamel(table)}_${snakeToCamel(
              col.COLUMN_NAME
            )}}}`
        )
        .join(", ");
    });

    const generateJoinQueries = (groupTables, allColumns) => {
      let includedTables = new Set();
      let joinClauses = [];
      let fromTable = groupTables[0];
      includedTables.add(fromTable);

      let fromClause = `FROM ${fromTable}`;

      for (let i = 1; i < groupTables.length; i++) {
        const table = groupTables[i];
        const columns = allColumns[table];

        if (!columns) continue;

        const relationships = [];
        for (const includedTable of includedTables) {
          const includedColumns = allColumns[includedTable];
          if (!includedColumns) continue;

          for (const col of columns) {
            const match = includedColumns.find(
              (includedCol) =>
                ((col.REFERENCED_TABLE_NAME === includedTable &&
                  col.REFERENCED_COLUMN_NAME === includedCol.COLUMN_NAME) ||
                  (includedCol.REFERENCED_TABLE_NAME === table &&
                    includedCol.REFERENCED_COLUMN_NAME === col.COLUMN_NAME)) &&
                !["created_by", "updated_by"].includes(col.COLUMN_NAME)
            );

            if (match) {
              relationships.push({
                currentTableColumn: col.COLUMN_NAME,
                includedTable,
                includedTableColumn: match.COLUMN_NAME,
              });
            }
          }
        }
        if (relationships.length === 1) {
          const { currentTableColumn, includedTable, includedTableColumn } =
            relationships[0];
          joinClauses.push(
            `LEFT JOIN ${table} ON ${table}.${currentTableColumn} = ${includedTable}.${includedTableColumn} AND ${table}.status !='inactive'`
          );
        } else if (relationships.length > 1) {
          const conditions = relationships
            .filter(
              (relationship) =>
                relationship.includedTableColumn !== "created_by"
            )
            .map(
              ({ currentTableColumn, includedTable, includedTableColumn }) =>
                `${table}.${currentTableColumn} = ${includedTable}.${includedTableColumn}`
            )
            .join(" OR ");
          logMessage(["conditions are", conditions]);
          joinClauses.push(`LEFT JOIN ${table} ON (${conditions})`);
        }

        includedTables.add(table);
      }

      const fullFromClause = `${fromClause} ${joinClauses.join(" ")}`;

      return fullFromClause;
    };
    // logMessage([//   "table differenciation are",
    //   groupTables[0],
    //   groupTables,

    //   nameTable
    //]);

    return `
        const parameters = require('../../../Src/Apis/GeneratedApis/Versions/Crud_Objects/CRUD_parameters');
        global.GroupedCruds${objectName}_object = {
          versions: {
            versionData: [
              {
                "*": {
                  steps: [
                    ${groupTables
                      .filter(
                        (table) =>
                          !nameTable.includes(table) || group.includes(table)
                      )

                      .map(
                        (table) => `
                    {
                      platform: 
                      [
                        {   
                          platformIP : ['*'],              
                          supported: ['*'],
                          config: {
                            features: {
                              multistep: false,
                              parameters: true,
                              pagination: true,
                            },
                            communication: {
                              encryption: {
                                platformEncryption: true,
                              },
                            },
                            verification: {
                              otp: false,
                              accessToken: false,
                            }
                          }
                        }
                      ],
                      data: {
                        parameters: parameters,
                        apiInfo: {
                          preProcessFunction: [],
                          query: {
                          queryNature: { Add: "INSERT", Update: "UPDATE", View: "SELECT", Delete: "DELETE", List: "SELECT" },
                            queryPayload: {
                              Add: async(req, decryptedPayload) => { return "INSERT INTO ${table} (${allColumns[
                          table
                        ]
                          ?.filter(
                            (col) =>
                              ![
                                allColumns[table].find(
                                  (col) => col.COLUMN_KEY === "PRI"
                                )?.COLUMN_NAME,
                                "status",
                                "created_at",
                                "updated_at",
                                "created_by",
                                "updated_by",
                              ].includes(col.COLUMN_NAME)
                          )
                          ?.map((col) => col.COLUMN_NAME)
                          ?.join(
                            ", "
                          )} , created_by, updated_by) VALUES (${allColumns[
                          table
                        ]
                          ?.filter(
                            (col) =>
                              ![
                                allColumns[table].find(
                                  (col) => col.COLUMN_KEY === "PRI"
                                )?.COLUMN_NAME,
                                "status",
                                "created_at",
                                "updated_at",
                                "created_by",
                                "updated_by",
                              ].includes(col.COLUMN_NAME)
                          )
                          ?.map(
                            (col) =>
                              `{{${snakeToCamel(table)}_${snakeToCamel(
                                col.COLUMN_NAME
                              )}}}`
                          )
                          ?.join(
                            ", "
                          )}, {{actionPerformerURDD}}, {{actionPerformerURDD}})"},
                              
                              Update: async(req, decryptedPayload) => { return "UPDATE ${table} SET ${
                          setClauses[table]
                        } WHERE ${
                          allColumns[table].find(
                            (col) => col.COLUMN_KEY === "PRI"
                          )?.COLUMN_NAME
                        } = {{id}}"},
                              
                              List: async(req, decryptedPayload) => { return "SELECT COUNT(*) OVER () AS table_count, ${
                                allColumns[table].find(
                                  (col) => col.COLUMN_KEY === "PRI"
                                )?.COLUMN_NAME
                              } as ${snakeToCamel(table)}_id,${
                          allColumns[table].find(
                            (col) => col.COLUMN_KEY === "PRI"
                          )?.COLUMN_NAME
                        } as id, ${
                          aliasedColumns[table]
                        }  FROM ${table} WHERE status != 'inactive'"},
                                
                              View: async(req, decryptedPayload) => { return \`
                              SELECT 
                            ${groupTables
                              .map((innerTable) => {
                                const primaryKey = allColumns[innerTable]?.find(
                                  (col) => col.COLUMN_KEY === "PRI"
                                )?.COLUMN_NAME;

                                const mappedValue = `${innerTable}.${primaryKey} as ${snakeToCamel(
                                  innerTable
                                )}_id`;

                                // Styled console.log

                                return mappedValue;
                              })
                              .join(", ")},
                        ${groupTables[1]}.${
                          allColumns[groupTables[1]]?.find(
                            (col) => col.COLUMN_KEY === "PRI"
                          )?.COLUMN_NAME
                        } as id,
                       ${groupTables
                         .map((innerTable) => {
                           const nameCol = allColumns[innerTable].find((col) =>
                             ["name", "description", "title"].some((keyword) =>
                               col.COLUMN_NAME.toLowerCase().includes(keyword)
                             )
                           );

                           const primaryKey = allColumns[innerTable].find(
                             (col) => col.COLUMN_KEY === "PRI"
                           )?.COLUMN_NAME;

                           return nameTable.includes(innerTable) && nameCol
                             ? `${innerTable}.${
                                 nameCol?.COLUMN_NAME
                               } as  ${snakeToCamel(
                                 groupTables[1]
                               )}_${snakeToCamel(nameCol.TABLE_NAME)}Name`
                             : `${innerTable}.${primaryKey} as  ${snakeToCamel(
                                 innerTable
                               )}_${snakeToCamel(primaryKey)}`;
                         })
                         .join(", ")},

                          ${groupTables
                            .map((innerTable) => {
                              const excludeSet = new Set([
                                "status",
                                "created_at",
                                "updated_at",
                                "created_by",
                                "updated_by",
                              ]);
                              const primaryKey = allColumns[innerTable].find(
                                (col) => !excludeSet.has(col.COLUMN_NAME)
                              )?.COLUMN_NAME;

                              return `${innerTable}.${primaryKey} as ${snakeToCamel(
                                groupTables[1]
                              )}_${snakeToCamel(primaryKey)}`;
                            })
                            .join(", ")},
                          
                       
                         
                          ${query} ${aliasedColumns[table]}, 
                        ${aliasedColumns[groupTables[1]]} ${generateJoinQueries(
                          groupTables,
                          allColumns
                        )} WHERE (${table}.${
                          allColumns[table].find(
                            (col) => col.COLUMN_KEY === "PRI"
                          )?.COLUMN_NAME
                        } = {{id}}  AND  ${table}.status != 'inactive')
                          
                          
                          \` },
                                        
                                  Delete: async(req, decryptedPayload) => { return "UPDATE ${table} SET status = 'inactive' WHERE ${
                          allColumns[table].find(
                            (col) => col.COLUMN_KEY === "PRI"
                          )?.COLUMN_NAME
                        } = {{id}}"}    

                            },
                            database: "mainDb",
                          },
                          utilityFunctions: {
                            callbackFunction: null,
                            payloadFunction: [],
                            crudFunction: "crudApiGenerator",
                          },
                          postProcessFunction: null
                        },
                        requestMetaData: {
                          requestMethod: { Add: "POST", View: "GET", Update: "PUT", Delete: "DELETE", List: "GET" },
                          permission: null,
                          providedPermissions: false,
                          pagination: { pageSize: 10 },
                        },
                      },
                      response: {
                        successMessage: "${table} Grouped CRUD Hit successfully!",
                        errorMessage: "Failed to retrieve task_history.",
                      },
                    }
                    `
                      )
                      .join(",")}
                  ],
                },
              },
            ],
          },
        };
        module.exports = {GroupedCruds${objectName}_object}
  
      `;
  },
  parameters: (groupTables, allColumns, objectName) => {
    const aliasedColumns = groupTables
      .map((table) => {
        const columns = allColumns[table];
        return columns
          .map(
            (col) =>
              ` '${snakeToCamel(table)}_${snakeToCamel(col.COLUMN_NAME)}' : '${
                col.COLUMN_NAME
              }'`
          )
          .join(", ");
      })
      .join(", ");

    return `
          const parameters = {
              "steps": [
                  ${groupTables
                    .map((table, index) => {
                      const columns = allColumns[table];
                      return `
                          {
                              "title": "${snakeToSeparatedWords(
                                table
                              )} Grouped CRUD",
                              "parameters": {
                                  "fields": [
                                      {
                                          "name": "${table}",
                                          "type": "section",
                                          "hideInCreateForm": false,
                                          "visible": false,
                                          "required": false,
                                          "disabled": false,
                                          "validations": "",
                                          "dependancyCheck": false,
                                          "isPrefilled": false,
                                          "source": "req.body",
                                          "title": "${snakeToSeparatedWords(
                                            objectName
                                          )}",
                                          "childFields": [
                                                  {
                                                    "name": "${snakeToCamel(
                                                      table
                                                    )}_id",
                                                    "label": "id",
                                                    "title": "",
                                                    "type": "textField",
                                                    "required": false,
                                                    "hideInCreateForm": true,
                                                    "visible": true,
                                                    "disabled": false,
                                                    "dependancyCheck": false,
                                                    "isPrefilled": false,
                                                    "source": "req.query",
                                                    "min": "",
                                                    "max": "",
                                                    "selectServer": false,
                                                    "dynamicKey": "${snakeToCamel(
                                                      table
                                                    )}_id"
                                                  },
                                                  {
                                                    "name": "actionPerformerURDD",
                                                    "label": "actionPerformerURDD",
                                                    "title": "",
                                                    "type": "textField",
                                                    "required": false,
                                                    "hideInCreateForm": false,
                                                    "visible": true,
                                                    "disabled": false,
                                                    "dependancyCheck": false,
                                                    "isPrefilled": false,
                                                    "source": "req.body",
                                                    "min": "",
                                                    "max": "",
                                                    "selectServer": false,
                                                    "dynamicKey": "actionPerformerURDD",
                                                    "alias" : "actionPerformerURDD",
                                                },
                                              ${columns
                                                .filter(
                                                  (col) =>
                                                    ![
                                                      "status",
                                                      "created_at",
                                                      "updated_at",
                                                      "created_by",
                                                      "updated_by",
                                                      columns.find(
                                                        (col) =>
                                                          col.COLUMN_KEY ===
                                                          "PRI"
                                                      )?.COLUMN_NAME,
                                                    ].includes(col.COLUMN_NAME)
                                                )
                                                .map(
                                                  (col) => `
                                                      {
                                                          "name": "${snakeToCamel(
                                                            col.COLUMN_NAME
                                                          )}",
                                                          "label": "${snakeToSeparatedWords(
                                                            col.COLUMN_NAME
                                                          )}",
                                                          "title": "",
                                                          "type": "textField",
                                                          "required": false,
                                                          "hideInCreateForm": false,
                                                          "visible": true,
                                                          "disabled": false,
                                                          "dependancyCheck": false,
                                                          "isPrefilled": false,
                                                          "source": "req.body",
                                                          "min": "",
                                                          "max": "",
                                                          "selectServer": false,
                                                          "dynamicKey": "${snakeToCamel(
                                                            table
                                                          )}_${snakeToCamel(
                                                    col.COLUMN_NAME
                                                  )}"
                                                      }`
                                                )
                                                .join(",")}
                                          ]
                                      }
                                  ]
                              },
                              "buttons": [
                                  {
                                      "type": "submit",
                                      "label": "Submit"
                                  }
                              ],
                              "permission": "${table}_view"
                          }`;
                    })
                    .join(",")}
              ],
              "colMapper": "{${aliasedColumns}}"
          };
          module.exports = parameters;
      `;
  },
};
const dropdownTemplates = {
  object: async (table, allColumns) => {
    const columns = [...(allColumns[table] || [])]; // shallow copy
    if (!columns.length) {
      // logMessage([`Columns for table ${table} not found.`]);
      return;
    }

    const primaryKey = columns.find(
      (col) => col.COLUMN_KEY === "PRI"
    )?.COLUMN_NAME;

    // Shallow copy of FK columns
    let foreignKeyColumns = columns
      .filter(
        (col) =>
          col.REFERENCED_COLUMN_NAME &&
          !["created_by", "updated_by"].includes(col.COLUMN_NAME)
      )
      .map((col) => ({ ...col })); // shallow copy each column

    const isBridgeTable = foreignKeyColumns.length >= 2;
    let queryPayload;

    const nameColumn = columns.find((col) =>
      ["name", "description", "title"].some((keyword) =>
        col.COLUMN_NAME.toLowerCase().includes(keyword)
      )
    );

    if (isBridgeTable && !nameColumn) {
      const joins = [];
      const nameFields = [];
      let baseTable;

      let index = 0;
      while (index < foreignKeyColumns.length) {
        const fk = foreignKeyColumns[index++];
        const refTable = fk.REFERENCED_TABLE_NAME;
        const refColumns = [...(allColumns[refTable] || [])]; // shallow copy

        const nameCol = refColumns.find((col) =>
          ["name", "description", "title"].some((keyword) =>
            col.COLUMN_NAME.toLowerCase().includes(keyword)
          )
        );

        baseTable = fk.TABLE_NAME;

        if (nameCol) {
          nameFields.push(`LEFT(${refTable}.${nameCol.COLUMN_NAME}, 10)`);
        } else {
          const moreCols = refColumns
            .filter(
              (col) =>
                col.REFERENCED_COLUMN_NAME &&
                !["created_by", "updated_by"].includes(col.COLUMN_NAME)
            )
            .map((col) => ({ ...col, BASE_TABLE: col.TABLE_NAME })); // clone and add base

          foreignKeyColumns.push(...moreCols);
        }

        joins.push(
          `LEFT JOIN ${refTable} ON ${baseTable}.${fk.COLUMN_NAME} = ${refTable}.${fk.REFERENCED_COLUMN_NAME}`
        );
      }

      const nameConcat = nameFields.length
        ? `CONCAT_WS(' ', ${nameFields.join(", ")}) AS label`
        : "'' AS label";

      queryPayload = `SELECT ${table}.${primaryKey} as value, ${nameConcat} FROM ${table} ${joins.join(
        " "
      )}`;
    } else {
      queryPayload = `SELECT LEFT(${nameColumn?.COLUMN_NAME}, 10) as label, ${primaryKey} as value FROM ${table}`;
    }

    return `
      global.${
        table.charAt(0).toUpperCase() + table.slice(1)
      }Dropdown_object = {
        versions: {
          versionData: [
            {
              "*": {
                steps: [
                  {
                  platform:
                    [
                      {     
                        platformIP : ['*'],                  
                        supported: ['*'],
                        config: {
                          features: {
                            multistep: false,
                            parameters: true,
                            pagination: true,
                          },
                          communication: {
                            encryption: {
                              platformEncryption: true,
                            },
                          },
                          verification: {
                            otp: false,
                            accessToken: false,
                          }
                        }
                      }
                    ],
                    data: {
                      parameters: null,
                      apiInfo: {
                      
                        preProcessFunction : [],
                        query: {
                          "queryPayload": "${queryPayload} where ${table}.status!='inactive'",
                        },
                        database: "mainDb",
                        utilityFunctions: {
                          callbackFunction: null,
                          payloadFunction: [],
                        },
                        postProcessFunction: null,
                      },
                      requestMetaData: {
                        requestMethod: "GET",
                        permission: null,
                        providedPermissions: false,
                        pagination: { pageSize: 10 },
                      },
                    },
                    response: {
                      successMessage: "${table} retrieved successfully!",
                      errorMessage: "Failed to retrieve ${table}.",
                    },
                  }
                ],
              },
            },
          ],
        },
      };
      module.exports = { ${
        table.charAt(0).toUpperCase() + table.slice(1)
      }Dropdown_object }
    `;
  },
};

module.exports = {
  frontEndTemplate,
  crudTemplates,
  groupedFrontTemplates,
  groupedTemplates,
  dropdownTemplates,
  genCrudParameters
};
