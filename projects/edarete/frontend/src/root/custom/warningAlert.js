import * as React from "react";
import Card from "@mui/material/Card";
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

const WarningAlert = () => {
  return (
    <>
      <Card
        sx={{
          boxShadow: "none",
          mb: "15px",
        }}
      >
        
        <Stack sx={{ width: '100%' }} spacing={2}>
          <Alert variant="filled" severity="warning">
           No Warning Yet
          </Alert>
          
        </Stack>
      </Card>
    </>
  );
};

export default WarningAlert;
