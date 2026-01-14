import React, { useState, useEffect } from "react";
import { Modal, Box, Typography } from "@mui/material"; // Import Material UI Modal and Box
import JPG from "../../assets/images/jpg.png";
import PDF from "../../assets/images/pdf.png";
import TXT from "../../assets/images/txt.png";
import VIDEO from "../../assets/images/mp4.png";
import DEFAULT from "../../assets/images/defaultIcon.png";
import FolderOffRoundedIcon from "@mui/icons-material/FolderOffRounded";
import DocumentsFiles from "./DocumentsFiles";
const FileExplorer = ({ fileName, objectName }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const json = require("../Utils/" + fileName + ".js");
  const files = json.data[objectName] ?? [];
  useEffect(() => {
    if (files.length === 1) {
      setSelectedFile(files[0]);
      setIsModalOpen(true);
    }
    else{
      setSelectedFile(null);
      setIsModalOpen(false);
    }
  }, [files]);

  // Handle file click to set the selected file and open the modal
  const handleFileClick = (file) => {
    setSelectedFile(file);
    setIsModalOpen(true);
  };

  // Close the modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // Render the content of the selected file
  const renderFileContent = () => {
    if (!selectedFile) return null;

    switch (selectedFile.type) {
      case "pdf":
        return (
          <embed
            src={selectedFile.path}
            type="application/pdf"
            width="100%"
            height="800px"
          />
        );
      case "txt":
        return <iframe src={selectedFile.path} width="100%" height="600px" />;
      case "image":
        return (
          <img
            src={selectedFile.path}
            alt="Selected"
            style={{ width: "100%" }}
          />
        );
      case "video":
        return (
          <video width="100%" height="100%" controls>
            <source src={selectedFile.path} type="video/mp4" />
          </video>
        );
      default:
        return (
          <div>
            <p>
              File preview is not available. Click below to download the file.
            </p>
            <a href={selectedFile.path} download>
              <button>Download File</button>
            </a>
          </div>
        );
    }
  };

  return (
    <div>
      {files.length === 0 ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh", // Ensures the content is centered vertically
            textAlign: "center",
            marginTop: "-100px",
            color: "grey",
          }}
        >
          <FolderOffRoundedIcon sx={{ fontSize: 100, mb: 2, color: "red" }} />
          <Typography variant="h6" sx={{ fontSize: 20 }}>
            Empty Folder
          </Typography>
        </Box>
      ) : (
        files.length > 1 && (
          <DocumentsFiles FilesData={files} selectedFile={handleFileClick}/>
        )
      )}
      {files.length > 1 ? (
        <Modal open={isModalOpen} onClose={handleCloseModal}>
        
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "90%",
              maxHeight: "90%",
              bgcolor: "background.paper",
              boxShadow: 24,
              p: 1,
              overflow: "auto",
            }}
          >
            {renderFileContent()}
          </Box>
        </Modal>
      ) : (
        <Box
          sx={{
            position: "absolute",
            width: "90%",
            maxHeight: "90%",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 1,
            overflow: "auto",
          }}
        >
          {renderFileContent()}
        </Box>
      )}
    </div>
  );
};

// Function to return an appropriate icon based on file type
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

export default FileExplorer;
