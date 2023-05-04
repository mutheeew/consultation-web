import { useContext } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { UserContext } from "../../Context/User";
import { useQuery } from "react-query";
import { API } from "../../config/api";

export default function Inbox(){
    const [state] = useContext(UserContext)
    let id = state.user.ID

    let {data: consultations} = useQuery('consultationsCache', async () => {
        const response = await API.get('/consultations' + id)
        return response.data.Data;
    })
    return(
        <Container>
            <h2> Consultation</h2>
                {consultations?.length !== 0 && consultations?.map((item, index) => (
                    <Card>
                        <Card.Body>
                            <Row>
                                <Col>
                                <img src={state.userPhoto}/>
                                </Col>
                                <Col>
                                <Row>
                                    <Col>
                                        <h5>{item.subject}</h5>
                                        <span>10 April 2023</span>
                                    </Col>
                                    <Col>11 April 2023</Col>
                                    <p>Keluhan: {item.Description}</p>
                                </Row>
                                </Col>
                            </Row>
                            <hr/>
                            {
                                item.Status === "waiting" ?
                                <Row>
                                    <h4>Waiting for reply</h4>
                                </Row>
                                :
                                item.Status === "success" ?
                                <Row className="mx-5">
                                    <Col md={1}>
                                        <img src={state.user.Photo} className='nav-profile-image' alt="profile" />
                                    </Col>
                                    <Col md={11}>
                                        <p className="text-gray">
                                            Hi {state.user.FullName} hari ini adalah jadwal konsultasi kamu, silahkan klik link berikut untuk melakukan konsultasi secara
                                            langsung kepada saya :
                                        </p>
                                        <p className="text-gray">Dr. Muhammad Rizki </p>
                                    </Col>
                                </Row>
                                    :
                                    <Row className="mx-5">
                                        <h4 className="text-center text-gray text-bold">Reject</h4>
                                    </Row>
                            }
                        </Card.Body>
                    </Card>
                ))
            }
        </Container>
    )
}