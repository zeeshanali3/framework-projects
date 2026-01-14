import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { Box, IconButton } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useMediaQuery, useTheme } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import SubMenu from "./SubMenu";
import CloseIcon from "@mui/icons-material/Close";
import logo from "../../../assets/images/ITU - name.png";

// Styled components with correct theme handling
const SidebarNav = styled("nav")(({ theme, appearance, isOpen }) => {
  // Access theme through the parameter provided by styled-components
  const mode = theme.palette.mode || 'light';
  const themeStyles = appearance?.features?.styling?.[mode] || {};
  
  return {
    background: themeStyles.background || (mode === 'light' ? '#f5f5f5' : '#1E1E2F'),
    width: isOpen ? (appearance?.features?.styling?.width || "300px") : "0",
    maxWidth: appearance?.features?.styling?.width || "300px",
    padding: isOpen ? "30px 15px" : "30px 0",
    height: "100vh",
    position: "fixed",
    top: 0,
    left: 0,
    transform: isOpen ? "translateX(0)" : "translateX(-10px)",
    transition: "transform 400ms ease, width 400ms ease, padding 400ms ease, opacity 400ms ease",
    zIndex: "1200",
    overflowY: "auto",
    overflowX: "hidden",
    opacity: isOpen ? 1 : 0,
    pointerEvents: isOpen ? "auto" : "none",
    boxShadow: isOpen
      ? themeStyles.boxShadow ||
        "0 10px 30px -12px rgba(0, 0, 0, 0.42), 0 4px 25px 0px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2)"
      : "none",
    "&::-webkit-scrollbar": {
      width: "6px",
    },
    "&::-webkit-scrollbar-track": {
      background: "#f1f1f1",
      borderRadius: "10px",
    },
    "&::-webkit-scrollbar-thumb": {
      background: "#c1c1c1",
      borderRadius: "10px",
    },
    "&::-webkit-scrollbar-thumb:hover": {
      background: "#a8a8a8",
    },
  };
});

const SidebarWrap = styled("div")(() => ({
  width: "100%",
  opacity: 1,
}));

const Overlay = styled("div")(({ isOpen, isMobileDevice }) => ({
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  // Only show background and backdrop filter on mobile
  background: isMobileDevice ? "rgba(0, 0, 0, 0.5)" : "transparent",
  backdropFilter: isMobileDevice ? "blur(2px)" : "none",
  opacity: isOpen ? 1 : 0,
  transition: "opacity 400ms ease",
  pointerEvents: isOpen && isMobileDevice ? "auto" : "none", // Only handle clicks on mobile
  zIndex: "1100",
  display: isMobileDevice ? "block" : "none", // Hide completely on desktop
}));

const CloseButton = styled(IconButton)(({ theme }) => ({
  position: "absolute",
  top: "15px",
  right: "15px",
  zIndex: "1201",
  color: theme.palette.text.primary,
  backgroundColor: "rgba(0, 0, 0, 0.04)",
  '&:hover': {
    backgroundColor: "rgba(0, 0, 0, 0.08)",
  },
}));

const LogoContainer = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  marginBottom: "30px",
  position: "relative",
  padding: "0 10px",
  transition: "all 400ms ease",
  '&:after': {
    content: '""',
    position: "absolute",
    bottom: "-15px",
    left: "10%",
    width: "80%",
    height: "1px",
    background: "linear-gradient(90deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.1) 50%, rgba(0,0,0,0) 100%)",
  }
}));

const Sidebar = ({ data, config, appearance, toogleActive, setIsOpen }) => {
  const mainData = useSelector((state) => state.main || {});
  const { currentUserPermissions } = mainData;
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md")); // Adjust the breakpoint as needed
  const initializedRef = useRef(false);

  const handleItemClick = () => {
    // If on mobile, close the sidebar when an item is clicked
    if (isMobile) {
      toggleOpen(false);
      setIsOpen(false);
    }
  };

  const toggleOpen = (val = null) => {
    if (val === config.viewMode.isOpen) return; // Return early if state isn't changing
    
    const newState = val !== null ? val : !config.viewMode.isOpen;
    config.viewMode.isOpen = newState; // Update config directly
    
    if (toogleActive) {
      toogleActive(newState); // Notify parent component
    }
  };

  useEffect(() => {
    // Prevent this effect from running on every render
    if (!initializedRef.current) {
      initializedRef.current = true;
      
      if (!isMobile && !config.viewMode.isOpen) {
        // Only set open on desktop if currently closed
        setTimeout(() => {
          toggleOpen(true);
        }, 0);
      } else if (isMobile && config.viewMode.isOpen) {
        // Close on mobile if open
        setTimeout(() => {
          toggleOpen(false);
        }, 0);
      }
    }
  }, []);

  // Handle resize events separately
  useEffect(() => {
    const handleResize = () => {
      const shouldBeOpen = !isMobile;
      
      // Only toggle if state is different from what it should be
      if (shouldBeOpen !== config.viewMode.isOpen) {
        toggleOpen(shouldBeOpen);
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMobile]);

  const checkPermission = (item) => {
    const hasPermission =
    item?.permission ? Array.isArray(currentUserPermissions) && Array.isArray(item.permission)
        ? item.permission.some((perm) => currentUserPermissions.includes(perm))
        : false :
        true;

    if (hasPermission) return true;

    if (item.subNav) {
      return item.subNav.some((subItem) =>
        subItem?.permission ? Array.isArray(currentUserPermissions) && Array.isArray(subItem.permission)
          ? subItem.permission.some((perm) => currentUserPermissions.includes(perm))
          : false :
          true
      );
    }

    return false;
  };

  const filteredData = Array.isArray(data.features.sidebarItems)
    ? data.features.sidebarItems
        .filter((item) => checkPermission(item))
        .map((item) => ({
          ...item,
          subNav: item.subNav
            ? item.subNav.filter((subItem) =>
              subItem?.permission ? Array.isArray(currentUserPermissions) && Array.isArray(subItem.permission)
                  ? subItem.permission.some((perm) => currentUserPermissions.includes(perm))
                  : false : true
              )
            : [],
        }))
    : [];

  const isActiveRoute = (path) => location.pathname === path;

  return (
    <>
      {/* Overlay for mobile view only */}
      <Overlay isOpen={config.viewMode.isOpen} isMobileDevice={isMobile} onClick={() =>{ toggleOpen(false); setIsOpen(false)}} />
      
      {/* Sidebar */}
      <SidebarNav appearance={appearance} isOpen={config.viewMode.isOpen}>
        {/* Close Button - Mobile Only */}
        {isMobile && (
          <CloseButton onClick={() => {toggleOpen(false); setIsOpen(false)}} size="small">
            <CloseIcon />
          </CloseButton>
        )}
        
        <SidebarWrap>
          {/* Logo */}
          <LogoContainer>
         
              <img
                src={data?.features?.logo || logo}
                alt="Logo"
                style={{
                  width: appearance.logoWidth || "180px",
                  height: appearance.logoHeight || "70px",
                  objectFit: "contain",
                  transition: "all 400ms ease",
                }}
              />
          </LogoContainer>

          {/* Sidebar Items */}
          <Box sx={{ mt: 4 }}>
            {filteredData?.map((item, index) => (
              <SubMenu
                key={index}
                item={item}
                onItemClick={handleItemClick}
                isActive={isActiveRoute(item.path)}
                appearance={appearance}
              />
            ))}
          </Box>
        </SidebarWrap>
      </SidebarNav>
    </>
  );
};

export default Sidebar;
