// import { POSTATTACHMENTS, ADMIN_POST_ATTACHMENTS } from "../ActionTypes/ApiActionTypes";
// import Constants from "../../../Constants";

// export function PostattachmentAction(token, CourseId, ComponentType, ComponentName, Weightage, ComponentPolicy, attachments, onSuccess, onFailure) {
//     const formData = new FormData();

//     attachments.forEach((file, index) => {
//         formData.append(`Attachments[${index}]`, file);
//     });

//     return {
//         type: ADMIN_POST_ATTACHMENTS,
//         payload: {
//             apiUrl: Constants.addattachments,
//             header: "application/json",
//             metaData: true,
//             requestType: 'POST',
//             reduxActionType: POSTATTACHMENTS,
//             onSuccess: onSuccess,
//             onFailure: onFailure,
//             body: {
//                 Weightage: Weightage,
//                 ComponentType: ComponentType,
//                 ComponentPolicy: ComponentPolicy,
//                 idObject: {
//                     CourseId: CourseId,
//                 },
//                 namesObject: {
//                     ComponentName: ComponentName,
//                 },
//                 Attachments: formData, 
//             },
//         },
//     };
// }


import { POSTATTACHMENTS, ADMIN_POST_ATTACHMENTS } from "../../ActionTypes/ApiActionTypes";
import Constants from "../../../../Constants";

export function PostattachmentAction(token, SubComponentId, userRoleId, selectedFiles, onSuccess, onFailure) {
    console.log("Selected Files:", selectedFiles);
    const formData = new FormData();
    const fileSend = [];
    try {
      for (const file of selectedFiles) {
        const fileInfo = {
          name: file.name,
          type: file.type,
          size: file.size,
        };

        formData.append("Attachments", file, file.name);
        fileSend.push(fileInfo); 
        console.log("File appended:", file.name);
      }
    } catch (error) {
      console.error("Error appending files to FormData:", error);
    }
    console.log("frorrrorm " , fileSend)
    return {
      type: ADMIN_POST_ATTACHMENTS,
      payload: {
        apiUrl: Constants.addattachments,
        header: "application/json",
        metaData: true,
        requestType: 'POST',
        reduxActionType: POSTATTACHMENTS,
        onSuccess: onSuccess,
        onFailure: onFailure,
        body: {
          idObject: {
            SubComponentId: SubComponentId,
            userRoleId: userRoleId,
          },
        },
        formData: fileSend,
      },
    };
  }
