import React, { useState, useRef } from "react";
import { IconButton } from "@mui/material";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import FileCopyIcon from "@mui/icons-material/FileCopyOutlined";
import SaveIcon from "@mui/icons-material/Save";
import PrintIcon from "@mui/icons-material/Print";
import ShareIcon from "@mui/icons-material/Share";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import AppsRoundedIcon from "@mui/icons-material/AppsRounded";
//";
import ViewColumnIcon from "@mui/icons-material/ViewColumn";
import ListViewDropdown from "../ListViewMode";
import ExportDropdown from "../ExportList";
import ImportList from "../ImportList";
import SortData from "../SortData";
//
let colorBase = "#FFFFFF";
let colorBaseBackground = "#4C49ED";
let colorBaseText = "#fff";
let colorBaseHover = "#4C49ED";
const StyledSpeedDial = styled(SpeedDial)(({ theme }) => ({
  position: "absolute",
  // Custom background color for the main SpeedDial button
  "& .MuiFab-root": {
    backgroundColor: "#4C49ED",
    // backgroundColor: "transparent",
    color: "#fff",
    boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.6)",
    transition: "background 0.3s",
    width: "40px",
    height: "40px",
    // boxShadow: "none",
    // right: 16,
    zIndex: 100,
    // top: 2,
    "&:hover": {
      backgroundColor: colorBaseHover,
    },
  },
  "&.MuiSpeedDial-directionUp, &.MuiSpeedDial-directionLeft": {
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
  "&.MuiSpeedDial-directionDown, &.MuiSpeedDial-directionRight": {
    top: theme.spacing(-2.5),
    // right: theme.spacing(2),
  },
}));

// Accept actions as a prop, fallback to default if not provided
const defaultActions = [
  { icon: <FileCopyIcon />, name: "Copy" },
  {
    icon: <SaveIcon />,
    name: "Save",
    expandable: true,
    options: [
      { icon: <PrintIcon />, name: "Print" },
      { icon: <ShareIcon />, name: "Share" },
    ],
  },
  { icon: <PrintIcon />, name: "Print" },
  { icon: <ShareIcon />, name: "Share" },
];

