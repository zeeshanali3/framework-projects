import { ADMIN_POST_CLASSCOMPONENT } from "../../Actions/ActionTypes/ApiActionTypes";

import {takeEvery} from "redux-saga/effects";
import fetchData from "../SagaHelper";

export  function * PostclasscomponentSaga(){

    yield takeEvery(ADMIN_POST_CLASSCOMPONENT,fetchData);
}
