import { useState } from "react";
import { Button, Col, Form, Modal, Row, Table } from "react-bootstrap";
import { BsCircle, BsCircleFill } from 'react-icons/bs';
import { useMutation } from "react-query";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { API } from "../../config/api";

export default function DetailInfo({item}){
    let navigate = useNavigate()
    const [show, setShow] = useState(false);
    const [form, setForm] = useState({
        responseText: "",
        consultationLink: "",
    })

    const handleChange = (e) => {
        setForm({
            ...form, [e.target.name]: e.target.value
        })
    }

    console.log("ini item", item.ID)

    const handleSubmit = useMutation(async (e) => {
        try {
            e.preventDefault()

            const config = {
                headers: {
                  "Content-type": "application/json",
                },
              };

            const formData = new FormData()
            formData.set("responseText", form.responseText)
            formData.set("consultationLink", form.consultationLink)

            const response = await API.post('/response/' + item.ID, formData, config)
            console.log("ini response", response)
            const consultation = await API.patch('/consultation/' + item.ID)
            console.log("ini consultation", consultation)
            Navigate('/reservasi-data')
        } catch (error) {
            console.log("Add response failed", error)
        }
    })

    return (
        <>
        <Link>
            <button onClick={() => setShow(true)}>
                Give Response
            </button>
        </Link>
        <Modal show={show} onHide={() => setShow(false)} size="lg">
            <div className="p-5">
                <div className="">
                    <Row>
                        <Col>
                            <h1>{item.Subject}</h1>
                            <p>{item.Description}</p>
                        </Col>
                        <Col xs={5}>
                            <div className="d-flex align-items-center">
                                <BsCircle/>
                                <div className="ps-3">
                                    <h4>Date of complaint</h4>
                                    <p>{item.CreatedAt}</p>
                                </div>
                            </div>
                            <div className="d-flex align-items-center">
                                <BsCircleFill/>
                                <div className="ps-3">
                                    <h4>Live Consultation</h4>
                                    <p>{item.RequestDate}</p>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </div>
                <Table>
                    <thead>
                        <tr>

                        <th>No</th>
                        <th>Full Name</th>
                        <th>Gender</th>
                        <th>Phone</th>
                        <th>Age</th>
                        <th>Height</th>
                        <th>Weight</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td></td>
                            <td>{item.User.FullName}</td>
                            <td>{item.User.Gender}</td>
                            <td>{item.User.Phone}</td>
                            <td>{item.Age}</td>
                            <td>{item.Height}</td>
                            <td>{item.Weight}</td>
                        </tr>
                    </tbody>
                </Table>
                <div>
                    <input type="text" />
                <Form  >
                    <Form.Group className="mb-3">
                        <Form.Label className="fw-semibold">Description</Form.Label>
                        <Form.Control type="text " name="responseText" onChange={handleChange} rows={3} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label className="fw-semibold">Link</Form.Label>
                        <Form.Control type="text" value="mute mandi lah pleasee" name="consultationLink" onChange={handleChange} />
                    </Form.Group>
                    <div className="d-flex justify-content-end gap-3">
                        {/* <Button>Cancel</Button> */}
                        <Button type="submit" onClick={(e) => handleSubmit.mutate(e)}>Approve</Button>
                    </div>
                </Form>
                </div>
            </div>
            
        </Modal>
        
        </>
    )
}