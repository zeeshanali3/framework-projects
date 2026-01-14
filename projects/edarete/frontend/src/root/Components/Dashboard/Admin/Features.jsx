import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";

import { useTheme } from "@mui/material";



const Features = ({ FeaturesData, onClick }) => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';

  return (
    <>
      <Grid
        container
        justifyContent="center"
        rowSpacing={1}
        columnSpacing={{ xs: 1, sm: 2, md: 2 }}
      >
        {FeaturesData.map((feature) => (
          <Grid item xs={12} sm={6} md={4} lg={4} key={feature.id}>
            <Card
              sx={{
                boxShadow: "none",
                borderRadius: "10px",
                p: "25px 20px",
                mb: "15px",
                backgroundColor: isDarkMode ? theme.palette.background.paper : '#fff',
                color: isDarkMode ? theme.palette.text.primary : 'inherit',
                '&:hover': {
                  boxShadow: isDarkMode 
                    ? '0px 4px 24px rgba(0, 0, 0, 0.25)'
                    : '0px 2px 14px rgba(0, 0, 0, 0.1)',
                  transition: 'box-shadow 0.3s ease-in-out'
                },
                cursor: 'pointer'
              }}
              onClick={() => onClick(feature)}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: "15px",
                }}
              >
                <Box>
                  <Typography
                    variant="h1"
                    sx={{ 
                      fontSize: 25, 
                      fontWeight: 700, 
                      mb: "5px",
                      color: isDarkMode ? theme.palette.primary.light : theme.palette.primary.dark
                    }}
                  >
                    {feature.title}
                  </Typography>
                  <Typography 
                    variant="p" 
                    fontSize={14}
                    sx={{
                      color: isDarkMode ? theme.palette.text.secondary : 'inherit'
                    }}
                  >
                    {feature.subTitle}
                  </Typography>
                </Box>

                <Box
                   sx={{
                    width: "62px",
                    height: "62px",
                    background: isDarkMode 
                      ? "rgba(85, 112, 241, 0.18)" 
                      : "rgba(85, 112, 241, 0.12)",
                    borderRadius: "8px",
                    display: "flex", // Enable Flexbox
                    justifyContent: "center", // Center horizontally
                    alignItems: "center", // Center vertically
                  }}
                >
                 
                    <img src={feature.image} alt="Graph" style={{ width: "60%", height: "60%" }} />
                         
                     </Box>
              </Box>

              <Box>
                <Typography
                  sx={{
                    fontSize: "13px",
                    fontWeight: "500",
                    display: "flex",
                    alignItems: "center",
                    color: isDarkMode ? theme.palette.text.secondary : 'inherit'
                  }}
                >
                  <span className={`mr-5px ${feature.color}`}>
                    {feature.icon}
                  </span>
                  {feature.growthText}
                  {/* <Details /> */}
                </Typography>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default Features;
