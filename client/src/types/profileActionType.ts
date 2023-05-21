import type { BackendUserType } from './userType';

export const FETCH_PROFILES = 'FETCH_PROFILES';

export type GetProfilesActionType = {
  type: typeof FETCH_PROFILES;
  payload: BackendUserType['firstName'];
};
