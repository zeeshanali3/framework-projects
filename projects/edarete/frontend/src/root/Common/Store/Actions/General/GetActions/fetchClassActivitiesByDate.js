import constants from "../../../../Constants";
import { FETCH_CLASS_ACTIVITIES } from "../../ActionTypes/ApiActionTypes";

export const fetchClassActivitiesByDate = (selectedDate, onSuccess, onFailure) => {
    return {
      type: FETCH_CLASS_ACTIVITIES,
      payload: {
        requestType: "GET",
        apiUrl: `/class_activities/by/date${constants.version}&date=${selectedDate}`,
        reduxActionType: "",
        metaData: true,
        header: "application/json",
        onSuccess,
        onFailure,
      },
    };
  };
  