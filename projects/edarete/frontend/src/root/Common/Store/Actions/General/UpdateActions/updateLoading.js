import { UPDATE_LOADING_STATE  } from '../../ActionTypes/ApiActionTypes';
import { REDUX_UPDATE_LOADING_STATE} from '../../ActionTypes/ReduxActionTypes';

export const updateLoading = (isLoading) => {
  return {
    type: UPDATE_LOADING_STATE ,
    payload: {
      reduxActionType: REDUX_UPDATE_LOADING_STATE,
      data:isLoading
    },
  };
};
