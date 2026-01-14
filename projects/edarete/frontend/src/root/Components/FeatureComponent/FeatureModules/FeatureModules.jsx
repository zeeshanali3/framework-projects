import React from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import { Box, Typography } from "@mui/material";
import styles from "./FeaturesModules.module.css";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import PanoramaFishEyeIcon from "@mui/icons-material/PanoramaFishEye";
const FeatureModules = ({ module }) => {
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
                height: "100%",
                border: `3px solid ${
                  info?.cardStatus === "Completed"
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
                    }}
                  >
                    {info.title}
                  </Typography>

                  <Typography
                    sx={{
                      fontSize: 16,
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
                          color:
                            list.taskStatus === "done" ? "#4CAF50" : "#ccc", // Color of circle based on status
                        }}
                      >
                        {list.taskStatus === "done" ? (
                          <CheckCircleOutlineIcon />
                        ) : (
                          <PanoramaFishEyeIcon />
                        )}
                      </span>
                      <span style={{ color: "blue", fontSize: 16 }}>
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

// import React from "react";
// import Grid from "@mui/material/Grid";
// import Card from "@mui/material/Card";
// import { Box, Typography } from "@mui/material";
// import styles from "./FeaturesModules.module.css";

// const FeatureModules = ({ module }) => {
//   return (
//     <>
//       <Typography
//         as="h3"
//         sx={{
//           fontSize: 24,
//           fontWeight: 500,
//           mb: "20px",
//           borderBottom: "1px solid #eee",
//           paddingBottom: "10px",
//         }}
//         className="for-dark-bottom-border"
//       >
//         {module.description}
//       </Typography>

//       <Grid
//         container
//         justifyContent="flex-start"
//         rowSpacing={1}
//         columnSpacing={{ xs: 1, sm: 1, md: 1, lg: 1, xl: 2 }}
//       >
//         {module.content.map((info) => (
//           <Grid item xs={12} sm={6} md={4} lg={4} xl={3} key={info.id}>
//             <Card
//               sx={{
//                 borderRadius: "10px",
//                 p: "25px",
//                 mb: "15px",
//                 height: "100%",
//                 border: `3px solid ${
//                   info?.cardStatus === "Completed"
//                     ? "#93EF93"
//                     : info?.cardStatus === "In_Progress"
//                     ? "#FFD700"
//                     : info?.cardStatus === "Not_Started"
//                     ? "#A9D1DF"
//                     : "#FF6347"
//                 }`, // Set border color based on status
//               }}
//             >
//               <Box
//                 sx={{
//                   display: "flex",
//                   alignItems: "center",
//                   justifyContent: "space-between",
//                   mb: "20px",
//                 }}
//               >
//                 <Box>
//                   <Typography
//                     as="h3"
//                     sx={{
//                       fontSize: 20,
//                       fontWeight: 500,
//                       mb: "5px",
//                     }}
//                   >
//                     {info.title}
//                   </Typography>

//                   <Typography
//                     sx={{
//                       fontSize: 16,
//                     }}
//                   >
//                     {info.description}
//                   </Typography>
//                 </Box>

//                 <div className={styles.icon}>
//                   <i className={info.icon}></i>
//                 </div>
//               </Box>
//               <ul
//                 className={styles.priceList}
//                 style={{ padding: 0, listStyleType: "none" }}
//               >
//                 {info.functionalities.map((list) => (
//                   <div
//                     key={list.title}
//                     style={{
//                       marginBottom: "10px",
//                     }}
//                   >
//                     {/* Custom Circle and Title in One Row */}
//                     <div
//                       style={{
//                         display: "flex",
//                         alignItems: "center",
//                         marginBottom: "5px", // space between title and description
//                       }}
//                     >
//                       <div
//                         style={{
//                           width: "20px",
//                           height: "20px",
//                           borderRadius: "50%",
//                           border: "2px solid #ccc", // Circle border color
//                           display: "flex",
//                           justifyContent: "center",
//                           alignItems: "center",
//                           marginRight: "10px",
//                           backgroundColor: list.taskStatus === "done" ? "#4CAF50" : "transparent", // Green if done
//                         }}
//                       >
//                         {list.taskStatus === "done" && (
//                           <span
//                             style={{
//                               color: "white",
//                               fontSize: "14px",
//                               fontWeight: "bold",
//                             }}
//                           >
//                             ✔
//                           </span>
//                         )}
//                       </div>
//                       <span style={{ color: "blue", fontSize: 16 }}>
//                         {list.title}
//                       </span>
//                     </div>

//                     {/* Description in the Next Row */}
//                     <Typography
//                       sx={{
//                         fontSize: 14,
//                         marginLeft: "30px",
//                         marginBottom: "10px",
//                         marginTop: "-5px",
//                       }}
//                     >
//                       {list.description}
//                     </Typography>
//                   </div>
//                 ))}
//               </ul>
//             </Card>
//           </Grid>
//         ))}
//       </Grid>
//     </>
//   );
// };

// export default FeatureModules;
