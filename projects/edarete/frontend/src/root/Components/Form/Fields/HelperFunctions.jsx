import ListOfFields from "./ListOfFields.jsx";
import SectionField from "./Section.jsx";
import TextFieldRender from "./TextField.jsx";
import SelectDependant from "./SelectDependant.jsx";
import SelectFieldRender from "./Select.jsx";
import RadioFieldRender from "./Radio.jsx";
import MultiSelectFieldRender from "./MultiSelect.jsx";
import NumberFieldRender from "./Number.jsx";
import TextAreaFieldRender from "./TextArea.jsx";
import CheckboxFieldRender from "./Checkbox.jsx";
import ColorFieldRender from "./Color.jsx";
import URLFieldRender from "./Url.jsx";
import RangeFieldRender from "./Range.jsx";
import TimeFieldRender from "./Time.jsx";
import DateFieldRender from "./Date.jsx";
import DateTimeFieldRender from "./DateTime.jsx";
import PasswordFieldRender from "./Password.jsx";
import FileFieldRender from "./File.jsx";
import SelectOnFieldsRender from "./selectOnFields.jsx";
import TableOfFields from "./TableOfFields.jsx";
import Report from "./Report.jsx";
import EmailFieldRender from "./Email.jsx";
import ListOfSections from "./ListOfSections.jsx";
import mapper from "../fieldsMapper.js";
import InputMaskFieldRender from "./InputMask.jsx"
import UnitFieldRender from "./Unit.jsx"
import PhoneNumberFieldRender from "./PhoneNumber.jsx";
import SignaturePadFieldRender from "./SignaturePad.jsx";
import RatingFieldRender from "./Rating.jsx";
import YAMLCodeFieldRender from "./YamlCodeField.jsx";
import CodeEditorRender from "./CodeEditor.jsx";

export const checkDependancy = (field, formValues, parentValues) => {
  // Dependant logic
  if (field?.dependancyCheck) {
    let dependantFieldValue = null;
    const dependantField = field?.dependancy.dependant;
    const dependValue = field?.dependancy.dependValue;

    // Function to search for dependantField in provided values object
    const findDependantFieldValue = (values) => {
      for (let step in values) {
        if (values[step][dependantField] !== undefined) {
          return values[step][dependantField];
        }
      }
      return null;
    };

    // First, try to find the value in formValues
    dependantFieldValue = findDependantFieldValue(formValues);

    // If not found, try to find the value in parentValues
    if (dependantFieldValue === null && parentValues) {
      dependantFieldValue = findDependantFieldValue(parentValues);
    }

    // Check if dependantFieldValue matches any value in dependValue
    const doesValueMatch =
      Array.isArray(dependValue) &&
      dependValue.some((dependObj) => {
        // Normalize values for comparison
        const normalizedDependValue =
          dependObj?.value === "true" ? true : dependObj?.value;
        const normalizedDependantFieldValue =
          dependantFieldValue === "true" ? true : dependantFieldValue;

        return normalizedDependValue === normalizedDependantFieldValue;
      });

    if (!doesValueMatch) {
      return false;
    } else {
      return true;
    }
  }
  return true;
};

export const getSectionValue = (stepsData, currentStep, formValues, fields) => {
  let sectionTitle = "";
 

  // Check if stepsData has the necessary fields and if a section is found
  if (stepsData && stepsData[currentStep]?.parameters?.fields) {
    const sectionField = stepsData[currentStep]?.parameters?.fields.find(
      (field) => {
      
        return field?.type === "section";
      }
    );

    if (sectionField) {
      sectionTitle = sectionField.name + "_id";
    } else {
     
    }
  }

  // Handle fields structure
  if (fields && fields[currentStep]) {
   

    const currentFields = fields[currentStep];

    // Iterate through the nested structure to find a section field
    currentFields?.forEach((fieldGroup) => {
      if (Array.isArray(fieldGroup)) {
        fieldGroup.forEach((field) => {
          if (field?.type === "section") {
           
            sectionTitle = field.name + "_id";
            return;
          }
        });
      }
    });
  }

  // If no section title is found in fields or stepsData, use formValues to search for the matching value
  let sectionValue = null;
  if (
    Array.isArray(formValues) &&
    formValues.every((item) => typeof item === "object" && item !== null)
  ) {
    formValues.forEach((dataItem) => {
      for (const [key, value] of Object.entries(dataItem)) {
        if (key.includes(sectionTitle)) {
          sectionValue = value;
          return;
        }
      }
    });
  } else {
    sectionValue = formValues[sectionTitle];
  }
  return sectionValue; // Return the final section value
};

