import GETCOURSESHCEDULE from "../../../Store/Actions/GetCourseShceduleAction/ActionTypes/ReducerType";

const initialState={
    getimetable:[]
}

export default function GetTimeTableRedcer(state=initialState,action){
    switch (action.type){
        case GETCOURSESHCEDULE:
            return{
                ...state,
                getimetable: action.payload,
            };
        default:
            return state;
    }
}