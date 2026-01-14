import  { GET_CALENDAR_EVENTS } from "../../Actions/ActionTypes/ApiActionTypes"
import {takeEvery} from "redux-saga/effects";
import fetchData from "../SagaHelper";

export  function * GetCalendarEventsSaga(){

    yield takeEvery(GET_CALENDAR_EVENTS,fetchData);
}