import React, { useState, useRef } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  CircularProgress,
} from "@mui/material";
import { CloudUpload } from "@mui/icons-material";
import * as XLSX from "xlsx";
import { getServerResponse } from "../../Helpers/getServerResponse";
import { showSuccessToast, showErrorToast } from "../../../Common/ToastUtils";

const ImportRowAction = ({
  open,
  onClose,
  rowData,
  importAction,
  parameters,
  onSuccess,
  onFailure,
}) => {
  const [file, setFile] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef(null);

  // Validate configuration when modal opens
  React.useEffect(() => {
    if (open) {
      console.log("=== Import Row Action Debug ===");
      console.log("1. Modal opened:", open);
      console.log("2. rowData:", rowData);
      console.log("3. importAction:", importAction);
      console.log("4. importAction.serverCommunication:", importAction?.serverCommunication);
      console.log("5. importAction.importConfig:", importAction?.importConfig);
      console.log("6. parameters:", parameters);
      console.log("===============================");
      
      if (!importAction) {
        console.error("ImportAction is undefined!");
        showErrorToast("Import configuration is missing");
        onClose();
        return;
      }
      
      if (!importAction.serverCommunication && !importAction.importConfig) {
        console.error("No serverCommunication or importConfig found!");
        showErrorToast("Import API configuration is missing");
        onClose();
      }
    }
  }, [open, importAction]);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleImport = async () => {
    if (!file) {
      showErrorToast("Please select a file first");
      return;
    }

    setIsProcessing(true);

    const reader = new FileReader();
    reader.onload = async (e) => {
      // Use setTimeout to defer processing and prevent blocking
      setTimeout(() => {
        processFileData(e.target.result, file.name);
      }, 0);
    };

    reader.onerror = () => {
      setIsProcessing(false);
      const error = new Error("Failed to read the file. Please try again.");
      console.error("Error reading file:", error);
      onFailure(error);
      showErrorToast(error.message);
    };

    reader.readAsBinaryString(file);
  };

  const processFileData = async (fileContent, fileName) => {
    let jsonData = [];

    try {
      // Parse file based on type
      if (fileName.endsWith(".csv")) {
        const rows = fileContent
          .split("\n")
          .map((row) => row.split(","))
          .filter((row) => row.length > 1 || row.some((cell) => cell.trim() !== ""));

        if (rows.length < 2) {
          throw new Error("CSV file does not contain enough data (requires headers and at least one row).");
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
        throw new Error("Unsupported file format. Please upload a CSV or Excel file.");
      }
    } catch (err) {
      const errorMessage = err instanceof Error 
        ? err.message 
        : "Invalid file format or unreadable file.";
      console.error("Parse error:", errorMessage);
      onFailure(new Error(errorMessage));
      showErrorToast(errorMessage);
      setIsProcessing(false);
      return;
    }

    const headers = jsonData[0];
    const rows = jsonData.slice(1);

    // Get server communication config
    const serverCommunication = importAction?.serverCommunication || 
                                importAction?.importConfig?.serverCommunication;

    const sendRawData = serverCommunication?.sendRawData || 
                       serverCommunication?.skipValidation || 
                       false;

    console.log("Import Mode:", sendRawData ? "RAW (no validation)" : "VALIDATED (parameter matching)");
    console.log("File has", headers.length, "columns:", headers);
    console.log("File has", rows.length, "data rows");

    let dataObjects = [];

    try {
      if (sendRawData) {
        // RAW MODE: Send all columns from file without validation
        console.log("Using RAW mode - sending all columns without validation");
        
        // Validate row lengths
        const invalidRowIndex = rows.findIndex((row) => row.length < headers.length);
        if (invalidRowIndex !== -1) {
          throw new Error(
            `Row ${invalidRowIndex + 2} has ${rows[invalidRowIndex].length} columns, expected ${headers.length} columns to match headers.`
          );
        }

        // Convert to dataObjects - use ALL columns
        dataObjects = rows.map((row) => {
          const obj = {};
          headers.forEach((header, index) => {
            const headerKey = header?.toString().trim() || `column_${index}`;
            const value = row[index];
            obj[headerKey] = value != null ? value.toString().trim() : "";
          });
          return obj;
        });

        console.log("Using all", headers.length, "columns from file");
      } else {
        // VALIDATED MODE: Match columns with parameters
        console.log("Using VALIDATED mode - matching columns with configured parameters");
        
        const validParameters = Array.isArray(parameters) ? parameters : [];
        const parametersList = validParameters.filter((h) => h?.visible !== false);
        
        if (!parametersList.length) {
          throw new Error("No visible columns configured for import.");
        }

        const paramHeaders = parametersList.filter(Boolean).map((param) => ({
          label: param.displayName || param.label || param.name,
          key: param.dynamicKey,
        }));

        console.log("Configuration expects", paramHeaders.length, "columns:", paramHeaders.map(h => h.label));
        
        // Validate header count
        if (headers.length < paramHeaders.length) {
          throw new Error(
            `Insufficient columns: Expected at least ${paramHeaders.length} columns (${paramHeaders.map(h => h.label).join(', ')}), but found only ${headers.length} columns in file.`
          );
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
        
        // Check for missing required columns
        const matchedKeys = Object.values(labelToKeyMap);
        const unmatchedParams = paramHeaders.filter((h) => !matchedKeys.includes(h.key));
        
        if (unmatchedParams.length > 0) {
          console.warn("Some configured columns not found in file:", unmatchedParams.map(h => h.label));
          
          const missingRequired = unmatchedParams.filter(param => 
            parametersList.find(p => p.dynamicKey === param.key)?.required
          );
          
          if (missingRequired.length > 0) {
            throw new Error(
              `Missing required columns in file: ${missingRequired.map(h => h.label).join(", ")}. Please ensure your file has all required columns.`
            );
          }
        }

        // Validate required fields are not empty
        const requiredColumns = parametersList.filter((param) => param.required);

        const emptyRequiredValueRowIndex = rows.findIndex((row) =>
          requiredColumns.some((param) => {
            const colIndex = headers.findIndex(
              (h) => h?.trim()?.toLowerCase() === (param.label || param.name)?.trim()?.toLowerCase()
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
                (h) => h?.trim()?.toLowerCase() === (param.label || param.name)?.trim()?.toLowerCase()
              );
              return (
                colIndex === -1 ||
                rows[emptyRequiredValueRowIndex][colIndex] == null ||
                rows[emptyRequiredValueRowIndex][colIndex].toString().trim() === ""
              );
            })
            .map((p) => p.label || p.name);
          
          throw new Error(
            `Entry #${entryNumber} (row ${spreadsheetRow}): Missing required field(s): ${missingFields.join(', ')}. Please complete all required fields.`
          );
        }

        // Convert to dataObjects using mapped keys
        dataObjects = rows.map((row) => {
          const obj = {};
          Object.entries(labelToKeyMap).forEach(([colIndex, key]) => {
            const value = row[colIndex];
            obj[key] = value != null ? value.toString().trim() : "";
          });
          return obj;
        });

        console.log("Using", Object.keys(labelToKeyMap).length, "matched columns with dynamicKeys");
      }

      // Send to server
      await sendToServer(dataObjects, serverCommunication);
      
      onSuccess(`Successfully imported ${dataObjects.length} record(s) for row ${rowData.id}`);
      resetState();
    } catch (error) {
      console.error("Processing error:", error);
      const errorMessage = error instanceof Error ? error.message : "Failed to process import data.";
      onFailure(new Error(errorMessage));
      showErrorToast(errorMessage);
    } finally {
      setIsProcessing(false);
    }
  };

  const sendToServer = async (dataObjects, serverCommunication) => {
    if (!serverCommunication) {
      throw new Error("No server communication configuration found. Please check the import action configuration.");
    }

    if (!serverCommunication.apiUrl) {
      throw new Error("Import API URL is not configured");
    }

    // Get the key name from configuration or use default
    const bodyKey = serverCommunication.objectArrayKey || 'objectArrayKey';

    // Clone and update the configuration
    const config = {
      apiActionType: serverCommunication.apiActionType || "Create",
      requestType: serverCommunication.requestType || "POST",
      apiUrl: serverCommunication.apiUrl,
      body: {
        ...(serverCommunication.body || {}),
        [bodyKey]: dataObjects,
        // Add row ID to associate import with specific row
        parentId: rowData.id,
        parentRowData: rowData,
      },
      onSuccess: serverCommunication.onSuccess,
      onFailure: serverCommunication.onFailure,
    };

    console.log("=== FINAL API PAYLOAD FOR ROW IMPORT ===");
    console.log("1. Importing for row:", rowData.id);
    console.log("2. API URL:", config.apiUrl);
    console.log("3. Request Type:", config.requestType);
    console.log("4. Body Key Used:", bodyKey);
    console.log("5. Data array length:", config.body[bodyKey]?.length);
    console.log("6. Data is Array?:", Array.isArray(config.body[bodyKey]));
    console.log("7. First 2 records:", JSON.stringify(config.body[bodyKey]?.slice(0, 2), null, 2));
    console.log("8. Parent ID:", config.body.parentId);
    console.log("========================================");

    await getServerResponse(config, `?id=${rowData.id}`);
  };

  const resetState = () => {
    setFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleClose = () => {
    resetState();
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        Import Data for Row #{rowData?.id}
        {!importAction?.serverCommunication && !importAction?.importConfig && (
          <Typography variant="caption" color="error" display="block">
            Warning: Import configuration is missing
          </Typography>
        )}
      </DialogTitle>
      <DialogContent>
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
            onClick={() => fileInputRef.current?.click()}
            disabled={isProcessing || (!importAction?.serverCommunication && !importAction?.importConfig)}
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
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} disabled={isProcessing}>
          Cancel
        </Button>
        <Button
          onClick={handleImport}
          variant="contained"
          disabled={!file || isProcessing || (!importAction?.serverCommunication && !importAction?.importConfig)}
          startIcon={isProcessing ? <CircularProgress size={20} /> : null}
        >
          {isProcessing ? "Importing..." : "Import"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ImportRowAction;
