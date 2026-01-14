import {DELETESTUENTSUBMISSION} from "../../Actions/ActionTypes/ApiActionTypes"
const initialState={
    deletestudentsubData:[],
 
}
export default function DeletestudentsubmissionReducer(state = initialState ,action){

    switch (action.type){
        case DELETESTUENTSUBMISSION:
            return{
                deletestudentsubData:action.payload,
               
            }
        default :return state;
    }
}