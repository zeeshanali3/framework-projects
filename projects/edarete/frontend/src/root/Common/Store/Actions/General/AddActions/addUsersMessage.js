import { ADD_USERS_MESSAGE_BY_CHAT_ID } from "../../ActionTypes/ApiActionTypes";
import {
  REDUX_ADD_USERS_MESSAGE_BY_CHAT_ID,
  
} from "../../ActionTypes/ReduxActionTypes";
export const sendNewMessageWithApi = (messageData, onSuccess, onFailure) => {
  return {
    type: ADD_USERS_MESSAGE_BY_CHAT_ID,
    payload: {
      requestType: "POST",
      apiUrl: `http://192.168.1.220:3000/api/crud/chat/messages`, // Replace with your actual endpoint
      reduxActionType: REDUX_ADD_USERS_MESSAGE_BY_CHAT_ID, // For the API response
      useBaseURL: false,
      metaData: true,
      body: messageData,
      isEncrypted: false,
      header: "application/json",
      onSuccess: onSuccess,
      // (response) => {
      //   // First dispatch optimistic update
      //   return {
      //     type:  REDUX_ADD_USERS_MESSAGE_BY_CHAT_ID,
      //     payload: {
      //       chatId,
      //       message: {
      //         ...messageData,
      //         status: "sent",
      //         serverId: response.id, // If server generates new ID
      //       },
      //     },
      //   };
      // },
      onFailure: onFailure,
      //  (error) => {
      //   return {
      //     type: REDUX_UPDATE_MESSAGE_STATUS,
      //     payload: {
      //       chatId,
      //       messageId: messageData.id,
      //       status: "failed",
      //     },
      //   };
      // },
    },
  };
};
export const sendNewMessage = (chatId, messageData, onSuccess, onFailure) => ({
  type: REDUX_ADD_USERS_MESSAGE_BY_CHAT_ID,
  payload: {
    chatId: chatId,
    message: messageData,
    onSuccess: onSuccess,
    onFailure: onFailure,
  },
});