// Add the componentsMap here
const componentsMap = {
  SectionField,
  ListOfFields,
  TextFieldRender,
  SelectFieldRender,
  MultiSelectFieldRender,
  NumberFieldRender,
  TextAreaFieldRender,
  CheckboxFieldRender,
  ColorFieldRender,
  URLFieldRender,
  RangeFieldRender,
  RadioFieldRender,
  PasswordFieldRender,
  TimeFieldRender,
  DateFieldRender,
  DateTimeFieldRender,
  FileFieldRender,
  SelectDependant,
  SelectOnFieldsRender,
  Report,
  TableOfFields,
  EmailFieldRender,
  ListOfSections,
  InputMaskFieldRender,
  UnitFieldRender,
  YAMLCodeFieldRender,
  PhoneNumberFieldRender,
  SignaturePadFieldRender,
  RatingFieldRender,
  CodeEditorRender,
};

const renderComponent = (field, scopeVariables) => {
  const mapperItem = mapper.find((item) => item.type === field?.type);

  if (!mapperItem) {
    return null; // Handle unknown type
  }

  const { component: ComponentName, inlineProps } = mapperItem;


  // Get the actual Component from componentsMap
  const Component = componentsMap[ComponentName];

  if (!Component) {
    return null; // Handle missing component
  }

  const props = {};

  inlineProps.forEach((propName) => {
    if (scopeVariables.hasOwnProperty(propName)) {
      props[propName] = scopeVariables[propName]!=undefined ? scopeVariables[propName] : props[propName] ;
    } else {
      console.warn(`Variable ${propName} is not defined in scope`);
      return null;
    }
  });
  
  return <Component {...props} />;
};

export const renderFields = ({
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
  ancestorsInfo,
  fields,
  parentFields,
  config,
  multiColumn,
  isListOfSections,
  boxWidth,
  appearance
}) => {
 
  // Scope variables
  const scopeVariables = {
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
    ancestorsInfo,
    fields,
    parentFields,
    serverMode,
    config,
    multiColumn,
    isListOfSections,
    boxWidth,
    appearance,
  };
  // Extract viewMode
  const viewMode = config?.viewMode?.mode;
  // Determine if the field should be hidden in create or edit modes
  if (
    field.hideInCreateForm &&
    (viewMode === "create" || viewMode === "edit")
  ) {
    return null;
  }
  if (field?.hideInViewForm && field.hideInViewForm && viewMode === "view") {
    return null;
  }

  // Render the component if the field is visible
  return renderComponent(field, scopeVariables);
};

function fieldValues(field) {
  if (field?.type === "checkbox") {
    return field?.value || false;
  } else if (field?.type === "listOfFields") {
    return field?.value || [];
  } else if (field?.type === "date") {
    return field?.value || new Date().toISOString().split("T")[0];
  } else if (field.type === "dateTime") {
    return field?.value || new Date().toISOString();
  } else if (field?.type === "number") {
    return field?.value || null;
  } else if (field?.type === "select") {
    return field?.value || null;
  } else {
    return field?.value || "";
  }
}

