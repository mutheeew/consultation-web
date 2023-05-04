import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { UserContext } from "../Context/User";

export const PrivateRouteLogin = () => {
    const [userState] = useContext(UserContext);
  console.log('mute gak mandi : ', userState.user.role)
    if (!userState.isLogin) {
      return <Navigate to={'/'} />;
    }
  
    return <Outlet />;
  };
  
  export const PrivateRouteUser = () => {
    const [userState] = useContext(UserContext);
  
    if (userState.user.role === 'admin') {
      return <Navigate to={'/home'} />;
    }
    return <Outlet />;
  };
  
  export const PrivateRouteAdmin = () => {
    const [userState] = useContext(UserContext);
  
    if (userState.user.role !== 'admin') {
      return <Navigate to={'/'} />;
    }
    return <Outlet />;
  };