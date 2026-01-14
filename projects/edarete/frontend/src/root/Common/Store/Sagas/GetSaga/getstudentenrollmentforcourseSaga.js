import { ADMIN_GET_STUDEN_ENROLLEMENT_FOR_COURSE } from "../../Actions/ActionTypes/ApiActionTypes";
import {takeEvery} from "redux-saga/effects";
import fetchData from "../SagaHelper";

export  function * GetstudentenrollementforcourseSaga(){

    yield takeEvery(ADMIN_GET_STUDEN_ENROLLEMENT_FOR_COURSE,fetchData);
}