function generateDynamicKeysForListOfFields(field, parentKey = "") {
  field?.childFields?.forEach((childField) => {
    const isUniqueName = parentKey.split("_").pop() !== field.name;
    const dynamicKey = parentKey
      ? isUniqueName
        ? `${parentKey}_${field.name}_${childField.name}`
        : `${parentKey}_${childField.name}`
      : `${childField.name}`;

    if (childField.type === "section" && childField.childFields) {
      updateDemoFormDataWithDynamicKeys(childField, dynamicKey);
    } else if (childField.type === "listOfFields") {
      // Recursively handle nested listOfFields without adding to formValues
      generateDynamicKeysForListOfFields(childField, dynamicKey);
      // Set the dynamic key on the field object itself
      childField.dynamicKey = dynamicKey;
    } else {
      // Set the dynamic key on the field object itself
      childField.dynamicKey = dynamicKey;
    }
  });
}

export function updateDemoFormDataWithDynamicKeys(field, parentKey = "") {
  if (field.type === "section" && field.childFields) {
    field.childFields.forEach((childField) => {
      // Check if parentKey already includes field.name to avoid duplication
      const isUniqueName = parentKey.split("_").pop() !== field.name;
      const dynamicKey = parentKey
        ? isUniqueName
          ? `${parentKey}_${field.name}_${childField.name}`
          : `${parentKey}_${childField.name}`
        : `${field.name}_${childField.name}`;

      // Set the dynamic key on the field object itself
      childField.dynamicKey = dynamicKey;

      if (childField.type === "section" && childField.childFields) {
        // Recursively process nested sections
        updateDemoFormDataWithDynamicKeys(childField, dynamicKey);
      } else if (childField.type === "listOfFields") {
        // Recursively process
        updateDemoFormDataWithDynamicKeys(childField, dynamicKey);
      }
    });
  } else if (field.type === "listOfFields" && field.childFields) {
    // Set the dynamicKey for listOfFields itself
    generateDynamicKeysForListOfFields(field);
    if (parentKey === "") {
      field.dynamicKey = parentKey
        ? `${parentKey}_${field?.name}`
        : field?.name;
    }
  } else {
    // Set dynamicKey for non-section fields at the top level
    field.dynamicKey = parentKey ? `${parentKey}_${field?.name}` : field?.name;
  }
}

export function initializeFieldValues(field, formValuesStep) {
  // Check if `field` is valid
  if (!field) {
    console.error("Invalid field object: ", field);
    return;
  }

  if (field.type === "section") {
    // Check if `childFields` is an array
    if (Array.isArray(field.childFields)) {
      field.childFields.forEach((childField) => {
        initializeFieldValues(childField, formValuesStep); // Recursive call
      });
    } else {
      console.warn("Field has no childFields or is not an array: ", field);
    }
  } else {
    // Ensure `formValuesStep` and `dynamicKey` are valid

    if (formValuesStep && field.dynamicKey) {
      if (!formValuesStep[field.dynamicKey]) {
        formValuesStep[field.dynamicKey] = fieldValues(field);
      }
    } else {
      console.warn(
        "Either formValuesStep is undefined or field.dynamicKey is invalid: ",
        { formValuesStep, dynamicKey: field?.dynamicKey }
      );
    }
  }
}

