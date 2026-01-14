import { ADMIN_GET_STUDENT_ATTENDANCE } from "../../Actions/ActionTypes/ApiActionTypes";
import {takeEvery} from "redux-saga/effects";
import fetchData from "../SagaHelper";
export  function * GetstudentattendanceSaga(){
    yield takeEvery(ADMIN_GET_STUDENT_ATTENDANCE,fetchData);
}