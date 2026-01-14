import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import { useLocation, useNavigate } from "react-router-dom";
import { Box, Collapse, useTheme } from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";

// Define default styles that will be overridden by appearance prop
const defaultStyles = {
  fontSize: "14px",
  fontSizeSmall: "13px",
  fontWeight: 500,
  activeFontWeight: 600,
  borderRadius: "8px",
  light: {
    background: "#f5f5f5",
    activeTextColor: "#4C49ED",
    inactiveTextColor: "#5C5B98",
    activeBackgroundColor: "rgba(76, 73, 237, 0.12)",
    hoverBackgroundColor: "rgba(76, 73, 237, 0.08)",
    accentColor: "#4C49ED",
    secondaryAccentColor: "#FF6347",
  },
  dark: {
    background: "#1E1E2F",
    activeTextColor: "#C7C6FF",
    inactiveTextColor: "#A5A4C4",
    activeBackgroundColor: "rgba(76, 73, 237, 0.25)",
    hoverBackgroundColor: "rgba(76, 73, 237, 0.15)",
    accentColor: "#6C63FF",
    secondaryAccentColor: "#FF8571",
  }
};

const SidebarLink = styled(Box, {
  shouldForwardProp: (prop) => !["isActive", "themeStyles", "globalStyles"].includes(prop),
})(({ isActive, themeStyles, globalStyles }) => ({
  display: "flex",
  color: isActive ? themeStyles.activeTextColor : themeStyles.inactiveTextColor,
  justifyContent: "space-between",
  alignItems: "center",
  padding: "10px 16px",
  borderRadius: globalStyles.borderRadius,
  fontSize: globalStyles.fontSize,
  fontWeight: isActive ? globalStyles.activeFontWeight : globalStyles.fontWeight,
  margin: "4px 0",
  cursor: "pointer",
  transition: "all 300ms ease",
  background: isActive ? themeStyles.activeBackgroundColor : "transparent",
  position: "relative",
  "&::before": {
    content: '""',
    position: "absolute",
    left: 0,
    top: "50%",
    transform: "translateY(-50%)",
    height: isActive ? "70%" : "0%",
    width: "4px",
    borderRadius: "0 4px 4px 0",
    backgroundColor: isActive ? themeStyles.accentColor : "transparent",
    transition: "height 300ms ease, background-color 300ms ease",
  },
  "&:hover": {
    background: isActive ? themeStyles.activeBackgroundColor : themeStyles.hoverBackgroundColor,
    color: themeStyles.activeTextColor,
    "&::before": {
      height: "50%",
      backgroundColor: themeStyles.accentColor,
    },
  },
  "& svg": {
    transition: "all 300ms ease",
  },
  "&:hover svg:not(.preserve-color)": {
    color: themeStyles.accentColor,
  },
}));

const SidebarLabel = styled("span", {
  shouldForwardProp: (prop) => !["isActive", "themeStyles", "globalStyles"].includes(prop),
})(({ isActive, themeStyles, globalStyles }) => ({
  marginLeft: "14px",
  fontSize: globalStyles.fontSize,
  fontWeight: isActive ? globalStyles.activeFontWeight : globalStyles.fontWeight,
  flex: 1,
  letterSpacing: isActive ? "0.3px" : "normal",
}));

const SubNavItem = styled(Box, {
  shouldForwardProp: (prop) => !["isActive", "themeStyles", "globalStyles"].includes(prop),
})(({ isActive, themeStyles, globalStyles }) => ({
  display: "flex",
  alignItems: "center",
  padding: "8px 8px 8px 50px",
  color: isActive ? themeStyles.activeTextColor : themeStyles.inactiveTextColor,
  fontSize: globalStyles.fontSizeSmall,
  borderRadius: globalStyles.borderRadius,
  fontWeight: isActive ? globalStyles.activeFontWeight : globalStyles.fontWeight,
  position: "relative",
  cursor: "pointer",
  transition: "all 300ms ease",
  marginLeft: "8px",
  background: isActive ? `rgba(${parseInt(themeStyles.accentColor.slice(1, 3), 16)}, ${parseInt(themeStyles.accentColor.slice(3, 5), 16)}, ${parseInt(themeStyles.accentColor.slice(5, 7), 16)}, 0.08)` : "transparent",
  "&::before": {
    content: '""',
    position: "absolute",
    left: "30px",
    top: "50%",
    transform: "translateY(-50%)",
    width: "6px",
    height: "6px",
    borderRadius: "50%",
    backgroundColor: isActive ? themeStyles.accentColor : "#818093",
    transition: "background-color 300ms ease, transform 300ms ease",
  },
  "&::after": {
    content: '""',
    position: "absolute",
    left: 0,
    top: "50%",
    transform: "translateY(-50%)",
    height: isActive ? "60%" : "0%",
    width: "3px",
    borderRadius: "0 3px 3px 0",
    backgroundColor: isActive ? themeStyles.accentColor : "transparent",
    transition: "height 300ms ease, background-color 300ms ease",
  },
  "&:hover": {
    color: themeStyles.activeTextColor,
    background: themeStyles.hoverBackgroundColor,
    "&::before": {
      backgroundColor: themeStyles.accentColor,
      transform: "translateY(-50%) scale(1.2)",
    },
    "&::after": {
      height: "40%",
      backgroundColor: themeStyles.accentColor,
    },
  },
}));