export const handleInputChange = (
  event,
  field,
  currentStep,
  formValues,
  setFormValues,
  errors,
  setErrors,
  ancestorsInfo,
  formKeys,
  setFormKeys
) => {
  const { name, value, type, checked } = event.target;

  // Ensure formValues is an array or object, handle accordingly
  const updatedValues = Array.isArray(formValues)
    ? [...formValues]
    : { ...formValues };
  const stepValues = updatedValues[currentStep] || {}; // Copy current step values

  // Use dynamicKey if it exists, otherwise fall back to name
  const key = field?.dynamicKey || name;
  if (value == null || value == undefined) return;

  // Update the value based on the input type
  if (type === "checkbox") {
    stepValues[key] = checked;
  } else {
    stepValues[key] = value;
  }

  // Set the updated step values back to the form values array
  updatedValues[currentStep] = stepValues;
  setFormValues(updatedValues);

  if (formValues[0] && name === "name" && formValues[0].type === "section") {
    const keyToMatch = ancestorsInfo
      ? ancestorsInfo + "_" + formValues[0].name
      : formValues[0].name;

    const keyToReplace = ancestorsInfo
      ? ancestorsInfo + "_" + updatedValues[0].name
      : updatedValues[0].name;

    const updatedFormKeys = formKeys.map((key) => {
      if (key.startsWith(keyToMatch)) {
        const suffix = key.slice(keyToMatch.length);
        return keyToReplace + suffix;
      }
      // If the key does not match, return it as is
      return key;
    });

    setFormKeys(updatedFormKeys);
  }

  // Clear the error for the field? if it's being updated
  // setErrors({
  //   ...errors,
  //   [field?.dynamicKey || name]: null,
  // });
  if (setErrors && key) {
    setErrors({
      ...errors,
      [field?.dynamicKey || name]: null,
    });
  }
};
export const handleAdditionofTableOfField = (
  submittedData,
  field,
  formValues,
  setFormValues,
  currentStep
) => {
  
  const currentName = field?.dynamicKey;

  // Create a copy of the current formValues
  const updatedFormValues = Array.isArray(formValues)
    ? [...formValues]
    : { ...formValues }; // Handle as an object if not an array

  // Update the specific field? with submittedData
  updatedFormValues[currentStep] = {
    ...updatedFormValues[currentStep],
    [currentName]: submittedData, // Replace the previous value with submittedData
  };

  // Update the state with the new formValues
  setFormValues(updatedFormValues);
};
export const handleAdditionofListOfFields = (
  submittedData,
  field,
  formValues,
  setFormValues,
  currentStep
) => {
  const currentName = field?.dynamicKey;
 console.log('handleAdditionofListOfFields ::::', submittedData, formValues);
  // Create a copy of the current formValues
  const updatedFormValues = Array.isArray(formValues)
    ? [...formValues]
    : { ...formValues }; // Handle as an object if not an array

  // Update the specific field? with submittedData
  updatedFormValues[currentStep] = {
    ...updatedFormValues[currentStep],
    [currentName]: JSON.stringify(submittedData), // store as string
  };

  // Update the state with the new formValues
  setFormValues(updatedFormValues);
};

export function selectDependantField(
  field,
  formValues,
  currentStep
) {
  if (!field?.selectDependantHandled) {
    let valuesOfDependant = [];

    const dependOptions = field?.dependOptionsOn;
    const keyMatch = field?.dependOptionsKeymatch;

    const extractedKey = field?.dynamicKey;
    const newNamePath = `${extractedKey}.dependOptionsPath`;
    const newNameKey = `${extractedKey}.dependOptionsKey`;

    // Initialize dependant options path and key in form values if not set

    if (!formValues[currentStep][newNamePath]) {
      formValues[currentStep][newNamePath] = field?.dependOptionsOn;
    }
    if (!formValues[currentStep][newNameKey]) {
      formValues[currentStep][newNameKey] = field?.dependOptionsKeymatch;
    }

    // Traverse through each object in formValues to find the dependOptions key
    formValues.forEach((formObj, index) => {
      if (formObj[dependOptions] !== undefined) {
        valuesOfDependant = formObj[dependOptions];
      }
    });

    let valuesHere = [];
    valuesOfDependant.forEach((depend) => {
      if (depend && typeof depend === "object") {
        if (Array.isArray(depend[keyMatch])) {
          depend[keyMatch].forEach((obj) => {
            if (obj && typeof obj === "object") {
              const firstKey = Object.keys(obj)[0];
              const label = obj[firstKey];
              let newOption = { value: label, label: label };
              valuesHere.push(newOption);
            }
          });
        } else {
          if (depend[keyMatch]) {
            const label = depend[keyMatch];
            let newOption = { value: label, label: label };
            valuesHere.push(newOption);
          }
        }
      }
    });
    field.options = valuesHere;
  }
}

