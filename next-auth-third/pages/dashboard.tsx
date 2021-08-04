import { useCallback, useEffect } from "react";
import { useAuth } from "../context/auth";

const Dashboard = () => {
  const ctx = useAuth();
  const logout = () => {
    ctx.logout();
  };

  const fetchUser = useCallback(() => {
    ctx.getUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return (
    <div>
      <h1>Welcome: {ctx.user?.username}</h1>

      <button onClick={logout}>
        Logout
      </button>
    </div>
  );
};

// Dashboard.requiresAuth = true;

export default Dashboard;
