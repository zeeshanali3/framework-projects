import React, { Fragment, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  Typography,
  IconButton,
  Card,
  List,
  ListItem,
  Fade,
  useTheme,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import { useDropzone } from "react-dropzone";
import {
  handleFileChange,
  handleRemoveFile,
  handleRemoveAllFiles,
  initializeFieldValues,
  checkDependancy,
} from "./HelperFunctions";
import { getServerResponse } from "../../Helpers/getServerResponse";
import serverCommunicationHelper from "../../DataLayout/constants/serverCommunicationHelper";
import { showErrorToast, showSuccessToast } from "../../../Common/ToastUtils";

// File icon helper
const getFileIcon = (file) => {
  if (!file || !file.name) return "/images/file1.png";
  const ext = file.name.split(".").pop()?.toLowerCase();
  const icons = {
    pdf: "/images/file3.png",
    txt: "/images/file4.png",
    jpg: "/images/file1.png",
    jpeg: "/images/file10.png",
    sql: "/images/file12.png",
    js: "/images/js.png",
    mp4: "/images/file13.png",
    docx: "/images/file5.png",
    pptx: "/images/file11.png",
    png: "/images/file2.png",
    xlsx: "/images/file9.png",
    xl4: "/images/file9.png",
  };
  return icons[ext] || "/images/file1.png";
};

// FileList Component
const FileList = ({
  isMultiple,
  files,
  onRemoveFile,
  onRemoveAll,
  height,
  width,
  themeTokens,
}) => {
  const fileList = files || [];

  if (fileList.length === 1) {
    const file = fileList[0];
    return (
      <Box
        sx={{
          width: "100%",
          height: "100%",
          borderRadius: "12px",
          margin: "0 auto",
          overflow: "hidden",
          mb: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: themeTokens?.fileItemBackground,
        }}
      >
        <IconButton
          onClick={() => onRemoveFile(file)}
          sx={{
            position: "absolute",
            width: 32,
            height: 32,
            top: "13%",
            right: 8,
            zIndex: 2,
            backgroundColor: themeTokens?.fileItemBackground,
            color: themeTokens?.removeButtonBackground,
            "&:hover": {
              color: themeTokens?.removeButtonHover,
              backgroundColor: themeTokens?.fileItemBackground,
            },
          }}
        >
          <ClearIcon fontSize="small" />
        </IconButton>

        <Box sx={{ p: 2 }}>
          <Box
            sx={{
              width: "100%",
              height: height * 0.8,
              borderRadius: "12px",
              overflow: "hidden",
              mb: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: themeTokens?.fileImageBackground,
            }}
          >
            {file?.type?.startsWith("image") ? (
              <img
                alt={file.name}
                src={URL.createObjectURL(file)}
                width="100%"
                height="100%"
                style={{ objectFit: "cover" }}
                onLoad={(e) => URL.revokeObjectURL(e.target.src)}
              />
            ) : (
              <img
                src={getFileIcon(file)}
                alt="file icon"
                width={60}
                height={60}
                style={{ objectFit: "contain" }}
              />
            )}
          </Box>
          <Typography
            sx={{
              fontWeight: 600,
              fontSize: "1rem",
              color: themeTokens?.fileNameColor,
              textAlign: "center",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {file.name}
          </Typography>
        </Box>
      </Box>
    );
  }

  // Multi-file layout
  return (
    <Fragment>
      <List sx={{ width: "100%" }}>
        {fileList.map((file, index) => (
          <Fade in key={index}>
            <ListItem
              sx={{
                backdropFilter: "blur(10px)",
                backgroundColor: themeTokens?.fileItemBackground,
                borderRadius: "16px",
                boxShadow: themeTokens?.listItemShadow,
                justifyContent: "space-between",
                alignItems: "center",
                padding: "16px",
                mt: 2,
                transition: "all 0.3s ease",
                "&:hover": { transform: "scale(1.01)" },
              }}
            >
              <Box display="flex" alignItems="center" gap={2}>
                <Box
                  sx={{
                    width: 52,
                    height: 52,
                    overflow: "hidden",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {file?.type?.startsWith("image") ? (
                    <img
                      alt={file.name}
                      src={URL.createObjectURL(file)}
                      width="100%"
                      height="100%"
                      style={{ objectFit: "cover" }}
                      onLoad={(e) => URL.revokeObjectURL(e.target.src)}
                    />
                  ) : (
                    <img
                      src={getFileIcon(file)}
                      alt="file icon"
                      width={width}
                      height={height}
                      style={{ objectFit: "contain" }}
                    />
                  )}
                </Box>
                <Typography
                  sx={{
                    fontWeight: 600,
                    fontSize: "1rem",
                    color: themeTokens?.fileNameColor,
                    maxWidth: 260,
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {file.name}
                </Typography>
              </Box>

              <IconButton
                onClick={() => onRemoveFile(file)}
                sx={{
                  color: themeTokens?.removeButtonBackground,
                  transition: "0.3s",
                  "&:hover": {
                    color: themeTokens?.removeButtonHover,
                    transform: "scale(1.2)",
                  },
                }}
              >
                <ClearIcon fontSize="medium" />
              </IconButton>
            </ListItem>
          </Fade>
        ))}
      </List>

      {isMultiple && fileList.length > 1 && (
        <Box mt={3} textAlign="right">
          <Button
            variant="contained"
            onClick={onRemoveAll}
            sx={{
              borderRadius: "10px",
              background: themeTokens?.removeButtonBackground,
              textTransform: "capitalize",
              px: 4,
              py: 1.5,
              fontWeight: 600,
              fontSize: "0.95rem",
              color: themeTokens?.removeButtonText,
              "&:hover": { background: themeTokens?.removeButtonHover },
            }}
          >
            Remove All Files
          </Button>
        </Box>
      )}
    </Fragment>
  );
};

// Main FileField Component
export default function FileField({
  field,
  errors,
  setErrors,
  formValues,
  setFormValues,
  currentStep,
  parentValues,
  fields,
  parentFields,
}) {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";
  const themeTokens = isDarkMode
    ? theme?.customTokens?.dark?.form?.field
    : theme?.customTokens?.light?.form?.field;
  const mainBackground = isDarkMode
    ? theme.palette.background.default
    : theme.palette.background.paper;

  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [imageSize, setImageSize] = useState({ width: 56, height: 150 });
  const isMultiple = field?.isMultiple || false;
  const getImageDimensions = (file) =>
    new Promise((resolve, reject) => {
      const img = new Image();
      const objectUrl = URL.createObjectURL(file);
      img.onload = () => {
        const width = img.naturalWidth;
        const height = img.naturalHeight;
        URL.revokeObjectURL(objectUrl);
        resolve({ width, height });
      };
      img.onerror = reject;
      img.src = objectUrl;
    });

  // STEP 1: Get upload URL from server
  const fetchFileUploadUrl = (acceptedFiles) => {
    if (!field?.fetchSubmitUrl) {
      showErrorToast("Developer Error: fetchSubmitUrl is missing in field props");
      return;
    }

    console.log('=== GETTING UPLOAD URL FROM SERVER ===');
    console.log('API URL:', field.fetchSubmitUrl);
    
    // Check if the URL looks like a backend API
    if (field.fetchSubmitUrl.includes('localhost:3000') || field.fetchSubmitUrl.includes('127.0.0.1:3000')) {
      showErrorToast("Error: fetchSubmitUrl seems to point to frontend instead of backend API");
      return;
    }

    const sagaCommunication = serverCommunicationHelper({
      parameters: [],
      apiUrl: field.fetchSubmitUrl,
      requestType: "GET",
      isFile: true,
      isEncrypted: false,
    });

    sagaCommunication.onSuccess = async (res) => {
      console.log('Upload URL response:', res);
      console.log('Response type:', typeof res);
      
      // Only try to parse as JSON if response is not from S3 PUT
      let parsedResponse = res;
      if (res && typeof res.json === 'function') {
        // Check for S3 response (no body, status 200, type 'cors')
        if (res.url && res.url.includes('amazonaws.com') && res.status === 200 && res.type === 'cors') {
          // S3 PUT success, do not parse as JSON
          parsedResponse = {};
        } else {
          try {
            parsedResponse = await res.json();
            console.log('Parsed JSON response:', parsedResponse);
          } catch (error) {
            console.error('Failed to parse response as JSON:', error);
            showErrorToast("Error: Failed to parse server response");
            return;
          }
        }
      }
      
      console.log('formValuess ::::', formValues);
      const attachmentId = parsedResponse?.payload?.attachmentId || parsedResponse?.attachmentId;
      const uploadUrl = parsedResponse?.payload?.uploadUrl || parsedResponse?.uploadUrl;
      const token = parsedResponse?.payload?.token || parsedResponse?.token;
      
      // Store attachmentId in form values immediately
      if (attachmentId && field?.dynamicKey) {
        console.log('Storing attachmentId in form values:', attachmentId);
        
        // Update form values directly to see the change immediately
        setFormValues((prevValues) => {
          const updatedValues = [...prevValues];
          const currentStepValues = { ...updatedValues[currentStep] };
          currentStepValues[field.dynamicKey] = attachmentId;
          updatedValues[currentStep] = currentStepValues;
          
          console.log('formValues after attachmentId update:', updatedValues);
          return updatedValues;
        });
        
        // Clear any errors for this field
        if (setErrors) {
          setErrors((prevErrors) => ({
            ...prevErrors,
            [field.dynamicKey]: null,
          }));
        }
      }
      if (uploadUrl) {
        console.log('Found upload URL:', uploadUrl);
        // STEP 2: Upload to S3 with received URL
        uploadToS3WithUrl(acceptedFiles, { 
          uploadUrl: uploadUrl,
          token: token,
          attachmentId: attachmentId,
          ...parsedResponse?.payload 
        });
      } else {
        console.error('No uploadUrl found in response:', parsedResponse);
        showErrorToast("Error: No upload URL received from server");
      }
    };

    sagaCommunication.onFailure = (error) => {
      showErrorToast("Error creating file upload URL: " + (error?.message || error?.payload));
    };

    // Extract file extension from the first selected file
    const fileExtension = acceptedFiles[0]?.name?.split('.').pop()?.toLowerCase() || 'bin';
    console.log('Detected file extension:', fileExtension);

    getServerResponse(sagaCommunication, fileExtension);
  };

  // STEP 3: Finalize upload after S3 success (or use token directly)
  const finalizeUpload = (uploadingInfo, file) => {
    console.log('=== FINALIZING UPLOAD ===');
    
    // If no finalize URL is provided, use the attachmentId directly (already set in form values)
    if (!field.finalizeUrl) {
      console.log('No finalize URL provided, attachmentId already set in form values:', uploadingInfo.attachmentId);
      showSuccessToast("File Uploaded Successfully!");
      // attachmentId is already in form values from the first API response
      // File is already in uploadedFiles state from onDrop, no need to add again
      return;
    }
    
    // Call backend to confirm upload and get attachment_id
    const sagaCommunication = serverCommunicationHelper({
      parameters: [],
      apiUrl: field.finalizeUrl,
      requestType: "POST",
      body: JSON.stringify({
        token: uploadingInfo.token,
        fileName: file.name,
        fileType: file.type,
        fileSize: file.size
      }),
      headers: {
        'Content-Type': 'application/json'
      },
      isEncrypted: false,
    });

    sagaCommunication.onSuccess = (res) => {
      console.log('Finalize response:', res);
      if (res?.attachment_id || res?.payload?.attachment_id) {
        showSuccessToast("File Uploaded Successfully!");
        handleFileChange(
          { target: { name: field.dynamicKey, files: res?.attachment_id || res?.payload?.attachment_id, multiple: false } },
          formValues,
          setFormValues,
          currentStep,
          setErrors
        );
        // File is already in uploadedFiles state from onDrop, no need to add again
      } else {
        showErrorToast("Error: attachment_id not returned from server.");
      }
    };

    sagaCommunication.onFailure = (error) => {
      showErrorToast("Error finalizing upload: " + (error?.message || error?.payload));
    };

    getServerResponse(sagaCommunication);
  };

  const  uploadToS3WithUrl = (acceptedFiles, uploadingInfo) => {
    console.log("=== UPLOADING TO S3 WITH URL ===");
    console.log("Upload URL:", uploadingInfo?.uploadUrl);
    console.log("Accepted Files:", acceptedFiles);

    if (!acceptedFiles || acceptedFiles.length === 0) {
      showErrorToast("No files selected for upload.");
      return;
    }

    const isSingleFile = acceptedFiles.length === 1;

    const buildSagaCommunication = (body, extraOptions = {}) =>
      serverCommunicationHelper({
        parameters: [],
        apiUrl: uploadingInfo?.uploadUrl,
        body,
        isEncrypted: false,
        useBaseURL: false,
        requestType: "PUT",
        isFile: true, // This tells SagaHelper not to try to parse response as JSON
        ...extraOptions,
      });

    if (isSingleFile) {
      const file = acceptedFiles[0];
      console.log("Uploading single file as binary:", file);

      const sagaCommunication = buildSagaCommunication(file, {
        headers: {
          "Content-Type": file.type
        },
      });

      sagaCommunication.onSuccess = (res) => {
        console.log("S3 Upload success response:", res);
        finalizeUpload(uploadingInfo, file);
      };

 

      getServerResponse(sagaCommunication);
    } else {
      const formData = new FormData();
      acceptedFiles.forEach((file) => {
        if (file instanceof File) {
          formData.append("file", file);
        } else {
          console.warn("Skipping non-File object:", file);
        }
      });

      for (let [key, value] of formData.entries()) {
        console.log(`${key} →`, value);
      }
      
      const sagaCommunication = serverCommunicationHelper({
        parameters: [],
        apiUrl: uploadingInfo?.uploadUrl,
        body: formData,
        isEncrypted: false,
        isFile: true,
        useBaseURL: false,
        requestType: "PUT",
        formData: true,
      });

      sagaCommunication.onSuccess = (res) => {
        console.log('S3 Upload success response:', res);
        if (res?.attachment_id || res?.attachments) {
          showSuccessToast("File(s) Uploaded Successfully!");
          console.log('S3 Upload success response with attachment_id:', res);
          handleFileChange(
            {
              target: {
                name: field.dynamicKey,
                files: res?.attachments || res.attachment_id,
                multiple: true,
              },
            },
            formValues,
            setFormValues,
            currentStep,
            setErrors
          );
          // Files are already in uploadedFiles state from onDrop, no need to add again
        } else {
          showErrorToast("Error: attachment_id not returned from server.");
        }
      };

      sagaCommunication.onFailure = (res) => {
        showErrorToast(
          "Unable to upload file: " + (res?.message || res?.payload)
        );
      };

      getServerResponse(sagaCommunication);
    }
  };


  const onDrop = async (acceptedFiles) => {
    if (!acceptedFiles?.length) return;
    
    // Immediately show selected files in UI
    setUploadedFiles((prev) => {
      if (isMultiple) {
        return [...prev, ...acceptedFiles];
      } else {
        return [acceptedFiles[0]];
      }
    });
    
    if (acceptedFiles.length === 1 && acceptedFiles[0].type.startsWith("image/")) {
      try {
        const { width, height } = await getImageDimensions(acceptedFiles[0]);
        setImageSize({ width, height });
      } catch (err) {
        console.error(err);
      }
    }
    
    // Start the two-step upload process
    fetchFileUploadUrl(acceptedFiles);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: isMultiple,
    disabled: field.disabled,
  });

  if (field.hidden) {
    initializeFieldValues(field, formValues[currentStep]);
    return null;
  }
  if (!checkDependancy(field, formValues, parentValues)) return null;
  initializeFieldValues(field, formValues[currentStep]);

  return (
    <FormControl key={field.name} fullWidth margin="normal">
      <Typography variant="subtitle1" fontWeight="600" color={themeTokens?.labelColor} mb={1}>
        {field.label}
      </Typography>

      <Card
        sx={{
          p: 2.5,
          mb: 2,
          borderRadius: "16px",
          border: `2px dashed ${themeTokens?.borderColor}`,
          backgroundColor: isDragActive ? themeTokens?.focusColor : mainBackground,
          transition: "all 0.3s ease-in-out",
        }}
      >
        {((!isMultiple && uploadedFiles?.length === 0) || isMultiple) && (
          <Box
            {...getRootProps()}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 1.5,
              textAlign: "center",
              py: 4,
              px: 2,
              cursor: "pointer",
            }}
          >
            <input {...getInputProps()} />
            <img
              src="/images/folder.png"
              alt="Upload Icon"
              width={48}
              height={48}
              style={{
                opacity: 1,
                filter: isDarkMode ? "brightness(0.7)" : "none",
              }}
            />
            <Typography variant="body1" fontWeight="500" color={themeTokens?.color}>
              {isDragActive ? "Drop the files here..." : "Click or drag files to upload"}
            </Typography>
          </Box>
        )}

        <FileList
          files={uploadedFiles}
          onRemoveFile={(file) =>
            handleRemoveFile(file, setUploadedFiles, uploadedFiles, field, formValues, setFormValues, currentStep, setErrors)
          }
          onRemoveAll={() =>
            handleRemoveAllFiles(uploadedFiles, setUploadedFiles, field, formValues, setFormValues, currentStep, setErrors)
          }
          isMultiple={isMultiple}
          height={imageSize.height}
          width={imageSize.width}
          themeTokens={themeTokens}
        />
      </Card>
      {errors?.[field.dynamicKey] && (
        <Typography color="error" fontSize="0.875rem" mt={1}>
          {errors[field.dynamicKey]}
        </Typography>
      )}
    </FormControl>
  );
}
