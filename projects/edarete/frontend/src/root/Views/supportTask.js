// src/components/SupportBubble.js
import React, { useState, useEffect } from 'react';
import { Box, IconButton, Drawer, TextField, Button, Typography, List, ListItem, ListItemText,LinearProgress, ListItemSecondaryAction } from '@mui/material';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import AttachmentIcon from '@mui/icons-material/Attachment';
import CloseIcon from '@mui/icons-material/Close';
import { useSelector } from "react-redux";
import axios from 'axios';
import Constants from "../redux/Constant"
import { toast, ToastContainer } from "react-toastify";

const SupportBubble = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { loginData } = useSelector((state) => state.LOGINREDUCER);
  const [isLoading, setIsLoading] = useState(false); 
  const [email, setEmail] = useState('');
  const [formData, setFormData] = useState({
    description: '',
    attachments: null,
    priority: '',
    email: email,
  })
  useEffect(() => {
    const Email = Array.isArray(loginData?.payload?.userData) && loginData.payload.userData.length > 0
      ? loginData.payload.userData[0]?.Email || ''
      : ''
    setEmail(Email)
    setFormData({ ...formData, email: Email });
  }
    , [loginData]);



  console.log("SupportBubble Attachment", formData.email);

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      setFormData({ ...formData, attachments: e.target.files });
    }
  };

  const handleSubmit = () => {
    setIsLoading(true);
    // Create a FormData object
    const formDataRequest = new FormData();

    // Append fields to FormData
    formDataRequest.append('email', formData.email);
    formDataRequest.append('priority', formData.priority === "Low" ? 4 : formData.priority === "Normal" ? 3 : formData.priority==="High"? 2:formData.priority==="Urgent"?1:3);
    formDataRequest.append('description', formData.description);
    formDataRequest.append('department', 'Support');
    formDataRequest.append('text', formData.description);

    // Append files if any
    if (formData.attachments) {
      for (let i = 0; i < formData.attachments.length; i++) {
        if (formDataRequest.files) {
          formDataRequest.files.append('files', formData.attachments[i]);
        }
        else { formDataRequest.append('files', formData.attachments[i]); }
      }
    }

    axios({
      method: 'POST',
      url: Constants.supportIssue,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      data: formDataRequest,
    })
      .then(response => {
        console.log('Success:', response);
        toast.success(response.data.message);
        setIsOpen(false);
        setFormData({
          description: '',
          attachments: null,
          priority: '',
          email: email,
        });
      })
      .catch((error) => { 
        console.error('Error:', error);
        toast.error(error.response.data.message);
      })
      .finally(() => { 
        setIsLoading(false);
      });
    console.log(formData);

  };

  const handleRemoveFile = (index) => {
    // Create a new FileList without the removed file
    const updatedFiles = Array.from(formData.attachments).filter((_, i) => i !== index);
    setFormData({ ...formData, attachments: updatedFiles.length ? updatedFiles : null });
  };
  return (
    <>
    {isLoading && (
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent black for dimming
          zIndex: 1200, // Higher than drawer's zIndex to cover it
        }}
      />
    )}
    <Box>
      <IconButton
        color="primary"
        onClick={handleToggle}
        sx={{
          height: 60,
          width: 60,
          position: 'fixed',
          bottom: 16,
          right: 16,
          zIndex: 1300,
          backgroundColor: '#1976d2',
          color: '#fff',
          '&:hover': {
            backgroundColor: '#115293',
          },
        }}
      >
        <SupportAgentIcon sx={{
          fontSize: 30,
        }} />
      </IconButton>
      <Drawer anchor="right" open={isOpen} onClose={handleToggle} 
        
      >
        <Box sx={{ width: 300, padding: 2 }}>
          <Typography variant="h6" sx={{ color: "#1976d2" }} gutterBottom >
            Support Request
          </Typography>
          <TextField
            label="Email"
            name="email"
            fullWidth
            margin="normal"
            value={formData.email}
            onChange={handleChange}
          />
          <TextField
            label="Priority"
            name="priority"
            fullWidth
            margin="normal"
            value={formData.priority}
            onChange={handleChange}
            select
            SelectProps={{
              native: true,
            }}
          >
            <option value=""></option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
            <option value="Urgent">Urgent</option>
          </TextField>
          <TextField
            label="Description"
            name="description"
            fullWidth
            margin="normal"
            multiline
            rows={4}
            value={formData.description}
            onChange={handleChange}
          />
          <Button
            variant="outlined"
            component="label"
            startIcon={<AttachmentIcon />}
            sx={{ marginY: 1, color: "#1976d2" }}
          >
            Upload Attachment
            <input
              type="file"
              hidden
              onChange={handleFileChange}
              multiple // Allows selecting multiple files
            />
          </Button>

          {/* Display selected file names */}
          {formData.attachments && formData.attachments.length > 0 && (
            <List>
              {Array.from(formData.attachments).map((file, index) => (
                <ListItem key={index}>
                  <ListItemText primary={file.name} />
                  <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="delete" onClick={() => handleRemoveFile(index)}>
                      <CloseIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
          )}

<Button
  variant="contained"
  fullWidth
  sx={{
    marginTop:"10px",
    backgroundColor: '#1976d2',
    color: '#fff',
    height:"30px",
    position:"relative",
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    '&:hover': {
      backgroundColor: '#115293',
    },
  }}
  onClick={handleSubmit}
  disabled={isLoading} // Disable the button when loading
>
  {/* Box container to handle the absolute positioning of the progress bar */}
  {isLoading ? (
    <Box sx={{ position: 'relative', width: '100%' }}>
<LinearProgress
  sx={{
    '& .MuiLinearProgress-bar': {
      backgroundColor: '#1976d2',
    },
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 4,
    borderRadius: 1,
  }}
/>

    </Box>
  ) : (
    "Submit" // Button text when not loading
  )}
</Button>
        </Box>
      </Drawer>

    </Box>
    <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />

    </>
  );
};

export default SupportBubble;
