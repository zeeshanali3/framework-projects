import  React, {  useState,useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import pdfIcon from '../../assets/images/pdf.png';
import wordIcon from '../../assets/images/word.png';
import excel from '../../assets/images/excel_.png';
import ppt from '../../assets/images/pptx.png';
import zip from '../../assets/images/zipFile.png';
import defaultIcon from '../../assets/images/defaultIcon.png';


const FilePreviewComponent = ({ fileUrl, FileName }) => {
  console.log("FileUrl:::",FileName)

  const [overlay, setOverlay] = useState(false);
  const [fileExtension,setFileExtension]=useState('');
  useEffect(() => {
    if(FileName){
      setFileExtension(FileName.split('.').pop().toLowerCase());
    }
},[FileName])
  function getFileIcon() {
    switch (fileExtension) {
      case 'pdf':
        return pdfIcon;
      case 'doc':
        return wordIcon;
      case 'docx':
        return wordIcon;
      case 'xls':
        return excel;
      case 'xlsx':
        return excel;
      case 'ppt':
        return ppt;
      case 'pptx':
        return ppt;
      case 'zip':
        return zip
      default:
        return defaultIcon;

    }
  } 
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        if(overlay)
          {
            setOverlay(false); 
          }
        }
    };

    // Add event listener for keydown
    window.addEventListener('keydown', handleKeyDown);

    // Clean up event listener on component unmount
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <>
    { FileName && ( <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          mb: '8px',
          border: "0.0625rem solid rgb(218, 220, 224)",
          borderRadius: '10px',
          width: 'auto',
          maxWidth: '400px',
          cursor: 'pointer',
          ':hover': {
            boxShadow: 'rgba(0, 0, 0, 0.3) 3px 3px 4px',
          }
        }}
        onClick={() =>!overlay? setOverlay(true):setOverlay(false)}
      >
        <img src={getFileIcon()} alt="File Icon" style={{ width: '55px', height: '65px', padding: '10px' }} />
        <Typography
          sx={{
            color: "black",
            fontFamily: "'Google Sans', Roboto, Arial, sans-serif",
            fontSize: "16px",
            fontWeight: "500",
            paddingRight: "5px",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            maxWidth: "100%"
          }}
        >
          {FileName}
        </Typography>
        {overlay && (
          <Box
            sx={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundColor: 'rgba(0, 0, 0, 0.7)',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              zIndex: 999
            }}
            onClick={() => setOverlay(false)}
          >
            <iframe
              src={`https://drive.google.com/viewerng/viewer?embedded=true&url=${encodeURIComponent(fileUrl)}`}
              style={{
                width: '50%',
                height: '100%',
                border: "none",
                background:"transparent"
              }}
            />
          </Box>

        )}
      </Box>
)}
    </>

  );
};

export default FilePreviewComponent;
