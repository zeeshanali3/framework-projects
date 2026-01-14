import React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardsDropDown from "./Cards/ComplexInteraction";
import { useTheme } from "@mui/material";

const Features = ({ FeaturesData, onCardClick }) => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="stretch" // Ensure cards align properly
      rowSpacing={2} // Add vertical spacing between rows
      columnSpacing={6} // Add horizontal spacing between columns
      wrap="wrap" // Ensure proper wrapping of cards on smaller screens
    >
      {FeaturesData.map((feature) => (
        <Grid
          item
          xs={12} // Full width on extra-small screens (mobile)
          sm={6}  // Half width on small screens (600px and above)
          md={4}  // One-third width on medium screens (900px and above)
          lg={4}  // One-third width on large screens (1200px and above)
          key={feature.id}
        >
          <Card
            onClick={() => onCardClick(feature.id)}
            sx={{
              boxShadow: isDarkMode ? "0px 4px 20px rgba(0, 0, 0, 0.2)" : "0px 4px 10px rgba(0, 0, 0, 0.1)",
              borderRadius: "10px",
              p: "20px",
              width: "100%", // Ensure the card takes full width of the grid item
              backgroundColor: isDarkMode ? theme.palette.background.paper : '#fff',
              color: isDarkMode ? theme.palette.text.primary : 'inherit',
              transition: 'all 0.3s ease',
              '&:hover': {
                boxShadow: isDarkMode 
                  ? '0px 8px 24px rgba(0, 0, 0, 0.3)' 
                  : '0px 6px 16px rgba(0, 0, 0, 0.12)',
                transform: 'translateY(-3px)'
              },
              cursor: 'pointer'
            }}
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
                <Box
                  component="h1" // Use correct component for headings
                  sx={{ 
                    fontSize: 25, 
                    fontWeight: 700, 
                    mb: "5px",
                    color: isDarkMode ? theme.palette.primary.light : theme.palette.primary.dark
                  }}
                >
                  {feature.title}
                </Box>
                <Box 
                  component="p" 
                  sx={{ 
                    fontSize: 14,
                    color: isDarkMode ? theme.palette.text.secondary : 'inherit'
                  }}
                >
                  {feature.subTitle}
                </Box>
              </Box>

              <Box
                sx={{
                  width: "62px",
                  height: "62px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  background: isDarkMode 
                    ? "rgba(85, 112, 241, 0.18)" 
                    : "rgba(85, 112, 241, 0.12)",
                  borderRadius: "8px",
                  textAlign: "center",
                }}
              >
                <img 
                  src={feature.image} 
                  alt={feature.subTitle} 
                  style={{ width: "60%", height: "60%" }}
                />
              </Box>
            </Box>

            <Box>
              <Box
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
              </Box>
              <CardsDropDown
                title={feature.subTitle}
                subTitle1={feature.subTitle1}
                subTitle2={feature.subTitle2}
                subTitle3={feature.subTitle3}
                isDarkMode={isDarkMode}
                theme={theme}
              />
            </Box>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default Features;
