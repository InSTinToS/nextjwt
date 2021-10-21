import { v4 as uuid } from "uuid";

export interface IUser {
  name: string;
  email: string;
  avatar_url: string;
}

export interface IReqSignIn {
  email: string;
  password: string;
}

export interface IResSignIn {
  token: string;
  user: IUser;
}

const delay = (amount = 750) =>
  new Promise((resolve) => setTimeout(resolve, amount));

const signInReq = async (data: IReqSignIn) => {
  await delay();

  return {
    token: uuid(),
    user: {
      name: "Miguel",
      email: "miguelandradebarreto2@gmail.com",
      avatar_url: "https://github.com/instintos.png",
    },
  };
};

export const recoverUserData = async () => {
  await delay();

  return {
    name: "Miguel",
    email: "miguelandradebarreto2@gmail.com",
    avatar_url: "https://github.com/instintos.png",
  };
};

export default signInReq;
