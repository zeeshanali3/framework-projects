import { GET_TEMPLATE_SUBCOMPONENT } from "../../Actions/ActionTypes/ApiActionTypes";

import {takeEvery} from "redux-saga/effects";
import fetchData from "../SagaHelper";

export  function * GetTemplateSubcomponentsSaga(){

    yield takeEvery(GET_TEMPLATE_SUBCOMPONENT,fetchData);
}