import React, {
  createContext,
  useState,
  useContext,
} from "react";
import Cookies from "js-cookie";
import Router, { useRouter } from "next/router";
import api from "../utils/axios";

const AuthContext: React.Context<any> = createContext({});

export const AuthProvider = ({ children }: any) => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const isSignedIn = () => {
    return !!Cookies.get("token");
  };

  const configureCookie = (token: string) => {
    api.defaults.headers["Authorization"] = token;
    Cookies.set("token", token);
  };

  const authenticateUser = async (payload: any) => {
    try {
      const result = await api.post("/users/login", payload);
      configureCookie(result.data?.token);
      setLoading(false);
      router.push("/dashboard");
    } catch (error) {
      alert(error);
      setLoading(false);
    }
  };
  const getUser = async () => {
    try {
      const user = await api.post(
        "https://dev-sahaaya.herokuapp.com/users/profile"
      );
      setUser(user.data);
    } catch {
      setUser(null);
      // router.push("/");
    }
  };

  const logout = () => {
    Cookies.remove("token");
    setUser(null);
    delete api.defaults.headers.Authorization;
    router.push("/");
  };

  return (
    <AuthContext.Provider
      value={{ isSignedIn, user, authenticateUser, loading, logout, getUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
