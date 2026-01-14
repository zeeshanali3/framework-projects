import { UPDATE_USER_DATA } from '../../ActionTypes/ApiActionTypes';
import { REDUX_UPDATE_USER_DATA } from '../../ActionTypes/ReduxActionTypes';
export const updateUserData = (data,onSuccess,onFailure) => {
    return {
      type: UPDATE_USER_DATA,
      payload: {
        requestType: "PUT",
        apiUrl: '/api/update/user?version=1.0',
        reduxActionType: REDUX_UPDATE_USER_DATA,
        body: 
        {
            id: data?.id || '',
            first_name: data?.firstName || '',
            last_name: data?.lastName || '',
            email: data?.email || '',
            phone_no: data?.phoneNo || '',
        },
        metaData: true,
        header: 'application/json',
        onSuccess: onSuccess,
        onFailure: onFailure,
      },
    };
  };
  