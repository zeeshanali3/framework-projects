const parameters = {
              "steps": [
                  {
                  "title": "Questionevaluations Crud",
                  "parameters": {
                      "fields": [
                      {
                          "name": "questionevaluations",
                          "type": "section",
                          "title": "Questionevaluations CRUD",
                          "hideInCreateForm": false,
                          "visible": false, 
                          "required": false,
                          "disabled": false,
                          "validations": "",
                          "dependancyCheck": false,
                          "isPrefilled": false,
                          "source": "req.body",
                          "title": "Questionevaluations",
                          "childFields": [
                                {
                                  "name": "questionevaluations_id",
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
                                  "dynamicKey": "questionevaluations_id"
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
                              
                                  {
                                  "name": "enrollement_id",
                                  "label": "Enrollement Id",
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
                                  "dynamicKey": "questionevaluations_enrollementId",
                                  "alias" : "questionevaluations.enrollement_id",
                                  },
                                  {
                                  "name": "question_id",
                                  "label": "Question Id",
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
                                  "dynamicKey": "questionevaluations_questionId",
                                  "alias" : "questionevaluations.question_id",
                                  },
                                  {
                                  "name": "student_answer",
                                  "label": "Student Answer",
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
                                  "dynamicKey": "questionevaluations_studentAnswer",
                                  "alias" : "questionevaluations.student_answer",
                                  },
                                  {
                                  "name": "obtained_marks",
                                  "label": "Obtained Marks",
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
                                  "dynamicKey": "questionevaluations_obtainedMarks",
                                  "alias" : "questionevaluations.obtained_marks",
                                  },
                                  
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
              "colMapper": "{ 'questionevaluations_questionEvaluationId' : 'question_evaluation_id',  'questionevaluations_enrollementId' : 'enrollement_id',  'questionevaluations_questionId' : 'question_id',  'questionevaluations_studentAnswer' : 'student_answer',  'questionevaluations_obtainedMarks' : 'obtained_marks',  'questionevaluations_status' : 'status',  'questionevaluations_createdBy' : 'created_by',  'questionevaluations_updatedBy' : 'updated_by',  'questionevaluations_createdAt' : 'created_at',  'questionevaluations_updatedAt' : 'updated_at'}"
              };
              module.exports = parameters;