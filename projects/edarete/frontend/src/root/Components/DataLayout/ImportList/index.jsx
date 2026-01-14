import React, { useState, useRef } from "react";
import { 
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Box,
  CircularProgress
} from "@mui/material";
import * as XLSX from "xlsx";
import { FileDownload, CloudUpload } from "@mui/icons-material";
import { getServerResponse } from "../../Helpers/getServerResponse";
import PropTypes from "prop-types";

const ImportFunction = ({
  parameters,
  color,
  speedDial,
  addSagaCommunication,
  params = '',
  rowData = null,
  open = false,
  onClose = null,
  onSuccess = (message) => console.log(message),
  onFailure = (error) => console.error(error),
}) => {
  const [file, setFile] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef(null);
  // console.log("Import Config:", addSagaCommunication.parameters.steps[0].parameters.fields[0].childFields);  
  const validParameters = Array.isArray(parameters) ? parameters : Array.isArray(addSagaCommunication.parameters.steps[0].parameters.fields[0].childFields) ? addSagaCommunication.parameters.steps[0].parameters.fields[0].childFields : [];
  const isDisabled =  !addSagaCommunication;
  const isModal = !!onClose; // Determine if used as modal

  // Handle file input change
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      if (!isModal) {
        // Auto-import for button mode
        handleFileImport(selectedFile);
      }
    }
  };

  // Handle file import and read it
  const handleFileImport = (fileToImport) => {
    const importFile = fileToImport || file;
    
    if (!importFile) {
      onFailure(new Error("Please select a file first."));
      return;
    }
  console.log("Starting import for file:", validParameters);
    // if (!validParameters.length) {
    //   onFailure(new Error("No parameters defined for import. Please configure import settings."));
    //   return;
    // }

    if (!addSagaCommunication) {
      onFailure(new Error("Import configuration is missing. Please contact support."));
      return;
    }

    setIsProcessing(true);

    const reader = new FileReader();

    reader.onload = (e) => {
      setTimeout(() => {
        processFileData(e.target.result, importFile.name);
      }, 0);
    };

    reader.onerror = (error) => {
      console.error("Error reading file:", error);
      setIsProcessing(false);
      onFailure(new Error("Failed to read the file. Please try again."));
    };

    reader.readAsBinaryString(importFile);
  };

  // Separate function for processing file data (moved outside to avoid blocking)
  const processFileData = (fileContent, fileName) => {
    let jsonData = [];

    try {
      if (fileName.endsWith(".csv")) {
        const text = fileContent;
          const rows = text
            .split("\n")
            .map((row) => row.split(","))
            .filter(
              (row) => row.length > 1 || row.some((cell) => cell.trim() !== "")
            );

          if (rows.length < 2) {
            throw new Error(
              "CSV file does not contain enough data (requires headers and at least one row)."
            );
          }

          jsonData = rows;
        } else if (fileName.endsWith(".xls") || fileName.endsWith(".xlsx")) {
          const workbook = XLSX.read(fileContent, { type: "binary" });

          if (!workbook.SheetNames?.length) {
            throw new Error("Excel file does not contain any sheets.");
          }

          const sheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[sheetName];

          jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

          if (!Array.isArray(jsonData) || jsonData.length < 2) {
            throw new Error("Excel file is empty or missing data rows.");
          }
        } else {
          const error = "Unsupported file format. Please upload a CSV or Excel file.";
          onFailure(new Error(error));
          throw new Error(error);
        }
      } catch (err) {
        const errorMessage = err instanceof Error 
          ? err.message 
          : "Invalid file format or unreadable file.";
        onFailure(new Error(errorMessage));
        return;
      }

    

      const headers = jsonData[0];
      const rows = jsonData.slice(1);

      // Check if we should send raw CSV data or validate against parameters
      const sendRawData = addSagaCommunication?.sendRawData || addSagaCommunication?.skipValidation || false;
      
      console.log("Import Mode:", sendRawData ? "RAW (no validation)" : "VALIDATED (parameter matching)");
      console.log("CSV file has", headers.length, "columns:", headers);
      console.log("CSV file has", rows.length, "data rows");

      let dataObjects = [];

      if (sendRawData) {
        // RAW MODE: Send all columns from CSV without validation
        console.log("Using RAW mode - sending all CSV columns without validation");
        
        // Validate row lengths - they should match the header length
        const invalidRowIndex = rows.findIndex(
          (row) => row.length < headers.length
        );
        if (invalidRowIndex !== -1) {
          const error = `Row ${invalidRowIndex + 2} has ${rows[invalidRowIndex].length} columns, expected ${headers.length} columns to match headers.`;
          console.error(error);
          onFailure(new Error(error));
          return;
        }

        // Convert to dataObjects - use ALL columns from CSV file
        dataObjects = rows.map((row, rowIndex) => {
          const obj = {};
          headers.forEach((header, index) => {
            // Use the actual header from CSV as the key
            const headerKey = header?.toString().trim() || `column_${index}`;
            const value = row[index];
            obj[headerKey] = value != null ? value.toString().trim() : "";
          });
          return obj;
        });

        console.log("Using all", headers.length, "columns from CSV file");
        console.log("Column names:", headers);
      } else {
        // VALIDATED MODE: Match columns with parameters and validate
        console.log("Using VALIDATED mode - matching columns with configured parameters");
        
        const parametersList = validParameters.filter((h) => h?.visible !== false);
        if (!parametersList.length) {
          const error = "No visible columns configured for import.";
          onFailure(new Error(error));
          return;
        }

        const paramHeaders = parametersList.filter(Boolean).map((param) => ({
          label: param.displayName || param.label || param.name,
          key: param.dynamicKey,
        }));

        console.log("Configuration expects", paramHeaders.length, "columns:", paramHeaders.map(h => h.label));
        
        // Validate header count
        if (headers.length < paramHeaders.length) {
          const error = `Insufficient columns: Expected at least ${paramHeaders.length} columns (${paramHeaders.map(h => h.label).join(', ')}), but found only ${headers.length} columns in file.`;
          console.error("Header length mismatch:", error);
          onFailure(new Error(error));
          return;
        }

        // Map headers to dynamic keys
        const labelToKeyMap = {};
        paramHeaders.forEach(({ label, key }) => {
          const index = headers.findIndex(
            (h) => h?.trim()?.toLowerCase() === label?.trim()?.toLowerCase()
          );
          if (index !== -1) {
            labelToKeyMap[index] = key;
          }
        });

        console.log("Matched columns:", Object.keys(labelToKeyMap).length, "out of", paramHeaders.length);
        
        // Check if we found all required parameter columns
        const matchedKeys = Object.values(labelToKeyMap);
        const unmatchedParams = paramHeaders.filter((h) => !matchedKeys.includes(h.key));
        
        if (unmatchedParams.length > 0) {
          console.warn("Some configured columns not found in file:", unmatchedParams.map(h => h.label));
          // Only error if required columns are missing
          const missingRequired = unmatchedParams.filter(param => 
            parametersList.find(p => p.dynamicKey === param.key)?.required
          );
          
          if (missingRequired.length > 0) {
            const error = `Missing required columns in file: ${missingRequired.map(h => h.label).join(", ")}. Please ensure your file has all required columns.`;
            console.error(error);
            onFailure(new Error(error));
            return;
          }
        }

        // Validate that no cell is empty for required columns
        const requiredColumns = parametersList.filter((param) => param.required);

        const emptyRequiredValueRowIndex = rows.findIndex((row) =>
          requiredColumns.some((param) => {
            const colIndex = headers.findIndex(
              (h) =>
                h?.trim()?.toLowerCase() ===
                (param.label || param.name)?.trim()?.toLowerCase()
            );
            return (
              colIndex === -1 ||
              row[colIndex] == null ||
              row[colIndex].toString().trim() === ""
            );
          })
        );

        if (emptyRequiredValueRowIndex !== -1) {
          const spreadsheetRow = emptyRequiredValueRowIndex + 2;
          const entryNumber = emptyRequiredValueRowIndex + 1;
          const missingFields = requiredColumns
            .filter((param) => {
              const colIndex = headers.findIndex(
                (h) =>
                  h?.trim()?.toLowerCase() ===
                  (param.label || param.name)?.trim()?.toLowerCase()
              );
              return (
                colIndex === -1 ||
                rows[emptyRequiredValueRowIndex][colIndex] == null ||
                rows[emptyRequiredValueRowIndex][colIndex].toString().trim() === ""
              );
            })
            .map((p) => p.label || p.name);
          
          const error = `Entry #${entryNumber} (row ${spreadsheetRow}): Missing required field(s): ${missingFields.join(', ')}. Please complete all required fields.`;
          console.error(error);
          onFailure(new Error(error));
          return;
        }

        // Convert to dataObjects using mapped keys
        dataObjects = rows.map((row, rowIndex) => {
          const obj = {};
          Object.entries(labelToKeyMap).forEach(([colIndex, key]) => {
            const value = row[colIndex];
            obj[key] = value != null ? value.toString().trim() : "";
          });
          return obj;
        });

        console.log("Using", Object.keys(labelToKeyMap).length, "matched columns with dynamicKeys");
      }

      console.log("=== PREPARING API REQUEST ===");
      console.log("1. Total records to import:", dataObjects.length);
      console.log("2. Sample data (first 3 records):", dataObjects.slice(0, 3));
      console.log("3. Original addSagaCommunication:", JSON.parse(JSON.stringify(addSagaCommunication)));

      // Handle server communication
      try {
        if (!addSagaCommunication.body) {
          addSagaCommunication.body = {};
        }
        
        // Get the key name from configuration or use default
        const bodyKey = addSagaCommunication.objectArrayKey || 'objectArrayKey';
        addSagaCommunication.body[bodyKey] = dataObjects;
        
        console.log("=== FINAL API PAYLOAD ===");
        console.log("4. API URL:", addSagaCommunication.apiUrl);
        console.log("5. Request Type:", addSagaCommunication.requestType);
        console.log("6. Body Key Used:", bodyKey);
        console.log("7. Full body:", addSagaCommunication.body);
        console.log("8. Data array length:", addSagaCommunication.body[bodyKey]?.length);
        console.log("9. Data is Array?:", Array.isArray(addSagaCommunication.body[bodyKey]));
        console.log("10. First 2 records structure:", JSON.stringify(addSagaCommunication.body[bodyKey]?.slice(0, 2), null, 2));
        console.log("11. Complete addSagaCommunication:", JSON.parse(JSON.stringify(addSagaCommunication)));
        console.log("================================");
        
        getServerResponse(addSagaCommunication,params);
        onSuccess(`Successfully imported ${dataObjects.length} record(s)!`);
      } catch (error) {
        console.error("=== API ERROR ===", error);
        const errorMessage = error instanceof Error 
          ? error.message 
          : "Failed to process import data.";
        onFailure(new Error(errorMessage));
      }
  };

  const processParsedData = (rows) => {
    if (!rows || rows.length < 2) {
      onFailure("Imported file has no valid data.");
      return;
    }

    

    const headers = rows[0];
    const updatedHeaders = headers.map((header) => {
      const param = parameters.find((param) => param.label === header);
      if (!param) console.warn(`Header "${header}" not found in parameters.`);
      return param?.dynamicKey || header;
    });



    const dataObjects = rows.slice(1).map((row) => {
      const obj = {};
      row.forEach((cell, index) => {
        obj[updatedHeaders[index]] = cell;
      });
      return obj;
    });

  

    if (addSagaCommunication) {
      const updatedPayload = {
        ...addSagaCommunication,
        body: {
          ...(addSagaCommunication.body || {}),
          import_users: dataObjects,
        },
      };

      getServerResponse(updatedPayload,params);
      onSuccess("File imported and data processed successfully!");
    }
  };

  const resetState = () => {
    setFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleClose = () => {
    resetState();
    setIsProcessing(false);
    if (onClose) onClose();
  };

  const triggerFileInput = () => {
    if (isDisabled) {
      onFailure(new Error("Import is not configured properly. Please check your settings."));
      return;
    }
    fileInputRef.current.click();
  };

  // Render as modal dialog
  if (isModal) {
    return (
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>
          Import Data {rowData && `for Row #${rowData.id}`}
        </DialogTitle>
        <DialogContent>
          {isDisabled ? (
            <Box sx={{ textAlign: "center", py: 3 }}>
              <Typography variant="body1" color="error" gutterBottom>
                Import Configuration Missing
              </Typography>
              <Typography variant="body2" color="text.secondary">
                The import action is not properly configured. Please ensure:
              </Typography>
              <Box component="ul" sx={{ textAlign: "left", mt: 2, pl: 4 }}>
                <li>
                  <Typography variant="body2">
                    Row action has <code>serverCommunication</code> property
                  </Typography>
                </li>
                <li>
                  <Typography variant="body2">
                    API URL is configured in the server communication
                  </Typography>
                </li>
                <li>
                  <Typography variant="body2">
                    Parameters are defined for data mapping
                  </Typography>
                </li>
              </Box>
            </Box>
          ) : (
            <Box sx={{ textAlign: "center", py: 3 }}>
              <input
                ref={fileInputRef}
                accept=".xlsx, .xls, .csv"
                type="file"
                onChange={handleFileChange}
                style={{ display: "none" }}
              />
              <Button
                variant="outlined"
                startIcon={<CloudUpload />}
                onClick={triggerFileInput}
                disabled={isProcessing}
                sx={{ mb: 2 }}
              >
                Choose File
              </Button>
              {file && (
                <Typography variant="body2" color="textSecondary">
                  Selected: {file.name}
                </Typography>
              )}
              <Typography variant="caption" display="block" sx={{ mt: 2 }}>
                Supported formats: CSV, XLS, XLSX
              </Typography>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} disabled={isProcessing}>
            {isDisabled ? "Close" : "Cancel"}
          </Button>
          {!isDisabled && (
            <Button
              onClick={() => handleFileImport()}
              variant="contained"
              disabled={!file || isProcessing}
              startIcon={isProcessing ? <CircularProgress size={20} /> : null}
            >
              {isProcessing ? "Importing..." : "Import"}
            </Button>
          )}
        </DialogActions>
      </Dialog>
    );
  }

  // Render as button (original behavior)
  return (
    <>
      <input
        ref={fileInputRef}
        accept=".xlsx, .xls, .csv"
        type="file"
        onChange={handleFileChange}
        style={{ marginBottom: 10, display: "none" }}
        disabled={isDisabled}
      />
      <Button
        onClick={triggerFileInput}
        disabled={isDisabled}
        sx={{
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
          color: color,
          gap: speedDial ? 1 : 0,
          opacity: isDisabled ? 0.5 : 1,
          "&:hover": {
            backgroundColor: "transparent",
            color: color,
          },
        }}
        title={isDisabled ? "Import not configured" : "Click to import file"}
      >
        {speedDial && "Import"} <FileDownload sx={{ fontSize: 20 }} />
      </Button> 
    </>
  );
};

ImportFunction.propTypes = {
  parameters: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      name: PropTypes.string,
      displayName: PropTypes.string,
      dynamicKey: PropTypes.string,
      visible: PropTypes.bool,
      required: PropTypes.bool,
    })
  ).isRequired,
  color: PropTypes.string,
  speedDial: PropTypes.bool,
  addSagaCommunication: PropTypes.shape({
    body: PropTypes.object,
  }),
  params: PropTypes.string,
  rowData: PropTypes.object,
  open: PropTypes.bool,
  onClose: PropTypes.func,
  onSuccess: PropTypes.func,
  onFailure: PropTypes.func,
};

export default ImportFunction;
