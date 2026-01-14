import { ADMIN_GET_STUDENT_MARKS } from "../../Actions/ActionTypes/ApiActionTypes";
import {takeEvery} from "redux-saga/effects";
import fetchData from "../SagaHelper";

export  function * GetstudentmarksSaga(){

    yield takeEvery(ADMIN_GET_STUDENT_MARKS,fetchData);
}