/* eslint-disable react-hooks/exhaustive-deps */
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import React, { createContext, useContext, useEffect, useState } from "react";
import { api } from "../utils/axios";

const AuthContext: React.Context<any> = createContext({});

export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<any>(null);
  const [isLoading, setLoading] = useState(false)
  const router = useRouter();
  const isAuthenticated = !!user;

  const configureCookie = (token: string) => {
    api.defaults.headers["Authorization"] = token;
    Cookies.set("token", token);
  };

  const authenticateUser = async (payload: any) => {
    setLoading(true)
    try {
      const result = await api.post(
        "/users/login",
        payload
      );
      configureCookie(result.data?.token);
      setLoading(false)
      router.push("/dashboard");
    } catch (error) {
      alert(error);
      setLoading(false)
    }
  };

  const logout = () => {
    Cookies.remove("token");
    api.defaults.headers["Authorization"] = null;
    setUser(null);
    router.push("/");
  };

  // useEffect(() => {
  //   const token = Cookies.get("token");
  //   if (!token) return;
  //   Cookies.set("token", token);
  // }, []);

  useEffect(() => {
    console.log(children);
    const Component = children?.type;

    // If it doesn't require auth, everything's good.
    if (!Component.requiresAuth) return;

    // // If we're already authenticated, everything's good.
    if (isAuthenticated) return;

    // // If we don't have a token in the cookies, logout
    const token = Cookies.get("token");
    if (!token) {
      return logout();
    }
  }, [isAuthenticated]);

  const getUser = async () => {
    try{
      const user = await api.get("https://dev-sahaaya.herokuapp.com/users/profile")
      setUser(user.data)
    }catch {
      setUser(null);
      router.push("/");
    }
  };

  return (
    <AuthContext.Provider
      value={{ name: "jwt-auth", authenticateUser, logout, getUser, user, isLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
