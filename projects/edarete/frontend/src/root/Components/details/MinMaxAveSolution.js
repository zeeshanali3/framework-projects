import React, { useEffect, useState } from 'react';
import { Grid, Card, CardContent, Typography, Divider } from '@mui/material';
import StudentSubmissionDetails from '../StudentSubmissionDetails';
function MinMaxAveSolution({ title, data, roleName }) {
  console.log("roleName::", roleName)
  return (
    <Card>
      <CardContent>
        <Typography variant="h6" color="primary" gutterBottom>
          {title}
        </Typography>
        {roleName=="Student" &&
          <Typography variant="h6" color="textSecondary">
          Marks: {data?.SubcomponentMarks}
        </Typography>
        }
        {roleName != "Student" &&
          (<>


            <Typography variant="subtitle1" color="textSecondary">
              {data?.Student_Name} - {data?.RegNum}
            </Typography>
            <Typography variant="subtitle2" color="textSecondary">
              Obtained Marks - {data?.SubcomponentMarks}
            </Typography>
            <Divider style={{ margin: '10px 0' }} />
            <StudentSubmissionDetails
              clientAttachments={data?.Attachments}
              clientQuestions={data?.Questions}
              marks={data?.SubcomponentMarks}
            />

          </>)}
      </CardContent>
    </Card>
  )
};
export default MinMaxAveSolution;
