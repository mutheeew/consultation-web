import React, { useState } from "react"
import { Button } from "react-bootstrap"
import SignUp from "./Modals/SignUp"
export default function Navbar(){
    const [signup, setSignUp] = useState(false)
    const openSignUp = () => {
        setSignUp(true)
    }
    const closeSignUp = () => {
        setSignUp(false)
    }
    return(
        <>
        <Button>Login</Button>
        <SignUp
            signup={signup}
            closeSignUp={closeSignUp}
        />
        <Button onClick={openSignUp}>Register</Button>
        </>
    )
}