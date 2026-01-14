import { ADMIN_LOGIN_STEP_2 } from "../../Actions/ActionTypes/ApiActionTypes";
import {takeEvery} from "redux-saga/effects";
import fetchData from "../SagaHelper";

export  function * LoginStepTwoSaga(){

    yield takeEvery(ADMIN_LOGIN_STEP_2,fetchData);
}