export const handleFileChange = (
  event,
  setFormValues,
  currentStep,
  setErrors
) => {
  const { name, files, multiple } = event.target;
  console.log('handleFileChange ::::', event);
  setFormValues((prevValues) => {
    const updatedValues = [...prevValues];
    const currentStepValues = { ...updatedValues[currentStep] };
    
    if (multiple) {
      let existingFiles = currentStepValues[name];
      if (!Array.isArray(existingFiles))
   
      currentStepValues[name] = [...existingFiles, files];
    } else {
     
      currentStepValues[name] = files?.length ? [files[0]] : [files];
    }

    updatedValues[currentStep] = currentStepValues;
    return updatedValues;
  });

  setErrors((prevErrors) => ({
    ...prevErrors,
    [name]: null,
  }));
};
export const handleRemoveFile = (
  fileToRemove,
  setUploadedFiles,
  uploadedFiles,
  field,
  formValues,
  setFormValues,
  currentStep,
  setErrors
) => {
  // Remove from uploadedFiles state
  if (Array.isArray(uploadedFiles)) {
    const filteredFiles = uploadedFiles.filter(
      (file) => file !== fileToRemove // Use direct comparison instead of name matching
    );
    setUploadedFiles(filteredFiles);
  } else {
    // If not an array, remove the value entirely
    setUploadedFiles([]);
  }

  // Clear the form value for this field
  if (field?.dynamicKey && formValues && setFormValues) {
    setFormValues((prevValues) => {
      const updatedValues = [...prevValues];
      const currentStepValues = { ...updatedValues[currentStep] };
      currentStepValues[field.dynamicKey] = null; // Clear the field value
      updatedValues[currentStep] = currentStepValues;
      return updatedValues;
    });
  }

  // Clear any errors for this field
  if (setErrors && field?.dynamicKey) {
    setErrors((prevErrors) => ({
      ...prevErrors,
      [field.dynamicKey]: null,
    }));
  }
};

export const handleRemoveAllFiles = (
  uploadedFiles,
  setUploadedFiles,
  field,
  formValues,
  setFormValues,
  currentStep,
  setErrors
) => {
  // Clear all uploaded files
  setUploadedFiles([]);
  
  // Clear the form value for this field
  if (field?.dynamicKey && formValues && setFormValues) {
    setFormValues((prevValues) => {
      const updatedValues = [...prevValues];
      const currentStepValues = { ...updatedValues[currentStep] };
      currentStepValues[field.dynamicKey] = null; // Clear the field value
      updatedValues[currentStep] = currentStepValues;
      return updatedValues;
    });
  }

  // Clear any errors for this field
  if (setErrors && field?.dynamicKey) {
    setErrors((prevErrors) => ({
      ...prevErrors,
      [field.dynamicKey]: null,
    }));
  }
};

// ============================================================================
// SPECIFIC ATTRIBUTES UTILITIES
// ============================================================================

/**
 * Merge specific_attributes back into the main data object
 * Used for view/edit modes when API returns data with specific_attributes separated
 * @param {Object|Array} data - The data object(s) that might contain specific_attributes
 * @returns {Object|Array} - Data with specific_attributes merged back into main object
 */
export const mergeSpecificAttributesIntoData = (data) => {
  console.log("📥 [HelperFunctions] Merging specific_attributes back into data");
  console.log("📥 [HelperFunctions] Input data:", data);
  
  if (!data || typeof data !== 'object') {
    console.log("📥 [HelperFunctions] No data to merge");
    return data;
  }
  
  // Handle array of data objects
  if (Array.isArray(data)) {
    return data.map(item => {
      if (item && typeof item === 'object' && item.specific_attributes) {
        const { specific_attributes, ...regularData } = item;
        const merged = { ...regularData, ...specific_attributes };
        console.log("📥 [HelperFunctions] Merged array item:", merged);
        return merged;
      }
      return item;
    });
  }
  
  // Handle single data object
  if (data.specific_attributes && typeof data.specific_attributes === 'object') {
    const { specific_attributes, ...regularData } = data;
    const merged = { ...regularData, ...specific_attributes };
    console.log("📥 [HelperFunctions] Merged single object:", merged);
    return merged;
  }
  
  console.log("📥 [HelperFunctions] No specific_attributes found");
  return data;
};

