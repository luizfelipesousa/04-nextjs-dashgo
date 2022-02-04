import Router from "next/router";
import { createContext, ReactNode, useEffect, useState } from "react";
import { authApi } from "../services/api";
import { setCookie, parseCookies, destroyCookie } from "nookies";
import { BroadcastChannel } from "broadcast-channel";

type SigniInCredentials = {
  email: string;
  password: string;
};

type AuthcontextData = {
  signIn: (credentials: SigniInCredentials) => Promise<void>;
  signOut: () => void;
  isAuthenticated: boolean;
  user: User;
};

type AuthProviderProps = {
  children: ReactNode;
};

type User = {
  email: string;
  permissions: string[];
  roles: string[];
};

export const AuthContext = createContext({} as AuthcontextData);

const dashGochannel = new BroadcastChannel("dashgo.channel");

export function signOut(context = undefined) {
  destroyCookie(context, "dashgo.token");
  destroyCookie(context, "dashgo.refreshToken");
  dashGochannel.postMessage("signOut");
  Router.push("/");
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>();

  useEffect(() => {
    dashGochannel.onmessage = (ev) => {
      switch (ev) {
        case "signOut":
          destroyCookie(undefined, "dashgo.token");
          destroyCookie(undefined, "dashgo.refreshToken");
          Router.push("/");
          break;
        case "signIn":
          Router.push("/dashboard");
          break;
        default:
          break;
      }
    };
  }, []);

  useEffect(() => {
    const { "dashgo.token": token } = parseCookies();

    if (token) {
      authApi
        .get("me")
        .then((response) => {
          const { email, permissions, roles } = response.data;
          setUser({ email, permissions, roles });
        })
        .catch(() => {
          signOut();
        });
    }
  }, []);

  const isAuthenticated = !!user;

  async function signIn({ email, password }: SigniInCredentials) {
    const { data, status } = await authApi.post("sessions", {
      email,
      password,
    });

    const { permissions, roles, token, refreshToken } = data;

    setUser({
      email,
      permissions,
      roles,
    });

    setCookie(undefined, "dashgo.token", token, {
      maxAge: 60 * 60 * 24,
      path: "/",
    });

    setCookie(undefined, "dashgo.refreshToken", refreshToken, {
      maxAge: 60 * 60 * 24,
      path: "/",
    });

    authApi.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    console.log("signIn", token);

    dashGochannel.postMessage("signIn");

    Router.push("/dashboard");
  }

  return (
    <AuthContext.Provider value={{ signIn, signOut, isAuthenticated, user }}>
      {children}
    </AuthContext.Provider>
  );
}
