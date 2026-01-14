import { GET_SUBCOMPONENT_BY_COURSE } from  "../../Actions/ActionTypes/ApiActionTypes"

import {takeEvery} from "redux-saga/effects";
import fetchData from "../SagaHelper";

export  function * GetsubcomponentbycourseSaga(){

    yield takeEvery(GET_SUBCOMPONENT_BY_COURSE,fetchData);
}