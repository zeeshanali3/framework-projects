import React, { useState } from "react";
import { Button, Menu, MenuItem, Fade } from "@mui/material";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import * as XLSX from "xlsx";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";
import Papa from "papaparse";
import PropTypes from "prop-types";

import FileUploadIcon from "@mui/icons-material/FileUpload";
const ExportDropdown = ({
  headers,
  data,
  color,
  speedDial,
  buttonColor = "default",
  formats = ["PDF", "Excel", "CSV", "Download Format"],
  includeHeaders = true,
  onSuccess = (message) => console.log(message),
  onFailure = (error) => console.error(error), // Default function
  onAction = () => console.log("Export action triggered"),
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  // Validate and ensure headers is an array
  const validHeaders = Array.isArray(headers) ? headers : [];
  const validData = Array.isArray(data) ? data : [];

  // console.log("ExportDropdown props:", { 
  //   headers: validHeaders, 
  //   data: validData, 
  //   originalHeaders: headers,
  //   originalData: data 
  // });

  const handleExportClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleExportClose = () => {
    setAnchorEl(null);
  };

  const executeExport = async (exportFunction, format) => {
    try {
      // Validate data before export
      if (!validHeaders.length) {
        throw new Error("No headers available for export. Please provide a valid headers array.");
      }
      if (!validData.length) {
        throw new Error("No data available for export. Please provide valid data array.");
      }
      
      await exportFunction();
      onSuccess(`Export to ${format} successful!`);
    } catch (e) {
      if (typeof onFailure === "function") {
        onFailure(`Export to ${format} failed: ${e.message}`);
      } else {
        console.error("onFailure is not a function:", onFailure);
      }
    }
  };
  // const downloadFormatExcel = () => {
  //     console.log("downloadFormatExcel Headers: ",headers)
  //     const exportHeaders = headers?.reduce((acc, header) => {
  //         if (header?.visible) acc[header?.label] = "";
  //         return acc;
  //     }, {});

  //     const worksheet = XLSX.utils.json_to_sheet([exportHeaders]); // Create sheet with only headers
  //     const workbook = XLSX.utils.book_new();
  //     XLSX.utils.book_append_sheet(workbook, worksheet, "Format");
  //     XLSX.writeFile(workbook, "format.xlsx");
  // };
  const downloadFormatExcel = async () => {
    const generateSampleData = (header) => {
      if (header?.type === "select" && header?.options?.length > 0) {
        return header?.options[0]?.label; // Default first option
      } else if (header?.type === "date") {
        return new Date().toISOString().split("T")[0]; // YYYY-MM-DD
      } else if (header?.type === "dateTime") {
        return new Date().toISOString().replace("T", " ").split(".")[0]; // YYYY-MM-DD HH:MM:SS
      } else if (header?.type === "time") {
        return new Date().toTimeString().split(" ")[0]; // HH:MM:SS
      } else if (header?.type === "checkbox") {
        return "TRUE"; // Excel recognizes TRUE/FALSE
      } else {
        return `Sample ${header?.label}`;
      }
    };

    // Create a new Excel workbook
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Format");
    const dropdownSheet = workbook.addWorksheet("Dropdowns"); // Store dropdown options

    // Add headers
    worksheet.addRow(validHeaders.map((header) => header.label));

    // Add one sample row
    worksheet.addRow(validHeaders.map(generateSampleData));

    // Create a map to store named ranges for dropdowns
    const namedRanges = {};

    validHeaders.forEach((header, colIndex) => {
      const column = worksheet.getColumn(colIndex + 1);

      if (header?.type === "select" && header?.options?.length > 0) {
        // Create a named range for dropdown values
        const dropdownOptions = header.options.map((opt) => opt.label);
        const dropdownStartRow = dropdownSheet.rowCount + 1;

        dropdownOptions.forEach((option) => {
          dropdownSheet.addRow([option]);
        });

        const dropdownEndRow = dropdownSheet.rowCount;
        const rangeName = `Dropdown_${colIndex}`;

        namedRanges[
          rangeName
        ] = `Dropdowns!$A$${dropdownStartRow}:$A$${dropdownEndRow}`;
        workbook.definedNames.add(rangeName, namedRanges[rangeName]);

        column.eachCell((cell, rowNumber) => {
          if (rowNumber > 1) {
            // Apply validation to rows below header
            cell.dataValidation = {
              type: "list",
              allowBlank: true,
              formula1: rangeName,
              showErrorMessage: true,
              errorTitle: "Invalid Selection",
              error: `Please select a valid option for ${header.label}.`,
            };
          }
        });
      } else if (header?.type === "date" || header?.type === "dateTime") {
        column.eachCell((cell, rowNumber) => {
          if (rowNumber > 1) {
            cell.dataValidation = {
              type: "date",
              operator: "greaterThan",
              formula1: "1900-01-01", // Ensures date selection
              showErrorMessage: true,
              errorTitle: "Invalid Date",
              error: `Please select a valid date for ${header.label}.`,
            };
          }
        });
      } else if (header?.type === "checkbox") {
        column.eachCell((cell, rowNumber) => {
          if (rowNumber > 1) {
            cell.dataValidation = {
              type: "list",
              allowBlank: true,
              formula1: '"TRUE,FALSE"',
              showErrorMessage: true,
              errorTitle: "Invalid Selection",
              error: `Please select TRUE or FALSE for ${header.label}.`,
            };
          }
        });
      }
    });

    // Generate and download the Excel file
    workbook.xlsx
      .writeBuffer()
      .then((buffer) => {
        const blob = new Blob([buffer], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });
        saveAs(blob, "format.xlsx");
        
      })
      .catch((err) => {
        console.error("Error exporting Excel file:", err);
      });
  };
  const exportToPDF = () => {
    const doc = new jsPDF();
    const visibleHeaders = validHeaders.filter((h) => h?.visible !== false);
    if (!visibleHeaders?.length || !validData?.length) {
      throw new Error("No data or visible columns to export.");
    }

    const columns = includeHeaders
      ? visibleHeaders.map((header) => header.label)
      : [];
    const rows = validData.map((row) =>
      visibleHeaders.map((header) => row[header.dynamicKey] || "")
    );

    doc.text("Exported Data", 10, 10);
    doc.autoTable({
      head: includeHeaders ? [columns] : undefined,
      body: rows,
      startY: 20,
    });
    doc.save("exported_data.pdf");
  };

  const exportToExcel = () => {
    const visibleHeaders = validHeaders.filter((h) => h?.visible !== false);
    if (!visibleHeaders?.length || !validData?.length) {
      throw new Error("No data or visible columns to export.");
    }
    const exportData = validData.map((row) => {
      let obj = {};
      visibleHeaders.forEach((header) => {
        obj[header.label] = row[header.dynamicKey] || "";
      });
      return obj;
    });
    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Exported Data");
    XLSX.writeFile(workbook, "exported_data.xlsx");
  };

  const exportToCSV = () => {
    const visibleHeaders = validHeaders.filter((h) => h?.visible !== false);
    if (!visibleHeaders?.length || !validData?.length) {
      throw new Error("No data or visible columns to export.");
    }

    const exportData = validData.map((row) => {
      let obj = {};
      visibleHeaders.forEach((header) => {
        obj[header.label] = row[header.dynamicKey] || "";
      });
      return obj;
    });

    const csv = Papa.unparse(exportData, { header: includeHeaders });
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.setAttribute("download", "exported_data.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleMenuItemClick = async (format) => {
    onAction(`Export to ${format} action triggered`);

    switch (format) {
      case "PDF":
        await executeExport(exportToPDF, "PDF");
        break;
      case "Excel":
        await executeExport(exportToExcel, "Excel");
        break;
      case "CSV":
        await executeExport(exportToCSV, "CSV");
        break;
      case "Download Format":
        await executeExport(downloadFormatExcel, "Download Format");
        break;
      default:
        console.log(`${format} export is not implemented`);
        break;
    }

    handleExportClose();
  };

  // Disable button if no valid headers or data
  const isDisabled = !validHeaders.length || !validData.length;

  return (
    <>
      <Button
        color={color}
        onClick={handleExportClick}
        disabled={isDisabled}
        sx={{
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
          gap: speedDial ? 1 : 0,
          "&:hover": {
            backgroundColor: "transparent",
            color: buttonColor,
          },
        }}
        title={isDisabled ? "No data available for export" : "Export data"}
      >
        {speedDial && "Export"} <FileUploadIcon sx={{ fontSize: 20 }} />
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleExportClose}
        TransitionComponent={Fade}
      >
        {formats?.map((format) => (
          <MenuItem key={format} onClick={() => handleMenuItemClick(format)}>
            Export to {format}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

ExportDropdown.propTypes = {
  headers: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      dynamicKey: PropTypes.string,
      visible: PropTypes.bool,
      type: PropTypes.string,
      options: PropTypes.array,
    })
  ).isRequired,
  data: PropTypes.array.isRequired,
  color: PropTypes.string,
  speedDial: PropTypes.bool,
  buttonColor: PropTypes.string,
  formats: PropTypes.array,
  includeHeaders: PropTypes.bool,
  onSuccess: PropTypes.func,
  onFailure: PropTypes.func,
  onAction: PropTypes.func,
};

export default ExportDropdown;
