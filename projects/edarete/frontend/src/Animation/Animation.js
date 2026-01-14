import React from "react";
import { Slide } from "@mui/material";
import { IconButton } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";

export const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
  });

  export const Btnsx = {
    // textTransform: "capitalize",
    // borderRadius: "8px",
    // fontWeight: "500",
    // fontSize: "13px",
    // padding: "12px 20px",
    // color: "#fff !important",
    textTransform: 'capitalize',
    borderRadius: '30px',
    mt: '10px',
    p: '10px 30px',
    fontSize: '14px',
    color: "#fff !important",
  };
  
  export const ToolipButton = ({ title, color, onClick, icon }) => {
    return (
      <Tooltip title={title} placement="top">
        <IconButton aria-label={title.toLowerCase()} size="small" color={color} className={color} onClick={onClick}>
          {icon}
        </IconButton>
      </Tooltip>
    );
  };