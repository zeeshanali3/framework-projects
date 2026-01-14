import { GET_SUBCOMPONENT_GRADESHEET } from "../../Actions/ActionTypes/ApiActionTypes";
import {takeEvery} from "redux-saga/effects";
import fetchData from "../SagaHelper";

export  function * getSubComponentGradeSheetSaga(){

    yield takeEvery(GET_SUBCOMPONENT_GRADESHEET,fetchData);
}