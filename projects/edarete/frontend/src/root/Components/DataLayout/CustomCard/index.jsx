import React from "react";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import MailOutlineIcon from "@mui/icons-material/MailOutline";

const Page = ({ data, config, appearance }) => {
  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center", // Centers content horizontally
        textAlign: "center",
        boxShadow: "none",
        borderRadius: "10px",
        p: "20px 15px",
        mb: "15px",
        height: "100%",
      }}
    >
      {/* Centered Image */}
      <img
        src={data.image}
        alt="Member"
        width="148px"
        height="148px"
        style={{ borderRadius: "50%" }} // Circular image
      />
      
      {/* Member Name */}
      <Typography
        variant="h4"
        sx={{
          fontSize: 16,
          fontWeight: 500,
          mt: "10px",
          color:
            appearance?.colaborator?.colaboratorAppearance?.find(
              (f) => f.type === "nameColor"
            )?.color || "",
        }}
      >
        {data.name}
      </Typography>

      {/* Member Role and Description */}
      <Typography
        variant="h4"
        sx={{
          fontSize: 13,
          fontWeight: "bold",
          mb: 1,
          color:
            appearance?.colaborator?.colaboratorAppearance?.find(
              (f) => f.type === "roleColor"
            )?.color || "",
        }}
      >
        {data.role}:{" "}
        <span
          style={{
            fontWeight: "normal",
            color:
              appearance?.colaborator?.colaboratorAppearance?.find(
                (f) => f.type === "descriptionColor"
              )?.color || "",
          }}
        >
          {data.description}
        </span>
      </Typography>

      {/* Email */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          mt: "30px",
        }}
      >
        <MailOutlineIcon
          sx={{
            color: "#A9A9C8",
            mb: "3px",
          }}
        />
        <Typography
          fontWeight="500"
          fontSize="13px"
          sx={{
            color:
              appearance?.colaborator?.colaboratorAppearance?.find(
                (f) => f.type === "emailColor"
              )?.color || "",
          }}
        >
          {data.email}
        </Typography>
      </Box>
    </Card>
  );
};

export default Page;
