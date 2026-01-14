import { POSTSUBCOMPONENTMARKS } from "../../Actions/ActionTypes/ApiActionTypes";
const initialState={
    addsubcomponentmarkData:[]
}
export default function PostsubcomponentmarksReducer(state =initialState,action){
    switch (action.type) {
      case POSTSUBCOMPONENTMARKS:
        return {
          ...state,
          addsubcomponentmarkData: action.payload,
        };
      default:
        return state;
    }
}