
import { ADD_TEMPLATE_SUBCOMPONENT } from '../../../../../Common/Store/Actions/ActionTypes/ApiActionTypes';
import Constants from "../../../../Constants"

export function AddTemplateSubcomponentAction(token, UserRoleId, ComponentID, TotalMarks, Weightage, Text, onSuccess, onFailure) {
    // const attachmentsData = Attachments.map((attachment) => ({
    //   fileType: attachment.fileType,
    //   data: attachment.data,
    // }));

    return {
        type: ADD_TEMPLATE_SUBCOMPONENT,
        payload: {
            apiUrl: Constants.addTemplateSubcomponent,
            header: "application/json",
            metaData: true,
            requestType: "POST",
            reduxActionType: null,
            onSuccess: onSuccess,
            onFailure: onFailure,
            body: {
                idObject: {
                    UserRoleId: UserRoleId,
                    ComponentID: ComponentID,
                },
                Weightage: Weightage,
                TotalMarks: TotalMarks,
                Text: Text,
            },
        },
    };
}
