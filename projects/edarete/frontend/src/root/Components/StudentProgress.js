import React, { useEffect, useState } from "react";
import {
  Box,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Card,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Grid
} from "@mui/material";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";
import { getStudentData } from "../Utils/loginData/loginData.jsx";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { GetIndividualStudentPerformanceAction } from "../Common/Store/Actions/General/GetActions/getindividualstudentperfromanceAction.js";
import { GetWholeClassPerformanceAction } from "../Common/Store/Actions/General/GetActions/getwholeclassperformanceAction.js";
import WholeClassPerformance from "./wholeclassPerformance/WholeClassPerformance";
import { isLoadingAction } from "../Common/Store/Actions/General/PostActions/isLoadingAction.js";
const StudentProgress = ({id}) => {
  const dispatch = useDispatch();
  const [selectedTimePeriod, setSelectedTimePeriod] = useState("weekly");
  const [filteredData, setFilteredData] = useState({});
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogData, setDialogData] = useState(null);
 
  const { loginData } = useSelector((state) => state?.LOGINREDUCER);
const { getindividuastudentperformance } = useSelector((state) => state?.GETSTUDENTINDIVIDUALPERFORMANCE);
  
  const token = loginData?.accessToken;
  const studentData = getStudentData(loginData);
  const matchingEnrollment = studentData && studentData.find((enrollment) => enrollment.CourseId == id);
  const enrollmentId = matchingEnrollment ? matchingEnrollment.EnrollementId : null;

  useEffect(() => {
    if (enrollmentId && id) {
      dispatch(isLoadingAction(true));
      dispatch(GetIndividualStudentPerformanceAction(token, enrollmentId, id,
        (response) => {
          dispatch(isLoadingAction(false));
        },
        (error) => {
          dispatch(isLoadingAction(false));
        }
      ));
    }
  }, [enrollmentId, id, dispatch, token]);
 
  useEffect(() => {
    if (getindividuastudentperformance && getindividuastudentperformance.payload) {
      const groupedData = getindividuastudentperformance?.payload
        .filter(item => item.ComponentPolicy >= 0)
        .reduce((acc, item) => {
          const componentName = item.ComponentName;
          if (!acc[componentName]) {
            acc[componentName] = [];
          }
          acc[componentName].push({
            name: `${item.ComponentName} ${item.SubComponentNum}`,
            Total: item.SubComponentTotalMarks,
            Obtained: item.SubComponentObtainedMarks
          });
          return acc;
        }, {});

      setFilteredData(groupedData);
    }
  }, [getindividuastudentperformance]);

  const handleTimePeriodChange = (event) => {
    setSelectedTimePeriod(event.target.value);
    
    const selectedWeek = weekOptions.find(week => week.value === event.target.value);
    const startDate = new Date(selectedWeek.startDate);
    const endDate = new Date(selectedWeek.endDate);

    const groupedData = getindividuastudentperformance.payload
      .filter(entry => {
        const entryDate = new Date(entry.SubComponentCreatedAt);
        return entryDate >= startDate && entryDate <= endDate;
      })
      .filter(item => item.ComponentPolicy > 0)
      .reduce((acc, item) => {
        const componentName = item.ComponentName;
        if (!acc[componentName]) {
          acc[componentName] = [];
        }
        acc[componentName].push({
          name: `${item.ComponentName} ${item.SubComponentNum}`,
          Total: item.SubComponentTotalMarks,
          Obtained: item.SubComponentObtainedMarks
        });
        return acc;
      }, {});

    setFilteredData(groupedData);
  };

  const generateWeekOptions = () => {
    const weeks = [];
    const currentDate = new Date();
    const janFirst = new Date(currentDate.getFullYear(), 0, 1); 
    let weekStart = janFirst;

    while (weekStart < currentDate) {
      const weekEnd = new Date(weekStart);
      weekEnd.setDate(weekStart.getDate() + 6);

      const month = weekStart.toLocaleString('default', { month: 'short' });
      const weekLabel = `${month} week-${weeks.length + 1} (${weekStart.getDate()} ${month} - ${weekEnd.getDate()} ${month})`;
      weeks.push({ label: weekLabel, value: weeks.length, startDate: weekStart.toISOString().split('T')[0], endDate: weekEnd.toISOString().split('T')[0] });
      
      weekStart.setDate(weekStart.getDate() + 7); 
    }

    return weeks;
  };

  const weekOptions = generateWeekOptions();

  const handleClick = (data) => {
    setDialogData(data);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const componentColors = ['#8884d8', '#82ca9d', '#ffc658', '#d88484', '#84d8c4'];
  console.log('------filteredData------',filteredData," ",enrollmentId)
  return (
    <Box sx={{ margin: '20px' }}>
      {enrollmentId === null && (
      <>
      <WholeClassPerformance token={token} id={id} enrollementId={enrollmentId}/>
      </>

        
      )}

      
{/* <Grid container spacing={2}>
        {Object.keys(filteredData).map((componentName, index) => (
          <Grid item xs={12} md={6} key={componentName}>
            <Card sx={{ marginBottom: '20px', padding: '10px',backgroundColor:'rgb(255, 255, 255',    boxShadow: 'rgba(0, 0, 0, 0.2) 0px 2px 1px -1px' }}>
              <Typography variant="h6" sx={{ marginBottom: '10px',color:'black',  fontFamily: '"Helvetica Neue", sans-serif', }}>{componentName}</Typography>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={filteredData[componentName]} onClick={handleClick}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#EDEFF5" />
                  <XAxis dataKey="name" padding={{ left: 30, right: 30 }} stroke="#A9A9C8" fontSize={14} />
                  <YAxis stroke="#A9A9C8" fontSize={14} />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="Total" name="Total" stroke={componentColors[index % componentColors.length]} />
                  <Line type="monotone" dataKey="Obtained" name="Obtained" stroke={componentColors[(index + 1) % componentColors.length]} />
                </LineChart>
              </ResponsiveContainer>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Data Point Details</DialogTitle>
        <DialogContent>
          {dialogData && (
            <Typography variant="body2">
              {JSON.stringify(dialogData, null, 2)}
            </Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog> */}
    </Box>
  );
};

export default StudentProgress;
