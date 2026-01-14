import ADDTIMETABLE from "../../../Store/Actions/AddTimeTableAction/ActionTypes/ReducerType";
const initialState={
    addtimetableData:[]
}

export default function AddTimeTableReducer(state=initialState,action){
    switch (action.type){
        case ADDTIMETABLE:
            return{
                ...state,
                addtimetableData: action.payload,
            };
        default:
            return state;
    }
}