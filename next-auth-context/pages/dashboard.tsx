import { useCallback, useEffect } from "react";
import { Button } from "semantic-ui-react";
import { useAuth } from "../context/AuthContext";

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

      <Button secondary onClick={logout}>
        Logout
      </Button>
    </div>
  );
};

Dashboard.requiresAuth = true;

export default Dashboard;
