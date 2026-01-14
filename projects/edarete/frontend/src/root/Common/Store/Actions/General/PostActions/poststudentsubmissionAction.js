import { POSTSTUDENTSUBMISSION, ADMIN_POST_STUDENT_SUBMISSION } from "../../ActionTypes/ApiActionTypes";
import Constants from "../../../../Constants";
// export function AddStudentSubmissionAction(token, UserRoleId, EnrollmentId, SubComponentId, selectedFiles, onSuccess, onFailure) {
//     console.log("Selected Files:", selectedFiles);

//     const formData = new FormData();

//     try {
//         for (let i = 0; i < selectedFiles.length; i++) {
//             const file = selectedFiles[i];
//             console.log(`File ${i + 1}:`);
//             console.log("  Name:", file.name);
//             console.log("  Size:", file.size, "bytes");
//             console.log("  Type:", file.type);

//             formData.append("Attachments[]", file);
//         }

//         console.log("FormData after append:", formData.getAll("Attachments[]"));

//     } catch (error) {
//         console.error("Error appending files to FormData:", error);
//     }

//     return {
//         type: ADMIN_POST_STUDENT_SUBMISSION,
//         payload: {
//             apiUrl: Constants.addsubdentsubmission,
//             header: "application/json",
//             metaData: true,
//             requestType: "POST",
//             reduxActionType: POSTSTUDENTSUBMISSION,
//             onSuccess: onSuccess,
//             onFailure: onFailure,
//             body: {
//                 idObject: {
//                     UserRoleId: UserRoleId,
//                     EnrollmentId: EnrollmentId,
//                     SubComponentId: SubComponentId,
//                 },
//                 Attachments: formData,
//             },
//         },
//     };
// }

export function AddStudentSubmissionAction(token, EnrollementId, SubComponentId, selectedFiles, onSuccess, onFailure) {
  
    const formData = new FormData();

    try {
        selectedFiles.forEach((file, index) => {
            const fileInfo = {
                name: file.name,
                type: file.type,
                size: file.size,
            };

            formData.append(`Attachments[${index}]`, file, file.name);
            // Append the boundary manually
            formData.append("Attachments[]", file, { filename: file.name, boundary: formData._boundary });
        });

        formData.append('EnrollementId', EnrollementId);
        formData.append('SubComponentId', SubComponentId);

      
    } catch (error) {
        console.error("Error appending files to FormData:", error);
    }

    return {
        type: ADMIN_POST_STUDENT_SUBMISSION,
        payload: {
            apiUrl: Constants.addsubdentsubmission,
            headers: {
                'Content-Type': 'multipart/form-data; boundary=' + formData._boundary,
                // Add any other headers if needed
            },
            metaData: true,
            requestType: "POST",
            reduxActionType: POSTSTUDENTSUBMISSION,
            onSuccess: onSuccess,
            onFailure: onFailure,
            body: formData,
        },
    };
}
// files