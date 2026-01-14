import { ADMIN_GET_TIME_SLOT } from "../../Actions/ActionTypes/ApiActionTypes";
import {takeEvery} from "redux-saga/effects";
import fetchData from "../SagaHelper";

export  function * GettimeslotSaga(){

    yield takeEvery(ADMIN_GET_TIME_SLOT,fetchData);
}