// QuestionCard.js
import React from 'react';
import { Box, TextField, Button, Typography, Grid, Stack } from '@mui/material';

function QuestionCard({ client,question, marks, handleMarksChange, handleSubmitAll }) {
  return (
    <Box
      key={question.QuestionEvaluationId}
      sx={{
        margin: 2,
        padding: 3,
        border: '1px solid #ddd',
        borderRadius: '8px',
        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
        backgroundColor: '#fafafa',
        transition: 'all 0.3s ease-in-out',
        '&:hover': {
          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.15)',
        },
      }}
    >
<Grid container spacing={2}>
  <Grid item xs={12}>
    <Typography variant="h6" sx={{ color: '#1a237e', marginBottom: 1, fontWeight: 'bold' }}>
      {/* Dark blue for the question text */}
      Question: {question.QuestionDescription}
    </Typography>
  </Grid>

  <Grid item xs={12}>
    <Typography variant="body1" sx={{ color: '#3e2723' }}>
      {/* Deep brown for the student answer */}
      <strong>Student Answer:</strong> {question.StudentAnswer}
    </Typography>
  </Grid>

  <Grid item xs={6}>
    <Typography variant="body1" sx={{ color: '#2e7d32' }}>
      {/* Green for total marks */}
      <strong>Total Marks:</strong> {question.TotalMarks}
    </Typography>
  </Grid>

  <Grid item xs={6}>
    <Typography
      variant="body1"
      sx={{
        color: ((question.ObtainedMarks/question.TotalMarks)*100) >= 80 
                ? '#2e7d32' // Green for marks above 80
                : ((question.ObtainedMarks/question.TotalMarks)*100) >= 50
                ? '#ff9800' // Orange for marks between 50 and 80
                : '#d32f2f', // Red for marks below 50
        fontWeight: 'bold',
      }}
    >
      {/* Conditional color for obtained marks */}
      <strong>Marks:</strong> {question.ObtainedMarks}
    </Typography>
  </Grid>

  {handleMarksChange && handleSubmitAll && (
    <Grid item xs={12}>
      <Stack direction="row" spacing={2} alignItems="center">
        <TextField
          value={marks.find(m => m.questionEvaluationId === question.QuestionEvaluationId)?.obtainedMarks || ''}
          onChange={(event) => handleMarksChange(question.QuestionEvaluationId, event)}
          type="number"
          variant="outlined"
          size="small"
          disabled={client.isDisabled}
          sx={{
            width: '100px',
            '& .MuiInputBase-input': { textAlign: 'center', color: '#1b5e20' }, 
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: '#c5cae9', 
              },
              '&:hover fieldset': {
                borderColor: '#9fa8da', 
              },
              '&.Mui-focused fieldset': {
                borderColor: '#1a237e', 
              },
            },
          }}
        />
      </Stack>
    </Grid>
  )}
</Grid>


    </Box>
  );
}

export default QuestionCard;
