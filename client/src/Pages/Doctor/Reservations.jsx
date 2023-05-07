import { Button, Col, Form, Modal, Row, Table } from "react-bootstrap";
import { BsCircle, BsCircleFill } from 'react-icons/bs';
import {useMutation, useQuery} from "react-query"
import {API} from "../../config/api"
import { useState } from "react"
import DetailInfo from "../../Components/Doctor/DetailInfo"

export default function Reservations() {
    const [detail, setDetail] = useState(false)
    const [show, setShow] = useState(true)
    const [hide, setHide] = useState(false)
    const [getData, setData] = useState([])

    const openDetail= () => {
        setDetail(true)
    }

    const closeDetail = () => {
        setDetail(false)
    }

    let {data: consultations, refetch} = useQuery('consultationsCache', async () => {
        const response = await API.get('/consultations')
        return response.data.Data
    })

    const [form, setForm] = useState({
        responseText:"",
        consultationLink:"",
    })

    const handleChange = (e) =>{
        setForm({...form, [e.target.name]: e.target.value})
    }

    console.log("ini form :",form)

    const handleSubmit = useMutation(async (e) => {
        try {
            e.preventDefault()
            const formData = new FormData()
            formData.set('responseText', form.responseText)
            formData.set('consultationLink', form.consultationLink)
            const response = await API.post('/response/', + id, formData)
            console.log(response)
            alert("Add response successfull")
        } catch (e) {
            alert ("Add response failed")
        }
    })

    const DetailInfo2 = () => {
        console.log("inij item : ", getData)
        return (
            <>
            <Modal show={show} onHide={false} size="lg">
                <div className="p-5">
                    <button  onClick={() => setDetail(false)}>X</button>
                    <div className="">
                        <Row>
                            <Col>
                                <h1>{getData.Subject}</h1>
                                <p>{getData?.Description}</p>
                            </Col>
                            <Col xs={5}>
                                <div className="d-flex align-items-center">
                                    <BsCircle/>
                                    <div className="ps-3">
                                        <h4>Date of complaint</h4>
                                        <p>{getData?.CreatedAt}</p>
                                    </div>
                                </div>
                                <div className="d-flex align-items-center">
                                    <BsCircleFill/>
                                    <div className="ps-3">
                                        <h4>Live Consultation</h4>
                                        <p>{getData?.RequestDate}</p>
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
                                <td>{getData?.User.FullName}</td>
                                <td>{getData?.User.Gender}</td>
                                <td>{getData?.User.Phone}</td>
                                <td>{getData?.Age}</td>
                                <td>{getData?.Height}</td>
                                <td>{getData?.Weight}</td>
                            </tr>
                        </tbody>
                    </Table>
                    <div>
                    <Form onSubmit={(e) => handleSubmit.mutate(e)}>
                        <Form.Group className="mb-3">
                            <Form.Label className="fw-semibold">Description</Form.Label>
                            <Form.Control as="textarea"  name="responseText" onChange={handleChange} value={form?.responseText} rows={3} />
                        </Form.Group>
                        <div className="d-flex justify-content-end gap-3">
                            <Button>Cancel</Button>
                            <Button type="submit">Approve</Button>
                        </div>
                    </Form>
                    </div>
                </div>
                
            </Modal>
            
            </>
        )
    }

    return(
        <div className="container m-5">
        <h1 style={{color:"#FF6185"}}>Data Reservations</h1>
            <Table className="m-5 text-center">
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Users</th>
                        <th>Subject</th>
                        <th>Date of complaint</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody >
                    {consultations?.length !== 0 && consultations?.map((item, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{item.User.FullName}</td>
                            <td>{item.Subject}</td>
                            <td>{item.RequestDate}</td>
                            <td>Waiting..</td>
                            <td>
                                {detail && 
                                <DetailInfo2
                                
                                />}
                                <Button onClick={()=>{setDetail(true); setData(item)}}>Action</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    )
    
    
}