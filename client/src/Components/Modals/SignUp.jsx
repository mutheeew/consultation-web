import React, {useState} from "react";
import {Modal, Form, Button} from "react-bootstrap"
import {useMutation} from "react-query"
import {API} from "../../config/api"

export default function SignUp({signup, closeSignUp}){
    const [form, setForm] = useState({
        fullName: '',
        username: '',
        email: '',
        password: '',
    });

    const {fullName, username, email, password} = form

    const handleOnChange = (e) => {
        // setState here
        setForm({
          ...form,
          [e.target.name]: e.target.value});
    };

    const handleSignUp = useMutation(async (e) => {
        try {
          e.preventDefault();
          const response = await API.post('/register', form);
          console.log("register success : ", response)
          alert("Register Sukses")
          setForm({
            fullName:"",
            username:"",
            email:"",
            password:"",
          });
        } catch (error) {
          console.log("register failed : ", error);
          alert("Register Gagal")
        }
    });

    return (
        <Modal show={signup} onHide={closeSignUp} animation={true} centered size="sm">
            <Form onSubmit={(e) => handleSignUp.mutate(e)}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Full Name</Form.Label>
                    <Form.Control type="input" 
                        name="fullName"
                        value={fullName}
                        onChange={handleOnChange}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>username</Form.Label>
                    <Form.Control type="input" 
                        name="username"
                        value={username}
                        onChange={handleOnChange}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>email address</Form.Label>
                    <Form.Control type="email" 
                        name="email"
                        value={email}
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