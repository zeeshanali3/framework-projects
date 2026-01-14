import { POSTSUBCOMPONENT, ADMIN_POST_SUBCOMPONENT } from "../../ActionTypes/ApiActionTypes";
import Constants from "../../../../Constants"

export function AddSubcomponentAction(token, UserRoleId, ComponentID, SubComponentNum, Date, EndTime, TotalMarks, Weightage, Text,StartTime,startDate,status, notifyStudents, onSuccess, onFailure) {
  return {
    type: ADMIN_POST_SUBCOMPONENT,
    payload: {
      apiUrl: Constants.addsubcomponent,
      header: "application/json",
      metaData: true,
      requestType: "POST",
      reduxActionType: POSTSUBCOMPONENT,
      onSuccess: onSuccess,
      onFailure: onFailure,
      body: {
        Date: Date,
        EndTime: EndTime,
        idObject: {
          UserRoleId: UserRoleId,
          ComponentID: ComponentID,
        },
        SubComponentNum: SubComponentNum,
        Weightage: Weightage,
        TotalMarks: TotalMarks,
        Text: Text,
        StartTime:StartTime,
        StartDate:startDate,
        Status:status,
        NotifyUsers: notifyStudents,
      },
    },
  };
}
