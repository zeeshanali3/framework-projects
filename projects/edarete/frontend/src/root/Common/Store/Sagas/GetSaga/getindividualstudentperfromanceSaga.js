import { GET_INDIVIDUAL_STUDENT_PERFORMANCE } from "../../Actions/ActionTypes/ApiActionTypes";

import {takeEvery} from "redux-saga/effects";
import fetchData from "../SagaHelper";

export  function * GetIndividualStudentPerformanceSaga(){

    yield takeEvery(GET_INDIVIDUAL_STUDENT_PERFORMANCE,fetchData);
}