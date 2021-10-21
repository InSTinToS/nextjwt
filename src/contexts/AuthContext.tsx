import { createContext, ReactNode, useEffect, useState } from "react";
import signInReq, {
  IReqSignIn,
  IUser,
  recoverUserData,
} from "../services/auth";
import { parseCookies, setCookie } from "nookies";
import { useRouter } from "next/router";
import api from "../services/api";

interface PAuthProvider {
  children: ReactNode;
}

type TAuthContext = {
  isAuthenticated: boolean;
  user: IUser;
  signIn: (reqData: IReqSignIn) => Promise<void>;
} | null;

export const AuthContext = createContext<TAuthContext | null>(null);

const AuthProvider = ({ children }: PAuthProvider) => {
  const [user, setUser] = useState<IUser | null>(null);
  const router = useRouter();

  const isAuthenticated = !!user;

  const signIn = async ({ email, password }: IReqSignIn) => {
    const { token, user: resUser } = await signInReq({ email, password });

    const maxAge = 60 * 60 * 2; //2hr

    setCookie(undefined, "nextjwt_token", token, { maxAge });

    setUser(resUser);

    api.defaults.headers["Authorization"] = `Baerer ${token}`;

    router.push("/dashboard");
  };

  useEffect(() => {
    const { nextjwt_token: token } = parseCookies();

    if (token) recoverUserData().then((user) => setUser(user));
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, signIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
