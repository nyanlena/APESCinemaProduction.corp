import type { BackendUserType } from './userType';

export const FETCH_PROFILES = 'FETCH_PROFILES';

export type GetProfilesActionType = {
  type: typeof FETCH_PROFILES;
  payload: BackendUserType['firstName'];
};

export type BackendChangeProfileType = {
  id: number;
  education: string;
  experience: string;
  aboutMe: string;
  userPortfolio: string;
};
export type BackendChangeProfileSettingType = {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  patronymicname: string;
  city: string;
  age: string;
  img: string;
  education: string;
  experience: string;
  aboutMe: string;
  userPortfolio: string;
  phone: string;
  linkTg: string;
  linkInst: string;
  linkWA: string;
  categoryId?: number;
  Category?: { id: number; title: string };
};
 export type BackendChangeImageType = {
  id: number;
  img: string;
};
 