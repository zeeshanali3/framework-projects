import * as React from "react";
import { Box, Typography } from "@mui/material";
import Card from "@mui/material/Card";
import FileIcon from "../../custom/FileIcon";

export default function LectureContent({ LectureContent }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  console.log("Lecture Content:::",LectureContent)

  return (
    <>
      {LectureContent && (<Card
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
              justifyContent: "space-between",
              alignItems: "center",
            }}
            mb={2}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
            </Box>

            <Box>
              <Typography fontSize="20px">
                {new Date(LectureContent.Posted_Date).toLocaleDateString('en-GB')}
              </Typography>
            </Box>
          </Box>

          <Box>
            <Typography variant="h6" gutterBottom fontSize="14px">
              {LectureContent.ComponentName + " " + LectureContent.SubComponentNum}
            </Typography>

            <div style={{ position: 'relative', textAlign: 'center' }}>
              <div
                style={{
                  borderTop: '2px solid #000', // Top line
                  marginBottom: '8px',          // Space between line and Typography
                }}
              />
              <Typography mb={2} lineHeight="26px">
                Instructions
              </Typography>
            </div>


            <Typography mb={2} lineHeight="40px">
              <span dangerouslySetInnerHTML={{ __html: LectureContent.Text }} />
            </Typography>
           {LectureContent?.attachments[0].Download_url!==null && ( <div style={{ position: 'relative', textAlign: 'center' }}>
              <div
                style={{
                  borderTop: '2px solid #000', // Top line
                  marginBottom: '8px',          // Space between line and Typography
                }}
              />
              <Typography mb={2} lineHeight="26px">
                Attachments
              </Typography>
            </div>)}
            {LectureContent?.attachments && LectureContent?.attachments?.map((attachment, index) => (
              <FileIcon fileUrl={attachment.Download_url} FileName={attachment.FileName} />
            ))}


          </Box>
        </Box>
      </Card>)}
    </>
  );
}
