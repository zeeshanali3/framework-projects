import React from "react";
import { Box, Typography, useTheme as useMuiTheme } from "@mui/material";
import Card from "@mui/material/Card";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import PropTypes from "prop-types";
import { useTheme } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";

function BrowserUsedTrafficReport(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

BrowserUsedTrafficReport.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

// function createData(
//   browser,
//   users,
//   usersProgress,
//   transactions,
//   transactionsProgress,
//   change,
//   iconName,
//   badgeClass
// ) {
//   return {
//     browser,
//     users,
//     usersProgress,
//     transactions,
//     transactionsProgress,
//     change,
//     iconName,
//     badgeClass,
//   };
// }

// const rows = [
//   createData(
//     "Safari Browser",
//     "1051",
//     "18",
//     "43080",
//     "(35%)",
//     "14.80%",
//     "ri-arrow-up-s-fill",
//     "successBadge"
//   ),
//   createData(
//     "UC Browser",
//     "8075",
//     "13",
//     "5466",
//     "(12%)",
//     "11.50%",
//     "ri-arrow-up-s-fill",
//     "successBadge"
//   ),
//   createData(
//     "Google Chrome",
//     "59802",
//     "38",
//     "17654",
//     "(19%)",
//     "8.69%",
//     "ri-arrow-down-s-fill",
//     "dangerBadge"
//   ),
//   createData(
//     "Mozilla Firefox",
//     "21854",
//     "24",
//     "87759",
//     "(52%)",
//     "22.06%",
//     "ri-arrow-up-s-fill",
//     "successBadge"
//   ),
//   createData(
//     "Opera Mini",
//     "853",
//     "35",
//     "566",
//     "(52%)",
//     "52.80%",
//     "ri-arrow-up-s-fill",
//     "successBadge"
//   ),
//   createData(
//     "Microsoft Edge",
//     "1844",
//     "10",
//     "399",
//     "(60%)",
//     "60.00%",
//     "ri-arrow-down-s-fill",
//     "dangerBadge"
//   ),
//   createData(
//     "Brave",
//     "15844",
//     "55",
//     "455",
//     "(55%)",
//     "55.00%",
//     "ri-arrow-up-s-fill",
//     "successBadge"
//   ),
//   createData(
//     "Vivaldi",
//     "11844",
//     "50",
//     "655",
//     "(50%)",
//     "50.00%",
//     "ri-arrow-up-s-fill",
//     "successBadge"
//   ),
//   createData(
//     "Other Browser",
//     "5907",
//     "7",
//     "4576",
//     "(10%)",
//     "16.25%",
//     "ri-arrow-up-s-fill",
//     "successBadge"
//   ),
// ].sort((a, b) => (a.browser < b.browser ? -1 : 1));

const BrowserUsedTrafficReports = ({ rows }) => {
  const theme = useMuiTheme();
  const isDarkMode = theme.palette.mode === 'dark';
  
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  // Table
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(4);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows?.tableData?.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <>
      <Card
        sx={{
          boxShadow: "none",
          borderRadius: "10px",
          p: "25px 20px 15px",
          mb: "15px",
          height: "72%",
          backgroundColor: isDarkMode ? theme.palette.background.paper : '#fff',
          color: isDarkMode ? theme.palette.text.primary : 'inherit',
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottom: `1px solid ${isDarkMode ? theme.palette.divider : '#EEF0F7'}`,
            paddingBottom: "10px",
            mb: "20px",
          }}
          className="for-dark-bottom-border"
        >
          <Typography
            as="h3"
            sx={{
              fontSize: 18,
              fontWeight: 500,
              color: isDarkMode ? theme.palette.primary.light : 'inherit',
            }}
          >
            {rows?.tableName || "Details"}
          </Typography>

          <Box>
            <IconButton
              onClick={handleClick}
              size="small"
              aria-controls={open ? "account-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
            >
              <MoreHorizIcon />
            </IconButton>
          </Box>
          <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            PaperProps={{
              elevation: 0,
              sx: {
                overflow: "visible",
                filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                mt: 1.5,
                "& .MuiAvatar-root": {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
                "&:before": {
                  content: '""',
                  display: "block",
                  position: "absolute",
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: "background.paper",
                  transform: "translateY(-50%) rotate(45deg)",
                  zIndex: 0,
                },
              },
            }}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          >
            <MenuItem sx={{ fontSize: "14px" }} onClick={handleClose}>
              Today
            </MenuItem>
            <MenuItem sx={{ fontSize: "14px" }} onClick={handleClose}>
              Last 7 Days
            </MenuItem>
            <MenuItem sx={{ fontSize: "14px" }} onClick={handleClose}>
              Last Month
            </MenuItem>
            <MenuItem sx={{ fontSize: "14px" }} onClick={handleClose}>
              Last 12 Months
            </MenuItem>
            <MenuItem sx={{ fontSize: "14px" }} onClick={handleClose}>
              All Time
            </MenuItem>
          </Menu>
        </Box>

        <TableContainer
          component={Paper}
          sx={{
            boxShadow: "none",
            maxHeight: 440,
            backgroundColor: isDarkMode ? theme.palette.background.paper : 'inherit',
          }}
        >
          <Table 
            sx={{ minWidth: 650 }} 
            aria-label="custom pagination table"
            className={isDarkMode ? 'darkModeTable' : ''}
          >
            <TableHead sx={{ background: isDarkMode ? theme.palette.background.default : "#F7FAFF" }}>
              <TableRow>
                {rows?.tableHeader?.map((header, index) => (
                  <TableCell
                    key={index}
                    sx={{
                      borderBottom: `1px solid ${isDarkMode ? theme.palette.divider : '#EEF0F7'}`,
                      fontSize: "13.5px",
                      padding: "15px 10px",
                      fontWeight: 500,
                      color: isDarkMode ? theme.palette.text.primary : 'inherit',
                    }}
                  >
                    {header}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            <TableBody>
              {rows?.tableData && (rowsPerPage > 0
                ? rows.tableData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                : rows.tableData
              ).map((row, index) => (
                <TableRow key={index}>
                  <TableCell
                    sx={{
                      fontWeight: "500",
                      fontSize: "13px",
                      borderBottom: `1px solid ${isDarkMode ? theme.palette.divider : '#F7FAFF'}`,
                      padding: "10px",
                      color: isDarkMode ? theme.palette.text.primary : 'inherit',
                    }}
                  >
                    {row.RoleName}
                  </TableCell>
                  <TableCell
                    sx={{
                      borderBottom: `1px solid ${isDarkMode ? theme.palette.divider : '#F7FAFF'}`,
                      padding: "10px",
                      fontSize: "13px",
                      color: isDarkMode ? theme.palette.text.primary : 'inherit',
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <Box>
                        <Typography
                          sx={{
                            fontWeight: "500",
                            fontSize: "13px",
                            color: isDarkMode ? theme.palette.text.primary : 'inherit',
                          }}
                        >
                          {row.permissions}
                        </Typography>
                      </Box>
                      <Box>
                        <Typography
                          sx={{
                            fontWeight: "500",
                            fontSize: "13px",
                            color: isDarkMode ? theme.palette.text.secondary : "#5b5b98",
                          }}
                        ></Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell
                    sx={{
                      borderBottom: `1px solid ${isDarkMode ? theme.palette.divider : '#F7FAFF'}`,
                      padding: "10px",
                      fontSize: "13px",
                      color: isDarkMode ? theme.palette.text.primary : 'inherit',
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <Box>
                        <Typography
                          sx={{
                            fontWeight: "500",
                            fontSize: "13px",
                            color: isDarkMode ? theme.palette.text.primary : 'inherit',
                          }}
                        >
                          {row.users}
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}

              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell
                    colSpan={3}
                    style={{ borderBottom: `1px solid ${isDarkMode ? theme.palette.divider : '#F7FAFF'}` }}
                  />
                </TableRow>
              )}
            </TableBody>

            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                  colSpan={8}
                  count={rows?.tableData?.length || 0}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  SelectProps={{
                    inputProps: {
                      "aria-label": "rows per page",
                    },
                    native: true,
                  }}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  ActionsComponent={BrowserUsedTrafficReport}
                  style={{ 
                    borderBottom: "none", 
                    color: isDarkMode ? theme.palette.text.primary : 'inherit'
                  }}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      </Card>
    </>
  );
};

export default BrowserUsedTrafficReports;
