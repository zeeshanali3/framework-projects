
import React, { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  TextField,
  Button,
  Typography,
  Grid,
  Divider,
  Paper,
  IconButton,
  DialogTitle,
  Card,
  TextareaAutosize,
  Autocomplete,
  Box,
  Input,
  Checkbox,
  FormControlLabel

} from "@mui/material";
import { Close,  Add, Delete } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { AddSubcomponentAction } from "../../Common/Store/Actions/General/PostActions/postsubcomponentAction";
import { AddTemplateSubcomponentAction } from '../../Common/Store/Actions/General/PostActions/addTemplateSubcomponent';
import { Transition } from "../../Animation/Animation";
import { formateTime, FutureDateTime, FormatDate,  getCurrentDateTime } from "../../validation/validtionFunctions";
import moment from "moment";
import axios from "axios";
import { getAccessToken } from "../../Utils/loginData/loginData";
import { toast, ToastContainer } from "react-toastify";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { AddGptQuestionAction } from '../../Common/Store/Actions/General/PostActions/addgptquestionAction';
import { useEffect } from "react";
import { AddQuestionsAction } from '../../Common/Store/Actions/General/PostActions/addquestionsAction';
import { GetQuestionBySubComponentIdAction } from '../../Common/Store/Actions/General/GetActions/getquestionbySubIDAction';
import Contants from "../../Common/Constants"


