export const parameters = {
  "steps": [
    {
      "title": "stepOne",
      "parameters": {
        "fields": [
          {
            "name": "departments",
            "displayName": "departments",
            "type": "section",
            "title": "Department",
            "hideInCreateForm": false,
            "visible": true,
            "required": false,
            "disabled": false,
            "childFields": [
              {
                "name": "departmentId",
                "displayName": "departmentId",
                "label": "Enter Department Id",
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
                "dynamicKey": "departments_departmentId"
              },
              {
                "name": "departmentName",
                "displayName": "Department Name",
                "label": "Enter Department Name",
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
                "dynamicKey": "departments_departmentName"
              },
              {
                "name": "status",
                "displayName": "status",
                "label": "Enter Status",
                "title": "",
                "type": "select",
                "required": false,
                "hideInCreateForm": true,
                "visible": false,
                "disabled": false,
                "dependancyCheck": false,
                "isPrefilled": false,
                "min": "",
                "max": "",
                "selectServer": false,
                "options": [
                  {
                    "value": "active",
                    "label": "Active"
                  }
                ],
                "dynamicKey": "departments_status"
              },
              {
                "name": "updatedBy",
                "displayName": "updatedBy",
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
                "dynamicKey": "departments_updatedBy"
              }
            ],
            "validations": "",
            "dependancyCheck": false,
            "isPrefilled": false,
            "source": "req.body"
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
  "colMapper": "{'departments_departmentId': 'departments_departmentId', 'departments_departmentName': 'departments_departmentName', 'departments_status': 'departments_status', 'departments_updatedBy': 'departments_updatedBy'}"
};