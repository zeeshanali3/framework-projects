import { REDUX_GET_TEMPLATE_SUBCOMPONENT, LOGOUT } from "../../Actions/ActionTypes/ApiActionTypes";

const initialState = {
  getTemplateSubcomponent: [],
};

export default function GetTemplateSubcomponentReducer(state = initialState, action) {
  switch (action.type) {
    case REDUX_GET_TEMPLATE_SUBCOMPONENT:
      return {
        ...state,
        getTemplateSubcomponent: action.payload,
      };

    case LOGOUT:
      return initialState;
    default:
      return state;
  }
}
