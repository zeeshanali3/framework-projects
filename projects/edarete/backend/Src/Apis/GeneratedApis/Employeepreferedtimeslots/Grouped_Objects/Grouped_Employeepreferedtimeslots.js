const parameters = require('./CRUD_parameters');
        global.GroupedCrudsEmployeepreferedtimeslots_object = {
          versions: {
            versionData: [
              {
                "*": {
                  steps: [
                    
                    {
                      platform: 
                      [
                        {                      
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
                              Add: async(req, decryptedPayload) => { return "INSERT INTO employeepreferedtimeslots (employee_id, time_slot_id , created_by, updated_by) VALUES ({{employeepreferedtimeslots_employeeId}}, {{employeepreferedtimeslots_timeSlotId}}, {{actionPerformerURDD}}, {{actionPerformerURDD}})"},
                              
                              Update: async(req, decryptedPayload) => { return "UPDATE employeepreferedtimeslots SET employee_id = {{employeepreferedtimeslots_employeeId}}, time_slot_id = {{employeepreferedtimeslots_timeSlotId}}, created_by = {{employeepreferedtimeslots_createdBy}}, updated_by = {{employeepreferedtimeslots_updatedBy}} WHERE employee_prefered_time_slots_id = {{id}}"},
                              
                              List: async(req, decryptedPayload) => { return "SELECT COUNT(*) OVER () AS table_count, employee_prefered_time_slots_id as employeepreferedtimeslots_id,employee_prefered_time_slots_id as id, employeepreferedtimeslots.employee_id as employeepreferedtimeslots_employeeId, employeepreferedtimeslots.time_slot_id as employeepreferedtimeslots_timeSlotId  FROM employeepreferedtimeslots WHERE status != 'inactive'"},
                                
                              View: async(req, decryptedPayload) => { return `
                              SELECT 
                            employeepreferedtimeslots.employee_prefered_time_slots_id as employeepreferedtimeslots_id, coursetimetablesschedule.course_lschedule_id as coursetimetablesschedule_id, courses.course_id as courses_id, plannedcourses.planned_course_id as plannedcourses_id, clo.cloid as clo_id, employees.employee_id as employees_id, departments.department_id as departments_id, user_roles_designations_department.user_role_designation_department_id as userRolesDesignationsDepartment_id, roles_designations_department.role_designation_department_id as rolesDesignationsDepartment_id, users.user_id as users_id, designations.designation_id as designations_id, roles.role_id as roles_id,
                        coursetimetablesschedule.course_lschedule_id as id,
                       employeepreferedtimeslots.employee_prefered_time_slots_id as  employeepreferedtimeslots_employeePreferedTimeSlotsId, coursetimetablesschedule.course_lschedule_id as  coursetimetablesschedule_courseLscheduleId, courses.course_id as  courses_courseId, plannedcourses.course_name as  coursetimetablesschedule_plannedcoursesName, clo.clodomain_name as  coursetimetablesschedule_cloName, employees.employee_id as  employees_employeeId, departments.department_name as  coursetimetablesschedule_departmentsName, user_roles_designations_department.user_role_designation_department_id as  userRolesDesignationsDepartment_userRoleDesignationDepartmentId, roles_designations_department.role_designation_department_id as  rolesDesignationsDepartment_roleDesignationDepartmentId, users.username as  coursetimetablesschedule_usersName, designations.designation_name as  coursetimetablesschedule_designationsName, roles.role_name as  coursetimetablesschedule_rolesName,

                          employeepreferedtimeslots.employee_prefered_time_slots_id as coursetimetablesschedule_employeePreferedTimeSlotsId, coursetimetablesschedule.course_lschedule_id as coursetimetablesschedule_courseLscheduleId, courses.course_id as coursetimetablesschedule_courseId, plannedcourses.planned_course_id as coursetimetablesschedule_plannedCourseId, clo.cloid as coursetimetablesschedule_cloid, employees.employee_id as coursetimetablesschedule_employeeId, departments.department_id as coursetimetablesschedule_departmentId, user_roles_designations_department.user_role_designation_department_id as coursetimetablesschedule_userRoleDesignationDepartmentId, roles_designations_department.role_designation_department_id as coursetimetablesschedule_roleDesignationDepartmentId, users.user_id as coursetimetablesschedule_userId, designations.designation_id as coursetimetablesschedule_designationId, roles.role_id as coursetimetablesschedule_roleId,
                          
                       
                         
                          CONCAT_WS(' ', LEFT(plannedcourses.course_name, 10), LEFT(clo.clodomain_name, 10), LEFT(departments.department_name, 10), LEFT(departments.department_name, 10), LEFT(users.username, 10), LEFT(users.username, 10), LEFT(designations.designation_name, 10), LEFT(roles.role_name, 10), LEFT(departments.department_name, 10), LEFT(designations.designation_name, 10), LEFT(roles.role_name, 10), LEFT(departments.department_name, 10)) AS  coursetimetablesschedule_coursesName, employeepreferedtimeslots.employee_id as employeepreferedtimeslots_employeeId, employeepreferedtimeslots.time_slot_id as employeepreferedtimeslots_timeSlotId, 
                        coursetimetablesschedule.course_id as coursetimetablesschedule_courseId, coursetimetablesschedule.employee_prefered_time_slots_id as coursetimetablesschedule_employeePreferedTimeSlotsId, coursetimetablesschedule.time_slot_id as coursetimetablesschedule_timeSlotId, coursetimetablesschedule.room_id as coursetimetablesschedule_roomId FROM employeepreferedtimeslots LEFT JOIN coursetimetablesschedule ON coursetimetablesschedule.employee_prefered_time_slots_id = employeepreferedtimeslots.employee_prefered_time_slots_id AND coursetimetablesschedule.status !='inactive' LEFT JOIN courses ON courses.course_id = coursetimetablesschedule.course_id AND courses.status !='inactive' LEFT JOIN plannedcourses ON plannedcourses.planned_course_id = courses.planned_course_id AND plannedcourses.status !='inactive' LEFT JOIN clo ON clo.cloid = courses.cloid AND clo.status !='inactive' LEFT JOIN employees ON employees.employee_id = courses.teacher_employee_id AND employees.status !='inactive' LEFT JOIN departments ON (departments.department_id = employees.department_id OR departments.employee_id = employees.employee_id) LEFT JOIN user_roles_designations_department ON (user_roles_designations_department.user_role_designation_department_id = employees.urdd_id) LEFT JOIN roles_designations_department ON (roles_designations_department.department_id = departments.department_id OR roles_designations_department.role_designation_department_id = user_roles_designations_department.role_designation_department_id) LEFT JOIN users ON users.user_id = user_roles_designations_department.user_id AND users.status !='inactive' LEFT JOIN designations ON designations.designation_id = roles_designations_department.designation_id AND designations.status !='inactive' LEFT JOIN roles ON roles.role_id = roles_designations_department.role_id AND roles.status !='inactive' WHERE (employeepreferedtimeslots.employee_prefered_time_slots_id = {{id}}  AND  employeepreferedtimeslots.status != 'inactive')
                          
                          
                          ` },
                                        
                                  Delete: async(req, decryptedPayload) => { return "UPDATE employeepreferedtimeslots SET status = 'inactive' WHERE employee_prefered_time_slots_id = {{id}}"}    

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
                        successMessage: "employeepreferedtimeslots Grouped CRUD Hit successfully!",
                        errorMessage: "Failed to retrieve task_history.",
                      },
                    }
                    ,
                    {
                      platform: 
                      [
                        {                      
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
                              Add: async(req, decryptedPayload) => { return "INSERT INTO coursetimetablesschedule (course_id, employee_prefered_time_slots_id, time_slot_id, room_id , created_by, updated_by) VALUES ({{coursetimetablesschedule_courseId}}, {{coursetimetablesschedule_employeePreferedTimeSlotsId}}, {{coursetimetablesschedule_timeSlotId}}, {{coursetimetablesschedule_roomId}}, {{actionPerformerURDD}}, {{actionPerformerURDD}})"},
                              
                              Update: async(req, decryptedPayload) => { return "UPDATE coursetimetablesschedule SET course_id = {{coursetimetablesschedule_courseId}}, employee_prefered_time_slots_id = {{coursetimetablesschedule_employeePreferedTimeSlotsId}}, time_slot_id = {{coursetimetablesschedule_timeSlotId}}, room_id = {{coursetimetablesschedule_roomId}}, created_by = {{coursetimetablesschedule_createdBy}}, updated_by = {{coursetimetablesschedule_updatedBy}} WHERE course_lschedule_id = {{id}}"},
                              
                              List: async(req, decryptedPayload) => { return "SELECT COUNT(*) OVER () AS table_count, course_lschedule_id as coursetimetablesschedule_id,course_lschedule_id as id, coursetimetablesschedule.course_id as coursetimetablesschedule_courseId, coursetimetablesschedule.employee_prefered_time_slots_id as coursetimetablesschedule_employeePreferedTimeSlotsId, coursetimetablesschedule.time_slot_id as coursetimetablesschedule_timeSlotId, coursetimetablesschedule.room_id as coursetimetablesschedule_roomId  FROM coursetimetablesschedule WHERE status != 'inactive'"},
                                
                              View: async(req, decryptedPayload) => { return `
                              SELECT 
                            employeepreferedtimeslots.employee_prefered_time_slots_id as employeepreferedtimeslots_id, coursetimetablesschedule.course_lschedule_id as coursetimetablesschedule_id, courses.course_id as courses_id, plannedcourses.planned_course_id as plannedcourses_id, clo.cloid as clo_id, employees.employee_id as employees_id, departments.department_id as departments_id, user_roles_designations_department.user_role_designation_department_id as userRolesDesignationsDepartment_id, roles_designations_department.role_designation_department_id as rolesDesignationsDepartment_id, users.user_id as users_id, designations.designation_id as designations_id, roles.role_id as roles_id,
                        coursetimetablesschedule.course_lschedule_id as id,
                       employeepreferedtimeslots.employee_prefered_time_slots_id as  employeepreferedtimeslots_employeePreferedTimeSlotsId, coursetimetablesschedule.course_lschedule_id as  coursetimetablesschedule_courseLscheduleId, courses.course_id as  courses_courseId, plannedcourses.course_name as  coursetimetablesschedule_plannedcoursesName, clo.clodomain_name as  coursetimetablesschedule_cloName, employees.employee_id as  employees_employeeId, departments.department_name as  coursetimetablesschedule_departmentsName, user_roles_designations_department.user_role_designation_department_id as  userRolesDesignationsDepartment_userRoleDesignationDepartmentId, roles_designations_department.role_designation_department_id as  rolesDesignationsDepartment_roleDesignationDepartmentId, users.username as  coursetimetablesschedule_usersName, designations.designation_name as  coursetimetablesschedule_designationsName, roles.role_name as  coursetimetablesschedule_rolesName,

                          employeepreferedtimeslots.employee_prefered_time_slots_id as coursetimetablesschedule_employeePreferedTimeSlotsId, coursetimetablesschedule.course_lschedule_id as coursetimetablesschedule_courseLscheduleId, courses.course_id as coursetimetablesschedule_courseId, plannedcourses.planned_course_id as coursetimetablesschedule_plannedCourseId, clo.cloid as coursetimetablesschedule_cloid, employees.employee_id as coursetimetablesschedule_employeeId, departments.department_id as coursetimetablesschedule_departmentId, user_roles_designations_department.user_role_designation_department_id as coursetimetablesschedule_userRoleDesignationDepartmentId, roles_designations_department.role_designation_department_id as coursetimetablesschedule_roleDesignationDepartmentId, users.user_id as coursetimetablesschedule_userId, designations.designation_id as coursetimetablesschedule_designationId, roles.role_id as coursetimetablesschedule_roleId,
                          
                       
                         
                          CONCAT_WS(' ', LEFT(plannedcourses.course_name, 10), LEFT(clo.clodomain_name, 10), LEFT(departments.department_name, 10), LEFT(departments.department_name, 10), LEFT(users.username, 10), LEFT(users.username, 10), LEFT(designations.designation_name, 10), LEFT(roles.role_name, 10), LEFT(departments.department_name, 10), LEFT(designations.designation_name, 10), LEFT(roles.role_name, 10), LEFT(departments.department_name, 10)) AS  coursetimetablesschedule_coursesName, coursetimetablesschedule.course_id as coursetimetablesschedule_courseId, coursetimetablesschedule.employee_prefered_time_slots_id as coursetimetablesschedule_employeePreferedTimeSlotsId, coursetimetablesschedule.time_slot_id as coursetimetablesschedule_timeSlotId, coursetimetablesschedule.room_id as coursetimetablesschedule_roomId, 
                        coursetimetablesschedule.course_id as coursetimetablesschedule_courseId, coursetimetablesschedule.employee_prefered_time_slots_id as coursetimetablesschedule_employeePreferedTimeSlotsId, coursetimetablesschedule.time_slot_id as coursetimetablesschedule_timeSlotId, coursetimetablesschedule.room_id as coursetimetablesschedule_roomId FROM employeepreferedtimeslots LEFT JOIN coursetimetablesschedule ON coursetimetablesschedule.employee_prefered_time_slots_id = employeepreferedtimeslots.employee_prefered_time_slots_id AND coursetimetablesschedule.status !='inactive' LEFT JOIN courses ON courses.course_id = coursetimetablesschedule.course_id AND courses.status !='inactive' LEFT JOIN plannedcourses ON plannedcourses.planned_course_id = courses.planned_course_id AND plannedcourses.status !='inactive' LEFT JOIN clo ON clo.cloid = courses.cloid AND clo.status !='inactive' LEFT JOIN employees ON employees.employee_id = courses.teacher_employee_id AND employees.status !='inactive' LEFT JOIN departments ON (departments.department_id = employees.department_id OR departments.employee_id = employees.employee_id) LEFT JOIN user_roles_designations_department ON (user_roles_designations_department.user_role_designation_department_id = employees.urdd_id) LEFT JOIN roles_designations_department ON (roles_designations_department.department_id = departments.department_id OR roles_designations_department.role_designation_department_id = user_roles_designations_department.role_designation_department_id) LEFT JOIN users ON users.user_id = user_roles_designations_department.user_id AND users.status !='inactive' LEFT JOIN designations ON designations.designation_id = roles_designations_department.designation_id AND designations.status !='inactive' LEFT JOIN roles ON roles.role_id = roles_designations_department.role_id AND roles.status !='inactive' WHERE (coursetimetablesschedule.course_lschedule_id = {{id}}  AND  coursetimetablesschedule.status != 'inactive')
                          
                          
                          ` },
                                        
                                  Delete: async(req, decryptedPayload) => { return "UPDATE coursetimetablesschedule SET status = 'inactive' WHERE course_lschedule_id = {{id}}"}    

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
                        successMessage: "coursetimetablesschedule Grouped CRUD Hit successfully!",
                        errorMessage: "Failed to retrieve task_history.",
                      },
                    }
                    
                  ],
                },
              },
            ],
          },
        };
        module.exports = {GroupedCrudsEmployeepreferedtimeslots_object}