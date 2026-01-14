export const parameters = {
  "steps": [
    {
      "title": "Step 1",
      "parameters": {
        "fields": [
          {
            "name": "roles",
            "type": "section",
            "hideInCreateForm": false,
            "visible": true,
            "required": false,
            "disabled": false,
            "validations": "",
            "dependancyCheck": false,
            "isPrefilled": false,
            "source": "req.body",
            "title": "Roles ",
            "childFields": [
              {
                "name": "roleId",
                "label": "Role Id",
                "title": "",
                "type": "textField",
                "required": false,
                "hideInCreateForm": true,
                "visible": false,
                "disabled": false,
                "min": "",
                "max": "",
                "dependancyCheck": false,
                "isPrefilled": false,
                "dynamicKey": "roles_roleId"
              },
              {
                "name": "roleName",
                "label": "Role Name",
                "title": "",
                "type": "textField",
                "required": false,
                "hideInCreateForm": false,
                "visible": true,
                "disabled": false,
                "dependancyCheck": false,
                "isPrefilled": false,
                "min": "",
                "max": "",
                "dynamicKey": "roles_roleName"
              },
              {
                "name": "seniorRoleName",
                "label": "Senior Role Name",
                "title": "",
                "type": "textField",
                "required": false,
                "hideInCreateForm": true,
                "visible": true,
                "disabled": false,
                "dependancyCheck": false,
                "isPrefilled": false,
                "min": "",
                "max": "",
                "dynamicKey": "roles_seniorRoleName"
              },
              {
                "name": "seniorRoleId",
                "label": "Senior Role",
                "title": "",
                "type": "select",
                "required": false,
                "hideInCreateForm": false,
                "visible": false,
                "disabled": false,
                "dependancyCheck": false,
                "isPrefilled": false,
                "selectServer": true,
                "selectServerUrl": "/list/roles/dropdown?version=1.0",
                "min": "",
                "max": "",
                "dynamicKey": "roles_seniorRoleId"
              },
              {
                "name": "status",
                "label": "Status",
                "title": "",
                "type": "textField",
                "required": false,
                "hideInCreateForm": true,
                "visible": false,
                "disabled": false,
                "dependancyCheck": false,
                "isPrefilled": false,
                "min": "",
                "max": "",
                "dynamicKey": "roles_status"
              },
              {
                "name": "updatedBy",
                "label": "Updated By",
                "title": "",
                "type": "textField",
                "required": false,
                "hideInCreateForm": true,
                "visible": false,
                "disabled": false,
                "dependancyCheck": false,
                "isPrefilled": false,
                "min": "",
                "max": "",
                "dynamicKey": "roles_updatedBy"
              },
              {
                "name": "createdAt",
                "label": "Created At",
                "title": "",
                "type": "textField",
                "required": false,
                "hideInCreateForm": true,
                "visible": false,
                "disabled": false,
                "dependancyCheck": false,
                "isPrefilled": false,
                "min": "",
                "max": "",
                "dynamicKey": "roles_createdAt"
              },
              {
                "name": "updatedAt",
                "label": "updated At",
                "title": "",
                "type": "textField",
                "required": false,
                "hideInCreateForm": true,
                "visible": false,
                "disabled": false,
                "dependancyCheck": false,
                "isPrefilled": false,
                "min": "",
                "max": "",
                "dynamicKey": "roles_updatedAt"
              }
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
  "colMapper": "{'roles_roleId': 'roles_roleId', 'roles_roleName': 'roles_roleName', 'roles_seniorRoleName': 'roles_seniorRoleName', 'roles_seniorRoleId': 'roles_seniorRoleId', 'roles_status': 'roles_status', 'roles_updatedBy': 'roles_updatedBy', 'roles_createdAt': 'roles_createdAt', 'roles_updatedAt': 'roles_updatedAt'}"
};