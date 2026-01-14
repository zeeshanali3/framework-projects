import React, { useEffect } from "react";
import { Typography, Box, Card, TableCell, IconButton, Tooltip } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { GetusersAction } from "../../../Common/Store/Actions/GetusersAction/GetusersAction"
import { DataGrid } from "@mui/x-data-grid";
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useNavigate } from "react-router-dom";
import { routesName } from "../../../routes/adminConstants";
import { datagridContainerStyles } from "./Style/DatagridSX";
const formatDate = (dateString) => {
  return dateString ? dateString.substring(0, 10) : "";
};

const Admins = () => {
  const dispatch = useDispatch();
  const mainData = useSelector((state) => state.main);
  const accessToken = mainData?.accesstoken;

  useEffect(() => {
    dispatch(GetusersAction(accessToken));
  }, []);

  const { getalluserData } = useSelector((state) => state.GETUSERREDUCER);
  console.log("Get All User Data", getalluserData);
  const rows = getalluserData?.return??[];
  console.log("User Data Rows", rows);
  const navigate = useNavigate();
  const columns = [
    {
      field: "FirstName",

      minWidth: 240,
      headerAlign: "left",
      flex: 1,
      align: "left",
      renderHeader: () => (
        <TableCell sx={{ fontWeight: "500", fontSize: "15px" }}>
          First Name
        </TableCell>
      ),
      renderCell: (params) => {
        return <TableCell sx={{ fontSize: '15px' }} >{params.row.users_firstName}</TableCell>;
      }
    },
    {
      field: "LastName",
      renderHeader: () => (
        <TableCell sx={{ fontWeight: "500", fontSize: "15px" }}>
          Last Name
        </TableCell>
      ),
      renderCell: (params) => {
        return <TableCell sx={{ fontSize: '15px' }} >{params.row.users_lastName}</TableCell>;
      },
      minWidth: 220,
      flex: 1,
      headerAlign: "left",
      align: "left"
    },
    {
      field: "FatherName",
      renderHeader: () => (
        <TableCell sx={{ fontWeight: "500", fontSize: "15px" }}>
          Father Name
        </TableCell>
      ),
      renderCell: (params) => {
        return <TableCell sx={{ fontSize: '15px' }} >{params.row.users_fatherName}</TableCell>;
      },
      minWidth: 220,
      flex: 1,
      headerAlign: "left",
      align: "left"
    },
    {
      field: "Email",
      renderHeader: () => (
        <TableCell sx={{ fontWeight: "500", fontSize: "15px" }}>
          Email
        </TableCell>
      ),
      renderCell: (params) => {
        return <TableCell sx={{ fontSize: '15px' }} >{params.row.users_email}</TableCell>;
      },
      minWidth: 350,
      headerAlign: "center",
      flex: 1, align: "left"

    },
    {
      field: "Mobile",
      renderHeader: () => (
        <TableCell sx={{ fontWeight: "500", fontSize: "15px" }}>
          Mobile
        </TableCell>
      ),
      renderCell: (params) => {
        return <TableCell sx={{ fontSize: '15px' }} >{params.row.users_phoneNo}</TableCell>;
      },
      minWidth: 120,
      headerAlign: "center",
      flex: 1,
      align: "right"
    },
    {
      field: "Birthday",
      renderHeader: () => (
        <TableCell sx={{ fontWeight: "500", fontSize: "15px" }}>
          Date of Birth
        </TableCell>
      ),
      renderCell: (params) => {
        return <TableCell sx={{ fontSize: '15px' }} >{params.row.users_dateOfBirth}</TableCell>;
      },
      minWidth: 220,
      headerAlign: "center",
      flex: 1,
      align: "right"
    },
    {
      field: "Cnic",
      renderHeader: () => (
        <TableCell sx={{ fontWeight: "500", fontSize: "15px" }}>
          Cnic
        </TableCell>
      ),
      renderCell: (params) => {
        return <TableCell sx={{ fontSize: '15px' }} >{params.row.users_cnic}</TableCell>;
      },
      minWidth: 200,
      headerAlign: "center",
      flex: 1,
      align: "right"
    },
    {
      field: "Gender",
      renderHeader: () => (
        <TableCell sx={{ fontWeight: "500", fontSize: "15px" }}>
          Gender
        </TableCell>
      ),
      renderCell: (params) => {
        return <TableCell sx={{ fontSize: '15px' }} >{params.row.users_gender}</TableCell>;
      },
      minWidth: 100,
      headerAlign: "left",
      flex: 1,
      align: "left"
    },
    {
      field: "Religion",
      renderHeader: () => (
        <TableCell sx={{ fontWeight: "500", fontSize: "15px" }}>
          Religion
        </TableCell>
      ),
      renderCell: (params) => {
        return <TableCell sx={{ fontSize: '15px' }} >{params.row.users_religion}</TableCell>;
      },
      minWidth: 100,
      headerAlign: "left",
      flex: 1,
      align: "left"
    },
    {
      field: "Address",
      renderHeader: () => (
        <TableCell sx={{ fontWeight: "500", fontSize: "15px" }}>
          Address
        </TableCell>
      ),
      renderCell: (params) => {
        return <TableCell sx={{ fontSize: '15px' }} >{params.row.users_address}</TableCell>;
      },
      minWidth: 200,
      headerAlign: "left",
      flex: 1,
      align: "left"
    },
    {
      field: "Action",
      headerName: "Action",
      minWidth: 120,
      flex: 1,
      align: "center",
      headerAlign: "center",
      renderHeader: () => (
        <TableCell sx={{ fontWeight: "500", fontSize: "15px" }}>
          Action
        </TableCell>
      ),
      renderCell: (params) => (
        <>
          <Tooltip title={"view"} placement="top">
            <IconButton
              aria-label="view"
              size="small"
              color="info"
              className="info"
              onClick={() => navigate(routesName.userdetils, { state: { user: params.row } })}
            >
              <VisibilityIcon />
            </IconButton>
          </Tooltip>

        </>
      ),

    }

  ];
  const getRowId = (row) => row.users_id;
  const [paginationModel, setPaginationModel] = React.useState({
    pageSize: 30,
    page: 0,
  });
  const handlePageChange = (newPaginationModel) => {
    setPaginationModel(newPaginationModel);
  };
  return (
    <>
      <Card
        sx={{
          boxShadow: "none",
          borderRadius: "10px",
          p: "25px",
          mb: "15px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "15px",
          }}
          className="for-dark-bottom-border"
        >
          <Typography
            as="h3"
            sx={{
              fontSize: 18,
              fontWeight: 500,
            }}
          >
            Users
          </Typography>
        </Box>
        <Box sx={datagridContainerStyles}>

          <DataGrid
          rows={rows}
          columns={columns}
          pageSize={10}
          disableColumnFilter
          disableColumnMenu
          autoHeight
          rowHeight={38}
          disableRowSelectionOnClick
          getRowId={getRowId}
          pagination
          paginationMode="client"
          paginationModel={paginationModel}
          onPaginationModelChange={handlePageChange}
        />
        </Box>

      </Card>
    </>
  );
};

export default Admins;
