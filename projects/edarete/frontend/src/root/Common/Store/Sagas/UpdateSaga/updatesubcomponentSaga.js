import { ADMIN_UPDATE_SUB_COMPONENT } from "../../Actions/ActionTypes/ApiActionTypes";

import {takeEvery} from "redux-saga/effects";
import fetchData from "../SagaHelper";

export  function * UpdatesubcomponentsSaga(){

    yield takeEvery(ADMIN_UPDATE_SUB_COMPONENT,fetchData);
}
