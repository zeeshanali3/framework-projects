import { ADD_QUESTIONS } from "../../Actions/ActionTypes/ApiActionTypes";
import {takeEvery} from "redux-saga/effects";
import fetchData from "../SagaHelper";
export  function * AddQuestionSaga(){
    yield takeEvery(ADD_QUESTIONS,fetchData);
}
