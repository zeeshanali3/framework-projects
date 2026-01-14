import { GET_STUDENT_BY_COURSE } from "../../Actions/ActionTypes/ApiActionTypes";
import {takeEvery} from "redux-saga/effects";
import fetchData from "../SagaHelper";

export  function * GetStudentByCourseSaga(){
    yield takeEvery(GET_STUDENT_BY_COURSE,fetchData);
}