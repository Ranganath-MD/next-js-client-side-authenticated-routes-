import { useAuth } from "../context/auth";
import Home from "../pages";

const publicRoutes = [
  '/profile', '/auth'
]

export const ProtectRoute = ({ children, pathname, goTo }: any) => {
  const { isSignedIn } = useAuth();

  if(publicRoutes.includes(pathname)){
    return children
  }

  if (!isSignedIn()){
    goTo(true)
    return <Home />
  }

  return children;
};