import React from "react";
import { useLocation } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Card,
  Box,
  Typography,
} from "@mui/material";
import {
  Email as EmailIcon,
  Male as MaleIcon,
  Fingerprint as FingerprintIcon,
  LocalPhone as LocalPhoneIcon,
  FamilyRestroom as FamilyRestroomIcon,
  Directions as DirectionsIcon,
  Bloodtype as BloodtypeIcon,
  Cake as CakeIcon,
  VpnKey as KeyIcon,
  Church as ReligionIcon,
} from "@mui/icons-material";
const tablecellSX = {
  borderBottom: "1px solid #F7FAFF",
  fontSize: "15px",
  padding: "15px 10px",
  color: "black",
};
const UserDetails = () => {
  const location = useLocation();
  const user = location.state?.user;
  console.log("User Details:", user);

  const iconMap = {
    users_email: EmailIcon,
    users_phoneNo: LocalPhoneIcon,
    users_address: DirectionsIcon,
    users_gender: MaleIcon,
    users_cnic: FingerprintIcon,
    users_fatherName: FamilyRestroomIcon,
    users_dateOfBirth: CakeIcon,
    users_religion: ReligionIcon,
    BloodGroup: BloodtypeIcon,
    Role: KeyIcon,
  };

  const labelMap = {
    users_email: "Email",
    users_phoneNo: "Phone",
    users_address: "Address",
    users_gender: "Gender",
    users_cnic: "CNIC",
    users_fatherName: "Father's Name",
    users_dateOfBirth: "Date of Birth",
    users_religion: "Religion",
    BloodGroup: "Blood Group",
    Role: "Role",
  };

  const renderUserInfo = (label, value) => {
    const Icon = iconMap[label];
    const displayLabel = labelMap[label] || label;
    if (!Icon) return null;
    return (
      <TableRow key={label} p={1}>
        <TableCell sx={tablecellSX}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Icon />
            <Box
              sx={{
                ml: 2,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {displayLabel}
            </Box>
          </Box>
        </TableCell>
        <TableCell sx={tablecellSX}>
          <Box
            sx={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {value}
          </Box>
        </TableCell>
      </TableRow>
    );
  };

  return (
    <Card
      sx={{
        boxShadow: "none",
        borderRadius: "10px",
        p: "25px",
        mb: "15px",
      }}
    >
      <Box>
        <Box
          sx={{
            display: "flex",
            borderTopLeftRadius: "10px",
            borderTopRightRadius: "10px",
            px: 2,
            width: "100%",
          }}
        >
          <Box
            sx={{
              textAlign: { xs: "left", sm: "center" },
            }}
          >
            <Typography
              sx={{
                fontFamily: "Poppins",
                fontWeight: "bold",
                pb: 2,
                textAlign: "left",
                fontSize: 26,
                color: "#5B5B98",
              }}
            >
              {user?.users_firstName}&nbsp;{user?.users_lastName}
            </Typography>
          </Box>
        </Box>

        <TableContainer component={Paper}>
          <Table>
            <TableBody>
              {Object.entries(user || {}).map(([label, value]) =>
                renderUserInfo(label, value)
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Card>
  );
};

export default UserDetails;
