import React, { useState, useEffect } from "react";
import CircularProgress from '@mui/material/CircularProgress';
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import PsychologyIcon from '@mui/icons-material/Psychology';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import { constants } from "../../Common/Constants";
import { getServerResponse } from "../Helpers/getServerResponse";

const formatDateTime = (dateTimeString) => {
    const options = {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    };
    return new Date(dateTimeString).toLocaleString('en-US', options);
};

const dummyQuizzes = [
    {
        component_id: 1,
        course: "Data Structures and Algorithm",
        course_id: 1,
        description: "General knowledge quiz",
        end_time: "2025-11-30T18:40:00.000Z",
        quiz_id: 1,
        start_time: "2025-09-19T15:00:00.000Z",
        status: "active",
        title: "Quiz",
        type: "graded",
        updated_at: "2025-10-01T12:09:52.000Z",
    },
];

const QuizListing = ({
  course,
  setQuizParameters,
  setSelectedComponent,
  connect,
  isConnected,
  disconnect,
  handleCancelledToast,
  quizzes,
  setQuizzes,
}) => {
  const [isLoading, setIsLoading] = useState(true);

  const servercommunication = {
    requestType: 'POST',
    apiUrl: constants.announcement,
    body: {},
    metaData: true,
    onSuccess: res => {
      console.log('On Success', res);
    },
    onFailure: res => {
      console.log('On Failure', res);
    },
  };

  useEffect(() => {
    const onSuccess = res => {
      console.log('On Success', res.return);
      const filteredQuizzes = res.return.filter(
        item => item.course_id === course.CourseId,
      );
      console.log('Filtered Quizzes', filteredQuizzes);
      setQuizzes(filteredQuizzes);
      setIsLoading(false);
    };
    const onFailure = err => {
      console.log('On Failure', err);
      setIsLoading(false);
    };
    if (servercommunication.onSuccess) {
      servercommunication.onSuccess = onSuccess;
    }
    if (servercommunication.onFailure) {
      servercommunication.onFailure = onFailure;
    }
    getServerResponse(servercommunication);
    // Dummy Payload
    // setQuizzes(dummyQuizzes);

    return () => {
      setQuizzes([]);
    };
  }, []);

  const handleClick = (
    quizId,
    courseId,
    courseName,
    componentName,
    quizName,
    quizDescription,
    startTime,
    endTime,
  ) => {
    setQuizParameters({
      quizId,
      courseId,
      courseName,
      componentName,
      quizName,
      quizDescription,
      startTime,
      endTime,
    });

    if (!quizId) {
      return;
    }
    if (isConnected) {
      console.log('Socket already connected');
     
        setSelectedComponent('qr-code');
      
    } else {
     
      let path = '/quiz-socket';
      if(componentName?.toLowerCase() === 'quiz'){
        path = '/quiz-socket';
      } else if(componentName?.toLowerCase() === 'lab'){
        path = '/lab-socket';
      }
       console.log('Current socket connection status:', {
         isConnected,
         componentName,
         path
       });
      // Connect to socket
      const socket = connect(quizId, path);
      console.log('Socket instance after connect():', socket);

      // Handle connection events
      socket.on('connect', () => {
        console.log('Socket connected successfully! ID:', socket.id);
        console.log('Socket connected status:', socket.connected);
        if (socket.connected) {
          console.log(
            'Socket is confirmed connected inside connect event.',
            componentName,
          );
        
            if (componentName?.toLowerCase() === 'quiz') {
              setSelectedComponent('qr-code');
            } else if (componentName?.toLowerCase() === 'lab') {
             setSelectedComponent('qr-code');
            }
          
        }
      });

      // Handle connection errors
      socket.on('connect_error', error => {
        console.error('Socket in connection error:', error);
 
        handleCancelledToast(
          'Socket connection error:',
          error.message || error,
        );
      });

      socket.on('error', error => {
        console.error('Socket in error:', error);
       
                handleCancelledToast(
                  'Socket connection error:' + error.message || error
                );
      });
    }
  };

  return (
    <Box
      sx={{
        paddingX: 2,
        display: 'flex',
        flexDirection: 'column',
        gap: isLoading ? '15px' : '25px',
      }}
    >
      <Typography variant="h1" fontWeight="bold" sx={{ fontSize: '1.5rem' }}>
        Announcements
      </Typography>
      {isLoading ? (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '60vh',
          }}
        >
          <CircularProgress color="inherit" />
        </Box>
      ) : quizzes.length > 0 ? (
        <Grid container spacing={2}>
          {quizzes.map(item => (
            <Grid key={item.quiz_id} item xs={12} md={6} lg={6}>
              <Box
                sx={{
                  border: '1px solid #DDDCFF',
                  borderRadius: '12px',
                  padding: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 4,
                  boxSizing: 'border-box',
                  backgroundColor: '#FFFFFF',
                  transition: 'all 0.3s ease-in-out',
                  '&:hover': {
                    boxShadow: '0 4px 12px rgba(76, 73, 237, 0.15)',
                    borderColor: '#4C49ED',
                    backgroundColor: '#F8F9FF',
                  },
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: 0.5,
                    }}
                  >
                    <PsychologyIcon
                      sx={{
                        color: '#4C49ED',
                        fontSize: 70,
                        ml: '-10px',
                      }}
                    />
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 0.5,
                      }}
                    >
                      <Typography
                        variant="h2"
                        fontWeight="bold"
                        sx={{ fontSize: '1.2rem' }}
                      >
                        {item.course}
                      </Typography>
                      <Typography
                        variant="h3"
                        fontWeight="normal"
                        sx={{ fontSize: '1rem' }}
                      >
                        {item.description}
                      </Typography>
                    </Box>
                  </Box>
                  <Button
                    sx={{
                      backgroundColor: '#4C49ED',
                      border: '1px solid #4C49ED',
                      paddingY: 1,
                      paddingX: 2,
                      color: '#FFFFFF',
                      transition: 'all 0.3s ease-in-out',
                      '&:hover': {
                        color: '#4C49ED',
                        borderColor: '#4C49ED',
                        backgroundColor: '#FFFFFF',
                      },
                    }}
                   
                    onClick={() =>
                      handleClick(
                        item.quiz_id,
                        course.CourseId,
                        course.CourseName,
                        item.component_name,
                        item.course,
                        item.description,
                        item.start_time,
                        item.end_time,
                      )
                    }
                  >
                    Start {item.component_name}
                  </Button>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: 5,
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 0.5,
                    }}
                  >
                    <Typography
                      variant="h6"
                      fontWeight="bold"
                      sx={{ fontSize: '1rem' }}
                    >
                      Opens:
                    </Typography>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                      }}
                    >
                      <CalendarTodayIcon color="action" fontSize="small" />
                      <Typography
                        variant="h1"
                        fontWeight="normal"
                        sx={{ fontSize: '1rem' }}
                      >
                        {formatDateTime(item.start_time)}
                      </Typography>
                    </Box>
                  </Box>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 0.5,
                    }}
                  >
                    <Typography
                      variant="h6"
                      fontWeight="bold"
                      sx={{ fontSize: '1rem' }}
                    >
                      Closes:
                    </Typography>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                      }}
                    >
                      <CalendarTodayIcon color="action" fontSize="small" />
                      <Typography
                        variant="h1"
                        fontWeight="normal"
                        sx={{ fontSize: '1rem' }}
                      >
                        {formatDateTime(item.end_time)}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '60vh',
            gap: 3,
            padding: 4,
            backgroundColor: '#F8F9FF',
            borderRadius: '16px',
            border: '2px dashed #DDDCFF',
          }}
        >
          <Box
            sx={{
              width: 120,
              height: 120,
              borderRadius: '50%',
              backgroundColor: '#FFFFFF',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              boxShadow: '0 4px 12px rgba(76, 73, 237, 0.1)',
              animation: 'pulse 2s ease-in-out infinite',
              '@keyframes pulse': {
                '0%, 100%': {
                  transform: 'scale(1)',
                  opacity: 1,
                },
                '50%': {
                  transform: 'scale(1.05)',
                  opacity: 0.8,
                },
              },
            }}
          >
            <NotificationsNoneIcon
              sx={{
                fontSize: 60,
                color: '#4C49ED',
              }}
            />
          </Box>
          
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 1,
              textAlign: 'center',
            }}
          >
            <Typography
              variant="h2"
              fontWeight="bold"
              sx={{
                fontSize: '1.5rem',
                color: '#2C2C2C',
              }}
            >
              No Announcements Yet
            </Typography>
            <Typography
              variant="body1"
              sx={{
                fontSize: '1rem',
                color: '#6B6B6B',
                maxWidth: '400px',
              }}
            >
              You're all caught up! There are currently no announcements for{' '}
              <strong>{course.CourseName}</strong>.
            </Typography>
          </Box>

          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 1,
              mt: 2,
            }}
          >
            <Typography
              variant="caption"
              sx={{
                fontSize: '0.875rem',
                color: '#9E9E9E',
              }}
            >
              New announcements will appear here when available
            </Typography>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default QuizListing;