import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Features from "../../../Components/Dashboard/eCommerce/Features";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import { useDispatch } from "react-redux";
import { getAdminDashboardData } from "../../../Common/Store/Actions/General/GetActions/getAdminDashboardData"; // Adjust the import path if needed
import { Typography, useTheme } from "@mui/material";
import styles from "../../../../styles/PageTitle.module.css";

export default function Ecommerce() {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';
  const [featuresData, setFeaturesData] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedFeature, setSelectedFeature] = useState(null);
  const dispatch = useDispatch();

  // Success callback to update state with the fetched data
  const onSuccess = (response) => {
    const apiData = response?.executeStatisticsQueries;
     console.log("API Data:", apiData);
    // Transform the API response into the required format
    const transformedData = [
      {
        id: "1",
        title: apiData.securityDbTableCounts.find(
          (item) => item.table_name === "security_log"
        )?.record_count || 0,
        subTitle: "Security Log",
        image: "/images/chart2.png",
        icon: <TrendingDownIcon />,
        growthText: "No recent logs",
        color: "errorColor",
        subTitle1: "Failed Login",
        subTitle2: "IP Blocked",
        subTitle3: "Website Down",
      },
      {
        id: "2",
        title: apiData.securityDbTableCounts.find(
          (item) => item.table_name === "crash_log"
        )?.record_count || 0,
        subTitle: "Crash Details",
        image: "/images/chart1.png",
        icon: <TrendingUpIcon />,
        growthText: "No recent crashes",
        color: "successColor",
        subTitle1: "New",
        subTitle2: "Pending",
        subTitle3: "Resolved",
      },
      {
        id: "3",
        title: apiData.securityDbTableCounts.find(
          (item) => item.table_name === "email_log"
        )?.record_count || 0,
        subTitle: "Event Log",
        image: "/images/icon3.png",
        icon: <TrendingUpIcon />,
        growthText: "No recent emails",
        color: "successColor",
        subTitle1: "Email Sent",
        subTitle2: "Report Generated",
        subTitle3: "Files Uploaded",
      },
      {
        id: "4",
        title: apiData.activeUsers[0]?.active_users_count || 0,
        subTitle: "Currently Users",
        image: "/images/users-icon.png",
        icon: <TrendingUpIcon />,
        growthText: "Users are actively logged in",
        color: "successColor",
        subTitle1: "Active Users",
        subTitle2: "Inactive Users",
        subTitle3: "New Users",
      },
      {
        id: "5",
        title: apiData.unassignedPermissions[0]?.unassigned_permissions_count || 0,
        subTitle: "Usage Demographics",
        image: "/images/users-icon.png",
        icon: <TrendingUpIcon />,
        growthText: "Permissions awaiting assignment",
        color: "warningColor",
        subTitle1: "New Location",
        subTitle2: "Old Location",
        subTitle3: "Other Countries",
      },
    ];

    setFeaturesData(transformedData);
  };

  // Failure callback to handle errors
  const onFailure = (error) => {
    console.error("Error fetching data:", error);
    // You can set a state here to show an error message to the user if necessary
  };

  // Fetch data when the component mounts
  useEffect(() => {
    dispatch(getAdminDashboardData(onSuccess, onFailure));
  }, [dispatch]);

  const handleCardClick = (id) => {
    const feature = featuresData.find((item) => item.id === id);
    setSelectedFeature(feature);
    setOpen(true);
  };

  return (
    <>
      <div style={{ 
        backgroundColor: isDarkMode ? theme.palette.background.default : '#F5F5F5', 
        overflowX: 'hidden',
        color: isDarkMode ? theme.palette.text.primary : 'inherit',
        padding: '15px',
        borderRadius: '8px'
      }}>
        <div className={styles.pageTitle}>
          <Typography
            variant="h1"
            component="h1"
            sx={{
              fontSize: '17px',
              fontWeight: 600,
              margin: 0,
              color: isDarkMode ? theme.palette.text.primary : '#333'
            }}
          >
            IT Dashboard
          </Typography>
          <ul>
            <li>
              <Typography color={isDarkMode ? "inherit" : theme.palette.text.primary}>Dashboard</Typography>
            </li>
            <li>IT Operations</li>
          </ul>
        </div>

        <Grid container spacing={2}>
          <Features FeaturesData={featuresData} onCardClick={handleCardClick} />
        </Grid>
      </div>
    </>
  );
}

// import React, { useState } from "react";
// import Grid from "@mui/material/Grid";
// import Features from "../../../Components/Dashboard/eCommerce/Features";
// import TrendingUpIcon from "@mui/icons-material/TrendingUp";
// import TrendingDownIcon from "@mui/icons-material/TrendingDown";
// const FeaturesData = [
//   {
//     id: "1",
//     title: "1298",
//     subTitle: "Security Log",
//     image: "/images/chart2.png",
//     icon: <TrendingDownIcon />,
//     growthText: "1.3% down from past week",
//     color: "successColor",
//     subTitle1: "Failed Login",
//     subTitle2: "IP Blocked",
//     subTitle3: "Website Down",
//   },
//   {
//     id: "2",
//     title: "689",
//     subTitle: "Crash Details",
//     image: "/images/chart1.png",
//     icon: <TrendingUpIcon />,
//     growthText: "1.3% Up from past week",
//     color: "successColor",
//     subTitle1: "New",
//     subTitle2: "Pending",
//     subTitle3: "Resolved",
//   },
//   {
//     id: "3",
//     title: "569",
//     subTitle: "Event Log",
//     image: "/images/icon3.png",
//     icon: <TrendingUpIcon />,
//     growthText: "1.3% Up from past week",
//     color: "successColor",
//     subTitle1: "Email Sent",
//     subTitle2: "Report Generated",
//     subTitle3: "Files Uploaded",
//   },
//   {
//     id: "4",
//     title: "1345",
//     subTitle: "Currently  Users",
//     image: "/images/users-icon.png",
//     icon: <TrendingUpIcon />,
//     growthText: "1.3% Up from past week",
//     color: "successColor",
//     subTitle1: "Active Users",
//     subTitle2: "Inactive Users",
//     subTitle3: "New Users",
//   },
//   {
//     id: "5",
//     title: "45",
//     subTitle: "Usage Demographics",
//     image: "/images/users-icon.png",
//     icon: <TrendingUpIcon />,
//     growthText: "1.3% Up from past week",
//     color: "successColor",
//     subTitle1: "New Location",
//     subTitle2: "Old Location",
//     subTitle3: "Other Countries",
//   },
// ];

// export default function Ecommerce() {
//   const [open, setOpen] = useState(false);
//   const [selectedFeature, setSelectedFeature] = useState(null);

//   const handleCardClick = (id) => {
//     const feature = FeaturesData.find((item) => item.id === id);
//     setSelectedFeature(feature);
//     setOpen(true);
//   };

//   return (
//     <>
//       <Grid container item={{ xs: 15, sm: 15, md: 15 }}>
//         <Features FeaturesData={FeaturesData} onCardClick={handleCardClick} />
//       </Grid>
//     </> 
//   );
// }
