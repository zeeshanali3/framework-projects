import React from "react";
import Card from "@mui/material/Card";
import { Typography, Grid, useMediaQuery, useTheme, Box } from "@mui/material";
import { renderFields, checkDependancy } from "./HelperFunctions";

export default function SectionField({
  serverMode,
  field,
  inputFields,
  formValues,
  isRequired,
  isReadOnly,
  setFormValues,
  allTagValues,
  setAllTagValues,
  currentStep,
  errors,
  setErrors,
  variant,
  formKeys,
  setFormKeys,
  parentValues,
  fields,
  parentFields,
  config,
  multiColumn,
  isListOfSections,
  appearance,
}) {
  
  const theme = useTheme();


  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm")); // Phones
  const isTabletOrSmaller = useMediaQuery(theme.breakpoints.down("md")); // Tablets and smaller

  if (!checkDependancy(field, formValues, parentValues)) {
    return null;
  }

  const renderChildFields = (childFields) => {
    // Collapse to single column for small screens or if it's a list of sections on tablet or smaller
    const collapseToSingleColumn =
      isSmallScreen || (isListOfSections && isTabletOrSmaller);

    const columnCount = collapseToSingleColumn
      ? 1
      : Math.max(multiColumn || 1, 1); // Ensure at least 1

    const columns = Array.from({ length: columnCount }, () => []);
    childFields.forEach((child, index) => {
      columns[index % columnCount].push(
        <Grid item xs={12} key={`child-${index}`}>
          {renderFields({
            field: child,
            formValues,
            inputFields,
            isRequired,
            isReadOnly,
            setFormValues,
            allTagValues,
            setAllTagValues,
            currentStep,
            errors,
            setErrors,
            variant,
            formKeys,
            setFormKeys,
            fields,
            parentFields,
            config,
            multiColumn,
            appearance
          })}
        </Grid>
      );
    });

    return (
      <Grid container spacing={2}>
        {columns.map((col, colIdx) => (
          <Grid item xs={12 / columnCount} key={`col-${colIdx}`}>
            <Grid container spacing={2} direction="column">
              {col}
            </Grid>
          </Grid>
        ))}
      </Grid>
    );
  };
  return (
    <>
      {field?.title && (
        <Typography
          sx={{
            fontSize: "1.2rem",
            fontWeight: "bold",
            color: inputFields ? inputFields.color : "primary",
            letterSpacing: "0.5px",
            padding: "8px 16px",
          }}
        >
          {field.title}
        </Typography>
      )}
      
      <Card
        elevation={0}  
        sx={{
          borderRadius: "10px",
          mb: "15px",
          width: "100%",
        }}
      >
        <Box sx={{ p: 2 }}>
          {renderChildFields(field.childFields)}
        </Box>
      </Card>


    </>
  );
}

// FilePreview component to handle different file
