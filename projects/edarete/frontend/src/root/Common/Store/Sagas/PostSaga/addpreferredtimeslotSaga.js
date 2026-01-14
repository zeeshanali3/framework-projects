import { ADMIN_ADD_PREFERRED_TIME_SLOT } from "../../Actions/ActionTypes/ApiActionTypes";
import {takeEvery} from "redux-saga/effects";
import fetchData from "../SagaHelper";
export  function * AddpreferredtimeslotSaga(){
    yield takeEvery(ADMIN_ADD_PREFERRED_TIME_SLOT,fetchData);
}
