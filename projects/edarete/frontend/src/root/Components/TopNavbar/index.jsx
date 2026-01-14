import * as React from "react";
import { AppBar, Toolbar, IconButton, Stack, Typography, useTheme, useMediaQuery } from "@mui/material";
import Email from "./Email";
import Notification from "./Notification";
import Profile from "./Profile";
import Tooltip from "@mui/material/Tooltip";
import CurrentDate from "./CurrentDate";
import MenuIcon from "@mui/icons-material/Menu";
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useTheme as useThemeContext } from "../../../context/ThemeContext";

const TopNavbar = ({ toggleSidebar }) => {
  const theme = useTheme();
  const { toggleThemeMode } = useThemeContext();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const isDarkMode = theme.palette.mode === 'dark';

  return (
    <>
      <div className={isDarkMode ? "topNavbarDark" : "topNavbarLight"}>
        <AppBar
          elevation={0}
          sx={{
            backgroundColor: isDarkMode ? theme.palette.background.paper : "#fff",
            boxShadow: isDarkMode
              ? "0px 4px 20px rgba(0, 0, 0, 0.15)"
              : "0px 4px 20px rgba(47, 143, 232, 0.07)",
            py: "6px",
            mb: 3,
            position: "sticky",
            zIndex: isMobile ? 10 : "auto",
            borderBottom: `1px solid ${isDarkMode ? theme.palette.divider : 'transparent'}`,
          }}
          className="top-navbar-for-dark"
        >
          <Toolbar>
            <Tooltip title="Hide/Show" arrow>
              <IconButton
                size="small"
                edge="start"
                sx={{
                  color: isDarkMode ? theme.palette.text.primary : '#333333',
                  '&:hover': {
                    backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.04)',
                  }
                }}
                onClick={toggleSidebar}
              >
                <MenuIcon />
              </IconButton>
            </Tooltip>

            <Typography component="div" sx={{ flexGrow: 1 }}></Typography>

            <Stack direction="row" spacing={2}>
              {/* Theme Toggle */}
              <Tooltip title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"} arrow>
                <IconButton
                  color="inherit"
                  onClick={toggleThemeMode}
                  sx={{
                    border: '1px solid',
                    borderColor: isDarkMode ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.12)',
                    borderRadius: '8px',
                    padding: '6px',
                    backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.03)',
                    color: isDarkMode ? theme.palette.primary.light : theme.palette.primary.main,
                    '&:hover': {
                      backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.08)',
                    }
                  }}
                >
                  {isDarkMode ? <Brightness7Icon /> : <Brightness4Icon />}
                </IconButton>
              </Tooltip>

              <CurrentDate isDarkMode={isDarkMode} theme={theme} />
              <Email isDarkMode={isDarkMode} theme={theme} />
              <Notification isDarkMode={isDarkMode} theme={theme} />
              <Profile isDarkMode={isDarkMode} theme={theme} />
            </Stack>
          </Toolbar>
        </AppBar>
      </div>
    </>
  );
};

export default TopNavbar;
