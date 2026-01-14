export const parameters = {
  "steps": [
    {
      "title": "Step 1",
      "parameters": {
        "fields": [
          {
            "name": "rolesDesignationsDepartment",
            "type": "section",
            "hideInCreateForm": false,
            "visible": true,
            "required": false,
            "disabled": false,
            "validations": "",
            "dependancyCheck": false,
            "isPrefilled": false,
            "source": "req.body",
            "title": "Roles Designation Department",
            "childFields": [
              {
                "name": "rolesDesignationDepartmentId",
                "label": "Roles Designation Department Id",
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
                "dynamicKey": "rolesDesignationsDepartment_rolesDesignationDepartmentId"
              },
              {
                "name": "designationId",
                "label": "Designation",
                "title": "",
                "type": "select",
                "required": false,
                "hideInCreateForm": false,
                "visible": false,
                "disabled": false,
                "selectServer": true,
                "selectServerUrl": "/list/designations/dropdown?version=1.0",
                "dependancyCheck": false,
                "isPrefilled": false,
                "min": "",
                "max": "",
                "dynamicKey": "rolesDesignationsDepartment_designationId"
              },
              {
                "name": "designationName",
                "label": "Designation Name",
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
                "dynamicKey": "rolesDesignationsDepartment_designationName"
              },
              {
                "name": "rolesId",
                "label": "Roles Id",
                "title": "",
                "type": "select",
                "required": false,
                "hideInCreateForm": false,
                "visible": false,
                "disabled": false,
                "selectServer": true,
                "selectServerUrl": "/list/roles/dropdown?version=1.0",
                "dependancyCheck": false,
                "isPrefilled": false,
                "min": "",
                "max": "",
                "dynamicKey": "rolesDesignationsDepartment_rolesId"
              },
              {
                "name": "rolesName",
                "label": "Roles Name",
                "title": "",
                "type": "textField",
                "required": false,
                "hideInCreateForm": true,
                "visible": true,
                "disabled": false,
                "selectServer": true,
                "dependancyCheck": false,
                "isPrefilled": false,
                "min": "",
                "max": "",
                "dynamicKey": "rolesDesignationsDepartment_rolesName"
              },
              {
                "name": "departmentId",
                "label": "Department Id",
                "title": "",
                "type": "select",
                "required": false,
                "hideInCreateForm": false,
                "visible": false,
                "disabled": false,
                "selectServer": true,
                "selectServerUrl": "/list/departments/dropdown?version=1.0",
                "dependancyCheck": false,
                "isPrefilled": false,
                "min": "",
                "max": "",
                "dynamicKey": "rolesDesignationsDepartment_departmentId"
              },
              {
                "name": "departmentName",
                "label": "Department Name",
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
                "dynamicKey": "rolesDesignationsDepartment_departmentName"
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
                "dynamicKey": "rolesDesignationsDepartment_status"
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
                "dynamicKey": "rolesDesignationsDepartment_updatedBy"
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
                "dynamicKey": "rolesDesignationsDepartment_createdAt"
              },
              {
                "name": "updatedAt",
                "label": "Updated At",
                "title": "",
                "type": "",
                "required": false,
                "hideInCreateForm": true,
                "visible": false,
                "disabled": false,
                "dependancyCheck": false,
                "isPrefilled": false,
                "dynamicKey": "rolesDesignationsDepartment_updatedAt"
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
  "colMapper": "{'rolesDesignationsDepartment_rolesDesignationDepartmentId': 'rolesDesignationsDepartment_rolesDesignationDepartmentId', 'rolesDesignationsDepartment_designationId': 'rolesDesignationsDepartment_designationId', 'rolesDesignationsDepartment_designationName': 'rolesDesignationsDepartment_designationName', 'rolesDesignationsDepartment_rolesId': 'rolesDesignationsDepartment_rolesId', 'rolesDesignationsDepartment_rolesName': 'rolesDesignationsDepartment_rolesName', 'rolesDesignationsDepartment_departmentId': 'rolesDesignationsDepartment_departmentId', 'rolesDesignationsDepartment_departmentName': 'rolesDesignationsDepartment_departmentName', 'rolesDesignationsDepartment_status': 'rolesDesignationsDepartment_status', 'rolesDesignationsDepartment_updatedBy': 'rolesDesignationsDepartment_updatedBy', 'rolesDesignationsDepartment_createdAt': 'rolesDesignationsDepartment_createdAt', 'rolesDesignationsDepartment_updatedAt': 'rolesDesignationsDepartment_updatedAt'}"
};