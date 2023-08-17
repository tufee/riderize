export interface IUser {
  id: string;
  name: string;
  email: string;
  password: string;
}

export interface IUserRequest {
  name: string;
  email: string;
  emailConfirmation: string;
  password: string;
  passwordConfirmation: string;
}

export interface IUserResponse {
  id: string;
  name: string;
  email: string;
}
