import { ADMIN_ADD_STUDENT_ENROLLEMENTS } from "../../Actions/ActionTypes/ApiActionTypes";
import {takeEvery} from "redux-saga/effects";
import fetchData from "../SagaHelper";
export  function * AddstudentenrollementSaga(){
    yield takeEvery(ADMIN_ADD_STUDENT_ENROLLEMENTS,fetchData);
}
