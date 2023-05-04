import { useState, useContext, useEffect } from 'react'
import { UserContext } from './Context/User'
import Navbars from './Components/Navbar'
import Home from './Pages/Home'
import Profil from './Pages/User/Profile'
import { Route, Routes, useNavigate } from 'react-router-dom'
import {API, setAuthToken} from './config/api'
import { PrivateRouteLogin, PrivateRouteUser } from './Components/privateroute'

function App() {
  let navigate = useNavigate();
  const [state, dispatch] = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true)

  const checkUser = async () => {
    try {
      const response = await API.get('/check-auth');
      console.log("check user success: ", response)
      let payload = response.data.Data;
      payload.Token = localStorage.Token;
      dispatch({
        type : 'USER_SUCCESS',
        payload,
      });
      setIsLoading(false)
    } catch (error) {
      console.log("check user failed: ", error);
      dispatch({
        type: 'AUTH_ERROR',
      });
      setIsLoading(false)
    }
  };

  useEffect(() => {
    if (localStorage.Token) {
      setAuthToken(localStorage.Token);
      checkUser();
    } else {
      setIsLoading(false)
    }
  }, []);

  useEffect(() => {
    // Redirect Auth but just when isLoading is false
    if (!isLoading) {
      if (state.isLogin === false) {
        // alert("Login dulu bosss")
        navigate('/');
      }
    }
  }, [isLoading]);
  
  return isLoading ? null : (
    <>
    <Navbars/>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route element={<PrivateRouteLogin/>}>
        <Route element={<PrivateRouteUser />}>
          <Route path="/profile" element={<Profil />} />
        </Route>
      </Route>
    </Routes>
    {/* <SignUp/> */}
    </>
    
  )
}

export default App
