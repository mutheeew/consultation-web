import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { UserContext } from "../Context/User";

export const PrivateRouteLogin = () => {
    const [userState] = useContext(UserContext);
  console.log('mute gak mandi : ', userState.user.Role)
    if (!userState.isLogin) {
      return <Navigate to={'/'} />;
    }
  
    return <Outlet />;
  };
  
  export const PrivateRouteUser = () => {
    const [userState] = useContext(UserContext);
  
    if (userState.user.Role === 'Doctor') {
      return <Navigate to={'/data-reservation'} />;
    }
    return <Outlet />;
  };
  
  export const PrivateRouteDokter = () => {
    const [userState] = useContext(UserContext);
  
    if (userState.user.Role !== 'Doctor') {
      return <Navigate to={'/'} />;
    }
    return <Outlet />;
  };