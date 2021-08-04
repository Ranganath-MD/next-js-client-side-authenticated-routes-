import { useCallback, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import withAuth from "../utils/withAuth";

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

export default withAuth(Dashboard);
