import { ADMIN_GET_COURSE_CALENDER } from "../../Actions/ActionTypes/ApiActionTypes";
import {takeEvery} from "redux-saga/effects";
import fetchData from "../SagaHelper";

export  function * GetcoursecalenderSaga(){

    yield takeEvery(ADMIN_GET_COURSE_CALENDER,fetchData);
}