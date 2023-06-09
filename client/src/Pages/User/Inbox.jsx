import { useContext } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { UserContext } from "../../Context/User";
import { useQuery } from "react-query";
import { API } from "../../config/api";
import Group from "../../assets/Group.png"
import Profilzayn from "../../assets/ZaynQ.png"

export default function Inbox(){
    const [state] = useContext(UserContext)
    let id = state.user.ID

    let { data: consultations } = useQuery('consultationsCache', async () => {
        const response = await API.get('/consultations/' + id);
        return response.data.Data;
    });

    let { data: responses} = useQuery('responsesCache', async() => {
        const response = await API.get('/responses')
        return response.data.Data
    })

    return(
        <Container className="p-5" >
            <h1 style={{color:"#FF6185", borderColor:"#FF6185"}}>Consultation</h1>
                {consultations?.length !== 0 && consultations?.map((item, index) => (
                    <Card className="my-5">
                        <Card.Body>
                            <Row>
                                <Col xs={1}>
                                <img src={Profilzayn} style={{width:"45px", height:"45px", borderRadius:"100%"}} ></img> 
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
                                    {responses?.filter((res) => res.ConsultationId === item.ID).map((itemresponse) => (
                                        <Col md={11} key={itemresponse.ID}>
                                            <p className="text-gray">
                                                Hi {state.user.FullName} {itemresponse.responseText} <a href={itemresponse.consultationLink} target="_blank"> disini</a> 
                                            </p>
                                            <p>{itemresponse.User.FullName}</p>
                                        </Col>
                                    ))}
                                </Row>
                                    :
                                    <Row className="mx-5">
                                        <h4 className="text-center text-gray text-bold">Cancel</h4>
                                    </Row>
                            }
                        </Card.Body>
                    </Card>
                ))
            }
        </Container>
    )
}