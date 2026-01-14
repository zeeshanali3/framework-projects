import React from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";


const contactLists = [
  {
    image: '/images/member1.png',
    name: 'Alvarado Turner',
    userName: '@alvaradoTurner',
    email: 'alvaradoTurner@gmail.com',
    projectUrl: '#',
    post: '18k',
    followers: '5.21k',
    followings: '32k',
  },
];

export default function ContactList({data}) {
    console.log('data',data)
  return (
    <>
      <Grid
        container
        rowSpacing={1}
        columnSpacing={{ xs: 1, sm: 1, md: 1, lg: 1, xl: 2 }}
        sx={{justifyContent:'center'}}
      >
        {/* {data?.map((data) => ( */}
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} key={data.name}>
            <Card   
              sx={{
                minWidth: "300px",
                textAlign: "center",
                boxShadow: "none",
                borderRadius: "10px",
                p: "20px 15px",
                mb: "15px",
                margin: "0 auto", // Center the card horizontally
              }}
            >
              <img 
                src={data.image} 
                alt="Member"
                width="148px"
                height="138px"
                className="borRadius100"
              />
              <Typography
                as="h4"
                sx={{
                  fontSize: 16,
                  fontWeight: 500,
                  mt: '10px',
                }}
              >
                {data.name}
              </Typography>

              <Typography
                sx={{
                  fontSize: 13,
                  color: '#A9A9C8',
                  mb: 2,
                }}
              >
                {data.userName}
              </Typography>

              {/* <Box>
                <a 
                  href={`mailto:${data.email}`} 
                  className="text-decoration-none"
                  style={{ textDecoration: 'none' }}
                >
                  <Button 
                    variant="contained" 
                    color="primary"
                    sx={{
                      textTransform: 'capitalize',
                      borderRadius: '8px',
                      m: '0 5px',
                      color: "#fff !important"
                    }}
                  >
                    Message
                  </Button>
                </a>
                
                <a 
                  href={data.projectUrl} 
                  className="text-decoration-none"
                  target="_blank" 
                  rel="noopener noreferrer"
                  style={{ textDecoration: 'none' }}
                >
                  <Button 
                    variant="contained" 
                    color="secondary"
                    sx={{
                      textTransform: 'capitalize',
                      borderRadius: '8px',
                      m: '0 5px',
                      color: "#fff !important"
                    }}
                  >
                    Projects
                  </Button>
                </a>
              </Box> */}
            
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  textAlign: 'center',
                  mt: '30px'
                }}
              >
                <Box>
                  <Typography color="#A9A9C8" mb={1} fontSize="13px">
                    Total Score
                  </Typography>
                  <Typography fontWeight="500" fontSize="20px">
                    {data?.total_score}
                  </Typography>
                </Box>

                <Box>
                  <Typography color="#A9A9C8" mb={1} fontSize="13px">
                    Average Score
                  </Typography>
                  <Typography fontWeight="500" fontSize="20px">
                    {data?.average_score}
                  </Typography>
                </Box>

                <Box>
                  <Typography color="#A9A9C8" mb={1} fontSize="13px">
                    Total Activities
                  </Typography>
                  <Typography fontWeight="500" fontSize="20px">
                    {data?.total_activities}
                  </Typography>
                </Box>
              </Box>
            </Card>
          </Grid>
        {/* ))} */}
      </Grid>
    </>
  );
}
