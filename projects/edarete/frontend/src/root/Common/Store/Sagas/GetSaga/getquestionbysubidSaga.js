import { GET_QUESTION_BY_SUBCOMPONENT_ID } from "../../Actions/ActionTypes/ApiActionTypes";
import {takeEvery} from "redux-saga/effects";
import fetchData from "../SagaHelper";

export  function * GetQuestionBySubComponentIDSaga(){
    yield takeEvery(GET_QUESTION_BY_SUBCOMPONENT_ID,fetchData);
}