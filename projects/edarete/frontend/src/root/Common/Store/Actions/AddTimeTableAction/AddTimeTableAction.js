import ADMIN_ADD_TIME_TABLE from "./ActionTypes/ApiType";
import ADDTIMETABLE from "./ActionTypes/ReducerType";
import  Constants from "../../../Constants";

export function AddTimeTableAction(token,CourseId,TimeSlotId,RoomId,SemesterId,Day,onSuccess,onFailure  ){
    return{
        type:ADMIN_ADD_TIME_TABLE,
        payload:{
            apiUrl:Constants.add_timetable,
            header:"application/json",
            metaData:true,
            requestType:'POST',
            reduxActionType:ADDTIMETABLE,
            onSuccess:onSuccess,
            onFailure:onFailure,
            //  token:token,

            body:{
               
                idObject:{
                    CourseId:CourseId,
                    TimeSlotId:TimeSlotId,
                    RoomId:RoomId,
                    SemesterId:SemesterId,
                },
                Day:Day,

            }
        }
    }
}