/**
 * Extract specific attributes from form data into a separate object
 * Used for submission to create the specific_attributes structure
 * @param {Array} formValues - Array of form step values
 * @param {Array} additionalFields - Array of field definitions that are considered additional
 * @returns {Object} - Object containing only the specific attributes
 */
export const extractSpecificAttributes = (formValues, additionalFields) => {
  console.log("📋 [HelperFunctions] Extracting specific attributes from form values");
  console.log("📋 [HelperFunctions] Input formValues:", formValues);
  console.log("📋 [HelperFunctions] Input additionalFields:", additionalFields);
  
  const specificAttributes = {};

  // If we don't have additional fields detected, try a fallback approach
  if (!additionalFields || additionalFields.length === 0) {
    console.log("📋 [HelperFunctions] No additional fields detected via flags, using conservative approach");
    console.log("📋 [HelperFunctions] Available form fields:", Object.keys(formValues[0] || {}));
    
    // For now, only include explicitly marked additional fields
    // You can customize this logic based on your specific requirements
    return specificAttributes;
  }

  // Extract values for additional fields from formValues
  formValues.forEach((stepValues, stepIndex) => {
    if (stepValues && typeof stepValues === 'object') {
      Object.keys(stepValues).forEach(fieldKey => {
        // Check if this field key belongs to additional fields
        const isAdditionalField = additionalFields.some(field => 
          field.dynamicKey === fieldKey || 
          field.name === fieldKey ||
          field.isAdditionalField ||
          field.loadedFromServer
        );
        
        if (isAdditionalField) {
          specificAttributes[fieldKey] = stepValues[fieldKey];
          console.log(`📋 [HelperFunctions] Added to specific attributes: ${fieldKey} = ${stepValues[fieldKey]}`);
        }
      });
    }
  });
  
  console.log("📋 [HelperFunctions] Final specific attributes:", specificAttributes);
  return specificAttributes;
};

/**
 * Prepare form data for submission by separating specific attributes
 * @param {Object} stepFormValues - Form values for the current step
 * @param {Array} additionalFields - Array of additional field definitions
 * @returns {Object} - Submission data with specific_attributes separated
 */
export const prepareFormDataForSubmission = (stepFormValues, additionalFields) => {
  console.log("📤 [HelperFunctions] Preparing form data for submission");
  console.log("📤 [HelperFunctions] Input stepFormValues:", stepFormValues);
  console.log("📤 [HelperFunctions] Input additionalFields:", additionalFields);
  
  // Extract specific attributes
  const specificAttributes = extractSpecificAttributes([stepFormValues], additionalFields);
  
  // Create a copy of stepFormValues without the additional fields
  const regularFormValues = { ...stepFormValues };
  
  // Remove additional fields from regular form values to avoid duplication
  if (additionalFields && additionalFields.length > 0) {
    additionalFields.forEach(field => {
      const fieldKey = field.dynamicKey || field.name;
      if (fieldKey && regularFormValues.hasOwnProperty(fieldKey)) {
        delete regularFormValues[fieldKey];
      }
    });
  }
  
  // Create the submission object
  const submissionData = {
    ...regularFormValues, // Regular form values (without additional fields)
    specific_attributes: specificAttributes // Additional attributes
  };
  
  console.log("📤 [HelperFunctions] Prepared submission data:", submissionData);
  return submissionData;
};

/**
 * Check if a field is marked as an additional field
 * @param {Object} field - Field definition object
 * @returns {boolean} - True if field is additional
 */
export const isAdditionalField = (field) => {
  return !!(
    field.isAdditionalField || 
    field.loadedFromServer || 
    field.isAdditional || 
    field.fromServer
  );
};

/**
 * Filter form values to get only additional fields
 * @param {Object} formValues - Form values object
 * @param {Array} allFields - Array of all field definitions
 * @returns {Object} - Object containing only additional field values
 */
