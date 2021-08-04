import { useCallback, useEffect } from "react";
import { useAuth } from "../context/auth";

const Profile = () => {
  const ctx = useAuth();
  const logout = () => {
    ctx.logout();
  };

  return (
    <div>
      <h1>Profile</h1>
      <button onClick={logout}>
        Logout
      </button>
    </div>
  );
};

export default Profile;
