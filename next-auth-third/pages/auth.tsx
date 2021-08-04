import { useCallback, useEffect } from "react";
import { useAuth } from "../context/auth";

const Auth = () => {
  const ctx = useAuth();
  const logout = () => {
    ctx.logout();
  };

  return (
    <div>
      <h1>Auth</h1>
      <button onClick={logout}>
        Logout
      </button>
    </div>
  );
};

export default Auth;
