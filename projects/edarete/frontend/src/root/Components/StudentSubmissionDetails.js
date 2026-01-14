// ClientDetailsView.js
import React, { useState } from 'react';
import AttachmentsSection from './AttachmentSection'; // Adjust the import path as necessary
import QuestionCard from './QuestionSection'; // Adjust the import path as necessary
import { Box, Button } from '@mui/material'; // or '@material-ui/core' if using MUI v4

function ClientDetailsView({ client, clientAttachments,clientQuestions, marks, handleMarksChange, handleSubmitAll,studentSubmissionId,hideButton }) {
  const [showDetails, setShowDetails] = useState(handleMarksChange && handleSubmitAll?false:true);
 const toggleDetails = () => {
    setShowDetails(prev => !prev);

    console.log("clientQuestions",typeof clientQuestions)
  };

  return (
    <div>
       <Box display="flex" justifyContent="center" mb={2}>
        {handleMarksChange &&handleSubmitAll&& (
        <Button variant="contained" onClick={toggleDetails}
        sx={{
          background:"#1976d2"
        }}
        >
          {showDetails ? 'Hide Details' : 'View Details'}
        </Button>)}
      </Box>
      
      {showDetails && (
        <>
          {clientAttachments && Array.isArray(clientAttachments) && clientAttachments.length > 0 && (
            <AttachmentsSection attachments={clientAttachments} />
          )}
          
          <Box>
            {clientQuestions?.map((question, qIndex) => (
              <QuestionCard
                key={qIndex}
                client={client}
                question={question}
                marks={marks}
                handleMarksChange={handleMarksChange}
                handleSubmitAll={handleSubmitAll}
                studentSubmissionId={studentSubmissionId}
              />
            ))}
          </Box>
        </>
      )}
    </div>
  );
}

export default ClientDetailsView;
