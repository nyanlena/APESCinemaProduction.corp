import type { AllEffect, ForkEffect, TakeEffect } from 'redux-saga/effects';
import { all } from 'redux-saga/effects';
import type { GetProfilesActionType } from '../../types/profileActionType';
import postsSagaWatcher from './profilesSaga';

export default function* rootSaga(): Generator<
  AllEffect<Generator<TakeEffect | ForkEffect<any>, void, GetProfilesActionType>>,
  void,
  unknown
> {
  yield all([postsSagaWatcher()]);
}
