import { REDUX_CALENDAR_EVENTS,LOGOUT } from "../../Actions/ActionTypes/ApiActionTypes";

const initialState={
    calendarEvents:[]
}
export default function GetCalendarEventsReducer(state =initialState,action){
    switch (action.type){
        case REDUX_CALENDAR_EVENTS:
            return{
                ...state,
                calendarEvents: action.payload,
            };
            case LOGOUT:return initialState;
        default:return state;
    }
}