const AddSubComponent = ({
  handleClose,
  open,
  classItem,
  componentID,
  componentName,
  userroleID,
  selectedComponentData,
  Num,
  ComponentType,
  handleSetLoading,
  handlegetclassComponent,
  selectedTemplate
}) => {



  const currentDateTime = moment().utcOffset("+05:00");
  const currentDateString = currentDateTime.format("YYYY-MM-DD");
  const currentTimeString = currentDateTime.format("HH:mm");
  const dispatch = useDispatch();
  const { loginData } = useSelector((state) => state?.LOGINREDUCER);
  const { getclosData } = useSelector((state) => state?.GETCLOS);
  const token = getAccessToken(loginData);
  const [error, setError] = useState("");
  const [SubComponentNum, setSubComponentNum] = useState(0);
  const [Date, setDate] = useState(currentDateString);
  const [StartTime, setStartTime] = useState(currentTimeString);
  const [EndTime, setEndTime] = useState(formateTime(currentTimeString));
  const [TotalMarks, setTotalMarks] = useState(0);
  const [Weightage, setWeightage] = useState(0);
  const [Text, setText] = useState("");
  const [startDate, setStartDate] = useState(currentDateString)
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [notifyStudents, setNotifyStudents] = useState(false);

  const [subID, setsubID] = useState("");
  const [isLoading, setIsLoading] = useState(false)




  const [inputSets, setInputSets] = useState([{ text: "", clo: null }]);
  useEffect(() => {
    if (selectedTemplate) {
      setDate(FormatDate(selectedTemplate.Date));
      setStartTime(getCurrentDateTime);
      setEndTime(formateTime(selectedTemplate.EndTime));
      setTotalMarks(selectedTemplate.TotalMarks);
      setWeightage(selectedTemplate.Weightage);
      setText(selectedTemplate.Text);
      dispatch(GetQuestionBySubComponentIdAction(
        token,
        selectedTemplate.SubComponentId,
        (res) => {
          console.log("res:::", res.payload)
          const updatedInputSets = res.payload.map(item => ({
            text: item.Description,
            clo: getclosData?.payload?.find(value => value.CLOId === item.CLOId),
            number: item.QuestionMarks

          }));
          console.log("UpdatedInputs:::", updatedInputSets)
          setInputSets(updatedInputSets);

        },
        (err) => {
          console.log("err::", err)
        }

      ))
    }
  }, [selectedTemplate])
  useEffect(() => {
    if (Num == -Infinity) { setSubComponentNum(1) }
    else {
      setSubComponentNum(Num)
    }
    // dispatch(GetclosAction(""));
  }, [Num])
  const handleDispatchAction = async (status) => {
    status = FutureDateTime(startDate, StartTime) ? "Scheduled" : status
    handleSetLoading(true)
    setIsLoading(true)
    dispatch(
      AddSubcomponentAction(
        token,
        userroleID,
        componentID,
        SubComponentNum,
        Date,
        formateTime(EndTime),
        TotalMarks,
        Weightage,
        Text,
        StartTime,
        startDate,
        status,
        notifyStudents ? "1" : "0",
        (response) => {
          toast.success(response.message);
          setsubID(response.payload.insertId);
          handleaddquestionFunction(response.payload.insertId);
          handleattachment(response.payload.insertId);
        },
        (error) => {
          handleSetLoading(false)
          setIsLoading(false)
          if (error?.message?.status != 500) {
            if (error?.message?.payload != "") {
              const payloadKeys = Object.keys(error?.message?.payload);
              if (payloadKeys.length > 0) {
                toast.error(error?.message?.payload[payloadKeys[0]]);
              }
            } else {
              toast.error(error?.message?.message);
            }
          } else {
            toast.error("Server Error " + error?.message?.status);
          }
        },

      )
    );
  };
  const handleSaveTemplate = () => {
    handleSetLoading(true)
    setIsLoading(true)
    dispatch(
      AddTemplateSubcomponentAction(
        token,
        userroleID,
        componentID,
        TotalMarks,
        Weightage,
        Text,
        (response) => {

          toast.success(response.message);
          setsubID(response.payload.insertId);
          handleaddquestionFunction(response.payload.insertId);
          handleSetLoading(false)
        },
        (error) => {
          handleSetLoading(false)
          setIsLoading(false)
          if (error?.message?.status != 500) {
            if (error?.message?.payload != "") {
              const payloadKeys = Object.keys(error?.message?.payload);
              if (payloadKeys.length > 0) {
                toast.error(error?.message?.payload[payloadKeys[0]]);
              }
            } else {
              toast.error(error?.message?.message);
            }
          } else {
            toast.error("Server Error " + error?.message?.status);
          }
        }
      )
    );
  }
  const handleFileChange = (e) => {
    const files = e.target.files;
    setSelectedFiles(Array.from(files));
  };

  const handleattachment = (SubId) => {
    handleSetLoading(true)
    const formData = new FormData();
    selectedFiles.forEach((file, index) => {
      formData.append(`attachments`, file);
    });

    formData.append("SubComponentId", SubId);
    formData.append("UserRoleId", userroleID);

    const handleError = (error) => {
      handleSetLoading(false)
      console.log("myError", error);
      if (error?.response?.status !== 500) {
        if (error?.response?.data?.message) {
          toast.error(error?.response?.data?.message);
        }
      } else {
        toast.error("Server Error " + error?.response?.status);
      }
    };
    axios
      .post(Contants.api_base_url + "/api/attachments", formData, {
        headers: {
          "Content-Type": "multipart/form-data; boundary=" + formData._boundary,
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        toast.success(response?.data?.message);
        setSelectedFiles([]);
        setSubComponentNum(0);
        setDate(FormatDate(currentDateString));
        setStartTime("");
        setEndTime(formateTime(currentTimeString));
        setTotalMarks(0);
        setWeightage(0);
        setText("");
        handleClose();
        setIsLoading(false)
        handlegetclassComponent();
        handleSetLoading(false)
      })
      .catch(handleError);
  };

  const textFields = [
    {
      title: componentName + " Number",
      text: "Number",
      value: SubComponentNum,
      onChange: (e) => setSubComponentNum(e.target.value),
      required: true,
      type: "number",
    },
    {
      title: "Start Time *",
      value: StartTime,
      onChange: (e) => setStartTime(e.target.value),
      type: "time",
    },
    {
      title: "Start Date *",
      value: startDate,
      onChange: (e) => setStartDate(e.target.value),
      type: "date",
    },
    {
      title: "Due Date *",
      value: Date,
      onChange: (e) => setDate(e.target.value),
      type: "date",
      required: true,
    },
    {
      title: "Due Time *",
      value: EndTime,
      onChange: (e) => setEndTime(e.target.value),
      type: "time",
    }, ComponentType == "Graded"
      ? {
        title: "Total Marks *",
        value: TotalMarks,
        onChange: (e) => setTotalMarks(e.target.value),
      }
      : {
        title: "Marks *",
        label: "TotalMarks",
        value: 0,
        onChange: (e) => setTotalMarks(0),
        hidden: true,
      },ComponentType == "Graded"
      ? {
        title: "Weightage *",
        value: Weightage,
        onChange: (e) => setWeightage(e.target.value),
      }
      : {
        title: "Weightage *",
        label: "Weightage",
        value: 0,
        onChange: (e) => setWeightage(0),
        hidden: true,
      },
    {
      title: "Instructions *",
      label: "Text",
      value: Text,
      onChange: (e) => setText(e.target.value),
      render: () => (
        <ReactQuill
          value={Text}
          onChange={setText}
          placeholder="Enter text here..."
          style={{
            width: "100%",
            minHeight: "100px",
            marginBottom: "16px",
          }}
        />
      ),
    },
  ];



  const addNewInputSet = () => {
    setInputSets([...inputSets, { text: "", clo: null, number: null }]);
  };
  const handleCheckboxChange = (event) => {
    
    setNotifyStudents(event.target.checked);
  };
  const handleInputSetChange = (index, field, value) => {
    const newInputSets = [...inputSets];
    newInputSets[index][field] = value;
    setInputSets(newInputSets);
  };
  const deleteInputSet = (index) => {
    setInputSets((prevInputSets) =>
      prevInputSets.filter((_, i) => i !== index)
    );
  };

  const capitalizedComponentName =
    componentName?.charAt(0)?.toUpperCase() + componentName?.slice(1);
  const [files, setFiles] = useState(null);


  const repharaseQuestions = (questionArray) => {
    const Repharase = questionArray.reduce((acc, curr, index) => {
      acc[`"question${index + 1}"`] = curr.text;
      acc[`"level${index + 1}"`] = curr?.clo?.CLONum;
      return acc;
    }, {});
    dispatch(
      AddGptQuestionAction(
        token,
        Repharase,
        (response) => {
          toast.success(response.message);
          response?.payload.forEach((item, index) => {
            if (item.rephrasedQuestion) {
              questionArray[index].text = item.rephrasedQuestion;
            }
          });
          setInputSets(questionArray);
          console.log("input inside action", inputSets)
          addNewInputSet();
        },
        (error) => {
          console.log("myError", error)
          if (error?.message?.status != 500) {
            if (error?.message?.payload != "") {
              toast.error(error?.message?.message);
            }
          } else {
            toast.error("Server Error " + error?.message?.status);
          }
        }
      )
    );
  }


  const handleaddquestionFunction = (SubId) => {
    const validQuestions = [];
    inputSets.forEach((question, index) => {
      const { text, clo, number } = question;
      if (text !== null && clo !== null && number !== null) {
        console.log(`${text} ${clo.CLOId} ${number}`);
        const questionMarks = parseInt(number, 10);
        const cloId = clo.CLOId
        validQuestions.push({ text, cloId, questionMarks });
      }
    });

    validQuestions.forEach((validQuestion) => {
      const { text, cloId, questionMarks } = validQuestion;
      dispatch(AddQuestionsAction(token, questionMarks ? questionMarks : "0", SubId, cloId, text), (error, response) => {
        if (error) {
          console.error('Error adding question:', error);
        } else {
          console.log('Response:', response);
        }
      });
    });
  }


  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
        maxWidth="sm"
        sx={{
          borderRadius: "10px",
          overflow: "auto",
          "& .MuiDialog-container": {
            "& .MuiPaper-root": {
              width: "100%",
              maxWidth: "900px",
            },
          },
        }}
      >
        <Box
          sx={{
            borderBottom: "0.0625rem solid #e0e0e0",
            display: "flex",
            justifyContent: "space-between",
            padding: "15px",
            background: "#EDEFF5",
          }}
        >
          <h1
            className="sm:text-2  xl text-2xl font-medium title-font  text-gray-900"
            style={{ fontFamily: "sans-serif" }}
          >
            {" "}
            {`Create ${capitalizedComponentName}`}
          </h1>
          <IconButton onClick={handleClose}>
            <Close />
          </IconButton>
        </Box>

        <Box sx={{ margin: "7px" }}>
          <Card
            className="text-gray-400 body-font"
            sx={{
              background: "#fffff",
              marginTop: "10px",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            }}
          >
            <div className="" style={{ overflow: "hidden" }}>
            </div>
          </Card>

          <DialogContent style={{ padding: 20 }}>
            <Grid
              container
              spacing={3}
              mt={1}
            >
              {textFields.map(
                (field, index) =>
                  !field.hidden && (
                    <Grid
                      key={index}
                      item
                      xs={12}
                      md={
                        field.label === "Text" ||
                          field.label === "assingnmentNumber"
                          ? 12
                          : 6
                      }
                    >
                      <Typography
                        variant="h6"
                        component="h2"
                        sx={{ fontWeight: "500", fontSize: "13px" }}
                      >
                        {field.title}
                      </Typography>
                      {field.label === "Text" ? (
                        field.render()
                      ) : (
                        <TextField
                          type={field.type}
                          label={field.label}
                          variant="filled"
                          fullWidth
                          value={field.value}
                          onChange={field.onChange}
                          style={{ marginBottom: 16, }}
                          InputProps={{
                            style: { backgroundColor: "whitesmoke !important", fontSize: '16px' },
                          }}
                        />
                      )}
                    </Grid>
                  )
              )}
            </Grid>

            {(ComponentType == "Graded") && (
              <>
                <Card
                  className="text-gray-400 body-font"
                  sx={{
                    background: "#fffff",
                    marginTop: "10px",
                    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                    paddingBottom: "10px",
                    paddingLeft: "10px",
                    paddingRight: "10px",
                  }}
                >
                  <Button
                    variant="contained"
                    startIcon={<Add />}
                    onClick={addNewInputSet}
                    sx={{
                      marginBottom: 2,
                    }}
                  >
                    Add {componentName} Question
                  </Button>

                  {inputSets.map((inputSet, index) => (
                    <Grid container spacing={2} key={index}>
                      <Grid item xs={12} md={10}>

                        <TextareaAutosize
                          value={inputSet.text}
                          onChange={(e) => handleInputSetChange(index, 'text', e.target.value)}
                          className="bg-gray-100"
                          placeholder="Enter text here..."
                          style={{
                            width: '100%',
                            height: '80%',
                            padding: '4px',
                            borderRadius: '4px',
                            fontSize: '13px',
                          }}
                          minRows={2}
                        />
                        <IconButton
                          size="small"
                          onClick={() => deleteInputSet(index)}
                        >
                          <Delete />
                        </IconButton>
                      </Grid>
                      <Grid item xs={12} md={2}>
                        <Typography variant="h6" component="h2" sx={{ fontWeight: '600', fontSize: '14px' }}>
                          Select CLO {index + 1}
                        </Typography>
                        <Autocomplete
                          options={getclosData?.payload || []}
                          getOptionLabel={(option) => option.CLONum || ''}
                          value={inputSet.clo}
                          onChange={(event, value) => handleInputSetChange(index, 'clo', value)}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              variant="outlined"
                              placeholder="Enter CLO Number here..."

                            />
                          )}
                        />
                        <Typography variant="h6" component="h2" sx={{ fontWeight: '600', fontSize: '14px' }}>
                          Enter Question Marks
                        </Typography>

                        <TextField

                          value={inputSet.number}
                          onChange={(e) => handleInputSetChange(index, 'number', e.target.value)}

                        />


                      </Grid>

                    </Grid>
                  ))}
                </Card>
              </>
            )}
            {(ComponentType == "Graded") &&
              <Box
                display="flex"
                justifyContent="center"
                my={2} // Margin on top and bottom
              >
                <Button
                  startIcon={<Add />}
                  variant="contained"
                  onClick={() => {
                    repharaseQuestions(inputSets);
                  }}
                  sx={{
                    textTransform: "capitalize",
                    borderRadius: "8px",
                    fontWeight: "500",
                    fontSize: "13px",
                    padding: "12px 20px",
                    color: "#fff !important",
                  }}
                >
                  Rephrase
                </Button>
              </Box>
            }
            <Card
              className="text-gray-400 body-font"
              sx={{
                background: "#fffff",
                marginTop: "10px",
                boxShadow: "0 2px 4px rgba(0,0,0,0.1)",

              }}
            >
              {
                <Grid container spacing={3}>
                  <Grid item xs={12} justifyContent={"center"}>
                    <Typography variant="h6" gutterBottom>
                      Choose Attachments
                    </Typography>
                    <div className="flex justify-center">
                      <div className="flex flex-col flex-grow mb-3 max-w-md ">
                        <div
                          className="block w-full py-2 px-3 relative bg-white appearance-none border-2 border-gray-300 border-solid rounded-md hover:shadow-outline-gray flex justify-center"
                        >
                          <form
                            action="/uploadmultiple"
                            encType="multipart/form-data"
                            method="POST"
                          >
                            <input
                              type="file"
                              multiple
                              onChange={handleFileChange}
                              style={{ border: "1px solid black" }}
                              className="absolute inset-0 z-50 m-0 p-0 w-full h-full outline-none opacity-0"
                            />
                            {files !== null ? (
                              <div className="flex flex-col space-y-1">
                                {Array.from({ length: files.length }).map(
                                  (_, index) => (
                                    <div
                                      key={index}
                                      className="flex flex-row items-center space-x-2"
                                    >
                                      <span className="font-medium text-gray-900">
                                        {files[index].name}
                                      </span>
                                      {/* <span className="text-xs self-end text-gray-500">{filesize(files[index].size)}</span> */}
                                    </div>
                                  )
                                )}
                              </div>
                            ) : (
                              <div className="flex flex-col space-y-2 items-center justify-center">
                                <i className="fas fa-cloud-upload-alt fa-3x text-currentColor"></i>
                                <p className="text-gray-700">
                                  Drag your files here or click in this area.
                                </p>
                              </div>
                            )}
                          </form>
                        </div>
                      </div>
                    </div>

                    {selectedFiles.length > 0 && (
                      <Grid container spacing={2}>
                        <Grid item xs={12}>
                          <Paper
                            elevation={0}
                            style={{
                              padding: "10px",
                              backgroundColor: "#f5f5f5",
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            <Typography variant="body2" style={{ flex: 1 }}>
                              Files:{" "}
                              {selectedFiles
                                .map((file) => file.name)
                                .join(", ")}
                            </Typography>
                            <IconButton
                              size="small"
                              onClick={() => setSelectedFiles([])}
                            >
                              <Close />
                            </IconButton>
                          </Paper>
                        </Grid>
                      </Grid>
                    )}
                  </Grid>
                </Grid>
              }
            </Card>

            {


              <DialogActions sx={{ justifyContent: 'space-between', p: 2 }}>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Button
                    startIcon={<Add />}
                    variant="contained"
                    onClick={() => handleDispatchAction("Draft")}
                    sx={{
                      textTransform: "capitalize",
                      borderRadius: "8px",
                      fontWeight: "500",
                      fontSize: "13px",
                      padding: "12px 20px",
                      color: "#fff",
                      backgroundColor: "#6c757d", // Gray for draft
                      '&:hover': {
                        backgroundColor: "#5a6268", // Darker gray on hover
                      }
                    }}
                  >
                    Save As Draft
                  </Button>
                  <Button
                    startIcon={<Add />}
                    variant="contained"
                    onClick={() => handleSaveTemplate()}
                    sx={{
                      textTransform: "capitalize",
                      borderRadius: "8px",
                      fontWeight: "500",
                      fontSize: "13px",
                      padding: "12px 20px",
                      color: "#fff",
                      backgroundColor: "#007bff", // Blue for save as template
                      '&:hover': {
                        backgroundColor: "#0056b3", // Darker blue on hover
                      }
                    }}
                  >
                    Save As Template
                  </Button>
                </Box>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={notifyStudents}
                      onChange={handleCheckboxChange}
                      sx={{
                        color: "#28a745",
                        '&.Mui-checked': {
                          color: "#218838",
                        }
                      }}
                    />
                  }
                  label="Notify Students"
                  sx={{
                    marginLeft: "200px",
                    marginTop: "10px",
                    textTransform: "capitalize",
                    fontWeight: "500",
                    fontSize: "13px",
                  }}
                />
                <Button
                  startIcon={<Add />}
                  variant="contained"
                  onClick={() => handleDispatchAction("Active")}
                  sx={{
                    textTransform: "capitalize",
                    borderRadius: "8px",
                    fontWeight: "500",
                    fontSize: "13px",
                    padding: "12px 20px",
                    color: "#fff",
                    backgroundColor: "#28a745", // Green for assign
                    '&:hover': {
                      backgroundColor: "#218838", // Darker green on hover
                    }
                  }}
                >
                  Create
                </Button>
              </DialogActions>

            }


            <Divider style={{ margin: "20px 0" }} />

            <div
              style={{ textAlign: "center", width: "100%", marginTop: "10px" }}
            >
              {error && (
                <Typography
                  variant="body1"
                  color="error !important"
                  className="text-center mt-4 "
                >
                  {error}
                </Typography>
              )}
            </div>
          </DialogContent>
        </Box>
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
    </>
  );
};

export default AddSubComponent;