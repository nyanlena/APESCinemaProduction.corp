/* eslint-disable import/prefer-default-export */
import type { GetProfilesActionType } from '../../types/profileActionType';

export const getProfilesSagaAction = (payload: string): GetProfilesActionType => ({
  type: 'FETCH_PROFILES',
  payload,
});
