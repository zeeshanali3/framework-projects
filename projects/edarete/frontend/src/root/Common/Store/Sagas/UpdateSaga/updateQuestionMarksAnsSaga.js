import { ADMIN_UPDATE_QUESTION_MARKS_ANS } from "../../Actions/ActionTypes/ApiActionTypes";
import {takeEvery} from "redux-saga/effects";
import fetchData from "../SagaHelper";

export  function * UpdateQuestionMarksAnsSaga(){

    yield takeEvery(ADMIN_UPDATE_QUESTION_MARKS_ANS,fetchData);
}