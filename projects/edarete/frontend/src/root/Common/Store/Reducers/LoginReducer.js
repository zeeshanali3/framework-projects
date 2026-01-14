import { LOGIN, LOGOUT, SET_TOKEN_EXPIRED } from '../../../Common/Store/Actions/ActionTypes/ApiActionTypes';

const initialState = {
  loginData: [],
  email: '',
  password: '',
  tokenExpired: false,
};
export default function LoginReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN:
      return {
        loginData: action.payload,
        email: action.payload.email,
        password: action.payload.password,
      };
    case LOGOUT:
      return initialState;
    case SET_TOKEN_EXPIRED:
      return {
        ...state,
        tokenExpired: true,
      };
    default:
      return state;
  }
}
