import axios, { AxiosError } from "axios";
import { setCookie, parseCookies } from "nookies";
import { signOut } from "../contexts/AuthContext";
import AuthTokenError from "./errors/AuthTokenError";

let isRefreshing = false;
let failedRequestQueue = [];

export const api = axios.create({
  baseURL: "http://localhost:3000/api",
});

export function setupAuthApi(context) {
  let cookies = parseCookies(context);

  console.log("cookies", cookies);

  const { "dashgo.token": token } = cookies;

  const authApi = axios.create({
    baseURL: "http://localhost:3333",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  authApi.interceptors.response.use(
    (response) => {
      console.log("interceptor sucess", response);
      return response;
    },
    (error: AxiosError) => {
      console.log("interceptor error", error);

      if (error.response.status === 401) {
        if (
          error.response.data?.code === "token.expired" ||
          error.response.data?.message === "Invalid token format."
        ) {
          let newCookies = parseCookies(context);

          const { "dashgo.refreshToken": refreshToken } = newCookies;

          const originalConfig = error.config;

          if (!isRefreshing) {
            isRefreshing = true;
            console.log(authApi.defaults.headers.common);

            authApi
              .post("refresh", {
                refreshToken,
              })
              .then((response) => {
                const { token } = response.data;

                setCookie(context, "dashgo.token", token, {
                  maxAge: 60 * 60 * 24,
                  path: "/",
                });

                setCookie(
                  context,
                  "dashgo.refreshToken",
                  response.data.refreshToken,
                  {
                    maxAge: 60 * 60 * 24,
                    path: "/",
                  }
                );

                authApi.defaults.headers.common[
                  "Authorization"
                ] = `Bearer ${token}`;

                failedRequestQueue.forEach((request) =>
                  request.onSucess(token)
                );
                failedRequestQueue = [];
              })
              .catch(() => {
                failedRequestQueue.forEach((request) =>
                  request.onFailure(token)
                );
                failedRequestQueue = [];
                if (process.browser) {
                  signOut();
                }
              })
              .finally(() => {
                isRefreshing = false;
              });
          }

          return new Promise((resolve, reject) => {
            failedRequestQueue.push({
              onSucess: (token: string) => {
                originalConfig.headers["Authorization"] = `Bearer ${token}`;

                resolve(authApi(originalConfig));
              },
              onFailure: (error: AxiosError) => {
                reject(error);
              },
            });
          });
        } else {
          if (process.browser) {
            signOut();
          } else {
            return Promise.reject(new AuthTokenError());
          }
        }
      }

      return Promise.reject(error);
    }
  );

  return authApi;
}

export const authApi = setupAuthApi(undefined);
