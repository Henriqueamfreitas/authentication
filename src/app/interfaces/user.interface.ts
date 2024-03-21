export interface IUser{
	id: number;
	name: string,
  email: string,
  password: string,
	job: string,
}

export interface IUserData{
	id: number | null,
	name: string | null,
  email: string | null,
  password: string | null,
	job: string | null,
}

export type TUserCreate = Omit<IUserData, "id">
export type TUserReturn = Omit<IUser, "password">
export type TUserLogin = Omit<IUserData, "id"| "name"| "job">

export interface IRegisterUserReturn{
  accessToken: string,
  user: TUserReturn,
}

export interface ILoginUserReturn{
  accessToken: string,
  user: TUserReturn,
}
