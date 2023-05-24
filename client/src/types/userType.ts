export type BackendUserType = {
  id: number;
  email: string;
  password: string;
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
  statusId: number;
  Category?: { id: number; title: string; statusId: number };
};

export type LoggedUserType = {
  id: number;
  status: 'logged';
  statusId: number;
} & BackendUserType;

export type GuestUserType = {
  status: 'guest';
};

export type FetchingUserType = {
  status: 'fetching';
};

export type SignUpType = {
  email: string;
  password: string;
};

export type StatusType = {
  statusId: number;
};

export type LoginType = {
  email: string;
  password: string;
};

export type UserType = LoggedUserType | GuestUserType | FetchingUserType;
