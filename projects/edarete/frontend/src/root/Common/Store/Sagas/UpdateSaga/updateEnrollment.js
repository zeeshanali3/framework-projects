import { UPDATE_GROUP_NAME }  from "../../Actions/ActionTypes/ApiActionTypes";
import {takeEvery} from "redux-saga/effects";
import fetchData from "../SagaHelper";

export  function * UpdateEnrollmentSaga(){

    yield takeEvery(UPDATE_GROUP_NAME,fetchData);
}