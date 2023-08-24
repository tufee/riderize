export interface IUser {
  id: string;
  name: string;
  email: string;
  password: string;
}

export interface IUserWithoutPassword {
  id: string;
  name: string;
  email: string;
}

export interface IUserRequest {
  name: string;
  email: string;
  emailConfirmation: string;
  password: string;
  passwordConfirmation: string;
}

export interface IUserLogin {
  email: string;
  password: string;
}
