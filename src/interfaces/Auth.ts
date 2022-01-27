export interface IToken {
  data: string;
  iat: number;
  exp: number;
}

export interface ILoginUser {
  email: string;
  password: string;
}
