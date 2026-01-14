import * as React from "react";
import { styled } from "@mui/material/styles";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import TaskPerformance from "./TasksPerformance";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function ComplexInteraction({title, subTitle1, subTitle2, subTitle3, isDarkMode, theme}) {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <>
      <CardActions disableSpacing>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
          sx={{
            color: isDarkMode ? theme?.palette.primary.light : theme?.palette.primary.main,
            '&:hover': {
              backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.04)',
            }
          }}
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>

      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent sx={{ 
          padding: '8px 0',
          backgroundColor: isDarkMode ? theme?.palette.background.paper : 'inherit',
          color: isDarkMode ? theme?.palette.text.primary : 'inherit',
        }}>
         <TaskPerformance 
           Title={title} 
           SubTitle1={subTitle1} 
           SubTitle2={subTitle2} 
           SubTitle3={subTitle3} 
           isDarkMode={isDarkMode}
           theme={theme}
         />
        </CardContent>
      </Collapse>
    </>
  );
}
