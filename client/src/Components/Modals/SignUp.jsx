import React, {useState} from "react";
import {Modal, Form, Button} from "react-bootstrap"
import {useMutation} from "react-query"
import {API} from "../../config/api"

export default function SignUp({signup, closeSignUp}){
    const [form, setForm] = useState({
        full_name:"",
        Username:"",
        Email:"",
        Password:"",
    });

    const {full_name, Username, Email, Password} = form

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
            full_name:"",
            Username:"",
            Email:"",
            Password:"",
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
                        name="full_name"
                        value={full_name}
                        onChange={handleOnChange}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="input" 
                        name="Username"
                        value={Username}
                        onChange={handleOnChange}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" 
                        name="Email"
                        value={Email}
                        onChange={handleOnChange}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password"
                        name="Password"
                        value={Password}
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