import React from "react";
import { Box, Typography } from "@mui/material";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";


const TeamMembers = [
  {
    id: 1,
    name: "Jason Haston",
    image: "/images/member1.png",
    designation: "Team Leader",
    teamName: "Laravel Team",
    introText: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    teamMemberLists: [
      {
        id: 1,
        image: "/images/member1.png",
      },
      {
        id: 2,
        image: "/images/member2.png",
      },
      {
        id: 3,
        image: "/images/member3.png",
      },
      {
        id: 4,
        image: "/images/member4.png",
      },
      {
        id: 5,
        image: "/images/member5.png",
      },
      {
        id: 6,
        image: "/images/member6.png",
      },
    ],
    viewDetailsLink: "#",
    projectName: "Laravel Project",
    totalTask: "40/80",
    taskProgress: "50",
  },
];

const Team = ({data}) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Grid
        container
        justifyContent="flex-start"
        rowSpacing={1}
        columnSpacing={{ xs: 1, sm: 1, md: 1, lg: 1, xl: 2 }}
      >
        {/* {TeamMembers.map((member) => ( */}
          <Grid item xs={12} md={12} lg={12} xl={12} key={data?.student_group_id}>
            <Card
              sx={{
                minWidth: "500px",
                minHeight: "325px",
                boxShadow: "none",
                borderRadius: "10px",
                mb: "30px",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  p: "20px",
                  background: "#e5e5e5",
                }}
                className="team-card-dark"
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <img
                    src={data?.students[0].photo || "/UsersImages/Neutral_gender.jpg"}
                    alt="Member"
                    width="55px"
                    height="55px"
                    className="borRadius100"
                    style={{ border: "2px solid #757FEF" }}
                  />
                  <Box className="ml-1">
                    <Typography
                      as="h3"
                      sx={{
                        fontSize: 15,
                        fontWeight: 500,
                      }}
                    >
                      {console.log("data?.group_name",data)}
                      {data?.group_name}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: 13,
                      }}
                    >
                      {data?.group_description || "description"}
                    </Typography>
                  </Box>
                </Box>

              </Box>

              <Box sx={{ p: "20px" }}>
                <Box mb={2}>
                  <Typography
                    as="h3"
                    sx={{
                      fontSize: 15,
                      fontWeight: 500,
                      mb: "5px",
                    }}
                  >
                    {data?.class_activity_title}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: 13,
                    }}
                  >
                    Type: {data?.class_activity_type || 'Group Desc'}
                  </Typography>
                </Box>

                <Box mb={2}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "end",
                    }}
                  >
                    <Box>
                      <Typography
                        as="h3"
                        sx={{
                          fontSize: 14,
                          fontWeight: 500,
                          mb: "5px",
                        }}
                      >
                        {data?.subject_name ||'Subject Name'}
                      </Typography>
                    </Box>
                  </Box>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Box>
                    <AvatarGroup max={4}>
                      {data?.students.map((team) => (
                        <Avatar
                          key={team?.student_id}
                          src={team?.photo ? team?.photo :"/UserImages/Neutral_gender.png"}
                          alt="Remy Sharp"
                        />
                      ))}
                    </AvatarGroup>
                  </Box>

                  {/* <Box>
                    <a
                      href={data?.viewDetailsLink || "#"}
                      className="text-decoration-none"
                      style={{ textDecoration: "none" }}
                    >
                      <Button
                        variant="contained"
                        color="secondary"
                        sx={{
                          borderRadius: "4px",
                          textTransform: "capitalize",
                          color: "#fff !important",
                        }}
                      >
                        View Details
                      </Button>
                    </a>
                  </Box> */}
                </Box>
              </Box>
            </Card>
          </Grid>
        {/* ))} */}
      </Grid>
    </>
  );
};

export default Team;
