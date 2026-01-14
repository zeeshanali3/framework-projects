import React from "react";
import { Box, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import JPG from "../../assets/images/jpg.png";
import PDF from "../../assets/images/pdf.png";
import TXT from "../../assets/images/txt.png";
import VIDEO from "../../assets/images/media.png";
import DEFAULT from "../../assets/images/defaultIcon.png";

// const FilesData = [
//   {
//     id: "1",
//     icon: "/images/file1.png",
//     title: "sketch-design.zip",
//   },
//   {
//     id: "2",
//     icon: "/images/file2.png",
//     title: "Compile.png",
//   },
//   {
//     id: "3",
//     icon: "/images/file3.png",
//     title: "Integrations.pdf",
//   },
//   {
//     id: "4",
//     icon: "/images/file4.png",
//     title: "contact @32",
//   },
//   {
//     id: "5",
//     icon: "/images/file5.png",
//     title: "app-Design.doc",
//   },
//   {
//     id: "6",
//     icon: "/images/file6.png",
//     title: "image02.png",
//   },
//   {
//     id: "7",
//     icon: "/images/file7.png",
//     title: "Ubold-sketch.doc",
//   },
//   {
//     id: "8",
//     icon: "/images/file8.png",
//     title: "Annualreport.txt",
//   },
//   {
//     id: "9",
//     icon: "/images/file9.png",
//     title: "Wireframes.xl4",
//   },
//   {
//     id: "10",
//     icon: "/images/file10.png",
//     title: "contact @32.jpg",
//   },
//   {
//     id: "11",
//     icon: "/images/file1.png",
//     title: "sketch-design.zip",
//   },
//   {
//     id: "12",
//     icon: "/images/file2.png",
//     title: "Compile.png",
//   },
//   {
//     id: "13",
//     icon: "/images/file3.png",
//     title: "Integrations.pdf",
//   },
//   {
//     id: "14",
//     icon: "/images/file4.png",
//     title: "contact @32",
//   },
//   {
//     id: "15",
//     icon: "/images/file5.png",
//     title: "app-Design.doc",
//   },
//   {
//     id: "16",
//     icon: "/images/file6.png",
//     title: "image02.png",
//   },
//   {
//     id: "17",
//     icon: "/images/file7.png",
//     title: "Ubold-sketch.doc",
//   },
//   {
//     id: "18",
//     icon: "/images/file8.png",
//     title: "Annualreport.txt",
//   },
//   {
//     id: "19",
//     icon: "/images/file9.png",
//     title: "Wireframes.xl4",
//   },
//   {
//     id: "20",
//     icon: "/images/file10.png",
//     title: "contact @32.jpg",
//   },
//   {
//     id: "21",
//     icon: "/images/file5.png",
//     title: "app-Design.doc",
//   },
//   {
//     id: "22",
//     icon: "/images/file6.png",
//     title: "image02.png",
//   },
//   {
//     id: "23",
//     icon: "/images/file7.png",
//     title: "Ubold-sketch.doc",
//   },
//   {
//     id: "24",
//     icon: "/images/file8.png",
//     title: "Annualreport.txt",
//   },
// ];

const DocumentsFiles = ({ FilesData, selectedFile }) => {
  
  return (
    <>
      <Card
        sx={{
          boxShadow: "none",
          borderRadius: "10px",
          mb: "15px",
          backgroundColor: "transparent",
        }}
      >
        <Grid
          container
          rowSpacing={1}
          columnSpacing={{ xs: 1, sm: 1, md: 1, lg: 1, xl: 2 }}
        >
          {FilesData.map((file) => (
            <Grid item xs={12} sm={6} md={6} lg={4} xl={2} key={file.id}>
              <Box
                sx={{
                  backgroundColor: "white",
                  borderRadius: "10px",
                  padding: "20px 5px",
                  textAlign: "center",
                  boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
                  height: "100%",
                }}
                onClick={() => selectedFile(file)}
                className="dark-BG-101010"
              >
                <img
                  src={getFileIcon(file.type)}
                  alt="Icon"
                  width="56px"
                  height="56px"
                  style={{
                    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.3)",
                    borderRadius: "8px", // Optional: adds rounded corners
                  }}
                />
                <Typography mt={1} fontWeight="500" fontSize="13px">
                  {file.name}
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    m: "20px",
                    mb: "0px",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: "1rem",
                      color: "#333",
                      fontFamily: "Arial, sans-serif",
                      textShadow: "1px 1px 2px rgba(0, 0, 0, 0.2)",
                    }}
                  >
                    {file.type || "pdf"}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "0.875rem",
                      color: "#555",
                      fontFamily: "Arial, sans-serif",
                      textShadow: "1px 1px 2px rgba(0, 0, 0, 0.1)",
                      marginTop: "8px",
                    }}
                  >
                    {file.filesSize || "200kb"}
                  </Typography>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Card>
    </>
  );
};
const getFileIcon = (type) => {
  switch (type) {
    case "image":
      return JPG;
    case "pdf":
      return PDF;
    case "video":
      return VIDEO;
    case "txt":
      return TXT;
    default:
      return DEFAULT;
  }
};

export default DocumentsFiles;
