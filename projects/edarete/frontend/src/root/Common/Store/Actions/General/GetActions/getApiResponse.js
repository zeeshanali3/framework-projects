import { GET_INDIVIDUAL_LEADERBOARD_DATA } from "../../ActionTypes/ApiActionTypes";
export const getApiResponse = (onSuccess,class_section_subject_teacher_id=2,studentId=42, onFailure) => {
  return {
    type: GET_INDIVIDUAL_LEADERBOARD_DATA,
    payload: {
      requestType: "GET",
      apiUrl: `/login/device/via_otp?version=1.0&otp=620477`,
      reduxActionType: "",
      metaData: true,
      body:{otp:'kYjga2'},
      header: "application/json",
      onSuccess: onSuccess,
      onFailure: onFailure,
    },
  };
};
