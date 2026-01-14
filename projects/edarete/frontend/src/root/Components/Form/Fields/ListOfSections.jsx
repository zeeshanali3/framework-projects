import React, { useState } from "react";
import { Typography, Box, Tabs, Tab, Card, Stepper, Step, StepLabel, StepContent, Button, Paper } from "@mui/material";
import { renderFields, checkDependancy, initializeFieldValues } from "./HelperFunctions";


function TabPanel({ children, value, index }) {
  return (
    <div role="tabpanel" hidden={value !== index} id={`vertical-tabpanel-${index}`} aria-labelledby={`vertical-tab-${index}`}>
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

export default function ListOfSections({
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
  appearance

}) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (!checkDependancy(field, formValues, parentValues)) {
    return null;
  }

  const childFields = field.childFields || [];
  const isTabs = field.style === "tabs";

  const handleChange = (event, newValue) => setActiveIndex(newValue);
  const handleNext = () => setActiveIndex((prev) => Math.min(prev + 1, childFields.length - 1));
  const handleBack = () => setActiveIndex((prev) => Math.max(prev - 1, 0));
  const handleReset = () => setActiveIndex(0);

  initializeFieldValues(field, formValues[currentStep]);

  return (
    <>
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
      <Card sx={{ borderRadius: "10px", p: "25px", mb: "15px", width: "100%" }}>
        {isTabs ? (
          // 🌟 Render Vertical Tabs Mode
          <Box sx={{ display: "flex", height: "100%" }}>
            <Tabs
              orientation="vertical"
              variant="scrollable"
              value={activeIndex}
              onChange={handleChange}
              aria-label="Vertical sections tabs"
              sx={{ borderRight: 1, borderColor: "divider", minWidth: 150 }}
            >
              {childFields.map((child, index) => (
                <Tab key={child.id || index} label={child.title || `Section ${index + 1}`} />
              ))}
            </Tabs>

            <Box sx={{ flex: 1 }}>
              {childFields.map((child, index) => {
                // console.log("child: ", child); // Move console.log outside the JSX

                return (
                  <TabPanel key={child.id || index} value={activeIndex} index={index}>
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
                      isListOfSections: true
                    })}
                  </TabPanel>
                );
              })}
            </Box>

          </Box>
        ) : (
          // 🌟 Render Stepper Mode
          <Box>
            <Stepper activeStep={activeIndex} orientation="vertical">
              {childFields.map((child, index) => (
                <Step key={child.id || index}>
                  <StepLabel>{child.title || `Step ${index + 1}`}</StepLabel>
                  <StepContent>
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
                      config
                    })}
                    <Box sx={{ mt: 2 }}>
                      <Button onClick={handleBack} disabled={index === 0}>
                        Back
                      </Button>
                      {index < childFields.length - 1 && (
                        <Button variant="contained" onClick={handleNext} sx={{ mr: 1 }}>
                          Next
                        </Button>
                      )}
                    </Box>
                  </StepContent>
                </Step>
              ))}
            </Stepper>
            {activeIndex === childFields.length && (
              <Paper square elevation={0} sx={{ p: 3 }}>
                <Typography>All steps completed</Typography>
                <Button onClick={handleReset}>Reset</Button>
              </Paper>
            )}
          </Box>
        )}
      </Card>
    </>
  );
}
