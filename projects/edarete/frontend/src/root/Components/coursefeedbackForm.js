import React, { useState } from 'react';
import { Button, FormControlLabel, Radio, RadioGroup, TextField, Typography } from '@mui/material';

const questions = [
  { id: 'objectives', question: 'The course had clear and understandable objectives:' },
  { id: 'objectivesAchieved', question: 'The objectives of the course were achieved:' },
  { id: 'instructorFollowedOutline', question: 'The instructor has followed the course outline:' },
  { id: 'courseContentOrganized', question: 'The course content was organized:' },
  { id: 'instructorInterest', question: 'The instructor creates understanding and interest in the subject:' },
  { id: 'clarifyAmbiguities', question: 'The instructor handles questions to clarify ambiguities:' },
  { id: 'encourageParticipation', question: 'The instructor encourages student participation:' },
  { id: 'completeLectureOnTime', question: 'The instructor completes lecture in allocated time:' },
  { id: 'fairEvaluation', question: 'The instructor conducts student evaluation (in test, quizzes, exam, assignment etc.) fairly and shares grades on time:' },
  { id: 'knowledgeTesting', question: 'The coursework and exams tested your knowledge of the course adequately:' },
  { id: 'instructorAvailability', question: 'The instructor is available outside of the class:' },
  { id: 'integrationWithRealWorld', question: 'Instructor’s ability to integrate contents of the module with real world problems:' }
];

const CourseFeedbackForm = () => {
  const [feedback, setFeedback] = useState({
    objectives: '',
    objectivesAchieved: '',
    instructorFollowedOutline: '',
    courseContentOrganized: '',
    instructorInterest: '',
    clarifyAmbiguities: '',
    goodPoints: '',
    areasToStrengthen: '',
    suggestions: ''
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFeedback({
      ...feedback,
      [name]: value
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(feedback);
    // Add your submission logic here
  };

  return (
    <div className='pl-4 pt-4'>
      <Typography variant="h5" gutterBottom>Course Feedback Form</Typography>
      <form onSubmit={handleSubmit}>
        {questions.map((q ,index) => (
          <div key={q.id} style={{ marginBottom: '16px' }}>
             <Typography variant="body1" fontSize={"16px"} fontWeight={"500"}>Q{index + 1}: {q.question}</Typography>
            {/* <Typography variant="body1">{q.question}</Typography> */}
            <RadioGroup
              row
              aria-label={q.id}
              name={q.id}
              value={feedback[q.id]}
              onChange={handleChange}
            >
              {['Poor', 'Fair', 'Good', 'Very Good', 'Excellent'].map((option) => (
                <FormControlLabel
                  key={option}
                  value={option}
                  control={<Radio />}
                  label={option}
                />
              ))}
            </RadioGroup>
          </div>
        ))}

       <div className='pr-4'>
         <TextField
         multiline
         rows={4}
         fullWidth
         margin="normal"
         variant="outlined"
         label="What are the three good points of the instructor?"
         name="goodPoints"
         value={feedback.goodPoints}
         onChange={handleChange}
         sx={{ marginBottom: '16px' }}
       />

       <TextField
         multiline
         rows={4}
         fullWidth
         margin="normal"
         variant="outlined"
         label="What are the three points / areas to be strengthened?"
         name="areasToStrengthen"
         value={feedback.areasToStrengthen}
         onChange={handleChange}
         style={{ marginBottom: '16px' }}
       />

       <TextField
         multiline
         rows={4}
         fullWidth
         margin="normal"
         variant="outlined"
         label="What are your suggestions for further improvement to enhance the learning experience for this course?"
         name="suggestions"
         value={feedback.suggestions}
         onChange={handleChange}
         style={{ marginBottom: '16px' }}
       />
       </div>

        <Button 
        type="submit"
        variant="contained"
        color="primary"
        sx={{
          textTransform: 'capitalize',
          borderRadius: '30px',
          fontSize: '14px',
          color: "#fff !important",
          marginBottom:"10px",
        }}
          >
            Submit
            </Button>
      </form>
    </div>
  );
};

export default CourseFeedbackForm;
