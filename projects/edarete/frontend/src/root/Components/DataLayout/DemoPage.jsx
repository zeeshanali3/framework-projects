import React, { useEffect, useState } from "react";
import {
  Box,
  TextField,
  Switch,
  FormControlLabel,
  MenuItem,
  Typography,
} from "@mui/material";
import ParentComp from "./ParentComp";
import { data, appearance, config } from "./props";
import CustomCard from "./CustomCard";
/* For Local Sided */

export default function DemoPage() {
  // State to hold the props for the ParentComp
  const [viewMode, setViewMode] = useState("grid");
  const [entriesInRow, setEntriesInRow] = useState(2);
  const [headColor, setHeadColor] = useState("#e5e5e5");
  const [buttonEnable, setButtonEnable] = useState(true);
  const [appBarColor, setAppBarColor] = useState("#2F317D");
  const [buttonColor, setButtonColor] = useState("#818093");
  const [checkBoxEnable, setCheckBoxEnable] = useState(false);
  const [headTextColor, setHeadTextColor] = useState("#260143");
  const [buttonVarient, setButtonVarient] = useState("contained");
  const [buttonTextColor, setButtonTextColor] = useState("#ffffff");
  const [appBarTextColor, setAppBarTextColor] = useState("#ffffff");
  const [actionButtonsEnable, setactionButtonsEnable] = useState(true);
  
  useEffect(() => {
    // Make sure config and appearance are properly updated with the latest state values
    if (data?.features?.grid && appearance?.grid?.header && appearance?.grid?.button) {
      data.features.grid["actionButtonEnable"] = actionButtonsEnable ?? false; // Default to false if undefined
      data.features.grid["buttonEnable"] = buttonEnable ?? false;
      data.features.grid["checkBoxEnable"] = checkBoxEnable ?? false;
      data.features.grid["entitiesPerRow"] = entriesInRow ?? 1; // Default to 1 if undefined
    
      appearance["appBarColor"] = appBarColor ?? "defaultColor"; // Default color if undefined
      appearance["appBarTextColor"] = appBarTextColor ?? "defaultTextColor";
      appearance.grid.header["headColor"] = headColor ?? "defaultHeaderColor";
      appearance.grid.header["headTextColor"] = headTextColor ?? "defaultHeaderTextColor";
      appearance.grid.button["buttonColor"] = buttonColor ?? "defaultButtonColor";
      appearance.grid.button["buttonTextColor"] = buttonTextColor ?? "defaultButtonTextColor";
      appearance.grid.button["buttonVarient"] = buttonVarient ?? "defaultVariant";
    }
    
  }, [
    actionButtonsEnable,
    appBarColor,
    appBarTextColor,
    buttonEnable,
    checkBoxEnable,
    headColor,
    headTextColor,
    entriesInRow,
    buttonColor,
    buttonTextColor,
    buttonVarient
  ]);

  return (
    <Box display="flex" flexDirection="column">
      {/* ParentComp will render dynamically based on the below controls */}
      <Box mb={4}>
        <ParentComp
          CustomCard={CustomCard}
          data={data}
          config={config}
          appearance={appearance}
        />
      </Box>

      {/* Control Panel */}
      <Typography variant="h5" gutterBottom>
        Control Panel
      </Typography>
      <Box
        display="grid"
        gridTemplateColumns="repeat(auto-fit, minmax(200px, 1fr))"
        gap={3}
      >
        <TextField
          label="App Bar Color"
          type="color"
          value={appBarColor}
          onChange={(e) => setAppBarColor(e.target.value)}
        />

        <TextField
          label="App Bar Text Color"
          type="color"
          value={appBarTextColor}
          onChange={(e) => setAppBarTextColor(e.target.value)}
        />

        <TextField
          label="Button Color"
          type="color"
          value={buttonColor}
          onChange={(e) => setButtonColor(e.target.value)}
        />

        <TextField
          label="Grid Button Text Color"
          type="color"
          value={buttonTextColor}
          onChange={(e) => setButtonTextColor(e.target.value)}
        />

        <FormControlLabel
          control={
            <Switch
              checked={buttonEnable}
              onChange={(e) => setButtonEnable(e.target.checked)}
            />
          }
          label="Enable Buttons"
        />

        <FormControlLabel
          control={
            <Switch
              checked={checkBoxEnable}
              onChange={(e) => setCheckBoxEnable(e.target.checked)}
            />
          }
          label="Enable Checkboxes"
        />

        <TextField
          label="Entries in Row"
          type="number"
          value={entriesInRow}
          onChange={(e) => setEntriesInRow(Math.max(1, Number(e.target.value)))}
        />

        <TextField
          label="Button Variant"
          select
          value={buttonVarient}
          onChange={(e) => setButtonVarient(e.target.value)}
        >
          <MenuItem value="contained">Contained</MenuItem>
          <MenuItem value="outlined">Outlined</MenuItem>
          <MenuItem value="text">Text</MenuItem>
        </TextField>

        <TextField
          label="Head Color"
          type="color"
          value={headColor}
          onChange={(e) => setHeadColor(e.target.value)}
        />

        <TextField
          label="Head Text Color"
          type="color"
          value={headTextColor}
          onChange={(e) => setHeadTextColor(e.target.value)}
        />

        <FormControlLabel
          control={
            <Switch
              checked={actionButtonsEnable}
              onChange={(e) => setactionButtonsEnable(e.target.checked)}
            />
          }
          label="Enable Action Buttons"
        />

        <TextField
          label="View Mode"
          select
          value={viewMode}
          onChange={(e) => setViewMode(e.target.value)}
        >
          <MenuItem value="grid">Grid</MenuItem>
          <MenuItem value="table">Table</MenuItem>
        </TextField>
      </Box>
    </Box>
  );
}
