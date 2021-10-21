import axios from "axios";
import { parseCookies } from "nookies";

const getApiClient = (context?: any) => {
  const { nextjwt_token: token } = parseCookies(context);

  const api = axios.create({ baseURL: "http://localhost:3333" });

  api.interceptors.request.use((config) => {
    console.log(config);
    return config;
  });

  if (token) api.defaults.headers["Authorization"] = `Bearer ${token}`;
  else console.log("token not exist");

  return api;
};

export default getApiClient;
