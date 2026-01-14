import React from "react";
import { Box, Typography, Tabs, Tab } from "@mui/material";
import { tabsClasses } from "@mui/material/Tabs";

const HeaderSection = ({
  data,
  config,
  permissions,
  isDarkMode,
  lightHeaderTitleColor,
  tabIndex,
  handleTabChange,
  buttons,
  filter,
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        flex: 1,
        minWidth: 0,
      }}
    >
      <Typography
        variant="h4"
        sx={{
          fontWeight: 200,
          color: lightHeaderTitleColor,
          pl: 2,
        }}
      >
        {data?.features?.headerTitle}
      </Typography>

      {config?.features?.tabs?.enable &&
        permissions.tabsPermission &&
        data?.features?.tabs?.options?.length > 0 && (
          <Box
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              alignItems: { sm: "center" },
              gap: 1,
            }}
          >
            <Typography
              variant="subtitle1"
              fontWeight="bold"
              sx={{
                pb: { xs: 1, sm: 0 },
                width: { xs: "100%", sm: "auto" },
                minWidth: "fit-content",
                color: isDarkMode ? "#C7C6FF" : "#4C49ED",
              }}
            >
              {filter.label}:
            </Typography>

            <Box
              sx={{
                flexGrow: 1,
                bgcolor: isDarkMode ? "#40404F" : "#FFFFFF",
                px: { md: 2 },
                width: { xs: "100%", sm: "50%" },
                minWidth: { xs: "100%", md: "400px" },
                maxWidth: { xs: "100%", md: "500px" },
                alignItems: "center",
              }}
            >
              <Tabs
                value={tabIndex}
                onChange={handleTabChange}
                variant="scrollable"
                scrollButtons="auto"
                allowScrollButtonsMobile={true}
                aria-label="Filter Tabs"
                sx={{
                  [`& .${tabsClasses.scrollButtons}`]: {
                    "&.Mui-disabled": { opacity: 0.3 },
                  },
                  "& .MuiTab-root": {
                    minHeight: "35px",
                    textTransform: "none",
                    fontWeight: "bold",
                    color: "#8d5795",
                    cursor: "pointer",
                    minWidth: "unset",
                    transition: "all 0.3s ease",
                    position: "relative",
                    fontSize: { xs: "0.75rem", sm: "0.875rem" },
                    borderRight: "1px solid rgba(0, 0, 0, 0.12)",
                    overflow: "visible",
                    "&.Mui-selected": {
                      color: "#4C49ED",
                    },
                    "&.Mui-selected::after": {
                      content: '""',
                      position: "absolute",
                      bottom: 0,
                      left: 8,
                      right: 8,
                      fontWeight: "bold",
                      height: "2px",
                      borderRadius: "1px",
                    },
                    "&:hover": {
                      backgroundColor: "grey.100",
                    },
                  },
                }}
              >
                {buttons.map((button) => (
                  <Tab
                    key={button.value}
                    label={button.label}
                    value={button.label}
                    sx={{
                      minHeight: "30px",
                    }}
                  />
                ))}
              </Tabs>
            </Box>
          </Box>
        )}
    </Box>
  );
};

export default HeaderSection;
