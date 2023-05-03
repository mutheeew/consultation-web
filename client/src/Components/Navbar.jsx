import React, { useState } from "react"
import { Button } from "react-bootstrap"
import SignUp from "./Modals/SignUp"
import SignIn from "./Modals/SignIn"
export default function Navbar(){
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
    return(
        <>
            <SignIn
                signin={signin}
                closeSignIn={closeSignIn}
            />
            <Button onClick={openSignIn}>Login</Button>
            <SignUp
                signup={signup}
                closeSignUp={closeSignUp}
            />
            <Button onClick={openSignUp}>Register</Button>
        </>
    )
}