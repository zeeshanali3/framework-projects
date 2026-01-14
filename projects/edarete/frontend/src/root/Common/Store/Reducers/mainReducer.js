import {
  REDUX_UPDATE_CURRENT_USER_ROLE,
  REDUX_UPDATE_CURRENT_USER,
  REDUX_UPDATE_LOADING_STATE,
  REDUX_LOGOUT_CURRENT_USER,
  REDUX_UPDATE_USER_DATA,
  REDUX_API_DOCUMENTATION,
} from "../Actions/ActionTypes/ReduxActionTypes";

const initialState = {
  accesstoken: null,
  currentUser: null,
  currentUserDesignationsRoles: [],
  currentUserPermissions: [],
  userPermissions: [],
  userDepartments: [],
  userDesignation: [],
  userDevices: [],
  allUserPermissions: {},
  userSelectedRole: {},
  apiDocumentationData: [],
  userRoles: [],
  isLoading: false,
};

const mainReducer = (state = initialState, action) => {
  switch (action?.type) {
    case REDUX_UPDATE_CURRENT_USER:
      return {
        ...state,
        currentUser: action.payload.otpVerif.user,
        accesstoken: action.payload.otpVerif.access_token,
        currentUserDesignationsRoles:
          action.payload.otpVerif.user_roles_designations_departments,
        userSelectedRole:
          action.payload.otpVerif?.user_roles_designations_departments?.length >
          0
            ? action.payload.otpVerif.user_roles_designations_departments[0]
            : {},
        userPermissions: action.payload.otpVerif.collective_user_permissions,
        currentUserPermissions:
          action.payload.otpVerif.user_roles_designations_departments?.length >
          0
            ? action.payload.otpVerif.user_permissions[
                action.payload.otpVerif.user_roles_designations_departments[0]
                  .user_role_designation_department_id
              ]
            : [],
        allUserPermissions: action.payload.otpVerif.user_permissions,
        userDepartments: action.payload.otpVerif.user_departments,
        userDesignation: action.payload.otpVerif.user_designations,
        userRoles: action.payload.otpVerif.user_roles,
        userDevices: action.payload.otpVerif.user_devices,
      };
    case REDUX_UPDATE_USER_DATA:
      const updatedUser = {
        ...state.currentUser, // Retain existing properties
        ...action.requestParams, // Overwrite with new values from action
      };
      return {
        ...state, // Retain the rest of the state
        currentUser: updatedUser, // Update the currentUser object
      };

    case REDUX_LOGOUT_CURRENT_USER:
      return initialState;
    case REDUX_UPDATE_CURRENT_USER_ROLE: {
      return {
        ...state,
        userSelectedRole: action.payload,
        currentUserPermissions:
          state.allUserPermissions[
            action.payload?.user_role_designation_department_id
          ],
      };
    }

    case REDUX_UPDATE_LOADING_STATE:
      return {
        ...state,
        isLoading: action.payload,
      };
    case REDUX_API_DOCUMENTATION:
      return {
        ...state,
        isLoading: false,
        apiDocumentationData: action.payload.payload,
      };
    default:
      return state;
  }
};

export default mainReducer;
