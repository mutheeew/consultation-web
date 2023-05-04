import React, { useState, useContext } from "react"
import { Button, Container, Navbar, NavbarBrand, Dropdown } from "react-bootstrap"
import { UserContext } from "../Context/User"
import SignUp from "./Modals/SignUp"
import SignIn from "./Modals/SignIn"
import Logo from "../assets/Icon.png"
import Group from "../assets/Group.png"
import { Link, useNavigate } from "react-router-dom"

export default function Navbars(){
  let navigate = useNavigate()
  const [state, dispatch] = useContext(UserContext)
    const [signup, setSignUp] = useState(false)
    const [signin, setSignIn] = useState(false)

    const openSignIn = () => {
        setSignIn(true)
    }

    const closeSignIn = () => {
        setSignIn(false)
    }
    
    const openSignUp = () => {
        setSignUp(true)
    }

    const closeSignUp = () => {
        setSignUp(false)
    }

    const logout = () => {
      dispatch({type: "LOGOUT"})
      navigate("/");
    };
    return(
        <>
        <Navbar className="shadow-lg">
            <Container className="d-flex justify-content-between">
                <NavbarBrand><img src={Logo}></img></NavbarBrand>
                {state.isLogin ?
                <div>
                {/* <Nav className="gap-3"> */}
                  <Dropdown>
                    <Dropdown.Toggle className="btn-light" style={{backgroundColor:"white"}} >
                      <img src={Group} className="rounded-50" style={{width:"45px", height:"45px", borderRadius:"100%"}} ></img> 
                    </Dropdown.Toggle>
                    <Dropdown.Menu className="bg-light mt-4 ms-4">
                      <Dropdown.Item className="d-flex align-items-center fw-semibold">
                        <Link
                          to="/profile"
                          className="fw-semibold text-decoration-none">
                          {/* <CgProfile
                            color="red"
                            style={{ fontSize: "20px" }}
                            className="me-2"
                          /> */}
                          Profile
                        </Link>
                      </Dropdown.Item>
                      <Dropdown.Item className="d-flex align-items-center gap-2 fw-semibold fs-6 pb-2 border-bottom border-white">
                        <Link
                          to="/inbox"
                          className="fw-semibold text-decoration-none">
                          {/* <MdPayment
                            color="red"
                            style={{ fontSize: "20px" }}
                            className="me-2"
                          /> */}
                          Consultation
                        </Link>
                      </Dropdown.Item>
                      <Dropdown.Item
                        className="d-flex align-items-center gap-2 fw-semibold"
                        onClick={()=> logout()}
                        >
                        {/* <MdLogout color="red" style={{ fontSize: "20px" }} /> */}
                        Logout
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                {/* </Nav> */}
                </div>
                :
                <div className="d-flex gap-3">
                    <SignUp
                        signup={signup}
                        closeSignUp={closeSignUp}
                        openSignIn={openSignIn}
                        />
                    <Button onClick={openSignUp} style={{backgroundColor:"#FFF", borderColor:"#FF6185", color:"#FF6185"}}>Sign up</Button>
                    <SignIn
                        signin={signin}
                        closeSignIn={closeSignIn}
                        openSignUp={openSignUp}
                        />
                    <Button onClick={openSignIn} style={{backgroundColor:"#FF6185", borderColor:"#FF6185"}}>Sign in</Button>
                </div>
                      }
            </Container>
            
        </Navbar>
            
        </>
    )
}