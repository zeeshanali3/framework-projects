export const parameters = {
  "steps": [
    {
      "title": "Step 1",
      "parameters": {
        "fields": [
          {
            "name": "designations",
            "type": "section",
            "hideInCreateForm": false,
            "visible": false,
            "required": false,
            "disabled": false,
            "validations": "",
            "dependancyCheck": false,
            "isPrefilled": false,
            "source": "req.body",
            "title": "Designations",
            "childFields": [
              {
                "name": "designationId",
                "label": "Designation Id",
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
                "dynamicKey": "designations_designationId"
              },
              {
                "name": "designationName",
                "label": "Designation Name",
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
                "dynamicKey": "designations_designationName"
              },
              {
                "name": "seniorDesignationId",
                "label": "Senior Desingation Name",
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
                "dynamicKey": "designations_seniorDesignationName"
              },
              {
                "name": "seniorDesignationId",
                "label": "Senior Desingation",
                "title": "",
                "type": "select",
                "required": false,
                "hideInCreateForm": false,
                "selectServer": true,
                "selectServerUrl": "/list/designations/dropdown?version=1.0",
                "visible": false,
                "disabled": false,
                "dependancyCheck": false,
                "isPrefilled": false,
                "min": "",
                "max": "",
                "dynamicKey": "designations_seniorDesignationId"
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
                "dynamicKey": "designations_status"
              },
              {
                "name": "updatedBy",
                "label": "Updated By",
                "title": "",
                "type": "select",
                "selectServer": true,
                "selectServerUrl": "/list/user_roles_designations_department/dropdown?version=1.0",
                "required": false,
                "hideInCreateForm": true,
                "visible": false,
                "disabled": false,
                "dependancyCheck": false,
                "isPrefilled": false,
                "min": "",
                "max": "",
                "dynamicKey": "designations_updatedBy"
              },
              {
                "name": "createdAt",
                "label": "Created At",
                "title": "",
                "type": "dateTime",
                "required": false,
                "hideInCreateForm": true,
                "visible": false,
                "disabled": false,
                "dependancyCheck": false,
                "isPrefilled": false,
                "min": "",
                "max": "",
                "dynamicKey": "designations_createdAt"
              },
              {
                "name": "updatedAt",
                "label": "Updated At",
                "title": "",
                "type": "dateTime",
                "required": false,
                "hideInCreateForm": true,
                "visible": false,
                "disabled": false,
                "dependancyCheck": false,
                "isPrefilled": false,
                "min": "",
                "max": "",
                "dynamicKey": "designations_updatedAt"
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
  "colMapper": "{'designations_designationId': 'designations_designationId', 'designations_designationName': 'designations_designationName', 'designations_seniorDesignationName': 'designations_seniorDesignationName', 'designations_seniorDesignationId': 'designations_seniorDesignationId', 'designations_status': 'designations_status', 'designations_updatedBy': 'designations_updatedBy', 'designations_createdAt': 'designations_createdAt', 'designations_updatedAt': 'designations_updatedAt'}"
};