/**
 * Enhanced Form Component with Specific Attributes Support
 * 
 * This component handles dynamic forms with support for additional fields loaded from server.
 * It automatically separates additional fields into 'specific_attributes' on submission
 * and merges them back into form data for view/edit modes.
 * 
 * Key Features:
 * 1. Dynamic field loading via additionAttributes in generateFormProps
 * 2. Automatic separation of additional fields on form submission
 * 3. Automatic merging of specific_attributes for view/edit modes
 * 4. Comprehensive logging for debugging data flow
 * 
 * Data Flow:
 * - CREATE mode: Regular form submission with specific_attributes extraction
 * - VIEW/EDIT mode: API data with specific_attributes merged back into form fields
 * - Server response: { regular_fields..., specific_attributes: { additional_fields... } }
 * - Form display: All fields merged into single object for seamless editing
 */

import React, { useEffect, useState, useMemo, forwardRef, useRef } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Card,
  useMediaQuery,
  useTheme,
  Grid,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Close } from "@mui/icons-material";
import { CircularProgress } from "@mui/material";
import {
  renderFields,
  updateDemoFormDataWithDynamicKeys,
   mergeSpecificAttributesIntoData
} from "./Fields/HelperFunctions";
// import { mergeSpecificAttributesIntoData } from "./Utils/specificAttributesUtils";
import BasicTabs from "./FeatureTabs";
import { getServerResponse } from "../Helpers/getServerResponse";
import { showErrorToast } from "../../Common/ToastUtils";
import { showSuccessToast } from "../../Common/ToastUtils";
import { showWarningToast } from "../../Common/ToastUtils";
import { getSectionValue } from "./Fields/HelperFunctions";
export const Form = forwardRef(
  (
    {
      data,
      config,
      appearance,
      formKeysPass,
      setFormKeysPass,
      parentValues,
      parentFields,
      ancestorsInfo = null,
      demoView = false,
      isModalOpen,
      setIsModalOpen,
      queryParamsId = null,
      countries = null,
      localDataProp,
      onSubmitSuccess,
      setMyUpdatedData = null,
      isTableOfField,
      currentSteps,

      // multiColumn = 1,
    },
    ref
  ) => {
    // Guard: If data is missing or empty, show a message and do not render the form
    if (
      !data ||
      !data.features ||
      !data.features.submission ||
      !data.features.submission.steps ||
      !Array.isArray(data.features.submission.steps) ||
      data.features.submission.steps.length === 0
    ) {
      return (
        <Box sx={{ p: 4, textAlign: "center", color: "red" }}>
          No form fields available. Please check your configuration or try again later.
        </Box>
      );
    }

    const { main } = useSelector((state) => state);
    const dispatch = useDispatch();
    
    // Debug form props changes only when they actually change

    
    const [currentStep, setCurrentStep] = useState(0);
    // console.log(
    //   "i want to see here something",

    //   data?.features?.submission?.steps,
    //   localDataProp
    // );
    // if (currentSteps) {
    //   console.log("i am hit 1");
    //   queryParamsId = getSectionValue(
    //     data?.features?.submission?.steps,
    //     currentSteps,
    //     localDataProp
    //   );
    // } else {
    //   console.log("i am hit 2");
    //   queryParamsId = getSectionValue(
    //     data?.features?.submission?.steps,
    //     currentStep,
    //     localDataProp
    //   );
    // }
    // console.log("queryParamsId", queryParamsId);
    const [openModal, setOpenModal] = useState(isModalOpen);

    const { features: { submission } = {} } = data || {};

    const { viewMode: { presentation, mode } = {} } = config || {};
    const [previousStep, setPreviousStep] = useState(0);
    const [successResponse, setSuccessResponse] = useState(false);
    const [submitError, setSubmitError] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [currentId, setCurrentId] = useState("");
    const boxRef = useRef(null);
    const [boxWidth, setBoxWidth] = useState(0);
    const {
      features: {
        submission: {
          buttons = [],
          inputFields = {},
          background = {},
          multiColumn = 1,
        } = {},
      } = {},
    } = appearance;

    // Extract the onAction values into a new array
    const onAction = submission?.steps?.map(
      (submission) => submission?.onAction
    );

    // Get the `onClick` of the first `close` button if it exists
    const closeButton = submission?.steps?.find(
      (step) =>
        Array.isArray(step.buttons) &&
        step.buttons.some((btn) => btn.type === "close")
    );

    const [localCopyFormKeys, setLocalCopyFormKeys] = useState(formKeysPass);

    const closeButtonOnClick = closeButton?.buttons.find(
      (btn) => btn.type === "close"
    )?.onClick;

    const onlyClose = () => {
      if (setFormKeysPass && localCopyFormKeys) {
        setFormKeysPass(localCopyFormKeys);
      }
      setIsSubmitting(true);
      handleDialogClose();
    };

    const handleDialogClose = () => {
      
      if (setIsModalOpen) {
        setCurrentStep(0);
        setIsModalOpen(false);
      }
      if (closeButton) closeButtonOnClick();
      else setOpenModal(false);
    };

    const [dynamicSteps, setDynamicSteps] = useState(submission?.steps || []);
    
    // Debug dynamicSteps changes
    useEffect(() => {
    
      if (dynamicSteps?.length > 0) {
        // console.log("🔄 First step fields:", dynamicSteps[0]?.parameters?.fields);
      }
    }, [dynamicSteps]);

    const stepsData = dynamicSteps?.map((step) => {
      return {
        title: step.title,
        parameters: {
          fields: step.parameters ? step.parameters.fields : [],
        },
      };
    });

    let isModal = presentation === "modalView" ? true : false;

    useEffect(() => {
      if (boxRef.current) {
        const Modalwidth = boxRef.current.offsetWidth;
        setBoxWidth(Modalwidth);
        
      }

      const handleResize = () => {
        if (boxRef.current) {
          const Modalwidth = boxRef.current.offsetWidth;
          setBoxWidth(Modalwidth);
        
        }
      };

      window.addEventListener("resize", handleResize);

      return () => window.removeEventListener("resize", handleResize);
    }, [boxRef.current]);
    // Handle whether fields are disabled based on mode
    const isReadOnly = mode === "view";
    const variant = isReadOnly ? "standard" : "outlined";
    const isRequired = !isReadOnly;

    function generateDynamicKeys() {
      stepsData?.map((step) => {
        step?.parameters?.fields?.forEach((field) => {
          updateDemoFormDataWithDynamicKeys(field);
        });
      });
    }

    useEffect(() => {
      const updatedFields = stepsData?.map((step) => [
        step?.parameters?.fields,
      ]);
      setFields(updatedFields);
      generateDynamicKeys();
    }, [data, dynamicSteps]); // Add dynamicSteps as dependency

    // Handle dynamic steps loading
    useEffect(() => {
      // console.log("🔄 Dynamic steps useEffect triggered");
      // console.log("🔄 submission?.stepsManager:", submission?.stepsManager);
      // console.log("🔄 submission?.steps:", submission?.steps);
      
      if (submission?.stepsManager) {
        console.log("🔄 Setting up stepsManager subscription");
        
        // First, set the current steps (might already include additional fields)
        const currentSteps = submission.stepsManager.steps;
        // console.log("🔄 Current steps from manager:", currentSteps);
        setDynamicSteps([...currentSteps]);
        
        // Subscribe to steps updates
        const unsubscribe = submission.stepsManager.onStepsUpdate((newSteps) => {
          // console.log("🔄 Received updated steps in Form component:", newSteps);
          // console.log("🔄 Setting dynamicSteps to:", newSteps);
          setDynamicSteps([...newSteps]); // Force new array reference
        });

        // Only load additional fields if not already loaded
        if (!submission.stepsManager._hasLoadedAdditionalFields) {
          // console.log("🔄 Additional fields not loaded yet, triggering load");
          submission.stepsManager.loadAdditionalFields().then(() => {
            // console.log("🔄 loadAdditionalFields completed");
          }).catch((error) => {
            // console.error("🔄 loadAdditionalFields failed:", error);
          });
        } else {
          console.log("🔄 Additional fields already loaded, using current steps");
        }

        // Cleanup subscription
        return unsubscribe;
      } else {
        // Fallback to original steps if no stepsManager
        // console.log("🔄 No stepsManager, using fallback steps");
        setDynamicSteps(submission?.steps || []);
      }
    }, [submission?.stepsManager, submission?.steps]);

    const initialFormValues = stepsData?.map(() => {
      return {};
    });

    // Compute additional fields that were loaded from server
    const additionalFields = useMemo(() => {
      const fields = [];
      
   
      if (submission?.stepsManager?._hasLoadedAdditionalFields && dynamicSteps?.length > 0) {
        const firstStep = dynamicSteps[0];
        // console.log("📋 First step:", firstStep);
        const firstSection = firstStep?.parameters?.fields?.[0];
        // console.log("📋 First section:", firstSection);
        const allChildFields = firstSection?.childFields || [];
        
        // console.log("📋 Total child fields:", allChildFields.length);
        // console.log("📋 All child fields:", allChildFields);
        

        
        allChildFields.forEach(field => {
          // Check if this field has specific properties that indicate it's additional
          if (field.isAdditionalField || field.loadedFromServer || field.isAdditional || field.fromServer) {
            // console.log("📋 Found additional field:", field);
            fields.push(field);
          }
        });

        // console.log("📋 Additional fields found:", fields.length);
        // console.log("📋 Additional fields details:", fields);
      }
      
      return fields;
    }, [submission?.stepsManager?._hasLoadedAdditionalFields, dynamicSteps]);

    // Helper function to extract specific attributes from form values
    const extractSpecificAttributes = (formValues, additionalFields) => {
   
      const specificAttributes = {};

      // If we don't have additional fields detected, try a fallback approach
      if (additionalFields.length === 0) {
      
        // Define known regular fields for Users module (customize as needed)
        const knownRegularUserFields = [
          'users_firstName', 'users_lastName', 'users_email', 'users_phoneNo', 'users_cnic',
          'users_dateOfBirth', 'users_gender', 'users_genderId', 'users_bloodGroup', 
          'users_religion', 'users_fatherName', 'users_address', 'users_adminId', 
          'users_hrId', 'users_imageAttachmentId'
        ];
        
        // For now, let's be conservative and only look for explicitly marked additional fields
        // You can enable this fallback logic if needed
        
        // Uncomment the lines below if you want to include all non-regular fields as additional
        /*
        formValues.forEach((stepValues, stepIndex) => {
          if (stepValues && typeof stepValues === 'object') {
            Object.keys(stepValues).forEach(fieldKey => {
              // If this field is not in the known regular fields, it might be additional
              const isNotRegularField = !knownRegularUserFields.includes(fieldKey);
              
              if (isNotRegularField) {
                specificAttributes[fieldKey] = stepValues[fieldKey];
                console.log(`📋 Added to specific attributes (fallback): ${fieldKey} = ${stepValues[fieldKey]}`);
              }
            });
          }
        });
        */
      } else {
        // Original logic with detected additional fields
        formValues.forEach((stepValues, stepIndex) => {
          if (stepValues && typeof stepValues === 'object') {
            Object.keys(stepValues).forEach(fieldKey => {
              // Check if this field key belongs to additional fields
              const isAdditionalField = additionalFields.some(field => 
                field.dynamicKey === fieldKey || field.name === fieldKey
              );
              
              if (isAdditionalField) {
                specificAttributes[fieldKey] = stepValues[fieldKey];
                // console.log(`📋 Added to specific attributes: ${fieldKey} = ${stepValues[fieldKey]}`);
              }
            });
          }
        });
      }
      
      // console.log("📋 Final specific attributes:", specificAttributes);
      return specificAttributes;
    };

    // Helper function to prepare form data for submission
    const prepareFormDataForSubmission = (stepFormValues, additionalFields) => {
   
      
      // Extract specific attributes
      const specificAttributes = extractSpecificAttributes([stepFormValues], additionalFields);
      
      // Create the submission object
      const submissionData = {
        ...stepFormValues, // Regular form values for current step
        specific_attributes: specificAttributes // Additional attributes
      };
      

      return submissionData;
    };

    // Helper function to merge specific_attributes back into form data for view/edit modes
    const mergeSpecificAttributesIntoFormData = (apiData) => {
      
      return mergeSpecificAttributesIntoData(apiData);
    };

    // async function getServerResponse(
    //   serverCommunication,
    //   qparam,
    //   queryParamsId
    // ) {
    //   const generator = fetchData(serverCommunication, qparam, queryParamsId);

    //   // Step through the generator
    //   let step = generator.next(); // Start the generator

    //   while (!step.done) {
    //     const response = await step.value; // Await the yielded value
    //     step = generator.next(response); // Pass the response back to the generator
    //   }

    //   // Final result
    //   const finalResult = step.value;
    // }
    // const getServerResponse = async (
    //   serverCommunication,
    //   queryParam = null,
    //   qparam = null
    // ) => {
    //   try {
    //     const response = await runSaga(
    //       {
    //         dispatch: () => {}, // We don't need to dispatch
    //         getState: () => store.getState(), // Provide access to Redux state
    //       },
    //       fetchData,
    //       serverCommunication,
    //       queryParam,
    //       qparam
    //     ).toPromise();

    //     return response;
    //   } catch (error) {
    //     console.error("Error in Server Response:", error);
    //   } finally {
    //     // setIsLoading(false);
    //   }
    // };

    function getFormData(serverCommunication, queryParamsId) {
      const onSuccess = serverCommunication?.onSuccess;
      const onFailure = serverCommunication?.onFailure;
      function updatedOnSuccess(res) {
      
        
        // Merge specific_attributes back into form data for view/edit modes
        const mergedRes = {
          ...res,
          return: res.return ? mergeSpecificAttributesIntoFormData(res.return) : res.return
        };
 
        
        onSuccess(mergedRes);
        SuccessResponseOfServer(mergedRes);
        setSuccessResponse(true);
      }

      function updatedOnFailure(err) {
        onFailure(err);
        ErrorResponseOfServer(err);
        setSuccessResponse(false);
      }

      serverCommunication.onSuccess = updatedOnSuccess;
      serverCommunication.onFailure = updatedOnFailure;
      if (currentSteps) {
        getServerResponse(
          serverCommunication,
          `&step=${currentSteps + 1}`,
          queryParamsId
        );
      
      } else {
        
        getServerResponse(
          serverCommunication,
          `&step=${currentStep + 1}`,
          queryParamsId
        );
      }
    }
    useEffect(() => {
      if (
        config?.features?.fetchData?.operationalMode === "server" &&
        config?.features?.fetchData?.enable &&
        config?.viewMode?.mode !== "create"
      ) {
        const sagaCommunication =
          data?.features?.fetchData?.serverCommunication;
        if (sagaCommunication) {
          getFormData(sagaCommunication, queryParamsId);
        }
      } else {
        setFormValues((prevFormValues) => {
          // Create a copy of the current form values
          const updatedFormValues = [...prevFormValues];

          // Merge specific_attributes if present in localDataProp
          const mergedLocalData = mergeSpecificAttributesIntoFormData(localDataProp);


          // Assuming response.return[0] contains data you want to add
          updatedFormValues[currentStep] = {
            ...updatedFormValues[currentStep],
            ...mergedLocalData, // Merge processed local data into current step data
          };

          // Return the updated form values
          return updatedFormValues;
        });
      }
    }, [localDataProp]);
    const [formValues, setFormValues] = useState(initialFormValues);

    useEffect(() => {
      
    }, [formValues]);

    const steps = submission?.steps?.map((step) => `${step.title}`);

    const [errors, setErrors] = useState({}); // New state for errors

    const [formKeys, setFormKeys] = useState([]);

    const [fields, setFields] = useState([]);

    const validateCurrentStep = (
      currentFields = fields[currentStep][0],
      newErrors = {},
      valid = true
    ) => {
      // userRolesDesignationsDepartment_userRoleDesignationDepartmentId:
      //userRolesDesignationsDepartment_roleDesignationDepartmentId:
      if (!isReadOnly) {
        // Validate each field in the current step
        
        currentFields?.forEach((field) => {
        
          const { dynamicKey, type, required, min, max } = field;
          const value = formValues[0][dynamicKey] || "";
          if (type === "listOfSections") {
            if (field?.childFields) {
              valid = validateCurrentStep(field.childFields, newErrors, valid);
            }
          }
          if (type === "section") {
            if (field?.childFields) {
              valid = validateCurrentStep(field.childFields, newErrors, valid);
            }
          } else {
            if (type === "file" && required && (!value || value.length === 0)) {
              newErrors[dynamicKey] = "Please select at least one file";
              valid = false;
            }

            if (required && type === "checkbox" && !value) {
              newErrors[dynamicKey] = "This field is required";
              valid = false;
            }

            if (type === "email") {
              const emailPattern =
                /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
              if (required && !value) {
                newErrors[dynamicKey] = "This field is required";
                valid = false;
              }
              if (!emailPattern.test(value) && value) {
                newErrors[dynamicKey] = "Invalid email format";
                valid = false;
              }
            }

            // Check required fields
            if (required && !value && field.hideInCreateForm !== true) {
              newErrors[dynamicKey] = "This field is required";
              valid = false;
            }

            // Check for specific field type validations
            if (type === "password") {
              // Validate password length
              if (min != "" && value.length < min) {
                newErrors[dynamicKey] = `Minimum length is ${min}`;
                valid = false;
              }
            }

            // Check min
            if (type == "textField" && min != "" && value.length < min) {
              newErrors[dynamicKey] = `Minimum length is ${min}`;
              valid = false;
            }

            // Check max
            if (type == "textField" && max != "" && value.length > max) {
              newErrors[dynamicKey] = `Maximum length is ${max}`;
              valid = false;
            }

            // Check min
            
            if (
              type == "number" &&
              min !== undefined &&
              min != "" &&
              Number(value) < min
            ) {
              newErrors[dynamicKey] = `Minimum value is ${min}`;
              valid = false;
            }

            // Check max
            if (
              type == "number" &&
              max !== undefined &&
              max != "" &&
              Number(value) > max
            ) {
              newErrors[dynamicKey] = `Maximum value is ${max}`;
              valid = false;
            }

            // For Package Weight
            if (type === "unit") {
              const numericValue = parseFloat(value);

              if (isNaN(numericValue)) {
                newErrors[dynamicKey] = `Please enter a valid number`;
                valid = false;
              } else {
                if (min !== undefined && min !== "" && numericValue < parseFloat(min)) {
                  newErrors[dynamicKey] = `Minimum allowed value is ${min}`;
                  valid = false;
                }
                if (max !== undefined && max !== "" && numericValue > parseFloat(max)) {
                  newErrors[dynamicKey] = `Maximum allowed value is ${max}`;
                  valid = false;
                }
              }
            }


            // For CNIC and CREDIT CARD
            if (type === "inputMask") {
              if (dynamicKey === "cnic") {
                const isValidCNIC = /^\d{5}-\d{7}-\d{1}$/.test(value);
                if (!isValidCNIC) {
                  newErrors[dynamicKey] = "Invalid CNIC format. Correct format: 12345-1234567-1";
                  valid = false;
                }
              }

              if (dynamicKey === "credit_card") {
                const isValidCreditCard = /^\d{4} \d{4} \d{4} \d{4}$/.test(value);
                if (!isValidCreditCard) {
                  newErrors[dynamicKey] = "Invalid credit card format. Correct format: 1234 5678 9012 3456";
                  valid = false;
                }
              }
            }

            //Phone Number
            if (type === "phoneNumber") {
              const cleanedValue = value.replace(/\D/g, ""); // remove all non-digit characters

              if (!cleanedValue && required) {
                newErrors[dynamicKey] = "Phone number is required";
                valid = false;
              } else if (cleanedValue) {
                if (cleanedValue.length < 10 || cleanedValue.length > 15) {
                  // Allow range: typical phone numbers are between 10 and 15 digits
                  newErrors[dynamicKey] = "Phone number must be between 10 and 15 digits";
                  valid = false;
                }
              }
            }

            //Rating
            if (type === "rating") {
              const ratingValue = value || 0;

              if (!ratingValue && required) {
                newErrors[dynamicKey] = "Rating is required";
                valid = false;
              } else {
                if (field.min && ratingValue < field.min) {
                  newErrors[dynamicKey] = `Rating must be at least ${field.min}`;
                  valid = false;
                }
              }
            }

            //Signature
            if (type === "signature") {
              const signatureValue = value || "";

              if (!signatureValue && required) {
                newErrors[dynamicKey] = "Signature is required";
                valid = false;
              }
            }



            // Check word count
            if (type === "textarea") {
              const wordCount = value
                .trim()
                .split(/\s+/)
                .filter((word) => word).length; // Count words
              if (min !== undefined && min != "" && wordCount < min) {
                newErrors[dynamicKey] = `Minimum word count is ${min}`;
                valid = false;
              }
              if (max !== undefined && max != "" && wordCount > max) {
                newErrors[dynamicKey] = `Maximum word count is ${max}`;
                valid = false;
              }
            }

            // Additional validation for radio type
            if (
              type === "radio" &&
              required &&
              (!formValues[currentStep][dynamicKey] ||
                formValues[currentStep][dynamicKey] === "")
            ) {
              newErrors[dynamicKey] = "Please select an option";
              valid = false;
            }
          }
        });
        setErrors(newErrors);
   
        return valid;
      }
    };

    const handleSubmit = async (event) => {
      event.preventDefault();
      event.stopPropagation();

      // WARNING: The second validateCurrentStep() check in original code was redundant
      if (mode === "View") {
        
      }
      if (!validateCurrentStep()) {
        showWarningToast("Please fill all required fields.");
        return;
      }

      setIsSubmitting(true);
      setSubmitError(null);
      if (config?.features?.submission?.operationalMode === "local") {
        setMyUpdatedData && setMyUpdatedData(formValues[0]);
        handleDialogClose();
        setIsSubmitting(false);
        return;
      }



      if (onAction[currentStep]) {
        try {
          await onAction[currentStep](formValues, ancestorsInfo, currentStep);
        } catch (error) {
          console.log("Submission failed:", error);
          setIsSubmitting(false);
          return;
        }
      }

      if (config?.features?.submission?.operationalMode === "server") {
        const stepConfig = data?.features?.submission.steps[currentStep];
        const sagaCommunication =
          data?.features?.submission.serverCommunication;
        const onSuccess = sagaCommunication?.onSuccess;
        const onFailure = sagaCommunication?.onFailure;

        // WARNING: Original had premature onSuccess call that was commented out:
        // data?.features?.submission.steps[currentStep].serverCommunication?.onSuccess(formValues);

        function updatedOnSuccess(res) {
          // WARNING: Original used == instead of === for type comparison
          if (typeof onSuccess === "function") {
            onSuccess(res);
            showSuccessToast("Data submitted successfully!");
          }
          SuccessResponseOfServer(res);
          setIsSubmitting(false);
          sagaCommunication.onSuccess = null;
          // WARNING: Original had modal close here too which could cause duplicate calls
          // if (isModal === true) {
          //   handleDialogClose();
          // }
        }

        function updatedOnFailure(err) {
          // WARNING: Original used == instead of ===
          if (typeof onFailure === "function") {
            showErrorToast(
              err?.payload || err?.message || "Error: Unable to submit data."
            );
            onFailure(err);
          }
          ErrorResponseOfServer(err);
          setIsSubmitting(false);
          sagaCommunication.onFailure = null;
        }

        if (sagaCommunication) {
          const { userSelectedRole } = main;
          
          
          if (formValues[currentStep]) {
            for (const key of Object.keys(formValues[currentStep])) {
              if (key.includes("updatedBy")) {
                formValues[currentStep][key] =
                  userSelectedRole.user_role_designation_department_id;
              }
            }
          }

          // 🎯 Extract specific attributes and prepare final submission data
          const finalSubmissionData = prepareFormDataForSubmission(formValues[currentStep], additionalFields);


          sagaCommunication.body = finalSubmissionData;
         
          sagaCommunication.onSuccess = updatedOnSuccess;
          sagaCommunication.onFailure = updatedOnFailure;
          let id = getSectionValue(stepsData, currentStep, formValues);
        
          // WARNING: Original had setIsSubmitting(true) here which was redundant
          if (currentSteps) {
            getServerResponse(
              sagaCommunication,
              `&step=${currentSteps + 1}`,
              id
            );
          } else {
            getServerResponse(
              sagaCommunication,
              currentStep > 0 ? `&step=${currentStep + 1}` : "",
              id
            );
          }

        
        }
      }

      if (currentStep === steps.length - 1) {
        fields.forEach((stepFields) => {
          stepFields.forEach((field) => {
            // WARNING: Original had typo "repeatDependancy" instead of "repeatDependency"
            if (field.repeatDependancy === true) {
              field.repeated = false;
            }
          });
        });

        if (!demoView) {
          

          setFormValues(initialFormValues);
        }

        if (isModal) {
          
          handleDialogClose();
        }
      }
      
    };

    const handleNextStep = async () => {
      // Better log format

      // Validate current step before proceeding
      if (mode !== "view") {
        if (!validateCurrentStep()) {
          showWarningToast("Please fill all required fields.");

          return;
        }
      }

      // Check if this is NOT the final step
      if (currentStep < fields.length - 1) {
        // Execute step-specific action if defined
        if (onAction[currentStep]) {
          // WARNING: Should this be awaited? Potential race condition if async
          onAction[currentStep](formValues, ancestorsInfo, currentStep);
        }

        // Server-side submission handling
        if (config?.features?.submission?.operationalMode === "server") {
          // WARNING: This early success call might be premature - moved after validation
          if (
            data?.features?.submission.steps[currentStep].serverCommunication
              ?.onSuccess
          ) {
            data.features.submission.steps[
              currentStep
            ].serverCommunication.onSuccess(formValues);
          }

          const sagaCommunication =
            data?.features?.submission.serverCommunication;
          const { onSuccess, onFailure } = sagaCommunication || {};

          // Improved success handler with clearer logic
          function updatedOnSuccess(res) {
            // WARNING: Using == instead of === for type comparison
            if (typeof onSuccess == "function") {
              onSuccess(res);
              setIsSubmitting(false);
            }

            SuccessResponseOfServer(res);

            // WARNING: This complex condition needs simplification - preserved original logic
           

            // const hasInsertId =
            //   res?.return?.insertId || res?.return?.[0]?.insertId;  //before
            const hasInsertId = res?.return?.insertId; //after
           
            const isValidId =
              (!queryParamsId && hasInsertId) ||
              // (queryParamsId && hasInsertId !== 0);
              (queryParamsId && hasInsertId === 0) ||
              hasInsertId === 0;

            if (!isValidId && mode !== "view") {
           
              alert("Error: Data not added. Please try again.");
            } else {
              setCurrentStep(currentStep + 1);
            }
          }

          // Improved error handler
          function updatedOnFailure(err) {
    

            // WARNING: Using == instead of ===
            if (typeof onFailure == "function") {
              // WARNING: Generic error message "Error32:" - should be more descriptive
              showErrorToast("Error32: ");
              onFailure(err);
            }

            ErrorResponseOfServer(err);

            // Keep modal open on error if in modal mode
            if (isModal) {
              setIsModalOpen(true);
            }
          }

          if (sagaCommunication) {
         
            // Add updatedBy information if fields exist
            if (formValues[currentStep]) {
              const { userSelectedRole } = main;
              Object.keys(formValues[currentStep]).forEach((key) => {
                if (key.includes("updatedBy")) {
                  formValues[currentStep][key] =
                    userSelectedRole.user_role_designation_department_id;
                }
              });
            }

            // 🎯 Extract specific attributes and prepare step submission data
            const stepSubmissionData = prepareFormDataForSubmission(formValues[currentStep], additionalFields);


            // Configure saga communication
            sagaCommunication.body = stepSubmissionData;
           
            sagaCommunication.onSuccess = updatedOnSuccess;
            sagaCommunication.onFailure = updatedOnFailure;
            let sectionTitle;

            let id = getSectionValue(stepsData, currentStep, formValues);

            // Execute server request
            if (currentSteps) {
              getServerResponse(
                sagaCommunication,
                `&step=${currentSteps + 1}`,
                id
              );
            } else {
              getServerResponse(
                sagaCommunication,
                currentStep > 0 ? `&step=${currentStep + 1}` : "",
                id
              );
            }
          }
        } else {
          // Client-side step progression
          setCurrentStep(currentStep + 1);
        }
      } else {
        console.warn("[NextStep] Validation failed for current step");
      }
    };

    const handlePrevStep = () => {
      if (currentStep > 0) {
        setCurrentStep(currentStep - 1);
        setPreviousStep(previousStep + 1);
      }
    };

    const SuccessResponseOfServer = (response) => {
      console.log("FormValuesssss", response);

      if (response?.return?.insertId) {
        setFormValues((prevFormValues) => {
          const updatedFormValues = prevFormValues.map((item) => ({ ...item }));
          for (let stepIndex = 0; stepIndex < stepsData.length; stepIndex++) {
            updatedFormValues[stepIndex] = {
              ...updatedFormValues[stepIndex],
              insertedId: response.return.insertId,
            };
          }
          return updatedFormValues;
        });
      } else if (Array.isArray(response?.return) && response.return[0]) {
        setFormValues((prevFormValues) => {
          const updatedFormValues = prevFormValues.map((item) => ({ ...item }));
          const maxLength = Math.max(stepsData.length, response.return.length);

          for (let stepIndex = 0; stepIndex < maxLength; stepIndex++) {
            updatedFormValues[stepIndex] = {
              ...updatedFormValues[stepIndex],
              ...(response?.return[stepIndex] || response?.return[0]),
            };
          }
        
          return updatedFormValues;
        });
      }

      return response;
    };

    const ErrorResponseOfServer = (response) => {
      // setIsSubmitting(response);
      setSuccessResponse(false);
      return response;
    };

    const [allTagValues, setAllTagValues] = useState({});

    useEffect(() => {

    }, [allTagValues]);
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

    // Set the number of columns based on screen size
    const columnCount = isSmallScreen ? 1 : multiColumn || 1;

    const form = (
      <form noValidate onSubmit={handleSubmit} ref={ref}>
        {Array.isArray(fields) &&
          Array.isArray(fields[currentStep]) &&
          fields[currentStep].length > 0 ? (
          <Grid container spacing={2}>
            {(() => {
              const stepFields = fields[currentStep].flat();
              const columns = Array.from({ length: columnCount }, () => []);

              stepFields.forEach((field, index) => {
                const isFullWidth =
                  field?.type === "section" ||
                  field?.type === "listOfSections" ||
                  field?.type === "listOfFields" ||
                  field?.type === "tableOfFields" ||
                  field?.type === "yamlCodeField" ||
                  stepFields.length === 1;
                
                const fieldComponent = (
                  <Grid item xs={12} key={`field-${index}`}>
                    {renderFields({
                      field,
                      formValues,
                      inputFields,
                      isRequired,
                      isReadOnly,
                      setFormValues,
                      allTagValues,
                      setAllTagValues,
                      currentStep,
                      stepsData,
                      errors,
                      setErrors,
                      multiColumn,
                      variant,
                      formKeys: formKeysPass || formKeys,
                      setFormKeys: setFormKeysPass || setFormKeys,
                      parentValues,
                      parentFields,
                      ancestorsInfo,
                      fields,
                      config,
                      serverMode:
                        config?.features?.fetchData?.operationalMode ===
                        "server",
                      boxWidth: 200,
                      appearance
                    })}
                  </Grid>
                );

                if (isFullWidth) {
                  columns[0].push(fieldComponent);
                } else {
                  const colIndex = index % columnCount;
                  columns[colIndex].push(fieldComponent);
                }
              });

              if (stepFields.length === 1) {
                return columns[0];
              } else {
                return columns.map((col, colIdx) => (
                  <Grid item xs={12 / columnCount} key={`column-${colIdx}`}>
                    <Grid container spacing={2} direction="column">
                      {col}
                    </Grid>
                  </Grid>
                ));
              }
            })()}
          </Grid>
        ) : null}

        <Grid>
          <Box display="flex" justifyContent="space-between" marginTop={2}>
            {Array.isArray(steps) && steps.length > 1 && (
              <>
                <Button
                  variant="outlined"
                  onClick={handlePrevStep}
                  disabled={currentStep === 0}
                >
                  Previous
                </Button>

                <Button
                  variant="outlined"
                  onClick={() => {
                    if (currentStep < fields.length - 1) {
                      setCurrentStep(currentStep + 1);
                    } else {
                      handleDialogClose();
                    }
                  }}
                >
                  Skip
                </Button>

                {currentStep < (fields?.length || 0) - 1 && (
                  <Button
                    variant="contained"
                    onClick={
                      previousStep === 0
                        ? handleNextStep
                        : () => {
                          setPreviousStep(previousStep - 1);
                          setCurrentStep(previousStep);
                        }
                    }
                    disabled={
                      currentStep >= (fields?.length || 0) - 1 || isSubmitting
                    }
                  >
                    {isSubmitting ? (
                      <CircularProgress size={20} color="inherit" />
                    ) : mode === "view" ? (
                      "Next"
                    ) : !queryParamsId ? (
                      "Next"
                    ) : (
                      "Update"
                    )}
                  </Button>
                )}
              </>
            )}

            {mode !== "view" &&
              submission?.steps?.[currentStep]?.buttons?.map((btn, index) =>
                btn.type === "submit" ? (
                  <Button
                    key={index}
                    variant="contained"
                    type="submit"
                    disabled={isSubmitting}
                    sx={{ width: steps?.length === 1 ? "100%" : "auto" }}
                  >
                    {isSubmitting ? (
                      <CircularProgress size={20} color="inherit" />
                    ) : queryParamsId ? (
                      "Update"
                    ) : (
                      btn?.label
                    )}
                  </Button>
                ) : null
              )}
          </Box>

          <Box
            display="flex"
            flexDirection="row"
            gap={2}
            marginTop={2}
            sx={{ justifyContent: "space-between" }}
          >
            {submission?.steps?.[currentStep]?.buttons?.map((btn, index) =>
              btn.type !== "submit" && btn.type !== "close" ? (
                <Button
                  key={index}
                  variant="contained"
                  sx={{
                    backgroundColor:
                      appearance?.features?.submission?.buttons?.find(
                        (bt) => bt.type === btn.type
                      )?.backgroundColor || " ",
                    color:
                      appearance?.features?.submission?.buttons?.find(
                        (bt) => bt.type === btn.type
                      )?.color || "white",
                    margin: "5px",
                  }}
                  onClick={(e) => {
                    if (btn.onClick) {
                      btn.onClick(e);
                    }
                  }}
                >
                  {btn?.label}
                </Button>
              ) : null
            )}
            {currentStep === submission?.steps?.length - 1 &&
              !submission?.steps?.[currentStep]?.buttons?.some(
                (btn) => btn.type === "submit"
              ) && (
                <Button
                  variant="contained"
                  type="submit"
                  sx={{ width: steps?.length === 1 ? "100%" : "auto" }}
                >
                  Submit
                </Button>
              )}
          </Box>
        </Grid>
      </form>
    );

    // const steperDirection = "horizontal";

    const renderStepperAndForm = () => (
      <>
       
        {stepsData.length > 1 && (
          <BasicTabs tabs={stepsData} activeStep={currentStep} />
        )}
        {form}
      </>
    );

    if (isModal === true) {
      return (
        <>
          <Dialog
            open={closeButton ? true : openModal}
            onClose={isSubmitting ? undefined : onlyClose}
            fullScreen={isSmallScreen}
            maxWidth={false}
            // PaperProps={{
            //   sx: {
            //     width: isSmallScreen ? "100vw" : "70vw",
            //     maxWidth: isSmallScreen ? "100vw" : "70vw",
            //     height: isSmallScreen ? "100vh" : "70vh",
            //   },
            // }}
          >
            <DialogTitle
              sx={{
                display: "flex",
                justifyContent: "right",
                alignItems: "center",
                color: inputFields?.color,
                backgroundColor: background?.color,
              }}
            >
              <IconButton onClick={isSubmitting ? undefined : onlyClose}>
                <Close />
              </IconButton>
            </DialogTitle>

            <DialogContent
              // dividers
              sx={{
                // marginTop: "-0px",
                backgroundColor: background?.color,
              }}
            >
              <Box
                ref={boxRef}
                sx={{
                  color: inputFields?.color,
                  width: "100%",
                  marginTop: 2,
                }}
              >
                {renderStepperAndForm()}
              </Box>
            </DialogContent>
          </Dialog>

        
        </>
      );
    } else {
      <Card
        sx={{
          padding: "24px",
          border: "1px solid #ccc",
          borderRadius: "8px",
          marginTop: "50px",
          marginBottom: "50px",
          color: "red",
          backgroundColor: "red",
        }}
      >
        {renderStepperAndForm()}
      </Card>;
    }
  }
);