const SpeedDialComponent = ({
  config,
  data,
  filteredData,
  viewMode,
  setViewMode,
  showSearchIcon,
  permissions,
  isDarkMode,
  colorBaseDarkText,
  colorBaseText,
  columnVisibility,
  handleClickAddButton,
  handleColumnVisibilityMenuOpen,
  sortIsServerDriven,
  setFilteredData,
  addSortingParams,
}) => {
  //
  const speedDialActions = []; // array for speed dial actions
  //add user
  if (
    permissions.addActionPermission &&
    showSearchIcon?.toLowerCase() !== "view"
  ) {
    speedDialActions?.push({
      icon: (
        <AddIcon
          sx={{ color: isDarkMode ? colorBaseDarkText : colorBaseText }}
        />
      ),
      name: "Add",
      onClick: handleClickAddButton,
    });
  }
  //column Visibility menu
  if (
    viewMode === "Table" &&
    permissions.columnVisibilityPermission &&
    columnVisibility
  ) {
    speedDialActions.push({
      icon: (
        <ViewColumnIcon
          sx={{ color: isDarkMode ? colorBaseDarkText : colorBaseText }}
        />
      ),
      name: "Column Visibility",
      onClick: handleColumnVisibilityMenuOpen,
    });
  }

  if (
    config?.features?.viewModes &&
    config?.viewMode?.presentation?.length > 1
  ) {
    speedDialActions.push({
      // Render only the raw icon here (no nested button). Clicking the SpeedDialAction
      // will cycle to the next view mode instead of opening a menu.
      icon: (
        <ListViewDropdown
          viewMode={viewMode}
          setListView={setViewMode}
          iconColor={isDarkMode ? colorBaseDarkText : colorBaseText}
          presentation={config?.viewMode?.presentation}
          asIcon={true}
        />
      ),
      name: "View Mode",
      onClick: () => {
        const pres = config?.viewMode?.presentation || [];
        if (!pres || pres.length === 0) return;
        const idx = pres.indexOf(viewMode);
        const next = pres[(idx + 1) % pres.length] || pres[0];
        setViewMode(next);
      },
    });
  }
  //more actions (export,import,sort) main icon
  //  <div>
  if (config?.features?.export?.enable && permissions.exportActionPermission) {
    speedDialActions?.push({
      icon: (
        <ExportDropdown
          headers={
            config?.features?.export?.operationalMode === "server"
              ? data?.features?.export?.serverCommunication?.data?.parameters?.steps?.[0]?.parameters?.fields?.[0]?.childFields || []
              : data?.features?.parameters?.fields || []
          }
          data={
            config?.features?.export?.operationalMode == "server"
              ? [] // Server mode should handle export differently or provide actual data array
              : filteredData || data?.features?.parameters?.data
          }
          buttonColor="white"
          color="white"
          formats={data?.features?.export?.options?.formats || []}
          includeHeaders={
            data?.features?.export?.options?.includeHeaders || true
          }
          onSuccess={data?.features?.export?.onSuccess}
          onFailure={data?.features?.export?.onFailure}
          onAction={data?.features?.export?.onAction}
        />
      ),
      name: "Export",
      menu: false,
      expandable: false,
    });
  }
  //  <MenuItem
  //     sx={{
  //       display: "flex",
  //       alignItems: "center",
  //       gap: 1,
  //       padding: "1px 2px",
  //       color: isDarkMode ? colorBaseDarkText : colorBaseText,
  //     }}
  //   >

  // </MenuItem>
  if (config?.features?.import?.enable && permissions.importActionPermission) {
    const importServerComm = 
      data?.features?.import?.serverCommunication?.apiUrl 
        ? data?.features?.import?.serverCommunication 
        : data?.features?.bulkAction?.add?.serverCommunication?.apiUrl
          ? data?.features?.bulkAction?.add?.serverCommunication
          : null;

    // Only show import if properly configured
    if (importServerComm?.apiUrl) {
      speedDialActions.push({
        icon: (
          <ImportList
            parameters={data?.features?.parameters?.fields || []}
            color="white"
            addSagaCommunication={importServerComm}
            onSuccess={(message) => {
              console.log("Import success:", message);
            }}
            onFailure={(error) => {
              console.error("Import failed:", error);
            }}
          />
        ),
        name: "Import",
        menu: false,
        expandable: false,
      });
    }
  }
  if (config?.features?.sort?.enable && permissions.sortActionPermission) {
    speedDialActions.push({
      icon: (
        <SortData
          dataHeaders={data?.features?.parameters?.fields || []}
          data={filteredData || []}
          setData={!sortIsServerDriven ? setFilteredData : () => {}}
          isServerDriven={sortIsServerDriven}
          excludeSort={["image"]}
          buttonColor="white"
          options={data?.features?.sort?.options || {}}
          sx={{ mr: 2 }}
          onAction={
            sortIsServerDriven
              ? (q) => addSortingParams(q)
              : typeof data?.features?.sort?.onAction === "function"
              ? data?.features?.sort?.onAction
              : () => {}
          }
        />
      ),
      name: "Sort",
      menu: false,
      expandable: false,
      // onclick: handleMenuOpen,
    });
  }

  // defaultActions;
  const [direction] = React.useState("down");
  const [hidden] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [expandedIdx, setExpandedIdx] = useState(null);
  const [hovered, setHovered] = React.useState(null);
  const [anchorEl, setAnchorEl] = useState(null);

  const closeTimer = useRef();

  const handleOpen = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpen(true);
  };

  const handleClose = () => {
    closeTimer.current = setTimeout(() => setOpen(false), 600);
    setExpandedIdx(null);
  };

  const handleActionMouseEnter = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpen(true);
  };

  // For expandable actions
  const handleExpandableMouseEnter = (idx) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setExpandedIdx(idx);
  };
  const handleExpandableMouseLeave = () => {
    setExpandedIdx(null);
  };
  // //height: 50 ,  mt: 4
  return (
    <Box
      sx={{
        transform: "translateZ(0px)",
        flexGrow: 1,
        // pointerEvents: "auto",
        position: "relative",
        zIndex: 1300,
      }}
    >
      <StyledSpeedDial
        ariaLabel="SpeedDial with custom icons"
        hidden={hidden}
        sx={{ position: "absolute", pointerEvents: "auto" }}
        icon={
          <SpeedDialIcon
            icon={<AppsRoundedIcon sx={{ color: colorBaseText }} />}
            openIcon={
              <CloseIcon
                sx={{ transform: "rotate(180deg)", color: colorBaseText }}
              />
            }
          />
        }
        direction={direction}
        className={`MuiSpeedDial-direction${
          direction.charAt(0).toUpperCase() + direction.slice(1)
        }`}
        open={open}
        onOpen={handleOpen}
        onClose={handleClose}
        onMouseEnter={handleActionMouseEnter}
        onMouseLeave={handleClose}
      >
        {/* speed dial actions main bar */}
        {speedDialActions.map((action, idx) =>
          // if action is expandable
          open && action.expandable && expandedIdx === idx ? (
            [
              <SpeedDialAction
                key={action.name}
                icon={action.icon}
                // tooltipTitle={action.name}
                onClick={action.onClick}
                onMouseEnter={() => handleExpandableMouseEnter(idx)}
                onMouseLeave={handleExpandableMouseLeave}
              />,
              //expandable actoin have further options as menu items
              action.menu ? (
                <Box
                  key={`${action.name}-expandable`}
                  sx={{
                    position: "absolute",
                    right: "60px",
                    top: `calc(${65 * (idx + 1)}px )`,
                    height: 100,
                    width: 50,
                    backgroundColor: colorBaseBackground,
                    borderRadius: 2,
                    boxShadow: 3,
                    p: 1,
                    zIndex: 2000,
                  }}
                  onMouseEnter={() => setExpandedIdx(idx)}
                  onMouseLeave={handleExpandableMouseLeave}
                ></Box>
              ) : (
                //expandable actoin have further options as icons
                <Box
                  key={`${action.name}-expandable`}
                  sx={{
                    position: "absolute",
                    right: "60px",
                    top: `calc(${65 * (idx + 1)}px )`,
                    display: "flex",
                    flexDirection: "column",
                    backgroundColor: colorBaseBackground,

                    borderRadius: 2,
                    boxShadow: 3,
                    p: 1,
                    gap: 1,
                    // zIndex: 2000,
                    height: "auto",
                  }}
                  onMouseEnter={() => setExpandedIdx(idx)}
                  onMouseLeave={handleExpandableMouseLeave}
                >
                  {action.options?.map((opt) => (
                    // <Tooltip title={opt.name}>
                    <IconButton
                      key={opt.name}
                      onClick={
                        opt.onClick ||
                        (() => console.log(`${opt.name} clicked`))
                      }
                      size="small"
                      sx={{
                        color: "#fff",
                        height: "30px",
                        // borderRadius: "none"
                        borderRadius: ".5rem",
                        // gap: 2,
                        "&:hover": {
                          // height: "30px",
                          // width:"100%",
                          backgroundColor: colorBaseHover,
                        },
                      }}
                    >
                      {opt.icon}
                    </IconButton>
                    // </Tooltip>
                  ))}
                </Box>
              ),
            ]
          ) : (
            // if action is't expandable
            <SpeedDialAction
              sx={{
                zIndex: 1300,
              }}
              key={action.name}
              icon={action.icon}
              tooltipTitle={action.name}
              onClick={action.onClick}
              onMouseEnter={
                action.expandable
                  ? () => handleExpandableMouseEnter(idx)
                  : handleOpen
              }
              onMouseLeave={
                action.expandable ? handleExpandableMouseLeave : undefined
              }
            />
          )
        )}

        {/* //////////////////////////////////////////////////// */}
        {/* {speedDialActions.map((action, idx) => {
          if (action.expandable) {
            return (
              <SpeedDial
                key={action.name}
                ariaLabel={`${action.name} nested`}
                direction="right"
                icon={action.icon}
                sx={{ position: "absolute", top: 0, left: 0 }}
                onMouseEnter={() => setHovered(idx)}
                onMouseLeave={() => setHovered(null)}
              >
                {action.options.map((opt) => (
                  <SpeedDialAction
                    key={opt.name}
                    icon={opt.icon}
                    tooltipTitle={opt.name}
                    onClick={opt.onClick}
                  />
                ))}
              </SpeedDial>
            );
          }

          return (
            <SpeedDialAction
              key={action.name}
              icon={action.icon}
              tooltipTitle={action.name}
              onClick={action.onClick}
            />
          );
        })} */}

        {/* {speedDialActions.map((action, idx) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            onClick={
              idx === 0
                ? (e) => {
                    console.log("Clicked first action");
                    action.onClick && action.onClick(e);
                  }
                : action.onClick
            }          
          />
        ))} */}
      </StyledSpeedDial>
    </Box>
  );
};

export default SpeedDialComponent;
