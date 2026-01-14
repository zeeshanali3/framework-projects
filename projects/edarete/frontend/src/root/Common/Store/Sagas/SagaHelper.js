import { select, put, delay } from "redux-saga/effects";
import { encryptObject, decryptObject } from "./encryption"; // Assuming these are your encryption/decryption utils
import constants from "../../Constants";
import { REDUX_LOGOUT_CURRENT_USER } from "../Actions/ActionTypes/ReduxActionTypes";
import { showErrorToast } from "../../ToastUtils";
import { all } from "axios";
import { toast } from "react-toastify";
const debug_log = (should_log, text, variable) => {
  if (should_log) {
    console.log(`*** text *** ${text} ************`);
    console.log(`*** variable *** ${variable} ************`);
  }
};
function* fetchData(action, queryParameter, queryParameterId) {
  console.log(
    "********* SAGHELPER ACTION: ********",
    action,
    `\n*******   [queryParameter: ${queryParameter} ]\n******** [queryParameterId:${queryParameterId} ]********\n`
  );
  const updated_action = action?.payload || action;

  try {
    console.log("ENV CHECK", import.meta.env);

    const all_state = yield select((state) => state.main);
    if (
      !import.meta.env.VITE_PLATFORM_KEY ||
      !import.meta.env.VITE_SECRET_KEY
    ) {
      console.log("Encryption Failed");
      updated_action?.onFailure({
        status: 401,
        frameworkStatusCode: "E44",
        message: "Encryption Failed [ Env not found ].",
      });
      return;
    }
    const currentUser = yield select((state) => state); // Fetch the entire state
    const { userSelectedRole } = currentUser.main;
    const nextPart = updated_action?.apiUrl;
    const useBaseURL =
      updated_action?.useBaseURL == false ? false : true || true;
    const isFile = updated_action?.isFile == true ? true : false || false;
    // const isEncrypted = false;
    const isEncrypted =
      updated_action?.isEncrypted == false ? false : true || false;
    if (!nextPart || nextPart === "") {
      console.log("API URL is undefined or empty, skipping API call");
      updated_action?.onFailure({
        status: 400,
        frameworkStatusCode: "E12",
        message: "API URL is missing or invalid.",
      });
      return;
    }
    let completeUrl = useBaseURL ? constants?.base_url + nextPart : nextPart;
    if (queryParameter && queryParameter !== "" && !isFile) {
      // For file uploads, don't modify the URL as it's a pre-signed S3 URL
      completeUrl += queryParameter;
    }
    if (queryParameterId && queryParameterId !== "") {
      completeUrl += "&id=" + queryParameterId;
    }
    const hasMetaData = updated_action?.metaData;
    const isFormData = updated_action?.formData;
    const accessToken = all_state?.accesstoken || null;
    // If updated_action explicitly provides isEncriptionByAccessToken, honor its boolean value.
    // Otherwise default to true.
    const isAccessTokenRequired =
      Object.prototype.hasOwnProperty.call(updated_action || {}, 'isEncriptionByAccessToken')
        ? Boolean(updated_action.isEncriptionByAccessToken)
        : true;
    console.log("Access Token Required:", isAccessTokenRequired, updated_action);
    const encryptionKey = !isAccessTokenRequired
            ? import.meta.env.VITE_PLATFORM_KEY
            : accessToken + import.meta.env.VITE_PLATFORM_KEY;
 console.log("Encryption Key Used:", encryptionKey);
    const request = {
      headers: {
        ...(isFormData ? {} : { "Content-Type": "application/json" }),
        accesstoken: accessToken,
      },
      method: updated_action?.requestType || "GET",
    };

    if (hasMetaData && accessToken === null) {
      console.warn(
        "metaData is true but access token is not present in header"
      );
      // Optionally handle unauthorized access
      // updated_action?.onFailure?.({
      //   status: 401,
      //   frameworkStatusCode: "E40",
      //   message: "Invalid or expired token.",
      // });
      // return;
    }

    if (updated_action?.body && updated_action?.requestType !== "GET") {
      if (updated_action?.requestType === "DELETE") {
        if (isEncrypted) {
          const deleteEncryption = encryptObject(
            {
              Id: `${updated_action?.body?.Id || null}`,
              actionPerformerURDD:
                userSelectedRole?.user_role_designation_department_id,
            },
            encryptionKey
            // import.meta.env.VITE_PLATFORM_KEY
          );
          const secondEncryption = {
            reqData: deleteEncryption,
            encryptionDetails: {
              PlatformName: import.meta.env.VITE_PLATFORM_NAME,
              PlatformVersion: import.meta.env.VITE_PLATFORM_VERSION,
            },
          };

          request.headers.encryptedrequest = encryptObject(
            secondEncryption,
            import.meta.env.VITE_SECRET_KEY
          );
        } else {
          request.headers.reqData = {
            Id: `${action?.body?.Id || null}`,
            actionPerformerURDD:
              userSelectedRole?.user_role_designation_department_id,
          };
        }
      } else {
        if (isEncrypted) {
          request.body = {
            encryptedRequest: {},
          };
          const finalActionBody = !isFormData
            ? {
                ...(updated_action?.body || null), // Spread existing body or payload body
                actionPerformerURDD:
                  userSelectedRole?.user_role_designation_department_id, // Add actionPerformerURDD
              }
            : updated_action?.body;
          console.log(
            "***************** Final Updated Body ***************** ",
            finalActionBody
          );
          const firstEncryption = encryptObject(
            finalActionBody,encryptionKey
            // import.meta.env.VITE_PLATFORM_KEY
          );
          const secondEncryption = {
            reqData: firstEncryption,
            encryptionDetails: {
              PlatformName: import.meta.env.VITE_PLATFORM_NAME,
              PlatformVersion: import.meta.env.VITE_PLATFORM_VERSION,
            },
          };
          request.body.encryptedRequest = encryptObject(
            secondEncryption,
            import.meta.env.VITE_SECRET_KEY
          );
          request.body = JSON.stringify(request?.body);
        } else {
          if (!isFormData) {
            request.body = JSON.stringify({
              ...(updated_action?.body || {}), // Ensure an empty object if undefined
              actionPerformerURDD:
                userSelectedRole?.user_role_designation_department_id,
            });
          } else {
            request.body = updated_action?.body;
          }
        }
      }
    } else {
      if (isEncrypted) {
        request.headers = {
          ...request?.headers,
          encryptedRequest: {},
        };
        const finalActionBody = !isFormData
          ? {
              ...(updated_action?.body || {}), // Ensure an empty object if undefined
              actionPerformerURDD:
                userSelectedRole?.user_role_designation_department_id,
            }
          : updated_action?.body;
        console.log(
          "***************** Final Updated Body ***************** ",
          finalActionBody
        );
        const firstEncryption = encryptObject(
          finalActionBody,encryptionKey
          // import.meta.env.VITE_PLATFORM_KEY
        );
        const secondEncryption = {
          reqData: firstEncryption,
          encryptionDetails: {
            PlatformName: import.meta.env.VITE_PLATFORM_NAME,
            PlatformVersion: import.meta.env.VITE_PLATFORM_VERSION,
          },
        };
        request.headers.encryptedRequest = encryptObject(
          secondEncryption,
          import.meta.env.VITE_SECRET_KEY
        );
      } else {
        request.headers = !isFormData
          ? {
              ...request?.headers,
              reqData: JSON.stringify({
                actionPerformerURDD:
                  userSelectedRole?.user_role_designation_department_id,
              }),
            }
          : request?.headers;
      }
    }
    console.log("Complete URL", completeUrl);
    if (completeUrl !== "") {
      console.log(
        "***************** API_Request_After_Encryption *************\n",
        request
      );
      const response = yield fetch(completeUrl, request).catch((err) => {
        console.error(`Network error: ${err}`);
        console.log(`Network error: ${err?.message}`);
        return;
      });

      // For file uploads, handle response differently
      if (isFile) {
        console.log("File upload response:", response);
        // For file uploads, S3 returns empty response but status 200
        if (response.ok) {
          console.log("File upload successful, calling onSuccess with empty response");
          if (typeof updated_action?.onSuccess === "function") {
            updated_action?.onSuccess(response);
          }
        } else {
          // File upload failed
          if (
            updated_action?.onFailure &&
            typeof updated_action?.onFailure === "function"
          ) {
            updated_action?.onFailure({
              status: response.status,
              message: "File upload failed",
            });
          }
        }
        return;
      }
      
      // For non-file requests, parse JSON
      let responseData;
      try {
        responseData = yield response.json();
      } catch (jsonError) {
        console.error("JSON parsing failed:", jsonError);
        if (
          updated_action?.onFailure &&
          typeof updated_action?.onFailure === "function"
        ) {
          updated_action?.onFailure({
            message: "Invalid response format from server",
            error: jsonError.message
          });
        }
        return;
      }
      
      // For non-file requests, check status as usual
      if (responseData.status !== 200) {
        // Handle invalid/expired token: logout and redirect to login
        const isInvalidToken =
          responseData?.status === 401 ||
          responseData?.scc === "E40" ||
          responseData?.payload === "Invalid Token" ||
          /invalid\s*token/i.test(responseData?.message || "");
        if (isInvalidToken) {
          // Show toast first then wait a moment so it renders
          if (typeof window !== "undefined") {
            showErrorToast(
              responseData?.message ||
                "Your session has expired. Please log in again to continue."
            );
          }
          yield delay(1500);
          try {
            yield put({ type: REDUX_LOGOUT_CURRENT_USER });
          } catch (_) {}
          if (typeof window !== "undefined") {
            window.location.href = "/";
          }
        }
        const frameworkErrorMessage = getFrameworkErrorMessage(
          responseData.status,
          responseData.scc
        );
        if (
          updated_action?.onFailure &&
          typeof updated_action?.onFailure === "function"
        ) {
          updated_action?.onFailure({
            status: responseData?.status,
            frameworkStatusCode: responseData?.scc,
            payload: responseData?.payload,
            message: frameworkErrorMessage || responseData?.message,
          });
        }
        return; // Stop processing further
      } else {
        if (responseData?.payload && isEncrypted) {
          responseData = decryptObject(
            responseData?.payload,
            encryptionKey
            // import.meta.env.VITE_PLATFORM_KEY
          );
        } else {
          responseData = !isFile ? responseData?.payload : response;
        }
        
        // Check for new accessToken in response payload and update Redux if found
        const newAccessToken = responseData?.accessToken || responseData?.access_token || responseData?.token;
        if (responseData && newAccessToken && newAccessToken !== accessToken) {
          // Update the accessToken directly in the state
          all_state.accesstoken = newAccessToken;
        }
        
     if (updated_action?.reduxActionType) {
  if (Array.isArray(updated_action.reduxActionType)) {
    // Handle multiple action types
    for (const type of updated_action.reduxActionType) {
      yield put({
        type,
        payload: responseData,
        requestParams: updated_action?.body,
      });
    }
  } else {
    // Handle single action type
    yield put({
      type: updated_action.reduxActionType,
      payload: responseData,
      requestParams: updated_action?.body,
    });
  }
}

        if (typeof updated_action?.onSuccess === "function") {
          console.log(
            "***************** API_Response *************\n ",
            completeUrl,
            responseData
           
          );
          updated_action?.onSuccess(responseData);
        }
      }
    }
  } catch (error) {
    console.error(`******** Error in fetchData ******* : ${error?.message}`);
    if (
      updated_action?.onFailure &&
      typeof updated_action?.onFailure === "function"
    ) {
      updated_action?.onFailure({ message: error.message });
    }
  }
}

// Helper to map framework error codes to messages
const getFrameworkErrorMessage = (statusCode, frameworkStatusCode) => {
  const errorMessages = {
    // Parameter Errors
    E10: "Parameter name does not exist.",
    E11: "Parameter validation failure.",
    E12: "Parameter missing in source.",
    E13: "Required parameter missing.",
    E14: "No request body found.",

    // API Info Errors
    E20: "Invalid or missing query nature.",
    E21: "Invalid or missing query payload.",
    E22: "Callback function error.",
    E23: "Callback function missing.",
    E24: "Payload function error.",
    E25: "Payload function missing.",

    // Request Metadata Errors
    E30: "Invalid or missing request method.",
    E31: "Invalid or missing permission.",
    E32: "Invalid page size value.",

    // Middleware Errors
    E40: "Invalid or expired token.",
    E41: "Permission validation failure.",
    E42: "OTP verification failure.",
    E43: "Object resolver failure.",
    E44: "Database connection failed.",

    // API Errors
    E50: "API version does not exist.",
    E51: "API object does not exist.",
    E52: "Mismatch request method.",
  };

  return (
    errorMessages[frameworkStatusCode] ||
    `Unexpected error (Code: ${frameworkStatusCode})`
  );
};
export default fetchData;
