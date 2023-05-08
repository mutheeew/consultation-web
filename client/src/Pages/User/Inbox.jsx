import { useContext } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { UserContext } from "../../Context/User";
import { useQuery } from "react-query";
import { API } from "../../config/api";
import Group from "../../assets/Group.png"
import Profil from "../../assets/Profil.png"

export default function Inbox(){
    const [state] = useContext(UserContext)
    let id = state.user.ID

    let { data: consultations } = useQuery('consultationsCache', async () => {
        const response = await API.get('/consultations/' + id);
        return response.data.Data;
    });
    return(
        <Container className="p-5" >
            <h1 style={{color:"#FF6185", borderColor:"#FF6185"}}>Consultation</h1>
                {consultations?.length !== 0 && consultations?.map((item, index) => (
                    <Card className="my-5">
                        <Card.Body>
                            <Row>
                                <Col xs={1}>
                                <img src={Profil} style={{width:"45px", height:"45px", borderRadius:"100%"}} ></img> 
                                </Col>
                                <Col>
                                <Row>
                                    <Col>
                                        <h5 className="fw-bold my-0">{item.Subject}</h5>
                                        <span style={{fontSize:"12px"}}>{item.CreatedAt.split("T")[0]}</span>
                                    </Col>
                                    <Col xs={2} className="fw-semibold text-center" style={{fontSize:"14px"}}>{item.UpdatedAt.split("T")[0]}</Col>
                                    <p className="mt-2" style={{fontSize:"12px"}}>Keluhan: {item.Description}</p>
                                </Row>
                                </Col>
                            </Row>
                            <hr/>
                            {
                                item.Status === "waiting" ?
                                <Row>
                                    <h4 className="text-muted text-center">Waiting for reply...</h4>
                                </Row>
                                :
                                item.Status === "success" ?
                                <Row className="mx-5">
                                    <Col md={1}>
                                        <img src={Group} alt="profile" />
                                    </Col>
                                    <Col md={11}>
                                        <p className="text-gray">
                                            Hi {state.user.FullName} hari ini adalah jadwal konsultasi kamu, silahkan klik link berikut untuk melakukan konsultasi secara
                                            langsung kepada saya : <a href="https://meet.google.com/iiz-whrz-mcb" target="_blank"> disini</a> 
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