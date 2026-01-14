export const sagaCommunicationAction = (props,queryParam="",onSuccess,onFailure,queryParamsId=null) => {
  let apiURL=props.apiUrl+queryParam
  if(queryParamsId){
    apiURL = apiURL +"&id=" +queryParamsId;
  }
  return {
    type: props.apiActionType,
    payload: {
      requestType: props.requestType,
      apiUrl: apiURL,
      reduxActionType: props.reduxActionType,
      body: props.body,
      metaData: props.metaData,
      header: props.header,
      onSuccess: onSuccess,
      onFailure: onFailure,
    },
  };
};
