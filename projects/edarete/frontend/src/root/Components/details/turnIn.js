import React, { useState, useEffect } from "react";
import { Grid, Card, TextField, InputAdornment, Typography, Box, Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { GetsubcomponentattachmentAction } from "../../Common/Store/Actions/General/GetActions/getsubattachmentsAction.js";
import { PostsubcomponentMarks } from "../../Common/Store/Actions/General/PostActions/postsubcomponentmarksAction.js";
import { GetstudentMarksAction } from "../../Common/Store/Actions/General/GetActions/getstudentMarksAction.js";
import { UpdateQuestionMarksAnsAction } from "../../Common/Store/Actions/General/UpdateActions/updateQuestionAnsMarks.js";
import { GetstudentsubmissionAction } from "../../Common/Store/Actions/General/GetActions/getstudentsubmissionAction.js";
import { AddStudentAnsAction } from "../../Common/Store/Actions/General/PostActions/addstudentanswerAction";
import StudentSubmissionDetails from "../StudentSubmissionDetails";
import isEqual from 'lodash/isEqual';
import { UpdatestudentmarksAction } from "../../Common/Store/Actions/General/UpdateActions/updatestudentmarksActions.js";
import { getAccessToken } from "../../Utils/loginData/loginData.jsx";
import { toast, ToastContainer } from "react-toastify";
import { isLoadingAction } from "../../Common/Store/Actions/General/PostActions/isLoadingAction.js";
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

import { getSubcomponentGradeSheetAction } from "../../Common/Store/Actions/General/GetActions/getSubcomponentGradeSheetAction.js";

const TurnIn = ({ TotalMarks, SubComponentId }) => {
  const { loginData } = useSelector((state) => state?.LOGINREDUCER);
  const token = getAccessToken(loginData);
  const dispatch = useDispatch();
  const [marks, setMarks] = useState([]);
  const [getAllStudentSubmissions, setGetAllStudentSubmissions] = useState([]);
  const [currentStudentData, setCurrentStudentData] = useState([]);
  const [allStudentSubmissions, setAllStudentSubmissions] = useState([]);
  const [subComponentGradeSheetData, setSubComponentGradeSheetData] = useState([])
  const [updatedGradeSheet, setUpdatedGradeSheet] = useState([])
  const [proceed, setProceed] = useState(false)
  const [openDialog, setOpenDialog] = useState(false)
  const [dialogData, setDialogData] = useState(null)
  const saveSubComponentGradeSheet = () => {
    try {
      dispatch(isLoadingAction(true))
      console.log("subComponentGradeSheetData::", subComponentGradeSheetData)
      const dynamicHeadersSet = new Set();
      subComponentGradeSheetData.forEach(student => {
        dynamicHeadersSet.add(`${student.Activity + ' ' + student.ActivityNum}`);
      });

      const dynamicHeaders = Array.from(dynamicHeadersSet);
      const headerRow = ['Roll Number', 'Name', ...dynamicHeaders];
      const excelRows = [];
      excelRows.push(headerRow);
      const questionDescriptions = subComponentGradeSheetData[0].QuestionsArray.map(question => question.Description);
      const secondRow = ['', '', ...questionDescriptions];
      excelRows.push(secondRow);
      subComponentGradeSheetData.forEach(student => {
        const row = [];
        row.push(student.RegNum);
        row.push(student.StudentName);
        questionDescriptions.forEach(description => {
          const activity = student.QuestionsArray.find(q => q.Description === description);
          row.push(activity ? activity.ObtainedMarks : 0);
        });
        excelRows.push(row);
      });
      const worksheet = XLSX.utils.aoa_to_sheet(excelRows);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Student Data');
      const excelFile = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
      const blob = new Blob([excelFile], { type: 'application/octet-stream' });
      saveAs(blob, `${subComponentGradeSheetData[0].Activity + '' + subComponentGradeSheetData[0].ActivityNum}.xlsx`);
      dispatch(isLoadingAction(false))
    }
    catch (err) {
      console.log("ERrror in saving fiel:::", err)
    }
  };
  function uploadQuestionMarksFromSheet(data,EnrollementId) {
    if (data.QuestionEvaluationId !== null) {
      dispatch(
        UpdateQuestionMarksAnsAction(
          token,
          data.ObtainedMarks,
          data.QuestionEvaluationId,
          data.QuestionId,
          "Active",
          data.QuestionMarks,
          (response) => {
            dispatch(isLoadingAction(false));
            if (!toast.isActive("Question Marks")) { toast.success(response.message, { toastId: "Question Marks" }); }
          },
          (error) => {
            dispatch(isLoadingAction(false));
            if (error?.message?.status !== 500) {
              if (error?.message?.payload !== "") {
                toast.error(error?.message?.message);
              }
            } else {
              toast.error("Server Error " + error?.message?.status);
            }
          }
        )
      );
    }
    else
    {
        const studentAnswer=allStudentSubmissions.find(item=>item.EnrollementId==EnrollementId).Questions.find(item=>item.QuestionId==data.QuestionId)
      dispatch(
        AddStudentAnsAction(
          token,
           '',
          EnrollementId,
          data.QuestionId,
          (response) => {
            dispatch(isLoadingAction(false));
            if (!toast.isActive("Question Marks")) { toast.success(response.message, { toastId: "Question Marks" }); }
          },
          (error) => {
            dispatch(isLoadingAction(false));
            if (error?.message?.status !== 500) {
              if (error?.message?.payload !== "") {
                toast.error(error?.message?.message);
              }
            } else {
              toast.error("Server Error " + error?.message?.status);
            }
          },
          data.ObtainedMarks,
          
        )
      );
    }

  }
  function handleAgreeButtonClick() {
    setOpenDialog(false)
    dispatch(isLoadingAction(true))
    updatedGradeSheet.map(entry => {
      uploadMarksBySheet(entry)
    })

  }
  function uploadMarksBySheet(data) {
    dispatch(isLoadingAction(true))
    const obtainedMarksData = data.QuestionsArray.reduce((total, item) => {

      return total + Number(item.ObtainedMarks);
    }, 0);

    console.log("getSubComponentMarkIdByEnrollmentId(data.EnrollementId)::", getSubComponentMarkIdByEnrollmentId(data.EnrollementId))
    if (getSubComponentMarkIdByEnrollmentId(data.EnrollementId) !== null) {

      dispatch(
        UpdatestudentmarksAction(
          token,
          getSubComponentMarkIdByEnrollmentId(data.EnrollementId),
          obtainedMarksData,
          TotalMarks,
          (response) => {
            data.QuestionsArray.map(
              question => {
                uploadQuestionMarksFromSheet(question,data.EnrollementId)
              }
            )

          },
          (error) => {
            console.log("error:::", error)
          }
        )
      )
      dispatch(isLoadingAction(false))
    }
    else {
      dispatch(
        PostsubcomponentMarks(
          token,
          SubComponentId,
          data.EnrollementId,
          obtainedMarksData,
          TotalMarks,
          (response) => {
            dispatch(isLoadingAction(false));
            console.log("successfully returned", response);
            data.QuestionsArray.map(
              question => {
                uploadQuestionMarksFromSheet(question,data.EnrollementId)
              }
            )
          },
          (error) => {
            console.log("error:::", error)
          }
        )
      );
      dispatch(isLoadingAction(false))
    }

  }


  function handleFileUpload(event) {
    dispatch(isLoadingAction(true))
    const fileInput = event.target;
    if (fileInput.files.length === 0) {
      toast.warning('Please select a file.');
      dispatch(isLoadingAction(false))
      return;
    }

    const file = fileInput.files[0];
    const reader = new FileReader();

    reader.onload = function (e) {
      try {

        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const json = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

        if (json.length < 2) {
          throw new Error('Sheet does not have enough rows');
        }
        const [headerRow, secondRow, ...dataRows] = json;
        const dynamicHeaders = headerRow.slice(2);
        const questionDescriptions = secondRow.slice(2);
        const result = [];
        dataRows.forEach(row => {
          if (row.length < 2) {
            console.warn('Row does not have enough columns:', row);
            return;
          }

          const [RegNum, StudentName, ...marks] = row;

          const questionsArray = [];
          questionDescriptions.forEach((description, index) => {
            const obtainedMarks = marks[index] || 0;
            questionsArray.push({
              Description: description,
              QuestionMarks: null,
              ObtainedMarks: obtainedMarks,
              QuestionEvaluationId: null,
              QuestionId: null
            });
          });

          result.push({
            EnrollementId: null,
            RegNum,
            StudentName,
            SubComponentId: null,
            Activity: null,
            ActivityNum: null,
            QuestionsArray: questionsArray
          });
        });
        const updateGradeSheet = result.map(item => {
          const matchingEntry = subComponentGradeSheetData.find(data => data.RegNum === item.RegNum);

          if (matchingEntry) {
            item.EnrollementId = matchingEntry.EnrollementId;
            item.Activity = matchingEntry.Activity;
            item.ActivityNum = matchingEntry.ActivityNum;
            item.SubComponentId = matchingEntry.SubComponentId;

            item.QuestionsArray = item.QuestionsArray.map(question => {
              const cleanedQuestionDescription = question.Description.replace(/[\n\r\s]+/g, ' ').trim();
              const matchingQuestionsEntry = matchingEntry.QuestionsArray.find(questionEntry => 
                  questionEntry.Description.replace(/[\n\r\s]+/g, ' ').trim() === cleanedQuestionDescription
              );
              if (matchingQuestionsEntry) {
                  question.QuestionEvaluationId = matchingQuestionsEntry.QuestionEvaluationId;
                  question.QuestionId = matchingQuestionsEntry.QuestionId;
                  question.QuestionMarks = matchingQuestionsEntry.QuestionMarks;
              }
          
              // Return the updated question object
              return question;
          });
          
          }

          return item; // Return the modified item object
        }


        );
        console.log("updateGradeSheetupdateGradeSheet::", updateGradeSheet)
        setUpdatedGradeSheet(updateGradeSheet)

        if (updateGradeSheet.length !== allStudentSubmissions.length) {
          dispatch(isLoadingAction(false))
          setOpenDialog(true)
          setDialogData({ Title: "Do you want to proceed?", Description: `Total Students in your course is ${allStudentSubmissions.length} but you are uploading the marks data of only ${updateGradeSheet.length}. Do you want to proceed?` })
          setOpenDialog(true)
          return

        }
        else {
          updateGradeSheet.map(entry => {
            uploadMarksBySheet(entry)
          })
        }
        console.log("updateGradeSheetupdateGradeSheet:::::::::::", updateGradeSheet);
      } catch (error) {
        console.error('Error processing file:', error);
      }
    };

    reader.readAsArrayBuffer(file);
  }


  function restructureGradeSheetData(data) {
    const groupedData = new Map();

    data.forEach(item => {
      const {
        EnrollementId,
        RegNum,
        StudentName,
        SubComponentId,
        Activity,
        ActivityNum,
        Description,
        QuestionMarks,
        ObtainedMarks,
        QuestionEvaluationId,
        QuestionId
      } = item;
      if (!groupedData.has(EnrollementId)) {
        groupedData.set(EnrollementId, {
          EnrollementId,
          RegNum,
          StudentName,
          SubComponentId,
          Activity,
          ActivityNum,
          QuestionsArray: []
        });
      }
      groupedData.get(EnrollementId).QuestionsArray.push({
        Description,
        QuestionMarks,
        ObtainedMarks,
        QuestionEvaluationId,
        QuestionId
      });
    });


    return Array.from(groupedData.values());
  }

  useEffect(() => {

    dispatch(getSubcomponentGradeSheetAction(token,
      SubComponentId,
      (res) => {
        setSubComponentGradeSheetData(restructureGradeSheetData(res.payload))
        // saveSubComponentGradeSheet()
        console.log("Successs Res::", res)
        console.log("restructureGradeSheetData::::", restructureGradeSheetData())


      },
      (err) => {
        console.log("err:::", err)
      }
    ))


    dispatch(isLoadingAction(true));
    dispatch(
      GetstudentsubmissionAction(
        token,
        SubComponentId,
        (response) => {
          setGetAllStudentSubmissions(response.payload.studentSubmissionData.filter(item => item.EnrollementId !== null))
          console.log("success attac", response);
          MapStudentMarks(response);
          dispatch(isLoadingAction(false));
        },
        (error) => {
          dispatch(isLoadingAction(false));
          console.log("error attc", error);
        }
      )
    );
  }, [SubComponentId]);

  const { getstudentMarksData } = useSelector((state) => state?.GETSTUDENTMARKSREDUCER);



  useEffect(() => {
    dispatch(isLoadingAction(true));
    dispatch(
      GetsubcomponentattachmentAction(
        token,
        SubComponentId,
        (response) => {
          dispatch(isLoadingAction(false));
          console.log("success attac", response);
        },
        (error) => {
          dispatch(isLoadingAction(false));
          console.log("error attc", error);
        }
      )
    );
    dispatch(isLoadingAction(true));
    dispatch(
      GetstudentMarksAction(
        token,
        SubComponentId,
        (response) => {
          dispatch(isLoadingAction(false));
          console.log("success marks", response);
        },
        (error) => {
          dispatch(isLoadingAction(false));
          console.log("error marks", error);
        }
      )
    );
  }, [dispatch, token, SubComponentId]);

  useEffect(() => {
    setCurrentStudentData(getstudentMarksData?.payload ?? []);
  }, [getstudentMarksData]);

  useEffect(() => {
    if (getAllStudentSubmissions) {
      const submissionsWithButton = (getAllStudentSubmissions || []).map(submission => {
        return {
          ...submission,
          button: submission.SubcomponentMarks !== null ? "CHANGE" : "RETURN",
          isDisabled: false,
        };
      });

      setAllStudentSubmissions(submissionsWithButton);
    }
  }, [getAllStudentSubmissions]);

  useEffect(() => {
    const updatedSubmissions = mapSubmissionsWithMarks();
    if (!isEqual(updatedSubmissions, allStudentSubmissions)) {
      setAllStudentSubmissions(updatedSubmissions);
    }
    // else{
    //   setAllStudentSubmissions(getAllStudentSubmissions?.payload?.questionAndAnswer)
    // }
  }, [currentStudentData, marks]);

  const mapSubmissionsWithMarks = () => {
    return allStudentSubmissions.map(submission => {
      const enrollmentId = submission.EnrollementId;
      const marksData = currentStudentData.find(data => data.EnrollmentId === enrollmentId);
      const button = submission.SubcomponentMarks !== null ? "CHANGE" : "RETURN";
      const isDisabled = button === "CHANGE";
      const obtainedMarks = marksData ? marksData.Obtained_Marks : "";
      return {
        ...submission,
        button,
        isDisabled,
        obtainedMarks,
      };
    });
  };

  function getSubComponentMarkIdByEnrollmentId(enrollmentId) {
    const studentData = currentStudentData.find((data) => data.EnrollmentId === enrollmentId);
    return studentData?.SubComponentMarkId ?? null;
  }

  function ActionDispatch(index, flag) {
    const updatedStudentData = [...allStudentSubmissions];
    switch (flag) {
      case "RETURN":
        dispatch(isLoadingAction(true));
        dispatch(
          PostsubcomponentMarks(
            token,
            SubComponentId,
            allStudentSubmissions[index].EnrollementId,
            getObtainedMarks(allStudentSubmissions[index].StudentSubmissionId),
            TotalMarks,
            (response) => {
              dispatch(isLoadingAction(false));
              const submission = allStudentSubmissions.find(
                (submission) => submission.StudentSubmissionId === allStudentSubmissions[index].StudentSubmissionId
              );
              if (submission) {
                submission.Questions.forEach((item) => {
                  handleSubmitAll(item.QuestionEvaluationId);
                });
              }
              console.log("successfully returned", response);
              toast.success(response.message);

            },
            (error) => {
              dispatch(isLoadingAction(false));
              if (error?.message?.status != 500) {
                if (error?.message?.payload != "") {
                  const payloadKeys = Object.keys(error?.message?.payload);
                  if (payloadKeys.length > 0) {
                    toast.error(error?.message?.payload[payloadKeys[0]]);
                  }
                }
                else {
                  toast.error(error?.message?.message);
                }
              }
              else {
                toast.error("Server Error " + error?.message?.status);
              }
            }
          )
        );
        break;
      case "UPDATE":
        dispatch(isLoadingAction(true));
        dispatch(
          UpdatestudentmarksAction(
            token,
            getSubComponentMarkIdByEnrollmentId(allStudentSubmissions[index].EnrollementId),
            getObtainedMarks(allStudentSubmissions[index].StudentSubmissionId),
            TotalMarks,
            (response) => {
              const submission = allStudentSubmissions.find(
                (submission) => submission.StudentSubmissionId === allStudentSubmissions[index].StudentSubmissionId
              );
              if (submission) {
                submission.Questions.forEach((item) => {
                  handleSubmitAll(item.QuestionEvaluationId);
                });
              }
              dispatch(isLoadingAction(false));
              toast.success(response.message);

            },
            (error) => {
              dispatch(isLoadingAction(false));
              if (error?.message?.status != 500) {
                if (error?.message?.payload != "") {
                  const payloadKeys = Object.keys(error?.message?.payload);
                  if (payloadKeys.length > 0) {
                    updatedStudentData[index] = {
                      ...updatedStudentData[index],
                      isDisabled: false,
                      button: "UPDATE",
                    };
                    toast.error(error?.message?.payload[payloadKeys[0]]);
                  }
                }
                else {
                  toast.error(error?.message?.message);
                }
              }
              else {
                toast.error("Server Error " + error?.message?.status);
              }
            }
          )
        );
        break;
      case "Update_Question_Marks":
        dispatch(isLoadingAction(true));
        dispatch(
          UpdateQuestionMarksAnsAction(token, marks[index.questionEvaluationId - 1], index.questionEvaluationId, index.questionId, "Active",
            (response) => {
              dispatch(isLoadingAction(false));
              toast.success(response.message);

            },
            (error) => {
              dispatch(isLoadingAction(false));
              if (error?.message?.status != 500) {
                if (error?.message?.payload != "") {

                  toast.error(error?.message?.message);
                }
              }
              else {
                toast.error("Server Error " + error?.message?.status);
              }
            }
          )
        );
        break;


      default:
    }
  }
  function handleButtonClick(index, flag) {
    const updatedStudentData = [...allStudentSubmissions];
    switch (flag) {
      case "UPDATE":
        updatedStudentData[index] = {
          ...updatedStudentData[index],
          isDisabled: true,
          button: "CHANGE",
        };
        ActionDispatch(index, "UPDATE");
        break;
      case "RETURN":
        updatedStudentData[index] = {
          ...updatedStudentData[index],
          isDisabled: true,
          button: "CHANGE",
        };
        ActionDispatch(index, "RETURN");
        break;
      case "CHANGE":
        updatedStudentData[index] = {
          ...updatedStudentData[index],
          isDisabled: false,
          button: "UPDATE",
        };
        break;
      case "Update_Question_Marks":
        ActionDispatch(index, "Update_Question_Marks");
        break;
      default:
    }
    setAllStudentSubmissions(updatedStudentData);
  }
  const handleSubmitAll = (questionEvaluationId) => {
    dispatch(isLoadingAction(true));
    const markedQuestion = allStudentSubmissions.flatMap(client => client.Questions)
      .find((item) => item.QuestionEvaluationId === questionEvaluationId);
    dispatch(
      UpdateQuestionMarksAnsAction(
        token,
        marks.find((item) => item.questionEvaluationId === questionEvaluationId).obtainedMarks,
        markedQuestion.QuestionEvaluationId,
        markedQuestion.QuestionId,
        "Active",
        markedQuestion.QuestionMarks,
        (response) => {
          dispatch(isLoadingAction(false));
          //  toast.success(response.message);
        },
        (error) => {
          dispatch(isLoadingAction(false));
          if (error?.message?.status !== 500) {
            if (error?.message?.payload !== "") {
              toast.error(error?.message?.message);
            }
          } else {
            toast.error("Server Error " + error?.message?.status);
          }
        }
      )
    );
  };


  const handleMarksChange = (questionEvaluationId, event) => {
    event.preventDefault();

    const newObtainedMarks = parseFloat(event.target.value);
    const markEntry = marks.find(mark => mark.questionEvaluationId === questionEvaluationId);
    if (markEntry && markEntry.questionMarks !== undefined) {
      const { questionMarks } = markEntry;
      // Check if the new obtained marks are greater than total marks
      if (newObtainedMarks > questionMarks) {
        toast.error("Obtained marks cannot be greater than total marks.");
        return;
      }
      setMarks(prevMarks =>
        prevMarks.map(mark =>
          mark.questionEvaluationId === questionEvaluationId
            ? { ...mark, obtainedMarks: newObtainedMarks }
            : mark
        )
      );
    }
  };
  function MapStudentMarks(response = null) {
    if (response == null) {
      if (!getAllStudentSubmissions?.payload) return;

      const newMarks = getAllStudentSubmissions.payload.flatMap(client => {
        return client.Questions.map(item => ({
          obtainedMarks: item.ObtainedMarks,
          questionEvaluationId: item.QuestionEvaluationId,
          studentSubmissionId: client.StudentSubmissionId,
          questionMarks: item.QuestionMarks
        }));
      });
      setMarks(prevMarks => {
        const combinedMarks = [...prevMarks, ...newMarks];
        const uniqueMarks = combinedMarks.reduce((acc, current) => {
          const x = acc.find(item => item.questionId === current.questionEvaluationId);
          if (!x) {
            acc.push(current);
          }
          return acc;
        }, []);
        return uniqueMarks;
      });
    } else {
      response.payload.studentSubmissionData = response.payload.studentSubmissionData.filter(item => item.EnrollementId !== null);
      const newMarks = response.payload.studentSubmissionData.flatMap(client => {
        return client.Questions.map(item => {
          return {
            obtainedMarks: item.ObtainedMarks,
            questionEvaluationId: item.QuestionEvaluationId,
            studentSubmissionId: client.StudentSubmissionId,
            questionMarks: item.QuestionMarks
          };
        });
      });
      setMarks(prevMarks => {
        const combinedMarks = [...prevMarks, ...newMarks];
        const uniqueMarks = combinedMarks.reduce((acc, current) => {
          const x = acc.find(item => item?.questionEvaluationId === current?.questionEvaluationId);
          if (!x) {
            acc.push(current);
          }
          return acc;
        }, []);
        return uniqueMarks;
      });
    }
  }
  const getObtainedMarks = (studentSubmissionId) => {
    const totalMarks = marks
      .filter((mark) => mark.studentSubmissionId === studentSubmissionId)
      .reduce((total, mark) => total + Number(mark.obtainedMarks), 0);
    
    // Round the total to 2 decimal places
    return Number(totalMarks.toFixed(2));
  };
  
  console.log("allStudentSubmissions::", allStudentSubmissions)
  return (
    <div className="container mx-auto p-4">
      {allStudentSubmissions?.length === 0 ? (
        <Typography
          fontWeight={"bold"}
          sx={{
            textTransform: "uppercase",
            fontSize: "13px",
            mb: "10px",
          }}
        >
          No submissions found !
        </Typography>
      ) : (
        <Grid container spacing={2} justifyContent="center" alignItems="center" sx={{ padding: '20px' }}>
          {/* Buttons for Upload and Download Grade Sheet */}
          <Grid item xs={12} container justifyContent="center" spacing={2} sx={{ mb: 2 }}>
            <Grid item>
              <Button
                variant="contained"
                component="label"
                sx={{
                  backgroundColor: '#1976d2',
                  color: 'white',
                  fontWeight: 'bold',
                  fontSize: '16px',
                  padding: '10px 30px',
                  borderRadius: '8px',
                  textTransform: 'none',
                  boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                  '&:hover': { backgroundColor: '#1565c0' },
                }}
              >
                Upload Grade Sheet
                <input
                  type="file"
                  hidden
                  onChange={handleFileUpload}
                />
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: '#1976d2',
                  color: 'white',
                  fontWeight: 'bold',
                  fontSize: '16px',
                  padding: '10px 30px',
                  borderRadius: '8px',
                  textTransform: 'none',
                  boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                  '&:hover': { backgroundColor: '#1565c0' },
                }}
                onClick={saveSubComponentGradeSheet}
              >
                Download Grade Sheet
              </Button>
            </Grid>
          </Grid>

          {/* Student submissions grid */}
          <Grid container spacing={3}>
            {allStudentSubmissions?.map((client, index) => (
              <Grid item xs={12} sm={6} md={4} lg={4} key={client.EnrollementId}>
                <Card
                  sx={{
                    boxShadow: 'rgba(0, 0, 0, 0.05) 0px 4px 20px 0px',
                    borderRadius: '8px',
                    padding: '20px',
                    mb: '15px',
                  }}
                >
                  <div className="m-4">
                    <div className="flex justify-between">
                      <Typography sx={{ fontSize: '18px', fontWeight: 'bold' }}>
                        {getObtainedMarks(client.StudentSubmissionId)} / {TotalMarks}
                      </Typography>
                      <Button
                        onClick={() => handleButtonClick(index, client.button)}
                        variant="contained"
                        sx={{
                          background: client.button === 'Change' ? '#1976d2' : '#FF0000',
                          padding: '5px 15px',
                          fontSize: '14px',
                          textTransform: 'none',
                          '&:hover': {
                            background: client.button === 'Change' ? '#1565c0' : '#d32f2f',
                          },
                        }}
                      >
                        {client.button}
                      </Button>
                    </div>
                    <Typography sx={{ marginTop: '10px', fontSize: '16px', fontWeight: '500', color: '#333' }}>
                      {client.Student_Name}
                    </Typography>
                  </div>
                  <StudentSubmissionDetails client={client} clientAttachments={client.Attachments} clientQuestions={client.Questions} marks={marks} handleMarksChange={handleMarksChange} handleSubmitAll={handleSubmitAll} />
                </Card>
              </Grid>
            ))}
          </Grid>

          <Dialog
            open={openDialog}
            onClose={() => setOpenDialog(false)}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {dialogData?.Title || ''}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                {dialogData?.Description || ''}
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setOpenDialog(false)} sx={{
                backgroundColor: "orange",
                color: "white"
              }}>Upload File Again</Button>
              <Button onClick={handleAgreeButtonClick} autoFocu sx={{
                backgroundColor: "green",
                color: "white"
              }}>
                Yes
              </Button>
            </DialogActions>
          </Dialog>
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </Grid>

      )}
    </div>
  );



};

export default TurnIn;





