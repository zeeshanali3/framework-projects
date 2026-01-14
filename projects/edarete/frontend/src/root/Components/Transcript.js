import { Box, Card, Grid, Typography, Table, TableBody, TableRow, TableCell, TableHead, TableContainer, Paper,TableFooter ,Badge } from "@mui/material";
import React from "react";

const mainCard = {
  mt: "15px",
  boxShadow: "none",
  borderRadius: "10px",
  p: "25px 20px",
  mb: "15px",
};
const mainHeader = {
  display: "flex",
  justifyContent: "space-between",
};
const unititleSX = {
  fontSize: "18px",
};
const issuedateSx = {
  fontWeight: "bold",
};
const acdhisboxSX = {
  display: "flex",
  justifyContent: "center",
  mt: "10px",
};

const acdhisboxtitleSX = {
  fontSize: "16px",
  fontWeight: "600",
};

const studentdetailBorder = {
  borderBottom:'1px solid black',
  paddingBottom:'15px',
};

const tablecellSX = {
  fontWeight: 500,
  borderBottom: "1px solid #F7FAFF",
  fontSize: "12px",
  padding: "9px 10px",
  color:'white',
  textAlign:'center',

}
const tablebodycellSx={
  width: 220,
  borderBottom: "1px solid #F7FAFF",
  fontSize: "13px",
  paddingTop: "13px",
  paddingBottom: "13px",
  textAlign:'center',
}
const studentDetails = [
  {
    label: "Student Name",
    value: "Muhammad Abdullah Baig",
  },
  {
    label: "Roll No.",
    value: "BSCE20025",
  },
  {
    label: "Degree Code",
    value: "BSCE",
  },
  {
    label: "Degree Title",
    value: "Bachelor of Science in Computer Engineering",
  },
  {
    label: "Father Name",
    value: "Mirza Shahid Baig",
  },
  {
    label: "CNIC Number",
    value: "35202-1232452-4",
  },
  {
    label: "Required Cr.Hrs",
    value: "133",
  },
  {
    label: "Date of Birth",
    value: "February 3, 2002",
  },
  {
    label: "Date of Admission",
    value: "September 28, 2020",
  },
  {
    label: "Mode of Study",
    value: "Regular",
  },
  {
    label: "Type of Enrollment",
    value: "Full Time",
  },
  {
    label: "Current Semester",
    value: "8",
  },
];

const courseArray=[
  {
    id:'1',
    code:'CE100L',
    title:'Computing  Fundamental and Programming Lab',
    theory:'0',
    Lab:'1',
    Grade:'B',
    sgpa:'3.04',
    cgpa:'3.04',
    earnedcrHr:'12',
  },
  {
    id:'2',
    code:'CE100T',
    title:'Computing  Fundamental and Programming ',
    theory:'3',
    Lab:'0',
    Grade:'B+',
    sgpa:'3.04',
    cgpa:'3.04',
    earnedcrHr:'12',
  },
  {
    id:'3',
    code:'CE110L',
    title:'Linear Circuit Analysis Lab  ',
    theory:'0',
    Lab:'3',
    Grade:'B+',
    sgpa:'3.04',
    cgpa:'3.04',
    earnedcrHr:'12',
  },
  {
    id:'3',
    code:'CE110L',
    title:'Linear Circuit Analysis   ',
    theory:'3',
    Lab:'0',
    Grade:'B+',
    sgpa:'3.04',
    cgpa:'3.04',
    earnedcrHr:'12',
  },
]

const CustomTable = ({ title ,session ,semester }) => {
  const footerData = courseArray[0]; 
  return (
    <Grid item xs={12} sm={7} md={6}>
      <Box className='flex justify-between'>
        <Typography variant="subtitle1" sx={{fontWeight:'bold'}}>Session : {session}</Typography>
        <Typography variant="subtitle1" sx={{fontWeight:'bold'}}>Semester : {semester}</Typography>
      </Box>

      <TableContainer component={Paper} sx={{ boxShadow: "none", marginTop:'15px' , marginBottom:'15px'}}>
        <TableHead sx={{ background: "rgb(95, 99, 104)" }}>
          <TableCell sx={tablecellSX}>Course Code</TableCell>
          <TableCell sx={tablecellSX}>Course Title</TableCell>
          <TableCell sx={tablecellSX}>Theory</TableCell>
          <TableCell sx={tablecellSX}>Lab</TableCell>
          <TableCell sx={tablecellSX} align="center">Grade</TableCell>
        </TableHead>
        <TableBody>
          {courseArray.map((mapper) => (
            <TableRow key={mapper.id}>
              <TableCell sx={tablebodycellSx}>{mapper.code}</TableCell>
              <TableCell sx={tablebodycellSx}>{mapper.title}</TableCell>
              <TableCell sx={tablebodycellSx}>{mapper.theory}</TableCell>
              <TableCell sx={tablebodycellSx}>{mapper.Lab}</TableCell>
              <TableCell sx={tablebodycellSx}>
                {mapper.Grade === "F" || mapper.Grade === "FF" ? (
                  <Badge color="error" badgeContent={mapper.Grade}>
                    {mapper.Grade}
                  </Badge>
                ) : (
                  mapper.Grade
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell align="center" colSpan={1} sx={{fontWeight:'600', fontSize:'12px'}}>
              SGPA: {footerData.sgpa}
            </TableCell>
            <TableCell align="center" colSpan={2} sx={{fontWeight:'600', fontSize:'12px'}}>
              CGPA: {footerData.cgpa}
            </TableCell>
            <TableCell align="center" colSpan={2} sx={{fontWeight:'600', fontSize:'12px'}}>
              Credit Hr Earned: {footerData.earnedcrHr}
            </TableCell>
          </TableRow>
        </TableFooter>
      </TableContainer>
    </Grid>
  );
}


const Transcript = () => {
  return (
    <>
      <Card sx={mainCard}>
        {/* Title header */}
        <Box sx={mainHeader}>
          <Typography sx={unititleSX}>ITU</Typography>
          <div>
            <Typography>
              Issue Date: <span style={issuedateSx}>January 31, 2024</span>
            </Typography>
          </div>
        </Box>
        {/* Academic History */}
        <Box sx={acdhisboxSX}>
          <Typography sx={acdhisboxtitleSX}>Academic History</Typography>
        </Box>
        {/* Student Data */}
        <Grid container spacing={2} justifyContent="center" mt={3} sx={studentdetailBorder}>
          {studentDetails.map((detail, index) => (
            <React.Fragment key={index}>
              <Grid item xs={5} sm={6} md={3}>
                <Typography variant="body1" align="right">
                  <strong>{detail.label}</strong>
                </Typography>
              </Grid>
              <Grid item xs={5} sm={6} md={3}>
                <Typography variant="body1" align="left">
                  {detail.value}
                </Typography>
              </Grid>
            </React.Fragment>
          ))}
        </Grid>

        {/* Table */}
        <Grid container spacing={2} justifyContent="left" mt={3} >
        <CustomTable title="First Table" session="F2020" semester={1} />
        <CustomTable title="Second Table" session="F2020" semester={1} />
        <CustomTable title="Second Table" session="F2020" semester={2} />

        </Grid>

      </Card>
    </>
  );
};

export default Transcript;
