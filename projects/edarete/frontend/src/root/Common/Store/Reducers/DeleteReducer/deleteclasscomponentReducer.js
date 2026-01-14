import { DELETECLASSCOMPONENT } from "../../Actions/ActionTypes/ApiActionTypes";

const initialState={
    delclasscomponentData:[],
 
}
export default function DeleteclasscomponentReducer(state = initialState ,action){

    switch (action.type){
        case DELETECLASSCOMPONENT:
            return{
                delclasscomponentData:action.payload,
               
            }
        default :return state;
    }
}