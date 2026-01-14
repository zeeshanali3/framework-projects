import React from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import { Box, Typography } from "@mui/material";
import styles from "./FeaturesModules.module.css";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DoneIcon from '@mui/icons-material/Done';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import CheckIcon from '@mui/icons-material/Check';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import CancelIcon from '@mui/icons-material/Cancel';
import CloseIcon from '@mui/icons-material/Close';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import DoDisturbIcon from '@mui/icons-material/DoDisturb';
import BlockIcon from '@mui/icons-material/Block';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';

const selectedDoneIcon = [
  CheckCircleIcon,
  DoneIcon,
  DoneAllIcon,
  TaskAltIcon,
  CheckIcon,
  AssignmentTurnedInIcon
];


const selectedNotDoneIcon = [
  CancelIcon,
  CloseIcon,
  HighlightOffIcon,
  DoDisturbIcon,
  BlockIcon,
  RemoveCircleOutlineIcon
];
const getIcon = (taskStatus, appearance) => {
  
  if (taskStatus === "done") {
   

    return selectedDoneIcon[
       appearance?.features?.featuresTable?.tableAppearance?.find(f => f.type == "selectedsDoneIcon")?.selectedDoneIcon ?? 1// Default to 0 if index is not set
    ];
  } else {
    return selectedNotDoneIcon[
      appearance?.features?.featuresTable?.tableAppearance?.find(f => f.type == "selectedsNotDoneIcon")?.selectedsNotDoneIcon ?? 0// Default to 0 if index is not set
    ];
  }
};
const FeatureModules = ({ module, appearance, config }) => {
  console.log("FeatureModules", config)
  return (
    <>
      <Typography
        as="h3"
        sx={{
          fontSize: 24,
          fontWeight: 500,
          mb: "20px",
          borderBottom: "1px solid #eee",
          paddingBottom: "10px",
         
          color: appearance?.features?.featuresTable?.tableAppearance?.find(f => f.type == "tabDescriptionColor")?.color || ""
        }}
        className="for-dark-bottom-border"
      >
        {module.description}
      </Typography>

      <Grid
        container
        justifyContent="flex-start"
        rowSpacing={1}
        columnSpacing={{ xs: 1, sm: 1, md: 1, lg: 1, xl: 2 }}
      >
        {module.content.map((info) => (
          <Grid item xs={12} sm={6} md={4} lg={4} xl={3} key={info.id}>
            <Card
              sx={{
                borderRadius: "10px",
                p: "25px",
                mb: "15px",
                backgroundColor: appearance?.features?.featuresTable?.tableAppearance?.find(f => f.type == "cardBackgroundColor")?.color || "",
                height: "100%",
                border: `3px solid ${info?.cardStatus === "Completed"
                    ? "#28A745" // Completed
                    : info?.cardStatus === "In_Progress"
                      ? "#FFD700" // In Progress
                      : info?.cardStatus === "Waiting_for_Approval"
                        ? "#1E90FF" // Waiting for Approval 
                        : info?.cardStatus === "Need_Discussion"
                          ? "#FFA500" // Need Discussion
                          : info?.cardStatus === "Approved"
                            ? "#93EF93" // Approved 
                            : info?.cardStatus === "Pending"
                              ? "#D3D3D3" // Pending
                              : "#FF6347" // for unknown statuses
                  }`,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  mb: "20px",
                }}
              >
                <Box>
                  <Typography
                    as="h3"
                    sx={{
                      fontSize: 20,
                      fontWeight: 500,
                      mb: "5px",
                      color: appearance?.features?.featuresTable?.tableAppearance?.find(f => f.type == "titleColor")?.color || ""
                    }}
                  >
                    {info.title}
                  </Typography>

                  <Typography
                    sx={{
                      fontSize: 16,
                      color: appearance?.features?.featuresTable?.tableAppearance?.find(f => f.type == "titleDescriptionColor")?.color || ""
                    }}
                  >
                    {info.description}
                  </Typography>
                </Box>

                <div className={styles.icon}>
                  <i className={info.icon}></i>
                </div>
              </Box>
              <ul
                className={styles.priceList}
                style={{ padding: 0, listStyleType: "none" }}
              >
                {info.functionalities.map((list) => (
                  <div
                    key={list.title}
                    style={{
                      marginBottom: "10px",
                    }}
                  >
                    {/* Circle and Title in One Row */}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        marginBottom: "5px", // space between title and description
                      }}
                    >
                      <span
                        style={{
                          fontSize: "20px", // Size of the circle symbol
                          marginRight: "10px", // Space between circle and title
                          marginTop: "7px", // Space between circle and title

                        }}
                      // #4CAF50
                      >
                        
                        {list.taskStatus !== "done" ? (
                         
                           React.createElement(getIcon(list.taskStatus, appearance))
                        ) : (
                           React.createElement(getIcon(list.taskStatus, appearance))
                        
                        )}
                     
                      </span>
                      <span style={{ color: appearance?.features?.featuresTable?.tableAppearance?.find(f => f.type == "subTitleHeadingColor")?.color || "", fontSize: 16 }}>
                        {list.title}
                      </span>
                    </div>

                    {/* Description in the Next Row */}
                    <Typography
                      sx={{
                        fontSize: 14,
                        marginLeft: "30px",
                        marginBottom: "10px",
                        marginTop: "-5px",
                        color: appearance?.features?.featuresTable?.tableAppearance?.find(f => f.type == "subTitleDescriptionColor")?.color || ""

                      }}
                    >
                      {list.description}
                    </Typography>
                  </div>
                ))}
              </ul>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default FeatureModules;

