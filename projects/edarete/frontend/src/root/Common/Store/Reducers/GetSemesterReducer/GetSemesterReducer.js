import GETSEMESTER from "../../../Store/Actions/GetSemesterAction/ActionType/ReducerType";

const initialState={
    getsemestersData:[]
}

export default function GetSemesterReducer(state=initialState,action){
    switch (action.type){
        case GETSEMESTER:
            return{
                ...state,
                getsemestersData: action.payload,
            };
        default:
            return state;
    }
}