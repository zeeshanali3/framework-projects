import React, { useState, useEffect } from "react";
import { Grid, Card,CardContent, TextField, InputAdornment, Typography, Box, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { GetsubcomponentattachmentAction } from "../../Common/Store/Actions/General/GetActions/getsubattachmentsAction.js";
import { GetstudentMarksAction } from "../../Common/Store/Actions/General/GetActions/getstudentMarksAction.js";
import {GetstudentsubmissionAction} from "../../Common/Store/Actions/General/GetActions/getstudentsubmissionAction.js";
import isEqual from 'lodash/isEqual';
import { getAccessToken } from "../../Utils/loginData/loginData.jsx";
import { toast, ToastContainer } from "react-toastify";
import { isLoadingAction } from "../../Common/Store/Actions/General/PostActions/isLoadingAction.js";
import MinMaxAveSolution from "./MinMaxAveSolution";
const ActivityResult = ({ TotalMarks, SubComponentId, roleName }) => {
  const { loginData } = useSelector((state) => state?.LOGINREDUCER);
  const token = getAccessToken(loginData);
  const dispatch = useDispatch();
  const [marks, setMarks] = useState( []);
    const [client, setClient] = useState({});
  const [getAllStudentSubmissions, setGetAllStudentSubmissions] = useState([]);
  useEffect(() => {
    dispatch(isLoadingAction(true));
    dispatch(
      GetstudentsubmissionAction(
        token,
        SubComponentId,
        (response) => {
          setAllStudentSubmissions(response.payload.studentSubmissionData.filter(item => item.EnrollementId !== null))
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
  const [currentStudentData, setCurrentStudentData] = useState([]);
  const [allStudentSubmissions, setAllStudentSubmissions] = useState([]);

  useEffect(() => {
    if (allStudentSubmissions && allStudentSubmissions.length > 0) {

      const marks = allStudentSubmissions
      .filter(mark => mark.SubcomponentMarks !== null && mark !== undefined)
      .map(submission => parseFloat(Number(submission.SubcomponentMarks)))
    const max = Math.max(...marks);
    const min = Math.min(...marks);
    const average = marks.reduce((sum, mark) => sum + mark, 0) / marks.length;
      const maxObj =allStudentSubmissions
      .filter(mark => mark.SubcomponentMarks !== null && mark !== undefined)
      .find(
        submission => parseFloat(Number(submission.SubcomponentMarks)) === max
      );
      const minObj = allStudentSubmissions
      .filter(mark => mark.SubcomponentMarks !== null && mark !== undefined)
      .find(
        submission => parseFloat(Number(submission.SubcomponentMarks)) === min
      );
      const avgObj = allStudentSubmissions.reduce((prev, curr) => {
        return Math.abs(parseFloat(curr.SubcomponentMarks) - average) < Math.abs(parseFloat(prev.SubcomponentMarks) - average) ? curr : prev;
      });

      setClient({ max: maxObj, min: minObj, average: avgObj });
    }
  }, [allStudentSubmissions]);
  useEffect(() => {
    setCurrentStudentData(getstudentMarksData?.payload ?? []);
  }, [getstudentMarksData]); 

  useEffect(() => {
    const updatedSubmissions = mapSubmissionsWithMarks();
    if (!isEqual(updatedSubmissions, allStudentSubmissions)) {
      setAllStudentSubmissions(updatedSubmissions);
    }
  }, [currentStudentData]);

  const mapSubmissionsWithMarks = () => {
    return allStudentSubmissions.map(submission => {
      const enrollmentId = submission.EnrollementId;
      const marksData = currentStudentData.find(data => data.EnrollmentId === enrollmentId);
      const obtainedMarks = marksData ? marksData.Obtained_Marks : "";
      return {
        ...submission,
        obtainedMarks,
      };
    });
  };



  function MapStudentMarks(response = null) {
    if (response == null) {
      if (!getAllStudentSubmissions?.payload) return;
  
      const newMarks = getAllStudentSubmissions.payload.flatMap(client => {
        return client.Questions.map(item => ({
          obtainedMarks: item.ObtainedMarks,
          questionEvaluationId: item.QuestionEvaluationId,
          studentSubmissionId:client.StudentSubmissionId
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
            studentSubmissionId: client.StudentSubmissionId
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
          No submissions found 
        </Typography>
      ) : 
      (
        <Grid container spacing={2} justifyContent="left">
        <Grid container item xs={12} md={8} lg={10} spacing={5} height={"100%"}>
          <Grid item xs={12} md={4}>
            {<MinMaxAveSolution title={'Maximum Solution'} data={client.max} roleName={roleName}/>}
          </Grid>
          <Grid item xs={12} md={4}>
            {<MinMaxAveSolution title={'Average Solution'} data={client.average} roleName={roleName}/>}
          </Grid>
          <Grid item xs={12} md={4}>
            {<MinMaxAveSolution title={'Minimum Solution'} data={client.min} roleName={roleName}/>}
          </Grid>
        </Grid>
        </Grid>

    )}
    </div>
  );



};

export default ActivityResult;