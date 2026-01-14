import React, { useRef, useState, useEffect } from 'react';
import Grid from "@mui/material/Grid";
import styles from '../../../../styles/PageTitle.module.css';
import Features from '../../../Components/Dashboard/Admin/Features';
import { Typography, useTheme } from '@mui/material';
import Terminals from "../../../Components/Dashboard/Admin/Terminals/index";
import Rating from "../../../Components/Dashboard/Admin/Ratings/index";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import RolesDetail from "../../../Components/Dashboard/Admin/BrowserUsedTrafficReports";
import SessionsDevice from "../../../Components/Dashboard/Admin/SessionsDevice/index";
import { useDispatch } from "react-redux";
import { getAdminDashboardData } from '../../../Common/Store/Actions/General/GetActions/getAdminDashboardData';

const roleDataColors = {
  Admin: "#757FEE",
  Admission: "#71E2C6",
  Inventory: "#77D0F9",
  ITOperations: "#F47CB4",
  HR: "#F9C44C",
  Treasury: "#D66A54",
};

export default function AdminDashboard() {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';
  const scrollContainerRef = useRef(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);
  const [scrollDirection, setScrollDirection] = useState(1); // 1 for forward, -1 for reverse
  const [onHoverStop, setOnHoverStop] = useState(false);
  const [currentPieData, setCurrentPieData] = useState(null);
  const [table, setTable] = useState(null);
  const [featuresData, setFeaturesData] = useState([]);
  const [rolesData, setRolesData] = useState([]);
  const [terminalData, setTerminalData] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("getAdminDashboardData: ");
    dispatch(getAdminDashboardData(onSuccess, onFailure));
  }, []);

  const onSuccess = (response) => {
    const stats = response?.executeStatisticsQueries || {};

    // Map API data to FeaturesData
    const mappedFeaturesData = [
      {
        name: "user",
        id: "1",
        title: stats.activeUsers[0]?.active_users_count + stats.inactiveUsers[0]?.inactive_users_count || "0",
        subTitle: "Total Users",
        image: "/images/graph-icon.png",
        icon: <TrendingUpIcon />,
        growthText: `${stats.activeUsers[0]?.active_users_count || "0"} Active Users`,
        color: "successColor",
        pieData: {
          name: "Total Users",
          count: stats.activeUsers[0]?.active_users_count + stats.inactiveUsers[0]?.inactive_users_count || "0",
          series: [stats.activeUsers[0]?.active_users_count || 0, stats.inactiveUsers[0]?.inactive_users_count || 0],
          labels: ['Active Users', 'Inactive Users'],
        },
        table: {
          tableName: 'User',
          tableHeader: ["User Name", "Permissions", "No. of Permissions"],
          tableData: [], // Add actual user data if available
        },
      },
      {
        name: "roles",
        id: "2",
        title: stats.permissionsPerGroup.length || "0",
        subTitle: "Total Roles",
        image: "/images/work-icon.png",
        icon: <TrendingUpIcon />,
        growthText: `${stats.unassignedPermissions[0]?.unassigned_permissions_count || "0"} Unassigned Permissions`,
        color: "successColor",
        pieData: {
          name: "Total Roles",
          count: stats.permissionsPerGroup.length || "0",
          series: [stats.permissionsPerGroup.filter(role => role.permission_count > 0).length, stats.permissionsPerGroup.filter(role => role.permission_count === 0).length],
          labels: ['Active Roles', 'Pending Roles'],
        },
        table: {
          tableName: 'Roles',
          tableHeader: ["Role Name", "Permissions Groups", "Users"],
          tableData: stats.permissionsPerGroup.map(group => ({
            RoleName: group.group_name,
            permissions: group.permission_count,
            users: stats.usersPerPermissionGroup.find(user => user.permissiongroup_name === group.group_name)?.user_count || 0,
          })),
        },
      },
      {
        name: "permissions",
        id: "3",
        title: stats?.tableCounts?.permissions || "0",
        subTitle: "Total Permissions",
        image: "/images/users-icon.png",
        icon: <TrendingUpIcon />,
        growthText: `${stats.permissionsPerGroup.length || "0"} Permission Groups`,
        color: "dangerColor",
        pieData: {
          name: "Permissions Groups",
          count: stats.permissionsPerGroup.length || "0",
          series: stats.permissionsPerGroup.map(group => group.permission_count),
          labels: stats.permissionsPerGroup.map(group => group.group_name),
        },
        table: {
          tableName: 'Permissions',
          tableHeader: ["Permission Groups", "Permissions", "No. of Permissions"],
          tableData: stats.permissionsPerGroup.map(group => ({
            RoleName: group.group_name,
            permissions: group.permission_count,
            users: stats.usersPerPermissionGroup.find(user => user.permissiongroup_name === group.group_name)?.user_count || 0,
          })),
        },
      },
    ];

    // Map API data to rolesData
    const mappedRolesData = stats.permissionsPerGroup.map(group => ({
      label: group.group_name,
      permissions:stats.tableCounts.permission_groups_permissions || "0" ,
      totalPermissions: group.permission_count,
      color: roleDataColors[group.group_name] || "#D3D3D3",
      percentage: Math.round((group.permission_count / (stats.tableCounts.permission_groups_permissions || 1)) * 100),
    }));

    // Map API data to TerminalData
    const mappedTerminalData = [
      { label: 'Total Users', count: stats.activeUsers[0]?.active_users_count + stats.inactiveUsers[0]?.inactive_users_count || "0" },
      { label: 'Active Users', count: stats.activeUsers[0]?.active_users_count || "0" },
      { label: 'Inactive Users', count: stats.inactiveUsers[0]?.inactive_users_count || "0" },
    ];

    setFeaturesData(mappedFeaturesData);
    setRolesData(mappedRolesData);
    setTerminalData(mappedTerminalData);
    setCurrentPieData(mappedFeaturesData[0]?.pieData || null);
    setTable(mappedFeaturesData[0]?.table || null);
  };

  const onFailure = (response) => {
    console.error("Admin Dashboard Data Failure", response);
  };

  const handleCardClick = (selectedCard) => {
    setTable(selectedCard.table);
    setCurrentPieData(selectedCard.pieData);
  };
    const handleMouseDown = (e) => {
    if (window.innerWidth <= 768) return; // Skip drag functionality for mobile
    isDragging.current = true;
    startX.current = e.pageX - scrollContainerRef.current.offsetLeft;
    scrollLeft.current = scrollContainerRef.current.scrollLeft;
  };

  const handleMouseMove = (e) => {
    if (!isDragging.current) return;
    e.preventDefault();
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = x - startX.current; // Distance moved
    scrollContainerRef.current.scrollLeft = scrollLeft.current - walk;
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  const handleMouseLeave = () => {
    isDragging.current = false;
  };

  // Touch-based scrolling for mobile
  const handleTouchStart = (e) => {
    startX.current = e.touches[0].pageX - scrollContainerRef.current.offsetLeft;
    scrollLeft.current = scrollContainerRef.current.scrollLeft;
  };

  const handleTouchMove = (e) => {
    const x = e.touches[0].pageX - scrollContainerRef.current.offsetLeft;
    const walk = x - startX.current;
    scrollContainerRef.current.scrollLeft = scrollLeft.current - walk;
  };

  return (
    <>
      <div style={{ 
        backgroundColor: isDarkMode ? theme.palette.background.default : '#F5F5F5', 
        overflowX: 'hidden',
        color: isDarkMode ? theme.palette.text.primary : 'inherit'
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
            Admin Dashboard
          </Typography>
          <ul>
            <li>
              <Typography color={isDarkMode ? "inherit" : theme.palette.text.primary}>Dashboard</Typography>
            </li>
            <li>Admin</li>
          </ul>
        </div>

        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 2 }}>
          <Grid item xs={12} md={12} lg={12} xl={8}>
            <Features FeaturesData={featuresData} onClick={handleCardClick} />
            <RolesDetail rows={table} />
          </Grid>
          <Grid item xs={12} md={12} lg={12} xl={4}>
            <Rating data={currentPieData} onClick={handleCardClick} />
            <Terminals data={terminalData} />
          </Grid>
        </Grid>

        <Grid
          container
          direction="row"
          wrap="nowrap"
          spacing={2}
          style={{
            overflow: "auto",
            padding: "10px",
            width: "100%",
            maxWidth: "100vw",
            height: "auto",
            boxSizing: "border-box",
            border: `1px solid ${isDarkMode ? theme.palette.divider : '#ccc'}`,
            backgroundColor: isDarkMode ? theme.palette.background.paper : 'inherit',
            cursor: isDragging.current && window.innerWidth > 768 ? "grabbing" : "grab",
          }}
          ref={scrollContainerRef}
          onMouseDown={(e) => handleMouseDown(e)}
          onMouseMove={(e) => handleMouseMove(e)}
          onMouseUp={() => handleMouseUp()}
          onMouseLeave={() => handleMouseLeave()}
          onTouchStart={(e) => handleTouchStart(e)}
          onTouchMove={(e) => handleTouchMove(e)}
          onTouchEnd={() => handleMouseUp()}
        >
          {console.log("rolesData : ", rolesData)}
          {rolesData.map((role, index) => (
            <Grid
              item
              key={index}
              style={{
                flex: "0 0 350px",
                minWidth: "350px",
                height: "500",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                overflow: "auto",
                overflowY: "hidden",
                whiteSpace: "nowrap", 
                maxWidth: "100%",
              }}
              xs={12}
              md={12}
              lg={12}
              xl={8}
              onMouseLeave={() => setOnHoverStop(false)}
              onMouseEnter={() => setOnHoverStop(true)}
            >
              <SessionsDevice data={role} />
            </Grid>
          ))}
        </Grid>
      </div>
    </>
  );
}
