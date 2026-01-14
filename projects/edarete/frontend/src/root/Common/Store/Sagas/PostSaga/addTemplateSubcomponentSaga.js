import { ADD_TEMPLATE_SUBCOMPONENT } from "../../Actions/ActionTypes/ApiActionTypes";

import {takeEvery} from "redux-saga/effects";
import fetchData from "../SagaHelper";

export  function * AddTemplateSubcomponentSaga(){

    yield takeEvery(ADD_TEMPLATE_SUBCOMPONENT,fetchData);
}
