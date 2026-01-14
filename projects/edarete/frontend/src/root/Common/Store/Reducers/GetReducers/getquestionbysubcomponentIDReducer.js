import { GETQUESTIONBYSUBCOMPONENTID,LOGOUT } from "../../Actions/ActionTypes/ApiActionTypes";


const initialState={
    questionbysubid:[]
}
export default function GetQuestionBySubComponenidReducer(state =initialState,action){
    switch (action.type){
        case GETQUESTIONBYSUBCOMPONENTID:
            return{
                ...state,
                questionbysubid: action?.payload,
            };
            case LOGOUT:return initialState;
        default:return state;
    }
}