export const getAdditionalFieldValues = (formValues, allFields) => {
  console.log("📋 [HelperFunctions] Getting additional field values");
  const additionalValues = {};
  
  if (!formValues || !allFields) {
    return additionalValues;
  }
  
  // Find all additional fields
  const additionalFields = allFields.filter(isAdditionalField);
  
  // Extract values for additional fields
  additionalFields.forEach(field => {
    const fieldKey = field.dynamicKey || field.name;
    if (fieldKey && formValues.hasOwnProperty(fieldKey)) {
      additionalValues[fieldKey] = formValues[fieldKey];
    }
  });
  
  console.log("📋 [HelperFunctions] Additional field values:", additionalValues);
  return additionalValues;
};

/**
 * Filter form values to get only regular (non-additional) fields
 * @param {Object} formValues - Form values object
 * @param {Array} allFields - Array of all field definitions
 * @returns {Object} - Object containing only regular field values
 */
export const getRegularFieldValues = (formValues, allFields) => {
  console.log("📋 [HelperFunctions] Getting regular field values");
  const regularValues = { ...formValues };
  
  if (!allFields) {
    return regularValues;
  }
  
  // Find all additional fields and remove them from regular values
  const additionalFields = allFields.filter(isAdditionalField);
  
  additionalFields.forEach(field => {
    const fieldKey = field.dynamicKey || field.name;
    if (fieldKey && regularValues.hasOwnProperty(fieldKey)) {
      delete regularValues[fieldKey];
    }
  });
  
  console.log("📋 [HelperFunctions] Regular field values:", regularValues);
  return regularValues;
};

/**
 * Validate that specific attributes structure is correct
 * @param {Object} data - Data object to validate
 * @returns {boolean} - True if structure is valid
 */
export const validateSpecificAttributesStructure = (data) => {
  if (!data || typeof data !== 'object') {
    return false;
  }
  
  // Check if specific_attributes exists and is an object
  if (data.specific_attributes) {
    return typeof data.specific_attributes === 'object' && !Array.isArray(data.specific_attributes);
  }
  
  return true; // Valid if no specific_attributes present
};

/**
 * Enhanced form value initialization that considers additional fields
 * @param {Object} field - Field definition
 * @param {Object} formValuesStep - Form values for current step
 * @param {Object} existingData - Existing data that might contain specific_attributes
 */
export const initializeFieldValuesWithSpecificAttributes = (field, formValuesStep, existingData = null) => {
  console.log("🔄 [HelperFunctions] Initializing field values with specific attributes support");
  
  // If we have existing data, merge specific_attributes first
  let mergedData = existingData;
  if (existingData && existingData.specific_attributes) {
    mergedData = mergeSpecificAttributesIntoData(existingData);
  }
  
  // Check if field is valid
  if (!field) {
    console.error("Invalid field object: ", field);
    return;
  }

  if (field.type === "section") {
    // Check if childFields is an array
    if (Array.isArray(field.childFields)) {
      field.childFields.forEach((childField) => {
        initializeFieldValuesWithSpecificAttributes(childField, formValuesStep, mergedData);
      });
    } else {
      console.warn("Field has no childFields or is not an array: ", field);
    }
  } else {
    // Ensure formValuesStep and dynamicKey are valid
    if (formValuesStep && field.dynamicKey) {
      // Check if value exists in merged data first
      const fieldKey = field.dynamicKey;
      
      if (mergedData && mergedData.hasOwnProperty(fieldKey)) {
        // Use value from existing data (including merged specific_attributes)
        formValuesStep[fieldKey] = mergedData[fieldKey];
        console.log(`🔄 [HelperFunctions] Set ${fieldKey} from existing data:`, mergedData[fieldKey]);
      } else if (!formValuesStep[fieldKey]) {
        // Initialize with default value if not in existing data
        formValuesStep[fieldKey] = fieldValues(field);
        console.log(`🔄 [HelperFunctions] Set ${fieldKey} to default value:`, formValuesStep[fieldKey]);
      }
    } else {
      console.warn(
        "Either formValuesStep is undefined or field.dynamicKey is invalid: ",
        { formValuesStep, dynamicKey: field?.dynamicKey }
      );
    }
  }
};
