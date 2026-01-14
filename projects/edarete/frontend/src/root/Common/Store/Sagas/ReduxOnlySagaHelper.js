// import React from 'react'
import {put} from 'redux-saga/effects';
// import constants from '../../Constants';

const DEBUG_LOG_API = true;
const DEBUG_LOG_API_REQUEST = true;
const DEBUG_LOG_API_RAW_RESPONSE = true;
const DEBUG_LOG_API_JSON_RESPONSE = true;



function* fetchData(action) {
    yield put({type: action.payload.reduxActionType, payload: action.payload.data});
}
export default fetchData;
