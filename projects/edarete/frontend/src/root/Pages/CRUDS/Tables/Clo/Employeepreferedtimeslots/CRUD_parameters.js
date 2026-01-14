export const parameters = {
                  "steps": [
                    
                        {
                            "title": "employeepreferedtimeslots Info",
                            "parameters": {
                                "fields": [
                                    {
                                        "name": "employeepreferedtimeslots",
                                        "type": "section",
                                        "hideInCreateForm": false,
                                        "visible": false,
                                        "required": false,
                                        "disabled": false,
                                        "validations": "",
                                        "dependancyCheck": false,
                                        "isPrefilled": false,
                                        "source": "req.body",
                                        "title": "Employeepreferedtimeslots",
                                        "childFields": [
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
                                            },
                                            
                                                ,
                                                {
                                                    "name": "employeeId",
                                                    "label": "Employee Id",
                                                    "title": "",
                                                    "type": "number",
                                                    "required": true,
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
                                                    "dynamicKey": "employeepreferedtimeslots_employeeId",
                                                    "alias" : "employeepreferedtimeslots.employee_id",
                                                    "options": "[]"
  
                                                },
                                                ,
                                                {
                                                    "name": "timeSlotId",
                                                    "label": "Time Slot Id",
                                                    "title": "",
                                                    "type": "number",
                                                    "required": true,
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
                                                    "dynamicKey": "employeepreferedtimeslots_timeSlotId",
                                                    "alias" : "employeepreferedtimeslots.time_slot_id",
                                                    "options": "[]"
  
                                                }
                                            
                                            ,
                                                {
                                                  "type": "tableOfFields",
                                                  "name": "employeepreferedtimeslots",
                                                  "label": "Add Employeepreferedtimeslots",
                                                  "hideInCreateForm": true,
                                                 "selectServerUrl":"/grouped/cruds/employeepreferedtimeslots?version=1.0",
                                                  "hideInViewForm": false,
                                                  "title": "Select Employeepreferedtimeslots",
                                                  "dependancyCheck": false,
                                                  "childFields": [
                                                  {
                                                  "name": "employeepreferedtimeslots", 
                                                  "type": "section",
                                                  "hideInCreateForm": false,
                                                  "visible": true,
                                                  "required": false,
                                                  "disabled": false,
                                                  "validations": "",
                                                  "dependancyCheck": false,
                                                  "isPrefilled": false,
                                                  "source": "req.body",
                                                  "title": "Employeepreferedtimeslots",
                                                  "childFields":[
                                                
                                                  



 
                                                ]
                                              }
                                            
                                           
                                               ]}
    
                                            
                                                ,
                                                {
                                                    "name": "createdAt",
                                                    "label": "Created At",
                                                    "title": "",
                                                    "type": "dateTime",
                                                    "required": false,
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
                                                    "dynamicKey": "employeepreferedtimeslots_createdAt",
                                                    "alias" : "employeepreferedtimeslots.created_at"
                                                },
                                                ,
                                                {
                                                    "name": "updatedAt",
                                                    "label": "Updated At",
                                                    "title": "",
                                                    "type": "dateTime",
                                                    "required": false,
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
                                                    "dynamicKey": "employeepreferedtimeslots_updatedAt",
                                                    "alias" : "employeepreferedtimeslots.updated_at"
                                                }
                                              
                                                  ,
                                                {
                                                    "name": "status",
                                                    "label": "Status",
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
                                                    "dynamicKey": "employeepreferedtimeslots_status",
                                                    options:[
                                                        {value:'inactive',label:'inactive'},
                                                        {value:'active',label:'active'}
                                                    ],
                                                    "alias" : "employeepreferedtimeslots.status"
                                                }
                                                 
    
                                        ]
                                    }
                                ]
                            },
                            "permission": "view_employeepreferedtimeslots"
                        }
                  ],
                  "colMapper": { 'employeepreferedtimeslots_employeePreferedTimeSlotsId' : 'employee_prefered_time_slots_id',  'employeepreferedtimeslots_employeeId' : 'employee_id',  'employeepreferedtimeslots_timeSlotId' : 'time_slot_id',  'employeepreferedtimeslots_status' : 'status',  'employeepreferedtimeslots_createdBy' : 'created_by',  'employeepreferedtimeslots_updatedBy' : 'updated_by',  'employeepreferedtimeslots_createdAt' : 'created_at',  'employeepreferedtimeslots_updatedAt' : 'updated_at'}
              };