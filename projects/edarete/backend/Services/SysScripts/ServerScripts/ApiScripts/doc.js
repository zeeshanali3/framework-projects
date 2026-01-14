const logMessage = require("../../../SysFunctions/LogFunctions/consoleLog.js");
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');


function snakeToSeparatedWords(snakeCaseStr) {
  return snakeCaseStr
      .split('_') 
      .map(word => word.charAt(0).toUpperCase() + word.slice(1)) 
      .join(' '); 
}

function camelToSeparatedWords(text) {
  if (!text) return '';
  const separated = text.replace(/([a-z0-9])([A-Z])/g, '$1 $2') // handle camelCase
                        .replace(/([A-Z]+)([A-Z][a-z])/g, '$1 $2'); // handle ALLCAPSWord
  return separated.charAt(0).toUpperCase() + separated.slice(1);
}



function flattenFieldsFromSteps(data) {
  const clonedData = JSON.parse(JSON.stringify(data || {}));
  let allFields = [];
  clonedData?.steps?.forEach((step) => {
    if (step.parameters && step.parameters.fields) {
      const flattened = flattenFields(step.parameters.fields);
      allFields = allFields.concat(flattened);
    }
  });
  return allFields;
}

function flattenFields(fields) {
  let flattenedFields = [];
  const clonedFields = JSON.parse(JSON.stringify(fields));
  clonedFields.forEach((field) => {
    if (field?.type === "section") {
      if (field.childFields && Array.isArray(field.childFields)) {
        flattenedFields = flattenedFields.concat(
          flattenFields(field.childFields)
        );
      }
    } else {
      const { dynamicKey, ...rest } = field;
      flattenedFields.push({
        ...rest,
        name: dynamicKey
      });
    }
  });
  return flattenedFields;
}

let apiStructure;

function toTitleCase(str) {
  return str.replace(/([A-Z])/g, ' $1').replace(/^./, str[0].toUpperCase()).trim();
}

function nameToUrl(name) {
  return '/' + name
    .replace(/_object$/, '')
    .split(/(?=[A-Z])/)
    .map(p => p?.toLowerCase())
    .join('/');
}

function extractFolderName(filePath) {
  const folders = filePath.split(path.sep);
  return folders[folders.length - 2]; 
}

function generateBodyFromFields(fields) {
  let body = {};
  fields.forEach(field => {
    if (field.name) {
      body[field.name] = "";
    }
  });
  return body;
}

