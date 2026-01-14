import { IS_LOADING } from '../../ActionTypes/ApiActionTypes';

export const isLoadingAction = (payload) => {
    return {
        type: IS_LOADING,
        payload: payload
    }
}