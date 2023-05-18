import { useContext, useState } from 'react';
import {Button, Col, Form, Row} from 'react-bootstrap';
import { UserContext } from '../../Context/User';
import { useMutation } from 'react-query';
import { API } from '../../config/api';
import { useNavigate } from 'react-router-dom';

function Reservation() {
    const [state] = useContext(UserContext)

    const [form, setForm] = useState({
        bornDate: '',
        age: 0,
        height: 0,
        weight: 0,
        subject: '',
        requestDate: '',
        description: '',
    })

    console.log(form)

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    }

    const navigate = useNavigate()

    const handleSubmit = useMutation(async (e) => {
        try {
            e.preventDefault()
            
            // Store data with FormData as object
            const formData = new FormData()
            formData.set('bornDate', form.bornDate)
            formData.set('age', form.age)
            formData.set('height', form.height)
            formData.set('weight', form.weight)
            formData.set('subject', form.subject)
            formData.set('requestDate', form.requestDate)
            formData.set('description', form.description)
            const response = await API.post('/consultation', formData)
            console.log(response)
            alert("Add reservation successed ")
            navigate("/")
        } catch (e) {
            alert("add reservation  failed : ", e);
        }
    })

  return (
    <div className='d-flex justify-content-center'>
        <div className='container m-5'  style={{width:"90vw"}}>
            <h1 style={{color:"#FF6185"}}>Reservasi Consultation</h1>
            <Form className='container pt-3' onSubmit={(e) => handleSubmit.mutate(e)}>
                <Form.Group className="mb-3">
                    <Form.Label>Full Name</Form.Label>
                    <Form.Control value={state.user.FullName} readOnly/>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Phone</Form.Label>
                    <Form.Control value={state.user.Phone} readOnly/>
                </Form.Group>
                <Row className="mb-3">
                    <Form.Group as={Col}>
                        <Form.Label>Born Date</Form.Label>
                    <Form.Control type='date' name='bornDate' onChange={handleChange} />
                    </Form.Group>

                    <Form.Group as={Col} md={2}>
                    <Form.Label>Age</Form.Label>
                    <Form.Control name='age' onChange={handleChange} />
                    </Form.Group>

                    <Form.Group as={Col} md={2}>
                    <Form.Label>Height</Form.Label>
                    <Form.Control name='height' onChange={handleChange} />
                    </Form.Group>

                    <Form.Group as={Col} md={2}>
                    <Form.Label>Weight</Form.Label>
                    <Form.Control name='weight' onChange={handleChange} />
                    </Form.Group>
                </Row>
                <Form.Group className="mb-3">
                    <Form.Label>Gender</Form.Label>
                    
                    <Form.Control type='text' value={state.user.Gender} readOnly/>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Subject</Form.Label>
                    <Form.Control type="text" name='subject' onChange={handleChange}/>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Live Consultation Date</Form.Label>
                    <Form.Control type='date' name='requestDate' onChange={handleChange}/>
                </Form.Group>
                
                <Form.Group className="mb-3">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                    name='description'
                    onChange={handleChange}
                    as="textarea"
                    style={{ height: '100px' }}
                    />
                </Form.Group>

            <Button type="submit" className='d-flex px-5' style={{backgroundColor:"#FF6185", borderColor:"#FF6185"}}> 
                Send
            </Button>
            </Form>
        </div>
    </div>
  );
}

export default Reservation;