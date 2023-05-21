import type { TakeEffect, ForkEffect, CallEffect, PutEffect } from 'redux-saga/effects';
import { delay, call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import type { AxiosPromise, AxiosResponse } from 'axios';
import axios from 'axios';
import { BackendUserType } from '../../types';
import { setProfiles } from '../redux/searchProfile/searchProfileSlice';
import { FETCH_PROFILES, GetProfilesActionType } from '../../types/profileActionType';

const getProfiles = (firstName: BackendUserType['firstName']): AxiosPromise<BackendUserType[]> =>
  axios.post<BackendUserType[]>('/posts/search', { firstName });

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
function* profilesSagaWorker(
  action: GetProfilesActionType,
): Generator<CallEffect | PutEffect, void, AxiosResponse<BackendUserType[]>> {
  try {
    yield delay(800);
    const res = yield call(getProfiles, action.payload);
    yield put(setProfiles(res.data));
  } catch (e) {
    yield put({ type: 'FETCH_PROFILES', message: 'error!!!!!' });
  }
}

/*
  Starts fetchUser on each dispatched `USER_FETCH_REQUESTED` action.
  Allows concurrent fetches of user.
*/
function* profilesSagaWatcher(): Generator<TakeEffect | ForkEffect, void, GetProfilesActionType> {
  yield takeLatest(FETCH_PROFILES, profilesSagaWorker);
}

export default profilesSagaWatcher;
