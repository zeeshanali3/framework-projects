// AttachmentsSection.jsx
import React from 'react';
import { Box, Typography } from "@mui/material";
import FileIconComponent from "../custom/FileIcon";

const AttachmentsSection = ({ attachments }) => {

  return (
    <Box className="attachments-section m-3">
      <Typography variant="h6" className="text-black">
        Attachments:
      </Typography>
      <ol>
        {attachments?.map((attachment, aIndex) => (
          <li key={aIndex}>
            <a
              href={attachment.Download_url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="mt- mb-4">
                <FileIconComponent
                  fileUrl={attachment.Download_url}
                  FileName={attachment.FileName}
                />
              </div>
            </a>
            {!attachment.FileName && (
              <a
                href={attachment.Download_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Typography variant="body2" className="text-gray"
                sx={{
                  whiteSpace: 'pre-wrap', 
                  overflowWrap: 'break-word', 
                  wordBreak: 'break-word', 
                }}>
                  {attachment.Download_url}
                </Typography>
              </a>
            )}
          </li>
        ))}
      </ol>
    </Box>
  );
};

export default AttachmentsSection;
