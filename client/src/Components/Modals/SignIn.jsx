import React, {useState, useContext} from "react";
import {Modal, Form, Button} from "react-bootstrap"
import {useMutation} from "react-query"
import {API} from "../../config/api"
import { UserContext } from "../../Context/User";

export default function SignIn({signin, closeSignIn}){
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
          console.log("login success: ", response);
          dispatch({
            type : 'LOGIN_SUCCESS',
            payload : response.data.data,
          });
          setAuthToken(localStorage.token);
          
          alert("Login Sukses")
        } catch (error) {
          alert("Login Failed, Try again")
          console.log("login failed : ", error);
        }
      });
    
    return (
        <Modal show={signin} onHide={closeSignIn} animation={true} centered size="sm">
            <Form onSubmit={(e) => handleSignIn.mutate(e)}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>username address</Form.Label>
                    <Form.Control type="username" 
                        name="username"
                        value={username}
                        onChange={handleOnChange}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>password</Form.Label>
                    <Form.Control type="password"
                        name="password"
                        value={password}
                        onChange={handleOnChange}
                    />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>  
        </Modal>
    )
}