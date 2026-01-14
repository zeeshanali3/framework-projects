import { REDUX_UPDATE_USERS_MESSAGE_BY_CHAT_ID } from "../../ActionTypes/ReduxActionTypes";
import { UPDATE_USERS_MESSAGE_BY_CHAT_ID } from "../../ActionTypes/ApiActionTypes";
export const updateMessage = (
  chatId,
  messageId,
  update,
  onSuccess,
  onFailure
) => {
  //   type:UPDATE_USERS_MESSAGE_BY_CHAT_ID,
  //   payload: {
  //     chatId,
  //     messageId,
  //     updates, // Object containing fields to update
  //   },
  // });
  console.warn("updateMessage", chatId, messageId, update);
  return {
    type: UPDATE_USERS_MESSAGE_BY_CHAT_ID,
    payload: {
      requestType: "PUT",
      apiUrl: `http://192.168.1.220:3000/api/crud/chat/messages?id=1`,
      reduxActionType: REDUX_UPDATE_USERS_MESSAGE_BY_CHAT_ID,
      useBaseURL: false,
      metaData: true,
      body: {
        chat_id: chatId,
        chatMessages_message_body: update,
        ChatMessages_id: messageId,
      },
      isEncrypted: true,
      header: "application/json",
      onSuccess: onSuccess,
      onFailure: onFailure,
    },
  };
};
