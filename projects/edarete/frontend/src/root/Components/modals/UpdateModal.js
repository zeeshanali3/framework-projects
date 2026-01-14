
import React, { useState, useEffect } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
  TextareaAutosize,
  Box,
  useTheme, Card, Grid, Paper, IconButton,  Checkbox,
  FormControlLabel
} from "@mui/material";
import { Close,  Add, Delete } from "@mui/icons-material";
import Autocomplete from "@mui/material/Autocomplete";
import "./update.css";
import { Transition } from "../../Animation/Animation";
import ReactQuill from 'react-quill';
import { useDispatch,useSelector } from "react-redux";
import 'react-quill/dist/quill.snow.css';

const UpdateModal = ({
  open,
  handleClose,
  handleUpdate,
  title,
  inputs,
  initialData,
  autocompleteOptions,
  isLoading
}) => {


  const dispatch = useDispatch();
  const [formData, setFormData] = useState(initialData || {});
  console.log("FormData:::",formData)
  const [progress, setProgress] = useState(0);

  const [questions, setQuestions] = useState([{ text: '', clo: null }]);
  const [inputSets, setInputSets] = useState([{ text: "", clo: null }]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [notifyStudents, setNotifyStudents] = useState(false);
  const { getclosData } = useSelector((state) => state?.GETCLOS);

  useEffect(() => {
    let timer;
    if (isLoading) {
      setProgress(0);

      timer = setInterval(() => {
        setProgress((oldProgress) => {
          if (oldProgress >= 90) {
            return oldProgress;
          }
          return Math.min(oldProgress + 1, 90);
        });
      }, 600);
    } else {
      setProgress(100);
      if (timer) {
        clearInterval(timer);
      }
    }

    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
  }, [isLoading]);
  useEffect(() => {
    setFormData(initialData || {});

  }, [initialData]);
  useEffect(() => {
    console.log("this is clo data", initialData.Questions);
    if (initialData.Questions) {
      const newInputSets = initialData.Questions.map((question) => {
        const clo = getclosData?.payload?.find((clo) => clo?.CLOId === question?.CLOId);
        console.log("this is clo", clo);
        return {
          QuestionId: question?.QuestionId,
          text: question?.Description,
          clo: clo?.CLONum,
          number: question?.QuestionMarks,
          CLOId: question?.CLOId
        };
      });
      setInputSets(newInputSets);
    }
  }, [initialData.Questions]);

  const addNewInputSet = () => {
    setInputSets([...inputSets, { text: "", clo: null, number: null }]);
  };
  const handleChange = (name, value) => {
    console.log("this is initial data ", formData)
    console.log(`Updating ${name} to ${value}`);
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };
  const handleFileChange = (e) => {
    const files = e.target.files;
    setSelectedFiles(Array.from(files));
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
  const handleCheckboxChange = (event) => {
    setNotifyStudents(event.target.checked);
  };
  // const repharaseQuestions = (questionArray) =>
  //   {
  //     console.log("this is questionArray", questionArray)
  //     const Repharase = questionArray.reduce((acc, curr, index) => {
  //       acc[`"question${index + 1}"`] = curr.text;
  //       acc[`"level${index + 1}"`] = curr?.clo;
  //       return acc;
  //     }, {});
  //     console.log("this is repharase", Repharase)
      
     
  
  
  
  
  //     dispatch(
  //       AddGptQuestionAction(
  //         "",
  //         Repharase,
  //         (response) => {
  //           toast.success(response.message);
  //           response?.payload.forEach((item, index) => {
  //             if (item.rephrasedQuestion) {
  //               questionArray[index].text = item.rephrasedQuestion;
  //             }
  //           });
  //           setInputSets(questionArray);
  //           console.log("input inside action" ,inputSets)
  //         },
  //         (error) => {
  //           console.log("myError",error)
  //           if (error?.message?.status != 500) {
  //             if (error?.message?.payload != "") {
  //               toast.error(error?.message?.message);
  //             }
  //           } else {
  //             toast.error("Server Error " + error?.message?.status);
  //           }
  //         }
  //       )
  //     );
  //   } 


  return (
    <Dialog open={open} onClose={handleClose} sx={{ borderRadius: "8px" }} fullWidth maxWidth="sm" TransitionComponent={Transition} disableBackdropClick
      disableEscapeKeyDown>
      <DialogTitle
        className="flex justify-center header"
        sx={{ color: "black" }}
      >
        <Typography fontSize={"18px"} fontWeight={"500"} lineHeight={"1.6"}>
          {title}
        </Typography>
      </DialogTitle>
      <DialogContent>
        {inputs?.map((input) =>
          input.type === "autocomplete" ? (
            <Autocomplete
              key={input.name}
              options={autocompleteOptions[input.name] || []}
              getOptionLabel={(option) => option || ""}
              value={formData[input.name] || null}
              onChange={(_, value) => handleChange(input.name, value)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label={input.label}
                  variant="outlined"
                  fullWidth
                  margin="normal"
                />
              )}
            />
          ) : input.type === "textfield" ? (
            <TextField
              key={input.name}
              name={input.name}
              label={input.label}
              type={input.type}
              variant="outlined"
              fullWidth
              margin="normal"
              value={formData[input.name] || ""}
              onChange={(e) => handleChange(input.name, e.target.value)}
              {...input.props}
            />
          ) : input.type === "number" ? (
            <TextField
              key={input.name}
              name={input.name}
              label={input.label}
              title={input.title}
              type={input.type}
              variant="outlined"
              fullWidth
              negative={false}
              margin="normal"
              value={formData[input.name] || ""}
              onChange={(e) => handleChange(input.name, e.target.value)}
              {...input.props}
            />

          ) : input.type == "date" ? (
            <>
            {console.log("this is date",formData[input.name])}
            <TextField
              key={input.name}
              name={input.name}
              label={input.label}
              type={input.type}
              variant="outlined"
              fullWidth
              margin="normal"
              value={formData[input.name] || ""}
              onChange={(e) => handleChange(input.name, e.target.value)}
              {...input.props}
            />
            </>
          ) : input.type == "time" ? (
            <TextField
              key={input.name}
              name={input.name}
              label={input.label}
              type={input.type}
              variant="outlined"
              fullWidth
              margin="normal"
              value={formData[input.name] || ""}
              onChange={(e) => handleChange(input.name, e.target.value)}
              {...input.props}
            />
          ) : input.type === "quill" ? (
            <div style={{ marginTop: "15px", marginBottom: '16px' }}>
              {/* Render the label */}
              {input.label && <label htmlFor={input.name} style={{ display: 'block', marginBottom: '8px' }}>{input.label}</label>}

              {/* Render the ReactQuill editor */}
              <ReactQuill
                sx={{ minHeight: "500px" }}
                key={input.name}
                name={input.name}
                label={input.label}
                type={input.type}
                variant="outlined"
                fullWidth
                margin="normal"
                value={formData[input.name] || ""}
                onChange={(value) => handleChange(input.name, value)}
                {...input.props}
              />

            </div>

          )
            : input.type == "TeaxtAreaAutoSize" ? (

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
                    Add Question
                  </Button>

                  {(inputSets?.map((inputSet, index) => (
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
                          value={getclosData?.payload.find(option => option.CLONum == inputSet.clo) || inputSet.clo}
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
                  )))}
                </Card>
              </>

            ) : input.type === "file" ? (
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

                              <div className="flex flex-col space-y-2 items-center justify-center">
                                <i className="fas fa-cloud-upload-alt fa-3x text-currentColor"></i>
                                <p className="text-gray-700">
                                  Drag your files here or click in this area.
                                </p>
                              </div>

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
            )
              : (
                <ReactQuill
                  sx={{ minHeight: "500px" }}
                  key={input.name}
                  name={input.name}
                  label={input.label}
                  type={input.type}
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={formData[input.name] || ""}
                  onChange={(value) => handleChange(input.name, value)}
                  {...input.props}
                />
              )
        )}
      </DialogContent>
      <DialogActions >
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
        <Button onClick={handleClose} variant="contained"
          sx={{
            textTransform: "capitalize",
            borderRadius: "8px",
            fontWeight: "500",
            fontSize: "13px",
            padding: "12px 20px",
            color: "#fff !important",
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={() => handleUpdate({ ...initialData, ...formData, "Attachments": selectedFiles,"Questions":inputSets ,"NotifyUsers": notifyStudents})}
          variant="contained"
          sx={{
            textTransform: "capitalize",
            borderRadius: "8px",
            fontWeight: "500",
            fontSize: "13px",
            padding: "12px 20px",
            color: "#fff !important",
          }}
        >
          Update
        </Button>
      </DialogActions>





    </Dialog>
  );
};

export default UpdateModal;