const IconContainer = styled("div", {
  shouldForwardProp: (prop) => !["isActive", "themeStyles"].includes(prop),
})(({ isActive, themeStyles }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  minWidth: "28px", // Increased to accommodate medium icons
  transform: isActive ? "scale(1.1)" : "scale(1)",
  transition: "transform 300ms ease",
}));

const ExpandIcon = styled(Box, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ open }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  transition: "transform 300ms ease",
  transform: open ? "rotate(0deg)" : "rotate(0deg)",
}));

const SubMenu = ({ item, onItemClick, isActive, appearance }) => {
  const [subnav, setSubnav] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const muiTheme = useTheme();
  
  // Determine if we're in dark mode based on the MUI theme
  const isDarkMode = muiTheme.palette.mode === 'dark';
  
  // Extract styling from appearance prop or use defaults
  const appearanceStyles = appearance?.features?.styling || defaultStyles;
  
  // Get global styles (non-theme specific)
  const globalStyles = {
    fontSize: appearanceStyles.fontSize || defaultStyles.fontSize,
    fontSizeSmall: appearanceStyles.fontSizeSmall || defaultStyles.fontSizeSmall,
    fontWeight: appearanceStyles.fontWeight || defaultStyles.fontWeight,
    activeFontWeight: appearanceStyles.activeFontWeight || defaultStyles.activeFontWeight,
    borderRadius: appearanceStyles.borderRadius || defaultStyles.borderRadius,
  };
  
  // Get the theme-specific styles based on current mode
  const themeStyles = isDarkMode ? 
    appearanceStyles.dark || defaultStyles.dark : 
    appearanceStyles.light || defaultStyles.light;
  
  // Improved path matching to handle various path formats
  const isPathMatch = (configPath, currentPath) => {
    // Exact match
    if (configPath === currentPath) return true;
    
    // Check if the current path starts with the config path (for parent paths)
    if (currentPath.startsWith(configPath) && configPath !== "/") {
      // Ensure it's a proper subpath, not just a substring match
      const nextChar = currentPath.charAt(configPath.length);
      if (nextChar === "" || nextChar === "/" || nextChar === "#") {
        return true;
      }
    }
    return false;
  };
  
  // Check if any subnav item is active to keep parent expanded
  const hasActiveChild = item.subNav?.some(
    (subItem) => isPathMatch(subItem.path, location.pathname)
  );
  
  // Auto-expand if current path is in subnav
  useEffect(() => {
    if (hasActiveChild) {
      setSubnav(true);
    }
  }, [location.pathname, hasActiveChild]);

  // Handle click for both main items and submenu items
  const handleClick = (path, hasSubnav) => {
    if (hasSubnav) {
      setSubnav(!subnav);
    } else if (path) {
      if (onItemClick) onItemClick();
      navigate(path);
    }
  };

  // Check if item or subitem is active
  const isItemActive = isPathMatch(item.path, location.pathname);
  
  // Determine if we should override the icon color
  const shouldOverrideIconColor = isItemActive || hasActiveChild;
  
  return (
    <div>
      <SidebarLink 
        isActive={isItemActive || hasActiveChild}
        themeStyles={themeStyles}
        globalStyles={globalStyles}
        onClick={() => handleClick(item.path, item.subNav && item.subNav.length > 0)}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <IconContainer isActive={isItemActive || hasActiveChild} themeStyles={themeStyles}>
            {item.icon &&
              React.cloneElement(item.icon, {
                fontSize: "medium",
                className: shouldOverrideIconColor ? "" : "preserve-color",
                sx: { 
                  color: shouldOverrideIconColor 
                    ? themeStyles.activeTextColor 
                    : undefined,
                  // Keep original icon's sx properties except for color when active
                  ...item?.icon?.props?.sx,
                  ...(shouldOverrideIconColor ? { color: themeStyles.activeTextColor } : {})
                },
              })}
          </IconContainer>
          <SidebarLabel 
            isActive={isItemActive || hasActiveChild} 
            themeStyles={themeStyles}
            globalStyles={globalStyles}
          >
            {item.title}
          </SidebarLabel>
        </Box>
        
        {item.subNav && item.subNav.length > 0 && (
          <ExpandIcon open={subnav}>
            {subnav ? 
              <ExpandLess fontSize="medium" /> : 
              <ExpandMore fontSize="medium" />
            }
          </ExpandIcon>
        )}
      </SidebarLink>

      {/* Render subnav items with animation */}
      <Collapse in={subnav} timeout={300} unmountOnExit>
        <Box sx={{ my: 1 }}>
            {item.subNav &&
            item.subNav.map((subItem, index) => {
              const isSubItemActive = isPathMatch(subItem.path, location.pathname);
              
              return (
                <SubNavItem
                  key={subItem.path ?? subItem.title ?? index}
                  isActive={isSubItemActive}
                  themeStyles={themeStyles}
                  globalStyles={globalStyles}
                  onClick={() => handleClick(subItem.path, false)}
                >
                  {subItem.title}
                </SubNavItem>
              );
            })}
        </Box>
      </Collapse>
    </div>
  );
};

export default SubMenu;
