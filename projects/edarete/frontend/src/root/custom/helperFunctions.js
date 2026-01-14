import React from "react";
import { IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";

export const HelperNavigator = ({ path, icon: Icon, color, backgroundColor }) => {
    const navigate = useNavigate();

    const handleNavigation = () => {
        navigate(path);
    };

    const buttonStyle = {
        color: color || "transparent",
    };

    return (
        // <IconButton onClick={handleNavigation} style={buttonStyle}>
        //     <Icon color={color} />
        // </IconButton>
        <Icon color={color} onClick={handleNavigation} style={buttonStyle} />
    );
};

