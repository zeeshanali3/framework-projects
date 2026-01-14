import {
  GET_USERS_MESSAGE_BY_CHAT_ID,
  GET_USERS_MESSAGE_BY_CHAT_ID_PAGINATED,
} from "../../ActionTypes/ApiActionTypes";
import constants from "../../../../Constants";
import {
  REDUX_USERS_MESSAGE_BY_CHAT_ID,
  REDUX_USERS_MESSAGE_BY_CHAT_ID_PAGINATED,
  REDUX_SET_PAGINATION_LOADING,
} from "../../ActionTypes/ReduxActionTypes";

// Action for getting users chat data
export const GET_USERS_CHAT_REQUEST = 'GET_USERS_CHAT_REQUEST';
export const GET_USERS_CHAT_SUCCESS = 'GET_USERS_CHAT_SUCCESS';
export const GET_USERS_CHAT_FAILURE = 'GET_USERS_CHAT_FAILURE';

export const getUsersChatRequest = (payload) => ({
  type: GET_USERS_CHAT_REQUEST,
  payload
});

export const getUsersChatSuccess = (data) => ({
  type: GET_USERS_CHAT_SUCCESS,
  payload: data
});

export const getUsersChatFailure = (error) => ({
  type: GET_USERS_CHAT_FAILURE,
  payload: error
});

// Functions expected by Messenger component
export const getUsersMessageByChatId = (
  id1 = null,
  id2 = [],
  group = false,
  groupName = null,
  chatId = null,
  onSuccess,
  onFailure
) => {
  return {
    type: GET_USERS_MESSAGE_BY_CHAT_ID,
    payload: {
      requestType: "GET",
      apiUrl: `http://192.168.1.220:3000/api/crud/chat`,
      reduxActionType: REDUX_USERS_MESSAGE_BY_CHAT_ID,
      useBaseURL: false,
      metaData: true,
      body: {
        actionPerformerURDD: id1,
        participantIds: id2,
        isGroup: group,
        groupName: groupName,
        chats_chat_id: chatId,
      },
      isEncrypted: true,
      header: "application/json",
      onSuccess: onSuccess,
      onFailure: onFailure,
    },
  };
};

export const getUsersMessageByChatIdPaginated = (
  id1 = null,
  id2 = [],
  group = false,
  groupName = null,
  chatId = null,
  page = 1,
  pageSize = 100,
  onSuccess,
  onFailure
) => {
  console.warn("pagination saga hit");
  return {
    type: GET_USERS_MESSAGE_BY_CHAT_ID_PAGINATED,
    payload: {
      requestType: "GET",
      apiUrl: `http://192.168.1.220:3000/api/crud/chat`,
      reduxActionType: REDUX_USERS_MESSAGE_BY_CHAT_ID_PAGINATED,
      useBaseURL: false,
      metaData: true,
      body: {
        actionPerformerURDD: id1,
        participantIds: id2,
        isGroup: group,
        groupName: groupName,
        chats_chat_id: chatId,
        page: page,
        page_size: pageSize,
      },
      isEncrypted: true,
      header: "application/json",
      onSuccess: onSuccess,
      onFailure: onFailure,
    },
  };
};

export const setPaginationLoading = (chatId, isLoading) => {
  return {
    type: REDUX_SET_PAGINATION_LOADING,
    payload: {
      chatId,
      isLoading,
    },
  };
};
