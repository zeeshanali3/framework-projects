import ADMINFILTER from "../../../Store/Actions/Filter/ActionTypes/ReducerType";
const initialState={
    adminfilterData:[]
}

export default function GetFilterReducer(state=initialState,action){
    switch (action.type){
        case ADMINFILTER:
            return{
                ...state,
                adminfilterData: action.payload,
            };
        default:
            return state;
    }
}