function mapDirectory(dirPath) {
  const entries = fs.readdirSync(dirPath);
  entries.forEach(entry => {
    if (entry != "Documentation"){
      const entryPath = path.join(dirPath, entry);
      const stat = fs.statSync(entryPath);

      if (stat.isDirectory()) { 
        mapDirectory(entryPath); 
      } else if (entry === 'CRUD_parameters.js') {
        let baseFolder = path.basename(path.dirname(entryPath));
        let folderGroup = path.basename(path.dirname(path.dirname(entryPath))); 

        folderGroup = (folderGroup == "Objects" ? baseFolder : folderGroup);

        const paramData = require(entryPath);
        const objectFiles = fs.readdirSync(path.dirname(entryPath))
        .filter(f => f !== 'CRUD_parameters.js' && f.endsWith('.js'));
      
        const groupObj = apiStructure.find(f => f.id === folderGroup);
        let group = groupObj || {
          id: folderGroup,
          name: snakeToSeparatedWords(folderGroup),
          type: "folder",
          children: []
        };
        if (!groupObj) apiStructure.push(group);

        let subfolder = {
          id: baseFolder,
          name: snakeToSeparatedWords(baseFolder),
          type: "subfolder",
          children: []
        };

        objectFiles?.forEach(objFile => {
          const objectData = require(path.join(path.dirname(entryPath), objFile));
          const objectKey = Object.keys(objectData)[0];
          const version = objectData[objectKey]?.versions?.versionData?.[0]?.['*'] || objectData[objectKey]?.versions?.versionData?.[0]?.['=1.0'];
          const steps = version?.steps || [];
          const methods = steps[0]?.data?.requestMetaData?.requestMethod || {};

          const flattenedFields = flattenFieldsFromSteps(paramData);

          if (baseFolder == "AdminDashboard" || baseFolder == "DynamicAttachments"){
            logMessage([[objectData, objectKey, version, steps, methods]])
          }
          if (typeof(methods) == "object"){
            Object.entries(methods).forEach(([method, description], index) => {
              const stepTitle = paramData?.steps?.[index]?.title ||  paramData?.steps?.[0]?.title || baseFolder || "Unnamed";
              const headers = description === 'GET' ? [] : [{ key: "Content-Type", value: "application/json" }];
              let body;
              if (method == "List")
                body = {"actionPerformerURDD": ""}
              else if (method == "View")
                body = {"actionPerformerURDD": "","id":""};
              else
                body = generateBodyFromFields(flattenedFields);

              subfolder.children.push({
                id: uuidv4(),
                name: method + " " + stepTitle,
                url: nameToUrl(objectKey),
                method: description,
                headers,
                body,
                description: method + " Request To " + stepTitle + " API"
              });
            });
          }
          else{
            const stepTitle = paramData?.steps?.[index]?.title ||  paramData?.steps?.[0]?.title || "Unnamed";
            const headers = methods === 'GET' ? [] : [{ key: "Content-Type", value: "application/json" }];
            let body;
            if (methods == "GET")
              body = `"actionPerformerURDD": ""`
            else
              body = generateBodyFromFields(flattenedFields);

            subfolder.children.push({
              id: uuidv4(),
              name: methods + " " + stepTitle,
              url: nameToUrl(objectKey),
              method: methods,
              headers,
              body,
              description: methods + " Request To " + stepTitle + " API"
            });
          }
        }
        );

        group.children.push(subfolder);
      }
      else if ((fs.readdirSync(path.dirname(entryPath)).filter(f => f === 'CRUD_parameters.js')).length == 0){
        let baseFolder = path.basename(path.dirname(entryPath));
        let folderGroup = path.basename(path.dirname(path.dirname(entryPath))); 
        folderGroup = (folderGroup == "Objects" ? baseFolder : folderGroup);

        const groupObj = apiStructure.find(f => f.id === folderGroup);
        let group = groupObj || {
          id: folderGroup,
          name: snakeToSeparatedWords(folderGroup),
          type: "folder",
          children: []
        };
        if (!groupObj) apiStructure.push(group);

        const id = baseFolder !== "Objects" ? baseFolder : folderGroup
        const subFolderObj = (group.children).find(f => f.id === id)
        let subfolder = subFolderObj || {
          id: id,
          name: camelToSeparatedWords(snakeToSeparatedWords(id)),
          type: "subfolder",
          children: []
        };
        const objectData = require(entryPath);
        const objectKey = Object.keys(objectData)[0];
        const version = objectData[objectKey]?.versions?.versionData?.[0]?.['*'] || objectData[objectKey]?.versions?.versionData?.[0]?.['=1.0'];
        const steps = version?.steps || [];
        const methods = steps[0]?.data?.requestMetaData?.requestMethod || {};
        const paramData = steps[0]?.data?.parameters

        const flattenedFields = flattenFieldsFromSteps(paramData);
        if (typeof(methods) == "object"){
          Object.entries(methods).forEach(([method, description], index) => {
            const stepTitle = paramData?.steps?.[index]?.title ||  paramData?.steps?.[0]?.title || baseFolder || "Unnamed";
            const headers = description === 'GET' ? [] : [{ key: "Content-Type", value: "application/json" }];
            let body;
            if (method == "List")
              body = {"actionPerformerURDD": ""}
            else if (method == "View")
              body = {"actionPerformerURDD": "","id":""};
          else
              body = generateBodyFromFields(flattenedFields);

            subfolder.children.push({
              id: uuidv4(),
              name: method + " " + stepTitle,
              url: nameToUrl(objectKey),
              method: description,
              headers,
              body,
              description: method + " Request To " + stepTitle + " API"
            });
          });
        }
        else{
          const stepTitle = paramData?.steps?.[0]?.title || `${camelToSeparatedWords(snakeToSeparatedWords(objectKey))} Info`;
          const headers = methods === 'GET' ? [] : [{ key: "Content-Type", value: "application/json" }];
          let body;
          if (methods == "GET"){
            body = {"actionPerformerURDD": ""}
          }
          else{
            body = generateBodyFromFields(flattenedFields);
          }

          let content = {
            id: uuidv4(),
            name: methods + " " + stepTitle,
            url: nameToUrl(objectKey),
            method: methods,
            headers,
            body,
            description: methods + " Request To " + stepTitle + " API"
          }
          subfolder.children.push(content);
        }
        if (!subFolderObj) group.children.push(subfolder)
      }
    }

  });
}

async function payload () {
  apiStructure = [];
  const basePath = path.join(__dirname, '../../../Objects');
  mapDirectory(basePath);

  return apiStructure
}

module.exports = payload;
