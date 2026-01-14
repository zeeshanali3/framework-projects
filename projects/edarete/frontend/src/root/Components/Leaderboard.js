import React, { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Divider,
  Box,
  Modal,
  Backdrop,
  Fade, Button
} from '@mui/material';
import { deepPurple, green, red } from '@mui/material/colors';
import { GetLeaderBoardResultAction } from "../Common/Store/Actions/General/GetActions/getLeaderboardResultAction";
import { useDispatch, useSelector } from "react-redux";

// Sample leaderboard data


const Leaderboard = ({ headingColor = '#4A148C', open, handleClose, leaderboard }) => {
  const dispatch = useDispatch();
  const [leaderboardData, setLeaderboardData] = useState([])
  const leaderboardResult = useSelector((state) => state?.CLASSLEADERBOARD.getleaderboardresult);
  useEffect
    (() => {
      if (leaderboard.length !== 0)
        console.log("leaderboard", leaderboard)
      {
        const SubcomponentIds = leaderboard?.SubComponentData?.map((subcomponent) => subcomponent.SubComponentId);
        console.log("SubcomponentIds", SubcomponentIds)
        if (SubcomponentIds) {
          dispatch(
            GetLeaderBoardResultAction(
              SubcomponentIds,
              leaderboard.CourseLeaderboardId,
              (response) => {
                console.log("response", response);
                setLeaderboardData(response?.payload || []);
              },
              (error) => {
                console.log("error attc", error);
              }
            )
          )
        };
      }
    }, [leaderboard, dispatch]);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '90%',
            maxWidth: '600px',
            maxHeight: '80vh',
            overflowY: 'auto',
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
            borderRadius: '16px',
          }}
        >
          <Card
            sx={{
              backgroundColor: '#ffffff',
              boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
              borderRadius: '16px',
              overflow: 'hidden',
            }}
          >
            <CardContent>
              <Typography
                variant="h5"
                component="div"
                sx={{
                  textAlign: 'center',
                  fontWeight: 'bold',
                  marginBottom: 2,
                  color: headingColor,
                  borderBottom: '2px solid rgba(0, 0, 0, 0.1)',
                  paddingBottom: '8px',
                }}
              >
                {leaderboard.LeaderboardName}
              </Typography>

              <List>
                {leaderboardData.map((user, index) => (
                  <React.Fragment key={index}>
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar
                          sx={{
                            bgcolor:
                              index === 0
                                ? deepPurple[500]
                                : index === 1
                                  ? green[500]
                                  : red[500],
                          }}
                        >
                          {user.rank}
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={
                          <Box display="flex" justifyContent="space-between">
                            <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                              {user.Student_Name}-({user.RegNum})
                            </Typography>
                            <Typography variant="body1" sx={{ color: '#888' }}>
                              {user.TotalMarks} %
                            </Typography>
                          </Box>
                        }
                      />
                    </ListItem>
                    {index < leaderboardData.length - 1 && <Divider />} {/* Underline after each person */}
                  </React.Fragment>
                ))}
              </List>
            </CardContent>
          </Card>
        </Box>
      </Fade>
    </Modal>
  );
};

export default Leaderboard;
