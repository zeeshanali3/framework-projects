import { ADD_STUDENT_ANS } from "../../Actions/ActionTypes/ApiActionTypes";
import {takeEvery} from "redux-saga/effects";
import fetchData from "../SagaHelper";
export  function * AddStudentAnsSaga(){
    yield takeEvery(ADD_STUDENT_ANS,fetchData);
}
