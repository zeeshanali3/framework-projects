
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetWholeClassPerformanceAction } from "../../Common/Store/Actions/General/GetActions/getwholeclassperformanceAction";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Card, Grid, Typography, TextField, Box } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import { DataGrid } from "@mui/x-data-grid";
const dategrid = {
  height: "atuo",
  "& .MuiDataGrid-root": {
    border: "none",
  },
  "& .MuiDataGrid-cell": {
    borderBottom: "none",
    fontSize: "14px",
  },
  "& .MuiDataGrid-columnHeaders": {
    background: "#e5e7eb",
    borderBottom: "none",
    lineHeight: "20px",
    fontWeight: 400,
    fontSize: "15px",
    color: "#000",
  },
  "& .MuiDataGrid-footerContainer": {
    borderTop: "none",
  },
  "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
    color: "black",
  },
};
export default function WholeClassPerformance({ token, id, enrollmentId }) {
  const dispatch = useDispatch();
  const { wholeclassperformanceData } = useSelector(
    (state) => state?.GETWHOLECLASSPERFORMANCEREDUCER
  );
  const [selectedStudent, setSelectedStudent] = useState("");
  const [studentData, setStudentData] = useState([]);
  console.log("StudentData:::", studentData);
console.log("wholeclassperformanceDatawholeclassperformanceData",wholeclassperformanceData)
  useEffect(() => {
    dispatch(GetWholeClassPerformanceAction(token, id,
      (res) => {
        console.log("res", res)
      },
      (error) => {
        console.log("error", error)
      }
    ));
  }, [dispatch, id, token]);

  useEffect(() => {
    if (wholeclassperformanceData?.payload) {
      const uniqueStudents = [
        ...new Set(
          wholeclassperformanceData?.payload?.map((item) => item.StudentName)
        ),
      ];
      if (uniqueStudents?.length > 0) {
        setSelectedStudent(uniqueStudents[0]);
      }
      setStudentData(wholeclassperformanceData?.payload);
    }
  }, [wholeclassperformanceData]);

  const handleStudentChange = (event, value) => {
    setSelectedStudent(value);
  };

  const renderCharts = () => {
    const components = [
      ...new Set(studentData?.map((item) => item.ComponentName)),
    ];
    return components?.map((component) => {
      const componentData = studentData?.filter(
        (item) =>
          item.ComponentName === component &&
          item.StudentName === selectedStudent
      );
      return (
        <Grid item xs={12} key={component}>
          <Card
            sx={{
              marginBottom: "20px",
              padding: "10px",
              backgroundColor: "white",
              boxShadow:
                "rgb(204, 219, 232) 3px 3px 6px 0px inset, rgba(255, 255, 255, 0.5) -3px -3px 6px 1px inset",
            }}
          >
            <Typography
              variant="h6"
              sx={{
                marginBottom: "10px",
                color: "black",
                fontFamily: '"Helvetica Neue", sans-serif',
              }}
            >
              {component}
            </Typography>
            <ResponsiveContainer height={300}>
              <LineChart data={componentData} width={300} height={300}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="SubComponentNum"
                  label={{
                    value: component,
                    position: "insideBottomRight",
                    offset: 0,
                  }}
                  tickFormatter={(tick) => `${component} ${tick}`}
                  interval={0}
                  angle={-45}
                  textAnchor="end"
                  height={100}
                />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="SubComponentTotalMarks"
                  stroke="#8884d8"
                  name="Total"
                />
                <Line
                  type="monotone"
                  dataKey="SubComponentObtainedMarks"
                  stroke="#82ca9d"
                  name="Obtained"
                />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </Grid>
      );
    });
  };

  return (
    <>
      {/* <Box
        style={{
          backgroundColor: "#fff",
          boxShadow: "rgba(0, 0, 0, 0.45) 0px 25px 20px -20px",
        }}
      >
        <Typography
          variant="body1"
          style={{
            fontWeight: "bold",
            marginBottom: "10px",
            color: "black",
            fontFamily: '"Helvetica Neue", sans-serif',
            fontSize: "16px",
          }}
        >
          Select Student Name
        </Typography>

        <Autocomplete
          id="studentSelect"
          value={selectedStudent}
          onChange={handleStudentChange}
          options={
            wholeclassperformanceData?.payload
              ? [
                  ...new Set(
                    studentData?.map(
                      (item) => item.StudentName
                    )
                  ),
                ]
              : []
          }
          renderInput={(params) => {
            console.log("params:", params);
            return(
              <TextField
              // {...params}
              label="Select Student"
              variant="standard"
              sx={{ fontSize: "16px", color: "black" }}
            />
            )
          }}
        />
        
      </Box> */}
      <Grid container spacing={3} mt={2}>
        <Grid item xs={12} md={6}>
          <Box sx={dategrid}>
            <DataGrid
              rows={[
                ...studentData.map((item, index) => ({
                  id: index,
                  ...item,
                  ComponentAndSubComponent: `${item.ComponentName} ${item.SubComponentNum}`,
                })),
                {
                  id: "total",
                  StudentName: "Total",
                  SubComponentTotalMarks: studentData.reduce(
                    (acc, curr) => acc + curr.SubComponentTotalMarks,
                    0
                  ),
                },
              ]}
              columns={[
                {
                  field: "StudentName",
                  headerName: "Student Name",
                  width: 150,
                },
                {
                  field: "ComponentAndSubComponent",
                  headerName: "Component Name",
                  width: 250,
                },
                {
                  field: "SubComponentTotalMarks",
                  headerName: "Total Marks",
                  width: 150,
                },
                {
                  field: "SubComponentObtainedMarks",
                  headerName: "Obtained Marks",
                  width: 150,
                },
              ]}
              pageSize={10}
              rowsPerPageOptions={[10]}
              getRowClassName={(params) =>
                params.row.StudentName === selectedStudent
                  ? "selected-student"
                  : ""
              }
              density="compact"
            />
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Grid container spacing={2} direction="column">
            {renderCharts()}
          </Grid>
        </Grid>
      </Grid>
      <style jsx global>{`
        .selected-student {
          background-color: rgba(0, 0, 255, 0.1) !important;
        }
      `}</style>
    </>
  );
}
