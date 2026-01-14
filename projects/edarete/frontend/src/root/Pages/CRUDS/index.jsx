import React, { Suspense, useState, useEffect } from "react";
import ParentComp from "../../Components/DataLayout/ParentComp";
import LoadingOverlay from "../../Components/Loading/LoadingOverLay";


const TablesIndex = ({ selectedComponent,params }) => {
  console.log("selectedComponent", selectedComponent);
  const [listingCrudProps, setListingCrudProps] = useState(null);
  const convertFunctionString = (funcString) => {
    if (typeof funcString === 'string' && funcString.includes('=>')) {
      try {
        return new Function('return ' + funcString)();
      } catch (error) {
        console.warn('Failed to convert function string:', funcString, error);
        return () => console.log('Function not available');
      }
    }
    return funcString;
  };
  const processServerCommunication = (config) => {
    if (!config) return config;

    const processed = JSON.parse(JSON.stringify(config));

    // Recursively process the object to convert function strings
    const processObject = (obj) => {
      for (const key in obj) {
        if (typeof obj[key] === 'object' && obj[key] !== null) {
          processObject(obj[key]);
        } else if (key === 'onAction' && typeof obj[key] === 'string') {
          obj[key] = convertFunctionString(obj[key]);
        }
      }
    };

    processObject(processed);
    return processed;
  };
    const replaceParametersString = (obj, actualParameters) => {
    if (!obj) return obj;

    const processed = JSON.parse(JSON.stringify(obj));

    const replaceInObject = (target) => {
      for (const key in target) {
        if (typeof target[key] === 'object' && target[key] !== null) {
          replaceInObject(target[key]);
        } else if (target[key] === 'parameters') {
          target[key] = actualParameters;
        }
      }
    };

    replaceInObject(processed);
    return processed;
  };
  useEffect(() => {
    
    const loadProps = async () => {
      try {
        // './Task_flow_steps/CRUD_serverCommunication.js'
        if (selectedComponent) {
            const parametersModule = await import(
            `./Tables/${selectedComponent}/CRUD_parameters.json`
          );
          const serverCommModule = await import(
            `./Tables/${selectedComponent}/CRUD_serverCommunication.json`
          );
          
          // Extract the default export from dynamic imports
          const parameters = parametersModule.default;
          const module = serverCommModule.default;
          
          console.log("module and parameters :", module, parameters);
          const processedServerComm= processServerCommunication(module);
          const updatedConfig = replaceParametersString(processedServerComm, parameters);
          console.log("Updated module:", updatedConfig);
          setListingCrudProps(updatedConfig || module);
        }
      } catch (error) {
        console.log(`Failed to load module for ${selectedComponent}:`, error);
      }
    };

    loadProps();
  }, [selectedComponent]);


  if (!listingCrudProps) {
    return <LoadingOverlay isLoading />;
  }

  return (
    <Suspense fallback={<LoadingOverlay isLoading />}>
      {console.log("data props in Table", listingCrudProps)}
      <ParentComp
        data={listingCrudProps.data}
        config={listingCrudProps.config}
        appearance={listingCrudProps.appearance}
        params={params}
      />
    </Suspense>
  );
};

export default TablesIndex;
