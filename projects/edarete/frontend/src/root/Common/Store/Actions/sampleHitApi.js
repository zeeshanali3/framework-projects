export const checkPermissionParser = ( apiData) => {
    return {
      type: apiData.apiActionType,
      payload: {
        permission:apiData.permission,
        requestType: apiData.requestType,
        apiUrl:apiData?.apiUrl,
        reduxActionType: apiData.reduxActionType,
        body:apiData.body,
        header:'application/json',
        onSuccess: apiData.onSuccess,
        onFailure: apiData.onFailure,
      },
    };
  };

  