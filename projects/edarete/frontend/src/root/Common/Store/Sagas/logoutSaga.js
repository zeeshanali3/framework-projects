import { ADMIN_LOGOUT } from '../Actions/ActionTypes/ApiActionTypes';
import { takeEvery } from 'redux-saga/effects';
import fetchData from './SagaHelper';

export function* logoutSaga() {
  yield takeEvery(ADMIN_LOGOUT, fetchData);
}
