import { ADMIN_POST_SUBCOMPONENT } from "../../Actions/ActionTypes/ApiActionTypes";

import {takeEvery} from "redux-saga/effects";
import fetchData from "../SagaHelper";

export  function * PostsubcomponentSaga(){

    yield takeEvery(ADMIN_POST_SUBCOMPONENT,fetchData);
}
