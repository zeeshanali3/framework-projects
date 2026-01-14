
export const flattenFieldsFromSteps =(data) =>{
  // Deep clone the input data to avoid mutating the original object
  const clonedData = JSON.parse(JSON.stringify(data||{}));

  clonedData?.steps?.forEach((step) => {
    if (step.parameters && step.parameters.fields) {
      step.parameters.fields = flattenFields(step.parameters.fields); // Flatten fields in each step
    }
  });

  return clonedData;
}



function flattenFields(fields) {
  let flattenedFields = [];

  
  const clonedFields = JSON.parse(JSON.stringify(fields));
  clonedFields && clonedFields.forEach((field) => {
    if (field && (field.type === "section" )) {
      if (field.childFields && Array.isArray(field.childFields)) {
        flattenedFields = flattenedFields.concat(flattenFields(field.childFields));
      }
    } else {
      flattenedFields.push(field);
    }
  });

  return flattenedFields;
}
