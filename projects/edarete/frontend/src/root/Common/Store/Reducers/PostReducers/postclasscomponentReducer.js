import { POSTCLASSCOMPONENT } from "../../Actions/ActionTypes/ApiActionTypes";
const initialState={
    addclasscomponentData:[]
}
export default function PostclasscomponentReducer(state =initialState,action){
    switch (action.type){
        case POSTCLASSCOMPONENT:
            return{
                ...state,
                addclasscomponentData: action.payload,
            };
        default:return state;
    }
}