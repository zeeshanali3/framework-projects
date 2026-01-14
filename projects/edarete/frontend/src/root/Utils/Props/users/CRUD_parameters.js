export const parameters = {
  "steps": [
    {
      "title": "User Info",
      "parameters": {
        "fields": [
          {
            "name": "users",
            "type": "section",
            "title": "Personal Information",
            "childFields": [
              {
                "name": "email",
                "label": "Email",
                "visible": true,
                "title": "",
                "type": "textField",
                "required": true,
                "disabled": false,
                "min": "",
                "max": "",
                "dependancyCheck": false,
                "isPrefilled": false,
                "dynamicKey": "users_email"
              },
              {
                "name": "firstName",
                "label": "First Name",
                "title": "",
                "visible": true,
                "type": "textField",
                "required": true,
                "disabled": false,
                "min": "",
                "max": "",
                "dependancyCheck": false,
                "isPrefilled": false,
                "dynamicKey": "users_firstName"
              },
              {
                "name": "lastName",
                "label": "Last Name",
                "title": "",
                "visible": true,
                "type": "textField",
                "required": true,
                "disabled": false,
                "min": "",
                "max": "",
                "dependancyCheck": false,
                "isPrefilled": false,
                "dynamicKey": "users_lastName"
              },
              {
                "name": "phoneNum",
                "label": "Phone number",
                "title": "",
                "type": "textField",
                "visible": true,
                "required": true,
                "disabled": false,
                "dependancyCheck": false,
                "isPrefilled": false,
                "min": "",
                "max": "",
                "dynamicKey": "users_phoneNum"
              },
              {
                "name": "cnic",
                "label": "Enter CNIC",
                "title": "",
                "type": "textField",
                "required": true,
                "disabled": false,
                "dependancyCheck": false,
                "isPrefilled": false,
                "min": "",
                "max": "",
                "dynamicKey": "users_cnic"
              },
              {
                "name": "gender",
                "label": "Enter Gender",
                "title": "",
                "type": "select",
                "required": true,
                "disabled": false,
                "min": "",
                "max": "",
                "dependancyCheck": false,
                "isPrefilled": false,
                "options": [
                  {
                    "value": "M",
                    "label": "Male"
                  },
                  {
                    "value": "F",
                    "label": "Female"
                  },
                  {
                    "value": "O",
                    "label": "Other"
                  }
                ],
                "dynamicKey": "users_gender"
              },
              {
                "name": "fatherName",
                "label": "Enter Father Name",
                "title": "",
                "type": "textField",
                "required": true,
                "disabled": false,
                "dependancyCheck": false,
                "isPrefilled": false,
                "min": "",
                "max": "",
                "dynamicKey": "users_fatherName"
              },
              {
                "name": "address",
                "label": "Enter Address",
                "title": "",
                "type": "textField",
                "required": true,
                "disabled": false,
                "dependancyCheck": false,
                "isPrefilled": false,
                "min": "",
                "max": "",
                "dynamicKey": "users_address"
              },
              {
                "name": "dob",
                "label": "Enter Date Of Birth",
                "title": "",
                "type": "date",
                "required": true,
                "disabled": false,
                "dependancyCheck": false,
                "isPrefilled": false,
                "minDate": "1930-01-03",
                "maxDate": "",
                "dynamicKey": "users_dob"
              },
              {
                "name": "bloodGroup",
                "label": "Ener Blood Group",
                "title": "",
                "type": "select",
                "required": true,
                "disabled": false,
                "dependancyCheck": false,
                "isPrefilled": false,
                "options": [
                  {
                    "value": "a_positve",
                    "label": "A+"
                  },
                  {
                    "value": "a_negative",
                    "label": "A-"
                  },
                  {
                    "value": "b_positive",
                    "label": "B+"
                  },
                  {
                    "value": "b_negative",
                    "label": "B-"
                  },
                  {
                    "value": "ab_positive",
                    "label": "AB+"
                  },
                  {
                    "value": "ab_negative",
                    "label": "AB-"
                  },
                  {
                    "value": "o_negative",
                    "label": "O-"
                  },
                  {
                    "value": "o_positive",
                    "label": "O+"
                  }
                ],
                "dynamicKey": "users_bloodGroup"
              },
              {
                "name": "religion",
                "label": "Enter Religion",
                "title": "",
                "type": "select",
                "required": true,
                "disabled": false,
                "dependancyCheck": false,
                "isPrefilled": false,
                "options": [
                  {
                    "value": "islam",
                    "label": "Islam"
                  },
                  {
                    "value": "christianity",
                    "label": "Christianity"
                  }
                ],
                "dynamicKey": "users_religion"
              }
            ]
          }
        ]
      },
      "permission": "admin_users_add"
    },
    {
      "title": "Role Information",
      "parameters": {
        "fields": [
          {
            "name": "roleInfo",
            "type": "section",
            "title": "Role Information",
            "childFields": [
              {
                "name": "rolesDetails",
                "type": "listOfFields",
                "label": "Roles Details",
                "childFields": [
                  {
                    "name": "role",
                    "label": "Select Role",
                    "title": "",
                    "type": "select",
                    "required": false,
                    "disabled": false,
                    "dependancyCheck": false,
                    "isPrefilled": false,
                    "selectServer": true,
                    "selectServerUrl": "/list/roles_designations_department/dropdown?version=1.0",
                    "options": [
                      {
                        "value": "admin",
                        "label": "Admin"
                      },
                      {
                        "value": "It_operations",
                        "label": "IT Operations"
                      }
                    ],
                    "dynamicKey": "roleInfo_role"
                  },
                  {
                    "name": "startDate",
                    "label": "Select Start Date",
                    "title": "",
                    "type": "date",
                    "required": false,
                    "disabled": false,
                    "dependancyCheck": false,
                    "isPrefilled": false,
                    "dynamicKey": "roleInfo_startDate"
                  },
                  {
                    "name": "endDate",
                    "label": "End Date",
                    "title": "",
                    "type": "date",
                    "required": false,
                    "disabled": false,
                    "dependancyCheck": false,
                    "isPrefilled": false,
                    "childFields": [],
                    "dynamicKey": "roleInfo_endDate"
                  }
                ]
              }
            ]
          }
        ]
      },
      "serverCommunication": {
        "data": {
          "sagaCommunication": {
            "apiActionType": "",
            "requestType": "POST",
            "apiUrl": "/crud/users?version=1.0",
            "metaData": true,
            "body": {
              "formValues": "<formValues>"
            },
            "reduxActionType": ""
          }
        },
        "config": {
          "features": {
            "tokenAuthentication": true,
            "permission": true
          }
        },
        "response": {}
      },
      "buttons": [
        {
          "type": "submit",
          "label": "Submit"
        }
      ],
      "permission": "admin_users_view"
    }
  ],
  "colMapper": "{'users_email': 'users_email', 'users_firstName': 'users_firstName', 'users_lastName': 'users_lastName', 'users_phoneNum': 'users_phoneNum', 'users_cnic': 'users_cnic', 'users_gender': 'users_gender', 'users_fatherName': 'users_fatherName', 'users_address': 'users_address', 'users_dob': 'users_dob', 'users_bloodGroup': 'users_bloodGroup', 'users_religion': 'users_religion', 'roleInfo_role': 'roleInfo_role', 'roleInfo_startDate': 'roleInfo_startDate', 'roleInfo_endDate': 'roleInfo_endDate'}"
};