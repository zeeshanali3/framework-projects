import React, { useEffect, useState, useMemo } from "react";
import {
  Box,
  Card,
  Typography,
  Avatar,
  useTheme,
  
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import PersonIcon from "@mui/icons-material/Person";
import Person3Icon from "@mui/icons-material/Person3";
import TransgenderIcon from "@mui/icons-material/Transgender";
import BadgeIcon from "@mui/icons-material/Badge";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import InfoIcon from "@mui/icons-material/Info";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import NotificationsIcon from "@mui/icons-material/Notifications";
import PaidIcon from "@mui/icons-material/Paid";
import PhonelinkIcon from "@mui/icons-material/Phonelink";
import SafetyCheckIcon from "@mui/icons-material/SafetyCheck";
// import PersonIcon from '@mui/icons-material/Person';
import MessageIcon from "@mui/icons-material/Message";
import ContactPhoneIcon from "@mui/icons-material/ContactPhone";
import LocalActivityIcon from "@mui/icons-material/LocalActivity";
import GradeIcon from "@mui/icons-material/Grade";
import DescriptionIcon from "@mui/icons-material/Description";
import LanguageIcon from "@mui/icons-material/Language";
import { useSelector } from "react-redux";
import ActionButtons from "../ActionButtons";
import { HasPermission } from "../constants/permissionChecker";
const CardView = ({
  CustomCard,
  dataProp,
  configProp,
  dataFeatures,
  appearanceProp,
  additionalProp,
  onRowAction,
  onUpdateRefreshData,
  themeStyles,
  isDarkMode,
  userStatusUpdationPermission,
}) => {
  //visibleInCardView
  // console.warn("dataFeatures Props:", dataFeatures);
  // const [Data, setData] = useState([additionalProp?.data]);
  const [visible, setVisible] = useState([]);
  const [col, setCol] = useState([]);
  // visible column and img array
  const [visibleCol] = useMemo(() => {
    const _visibleCol = [];
    // const _image = [];
    dataProp?.features?.parameters?.fields.forEach((head) => {
      // if (head?.type === "image") {
      //   _image.push(head);
      // } else
      if (head?.visible) {
        _visibleCol.push(head);
      }
    });
    return [_visibleCol];
  }, [dataProp?.features?.parameters?.fields]);

  useEffect(() => {
    if (dataFeatures?.list?.visibleInCardView) {
      setVisible(
        visibleCol.filter((item) =>
          (dataFeatures?.list?.visibleInCardView || []).includes(
            item.dynamicKey
          )
        )
      );
    } else if (visibleCol) {
      setVisible(visibleCol);
    }
    return;
  }, [visibleCol, dataFeatures?.list?.visibleInCardView]);
  // dataFeatures?.list?.visibleInCardView;


  useEffect(() => {
    if (additionalProp?.data && visible.length > 0) {
      const filteredData = additionalProp.data.map((item) => {
        const filteredItem = {};
        visible.forEach((visibleField) => {
          const fieldKey = visibleField.dynamicKey;
          if (item.hasOwnProperty(fieldKey)) {
            filteredItem[fieldKey] = item[fieldKey];
          }
        });
        return filteredItem;
      });
      setCol(filteredData);
      
    }
  }, [additionalProp?.data, visible]);
  // console.warn("paginated", col);
  const { currentUserPermissions } = useSelector((state) => state.main);
  // const [filteredActions, setFilteredActions] = useState({});
  const appTheme = useTheme(); // Get the current theme from MUI
  // const isDarkMode = appTheme.palette.mode === "dark";
  const [enableCheckBox, setEnableCheckBox] = useState(false);

  //action buttons
  const filteredActions = configProp?.features?.rowActions?.permission
    ? dataProp?.features?.rowActions?.actions?.filter((action) =>
        HasPermission(action.permission, currentUserPermissions)
      )
    : dataProp?.features?.rowActions?.actions;

  const actionsEnabled =
    configProp?.features?.rowActions?.enable && filteredActions?.length > 0;

  const actionButtonColor =
    themeStyles?.actionButtons?.color || (isDarkMode ? "#a5a4c4" : "#7b7a8c");
  const rowActionsIsServerDriven =
    configProp?.features?.rowActions?.operationalMode == "server"
      ? true
      : false;
  const { bulkActionArray, setbulkActionArray } = additionalProp?.bulkActions;

  // useEffect(() => {
  //   setData(additionalProp?.data);
  // }, [additionalProp?.data]);

  // const data = {
  //   company: "Champlin, Terry and Jaskolski",
  //   email: "ctratton2@blinklist.com",
  //   phone: "5481284154",
  //   location: "Suite 42",
  //   category: "Curb & Gutter",
  //   logo: "https://upload.wikimedia.org/wikipedia/commons/3/3b/Cisco_logo_blue_2016.svg", // Cisco logo as in image
  // };
  let defaultImg =
    "https://i.postimg.cc/cHJWwXyW/coinview-app-h7a6g0ua6-LM-unsplash.jpg";
  const handleAction = (action, item, index) => {
    if (onRowAction) {
      rowActionsIsServerDriven && onRowAction(action, item, index);
    } else {
      onUpdateRefreshData(action, item, index);
    }
  };
  function getDisplayValue(value, fieldKey) {
    if (value === undefined || value === null || value === "") return "-";
    // Date handling: if the fieldKey or value suggests a date, format it
    if (
      (typeof fieldKey === "string" &&
        fieldKey.toLowerCase().includes("date")) ||
      (typeof value === "string" &&
        (value.match(/^\d{4}-\d{2}-\d{2}/) ||
          value.match(/^\d{2}\/\d{2}\/\d{4}/)))
    ) {
      let rawValue = value;
      if (typeof rawValue === "string" && rawValue.includes(" ")) {
        rawValue = rawValue.replace(" ", "T");
      }
      const dateObj = new Date(rawValue);
      if (!isNaN(dateObj.getTime())) {
        return dateObj.toLocaleDateString("en-GB", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        });
      } else {
        return "-";
      }
    }
    if (typeof value === "object") {
      if (Array.isArray(value)) return value.join(", ");
      return value.label || value.name || JSON.stringify(value);
    }
    return value;
  }
  // Helper to get icon based on field type or value
  function getFieldIcon(field, value) {
    // Use type, label, or dynamicKey to determine icon
    const type = field?.type?.toLowerCase() || "";
    const label = field?.label?.toLowerCase() || "";
    const key = field?.dynamicKey?.toLowerCase() || "";
    if (type === "email" || label.includes("email") || key.includes("email")) {
      return <EmailIcon fontSize="small" />;
    }
    if (type === "phone" || label.includes("phone") || key.includes("phone")) {
      return <PhoneIcon fontSize="small" />;
    }
    if (
      type === "datetime" ||
      type === "date" ||
      label.includes("date") ||
      key.includes("date") ||
      key.includes("duration")
    ) {
      return <CalendarTodayIcon fontSize="small" />;
    }
    if (label.includes("name") || key.includes("name")) {
      return <PersonIcon fontSize="small" />;
    }

    if (label.includes("payment") || key.includes("name")) {
      return <PaidIcon fontSize="small" />;
    }
    if (label.includes("id") || key.includes("name")) {
      return <BadgeIcon fontSize="small" />;
    }
    if (label.includes("description") || key.includes("description")) {
      return <DescriptionIcon fontSize="small" />;
    }
    if (
      label.includes("website" || "url" || "link") ||
      key.includes("website" || "url" || "link")
    ) {
      return <LanguageIcon fontSize="small" />;
    }
    if (
      label.includes("contact" || "phone") ||
      key.includes("contact" || "phone")
    ) {
      return <ContactPhoneIcon fontSize="small" />;
    }
    if (
      label.includes("notification" || "alert") ||
      key.includes("notification" || "alert")
    ) {
      return <NotificationsIcon fontSize="small" />;
    }
    if (
      label.includes("message" || "chat") ||
      key.includes("message" || "chat")
    ) {
      return <MessageIcon fontSize="small" />;
    }
    if (
      label.includes("token" || "security") ||
      key.includes("token" || "security")
    ) {
      return <SafetyCheckIcon fontSize="small" />;
    }
    if (label.includes("os" || "browser") || key.includes("os" || "browser")) {
      return <PhonelinkIcon fontSize="small" />;
    }
    if (label.includes("address") || key.includes("address")) {
      return <LocationOnIcon fontSize="small" />;
    }
    if (label.includes("activity") || key.includes("activity")) {
      return <LocalActivityIcon fontSize="small" />;
    }
    if (label.includes("grade" || "score") || key.includes("grade")) {
      return <GradeIcon fontSize="small" />;
    }
    if (label.includes("status") || key.includes("status")) {
      if (typeof value === "string" && value.toLowerCase() === "active") {
        return <CheckCircleIcon fontSize="small" color="success" />;
      }
      if (typeof value === "string" && value.toLowerCase() === "inactive") {
        return <CancelIcon fontSize="small" color="error" />;
      }
      return <InfoIcon fontSize="small" />;
    }
    if (label.includes("gender") || key.includes("gender")) {
      if (typeof value === "string" && value.toLowerCase() === "male") {
        return <PersonIcon fontSize="small" />;
      }
      if (typeof value === "string" && value.toLowerCase() === "female") {
        return <Person3Icon fontSize="small" />;
      }
      if (typeof value === "string" && value.toLowerCase() === "other") {
        return <TransgenderIcon fontSize="small" />;
      }
      return <InfoIcon fontSize="small" />;
    }
    // Add more rules as needed
    return null;
  }
  const overFlowedColumnsPerRow = () => {
    let length = visible?.length - 2;

    if (length % 5 === 0) {
      return 3;
    } else if (length < 3) {
      return 2;
    } else if (length % 5 === 1) {
      return 3;
    } else if (length % 5 <= 3) {
      return 3;
    } else if (length % 5 > 3) {
      return 3;
    }
  };
  if (
    !additionalProp?.data?.length &&
    !dataProp?.features?.parameters?.fields?.length &&
    !col?.length
  ) {
    return (
      <div
        style={{
          textAlign: "center",
          marginTop: "50px",
          padding: "80px",
        }}
      >
        <Typography
          variant="h6"
          sx={{ color: isDarkMode ? "#c7c6ff" : "#260143" }}
        >
          No data found
        </Typography>
      </div>
    );
  }
  return (
    <Box
      sx={{
        // pt: 10,
        // pl: 5,
        // pr: 5,
        padding: "70px 20px 20px 20px",
        display: "flex",
        flexDirection: "column",
        // gap: 1,
        // transition: "all 0.2s ease",
      }}
    >
      {col.map((item, index) => (
        //  <Grow in={true} timeout={400} key={index}>
        <Card
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            alignItems: { xs: "stretch", sm: "center" },
            p: { xs: 1, sm: 2, md: 3 },
            justifyContent: "space-between",
            minHeight: { xs: 180, sm: 140, md: 120 },
            width: "100%",
            transition:
              "box-shadow 0.5s cubic-bezier(.4,2,.6,1), transform 0.5s cubic-bezier(.4,2,.6,1)",
            "&:hover": {
              cursor: "pointer",
              transform: "scale(1.01)",
              boxShadow: "0 8px 16px rgba(0, 0, 0, 0.08)",
              zIndex: 2,
            },
            boxShadow: "none",
            zIndex: 1,
            border: isDarkMode
              ? "1px solid rgba(255, 255, 255, 0.12)"
              : "1px solid rgba(0, 0, 0, 0.12)",
            mb: { xs: 1, sm: 1, md: 2, lg: 2, xl: 3 },
            borderRadius: { xs: 1, sm: 2 },
          }}
        >
          {/* Left Section */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              width: "100%",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                // width: { xs: "100%", sm: "auto" },
                mb: { xs: 1, sm: 0 },
                mr: 1,
                // flex: { xs: "0 0 auto", sm: "1 1 30%" },
                flexDirection: "row",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "row",
                }}
              >
                <Avatar
                  src={defaultImg}
                  alt="Company Logo"
                  sx={{
                    width: { xs: 40, sm: 56, md: 64 },
                    height: { xs: 40, sm: 56, md: 64 },
                    mr: { xs: 1.5, sm: 2, md: 3 },
                  }}
                />
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Typography
                    fontWeight={600}
                    fontSize={{ xs: 15, sm: 17, md: 19 }}
                  >
                    {getDisplayValue(item[visible[0]?.dynamicKey])}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    fontSize={{ xs: 12, sm: 13, md: 14 }}
                  >
                    {getDisplayValue(item[visible[1]?.dynamicKey])}
                  </Typography>
                </Box>
              </Box>
              {actionsEnabled && (
                <Box
                  sx={{
                    display: "flex",
                    mt: { xs: 1, sm: 0.8 },
                    width: { xs: "100%", sm: "auto" },
                    justifyContent: { xs: "flex-end", sm: "flex-start" },
                    // flex: { xs: "0 0 auto", sm: "1 1 20%" },
                  }}
                >
                  <ActionButtons
                    displayMode="table"
                    color={actionButtonColor}
                    actions={filteredActions}
                    onAction={(action, index) =>
                      handleAction(action, item, index)
                    }
                  />
                </Box>
              )}
            </Box>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  xs: "repeat(1, 1fr)", // 1 column
                  sm: "repeat(2, 1fr)", // 2 columns
                  md: `repeat(${overFlowedColumnsPerRow()}, 1fr)`, // 3 columns
                },
                // display: "flex",
                // flexDirection: "row",
                // flexWrap: "wrap",
                alignItems: "center",
                justifyContent: "flex-start",
                gap: 2,
                width: "100%",
              }}
            >
              {visible.slice(2).map((heading) => (
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    gap: 1,
                    // ml: 1,
                    mt: 1,
                    flexDirection: "row",
                    width: "100%",
                  }}
                >
                  {/* Only show icon for important fields */}
                  {getFieldIcon(heading, item[heading.dynamicKey])}
                  <Typography
                    fontWeight={600}
                    fontSize={{ xs: 12, sm: 13, md: 14 }}
                    sx={{ wordBreak: "break-word" }}
                  >
                    {heading.label} :
                  </Typography>
                  <Typography
                    variant="body2"
                    fontSize={{ xs: 12, sm: 13, md: 14 }}
                    // sx={{ wordBreak: "break-word" }}
                  >
                    {getDisplayValue(
                      item[heading.dynamicKey],
                      heading.dynamicKey
                    )}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box>

          {/* Right Section */}
        </Card>
        // </Grow>
      ))}
    </Box>
  );
};

export default CardView;
