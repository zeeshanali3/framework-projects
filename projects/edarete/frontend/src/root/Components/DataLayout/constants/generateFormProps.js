import serverCommunicationHelper from "./serverCommunicationHelper";
import { getServerResponse } from "../../Helpers/getServerResponse";

export default function generateFormProps(values) {
  const {
    parameters,
    apiUrl,
    additionAttributes = {},
    apiActionType = "",
    requestType = "GET",
    reduxActionType = "",
    mode,
    isServerDriven = true,
    // Optional: array of field objects to append into first section's childFields
  } = values;

  const serverCommunication = serverCommunicationHelper(additionAttributes);

  const addSubmitButtonAfterLastStep = (steps) => {
    const updatedSteps = [...steps]; // Create a shallow copy of steps
    const lastStepIndex = updatedSteps.length - 1;
    // ...existing code...
    return updatedSteps;
  };

  const removeDuplicateButtons = (buttons) => {
    const uniqueButtons = [];
    const seenTypes = new Set();
    for (const button of buttons) {
      if (!seenTypes.has(button.type)) {
        seenTypes.add(button.type);
        uniqueButtons.push(button);
      }
    }
    return uniqueButtons;
  };

  // Add the button to the steps
  const updatedSteps = addSubmitButtonAfterLastStep(parameters.steps);
  const appendFieldsToFirstSection = (steps, fieldsToAppend) => {
    if (!Array.isArray(steps) || steps.length === 0) return steps;
    if (!Array.isArray(fieldsToAppend) || fieldsToAppend.length === 0)
      return steps;

    // Deep clone to avoid side-effects on incoming steps
    const cloned = JSON.parse(JSON.stringify(steps));
    const firstStep = cloned[0];
    const firstFields = firstStep?.parameters?.fields;

    if (Array.isArray(firstFields) && firstFields.length > 0) {
      const firstSection = firstFields[0];

      if (Array.isArray(firstSection.childFields)) {
        firstSection.childFields = [
          ...firstSection.childFields,
          ...fieldsToAppend,
        ];
      } else {
        firstSection.childFields = [...fieldsToAppend];
      }
    }

    return cloned;
  };

  // Now we can safely call the function after it's been declared

  // Create a reactive steps object that can be updated
  const stepsManager = {
    _steps: updatedSteps,
    _hasLoadedAdditionalFields: false,
    _listeners: new Set(),

    get steps() {
      return this._steps;
    },

    updateSteps(newSteps) {
      // ...existing code...
      this._steps = newSteps;
      // Notify all listeners
      this._listeners.forEach((listener, index) => {
        try {
          listener(newSteps);
        } catch (error) {
          // ...existing code...
        }
      });
    },

    onStepsUpdate(callback) {
      this._listeners.add(callback);
      // Return unsubscribe function
      return () => {
        this._listeners.delete(callback);
      };
    },

    async loadAdditionalFields() {
      if (this._hasLoadedAdditionalFields) {
        // ...existing code...
        return this._steps;
      }

      if (!serverCommunication) {
        return this._steps;
      }

      // Set loading flag immediately to prevent concurrent calls
      this._hasLoadedAdditionalFields = true;

      try {
        // Create a promise that resolves when onSuccess is called
        const loadFieldsPromise = new Promise((resolve, reject) => {
          // Store original callbacks if they exist
          const originalOnSuccess = serverCommunication.onSuccess;
          const originalOnFailure = serverCommunication.onFailure;

          // Override onSuccess to handle the response
          serverCommunication.onSuccess = (res) => {
            // ...existing code...
            const additionalChildFields = res?.specific_attributes_array;

            if (
              additionalChildFields &&
              Array.isArray(additionalChildFields) &&
              additionalChildFields.length > 0
            ) {
              // Mark each additional field with a flag to identify it later
              const markedAdditionalFields = additionalChildFields.map(
                (field) => ({
                  ...field,
                  isAdditionalField: true, // Add flag to identify as additional
                  loadedFromServer: true, // Another flag for clarity
                })
              );

              const newSteps = appendFieldsToFirstSection(
                this._steps,
                markedAdditionalFields
              );
              this.updateSteps(newSteps);
              this._hasLoadedAdditionalFields = true;
              // ...existing code...
              resolve(newSteps);
            } else {
              resolve(this._steps);
            }

            // Call original onSuccess if it existed
            if (originalOnSuccess) {
              originalOnSuccess(res);
            }
          };

          // Override onFailure to handle errors
          serverCommunication.onFailure = (error) => {
            // ...existing code...
            // Reset the flag so it can be retried
            this._hasLoadedAdditionalFields = false;
            reject(error);

            // Call original onFailure if it existed
            if (originalOnFailure) {
              // ...existing code...
              originalOnFailure(error);
            }
          };

          // Make the server request
          // ...existing code...
          getServerResponse(serverCommunication);
        });

        return await loadFieldsPromise;
      } catch (error) {
        // ...existing code...
        // Reset the flag so it can be retried
        this._hasLoadedAdditionalFields = false;
        return this._steps;
      }
    },
  };

  // ...existing code...
  return {
    data: {
      features: {
        submission: {
          steps: stepsManager.steps,
          stepsManager: stepsManager, // Provide access to the manager for dynamic updates
          serverCommunication: serverCommunicationHelper({
            parameters,
            apiUrl,
            apiActionType,
            requestType: requestType,
            reduxActionType,
          }),
        },
        fetchData: {
          serverCommunication: serverCommunicationHelper({
            parameters,
            apiUrl,
            apiActionType: "",
            requestType: "GET",
            reduxActionType,
          }),
        },
      },
    },
    config: {
      viewMode: {
        presentation: "modalView",
        mode: mode,
      },
      features: {
        submission: {
          enable: isServerDriven,
          operationalMode: isServerDriven ? "server" : "local",
        },
        fetchData: {
          enable: isServerDriven,
          operationalMode: isServerDriven ? "server" : "local",
        },
      },
    },
    appearance: {
      light: {
        features: {
          submission: {
            button: [
              {
                type: "confirm",
                backgroundColor: "#fff",
                color: "#fff",
              },
            ],
          },
          form: {
            field: {
              color: "blue",
              backgroundColor: "#fff",
            },
            card: {
              color: "#000000",
              backgroundColor: "#fcfcfc",
              dragBackgroundColor: "#f0faff",
            },
          },
        },
      },
      dark: {
        features: {
          submission: {
            button: [
              {
                type: "confirm",
                backgroundColor: "#fff",
                color: "#fff",
              },
            ],
          },
          form: {
            field: {
              color: "#fff",
              backgroundColor: "black",
            },
            card: {
              color: "#fff",
              backgroundColor: "#181827ff",
              dragBackgroundColor: "#09090eff",
            },
          },
        },
      },
    },
  };
}
