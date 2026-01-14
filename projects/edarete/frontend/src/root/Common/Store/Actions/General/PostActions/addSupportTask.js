import { SUPPORT_TASK  } from "../../ActionTypes/ApiActionTypes";
import Constants from "../../../../Constants";
// StudentUserId
export function AddSupportTask(Email,priority,Description,attachments, onSuccess, onFailure) {
    return {
      type: SUPPORT_TASK,
      payload: {
        apiUrl: Constants.supportIssue,
        header: "application/json",
        metaData: true,
        requestType: 'POST',
        reduxActionType: none,
        onFailure: onFailure,
        onSuccess: onSuccess,
        body: {
            email:Email,
            priority:priority,
            description:Description,
            files:attachments,
            department:"Support"
        },
      },
    }
}