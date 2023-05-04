import React, {useState, useContext} from "react";
import {Modal, Form, Button} from "react-bootstrap"
import {useMutation} from "react-query"
import {API, setAuthToken} from "../../config/api"
import { UserContext } from "../../Context/User";

export default function SignIn({signin, closeSignIn, openSignUp}){
    const [_, dispatch] = useContext(UserContext);
    const [form, setForm] = useState({
        username : "",
        password : "",
      });
    
      const { username, password} = form;
    
      const handleOnChange = (e) => {
        setForm({
          ...form,
          [e.target.name]: e.target.value,
        });
      };
    
      const handleSignIn = useMutation(async (e) => {
        try {
          e.preventDefault();
          const response = await API.post('/login', form);
          console.log("login success: ", response.data.Data);
          dispatch({
            type : 'LOGIN_SUCCESS',
            payload : response.data.Data,
          }); 
          setAuthToken(localStorage.Token);
          
          alert("Login Sukses")
        } catch (error) {
          alert("Login Failed, Try again")
          console.log("login failed : ", error);
        }
      });

      const gotoSignUp = () => {
        closeSignIn();
        openSignUp();
      };
    
    return (
        <Modal show={signin} onHide={closeSignIn} animation={true} centered size="sm">
            <Form onSubmit={(e) => handleSignIn.mutate(e)} className="p-3">
              <h1 className="text-center p-3" >Sign In</h1>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="username" 
                        name="username"
                        value={username}
                        onChange={handleOnChange}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password"
                        name="password"
                        value={password}
                        onChange={handleOnChange}
                    />
                </Form.Group>
                <Button type="submit" style={{backgroundColor:"#FF6185", borderColor:"#FF6185", width:"262px"}}>
                    Submit
                </Button>
            </Form>
            <Modal.Footer
                className="flex justify-content-center border-0"
                style={{ marginTop: "-25px" }}>
                <p style={{ fontSize: "12px" }} className="text-muted">
                  Don't have an account? ? Klik
                    <a
                    onClick={gotoSignUp}
                    style={{textDecoration: "none"}}
                    className="fw-semibold"> Here
                    </a>
                </p>
            </Modal.Footer>  
        </Modal>
    )
}