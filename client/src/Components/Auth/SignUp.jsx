import React, {useState} from "react";
import {Modal, Form, Button} from "react-bootstrap"
import {useMutation} from "react-query"
import {API} from "../../config/api"

export default function SignUp({signup, closeSignUp, openSignIn}){
    const [form, setForm] = useState({
        fullName: '',
        username: '',
        email: '',
        password: '',
        role: '',
        gender: '',
        phone: '',
        address: '',
    });

    const {fullName, username, email, password, role, gender, phone, address} = form

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
          gotoSignIn()
        } catch (error) {
          console.log("register failed : ", error);
          alert("Register Gagal")
        }
    });

    const gotoSignIn = () => {
        closeSignUp();
        openSignIn();
    };

    return (
        <Modal show={signup} onHide={closeSignUp} animation={true} centered size="sm">
            <Form onSubmit={(e) => handleSignUp.mutate(e)} className="p-3">
                <h1 className="text-center p-2" >Sign Up</h1>
                <Form.Group className="mb-2" controlId="formBasicEmail">
                    <Form.Label>Full Name</Form.Label>
                    <Form.Control type="input" 
                        name="fullName"
                        value={fullName}
                        onChange={handleOnChange}
                    />
                </Form.Group>
                <Form.Group className="mb-2" controlId="formBasicEmail">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="input" 
                        name="username"
                        value={username}
                        onChange={handleOnChange}
                    />
                </Form.Group>
                <Form.Group className="mb-2" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" 
                        name="email"
                        value={email}
                        onChange={handleOnChange}
                    />
                </Form.Group>
                <Form.Group className="mb-2" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password"
                        name="password"
                        value={password}
                        onChange={handleOnChange}
                    />
                </Form.Group>
                <Form.Group className="mb-2">
                    <Form.Label>Role</Form.Label>
                    <Form.Select
                        type="text"
                        name="role"
                        value={role}
                        onChange={handleOnChange}>
                        <option>Select here...</option>
                        <option>User</option>
                        <option>Doctor</option>
                    </Form.Select>
                </Form.Group>
                <Form.Group className="mb-2">
                <Form.Label>Gender</Form.Label>
                    <Form.Select
                        type="text"
                        name="gender"
                        value={gender}
                        onChange={handleOnChange}>
                        <option>Select here...</option>
                        <option>Male</option>
                        <option>Female</option>
                    </Form.Select>
                </Form.Group>
                <Form.Group className="mb-2" controlId="formBasicEmail">
                    <Form.Label>Phone</Form.Label>
                    <Form.Control type="input" 
                        name="phone"
                        value={phone}
                        onChange={handleOnChange}
                    />
                </Form.Group>
                <Form.Group className="mb-2" controlId="formBasicEmail">
                    <Form.Label>Address</Form.Label>
                    <Form.Control type="input" 
                        name="address"
                        value={address}
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
                    Already have an account ? Klik 
                    <a
                    onClick={gotoSignIn}
                    style={{textDecoration: "none"}}
                    className="fw-semibold"> Here
                    </a>
                </p>
            </Modal.Footer>
        </Modal>
        
    )
}