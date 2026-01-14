import React, { useEffect } from 'react';
import { Box } from "@mui/material";
import { IconButton } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useMediaQuery } from '@mui/material';
import SubMenu from './SubMenu';
import { Link } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import logo from '../../../assets/images/ITU - name.png';
import { useDispatch, useSelector } from "react-redux";
import { getStudentData } from '../../Utils/loginData/loginData.jsx';
import { toggleSidebarAction } from '../../Common/Store/Actions/General/PostActions/toggleSideBarAction.js';
import { sideBarActiveTabAction } from '../../Common/Store/Actions/General/GetActions/getSideBarDataAction.js';

const SidebarNav = styled("nav")(({ theme, isOpen }) => ({
  background: '#f5f5f5',
  boxShadow: "0px 4px 20px rgba(134, 134, 134, 0.49)",
  width: isOpen ? '300px' : '0px',
  padding: isOpen ? '30px 10px' : '0px',
  height: '100vh',
  display: 'flex',
  justifyContent: 'center',
  position: 'fixed',
  top: 0,
  left: 0,
  transition: '350ms',
  zIndex: '10',
  overflowY: 'auto',
  visibility: isOpen ? 'visible' : 'hidden',
}));

const SidebarWrap = styled("div")(({ theme }) => ({
  width: '100%'
}));

const Overlay = styled("div")(({ theme, isOpen }) => ({
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  background: 'rgba(0, 0, 0, 0.5)',
  visibility: isOpen ? 'visible' : 'hidden',
  opacity: isOpen ? '1' : '0',
  transition: 'opacity 0.3s ease',
  zIndex: '9'
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


const Sidebar = ({ isOpen, setIsOpen }) => {
  const SidebarData = useSelector((state) => state?.SIDERBARDATA?.sideBarData);
  console.log("SidebarData:::", SidebarData);
  const { loginData } = useSelector((state) => state?.LOGINREDUCER);
  const studenData = getStudentData(loginData);
  const mapArray = loginData?.payload?.studentUserId?.length > 0 ? true : false;

  const dispatch = useDispatch();
  const isMobile = useMediaQuery("(max-width:899px)");

  const handleItemClick = (componentName, ComponentId) => {
    console.log("clicked path :", componentName, ComponentId)
    // {
    //   if(componentName=="Attendance")
    //   {

    //     const component = SidebarData.find(c => c.title === "Lecture");
    //     console.log("SidebarData:::",component)
    //     dispatch(sideBarActiveTabAction(componentName,component.ComponentId));
    //     return 
    //   }
    // }   
    dispatch(sideBarActiveTabAction(componentName, ComponentId));
    if (isMobile) {
      toggleOpen(false);
      setIsOpen(false);
    }
  };

  const toggleOpen = (val = null) => {
    if (val) {
      dispatch(toggleSidebarAction(val));
      return;
    }
    dispatch(toggleSidebarAction(!isOpen));
  };

  useEffect(() => {
    if (!isMobile) {
      toggleOpen(true);
      return;
    }
    toggleOpen(false);
  }, [isMobile]);

  return (
    <>
      {isMobile && (
        <Overlay isOpen={isOpen} onClick={() => { toggleOpen(false); setIsOpen(false) }} />
      )}
      <SidebarNav isOpen={isOpen} className="LeftSidebarNav">
        <SidebarWrap>
          <Box
            sx={{
              mb: '20px',
              px: '20px',
              display: 'flex',
              alignItems: 'center',

              justifyContent: 'space-between',
            }}
          >
            {isMobile && (
              <CloseButton onClick={() => { toggleOpen(false); setIsOpen(false) }} size="small">
                <CloseIcon />
              </CloseButton>
            )}
            <Link to="/classroom/Student-Dashboard">
              <img
                src={logo}
                alt="Logo"
                style={{ marginLeft: '40px', width: '150px', height: '100px' }}
              />
            </Link>
          </Box>
          {SidebarData?.map((item, index) => (
            <React.Fragment key={index}>
              <SubMenu item={item} onItemClick={handleItemClick} />
            </React.Fragment>
          ))}
        </SidebarWrap>
      </SidebarNav>
    </>
  );
};

export default Sidebar;