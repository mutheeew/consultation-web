import Jumbotron from "../Components/Jumbotron";
import AddArticle from "./Doctor/AddArticle";
import { Row, Col, Card, Badge } from "react-bootstrap";
import { useQuery } from "react-query";
import { API } from "../config/api";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../Context/User";

export default function Home(){
    let navigate = useNavigate()
    const [state] = useContext(UserContext);

    let { data: articles } = useQuery('articlesCache', async () => {
        const response = await API.get('/articles');
        return response.data.Data;
    });

    return (
        
        <>
        <Jumbotron/>
        <div className="m-5">

        {/* <AddArticle/> */}
            <div className="d-flex justify-content-center my-5">
                <h1 style={{color:"#FF6185"}}>Artikel Hari Ini</h1>
            </div>
        <div className="d-flex flex-wrap">

        <Row>
                {articles?.length !== 0 &&
                    articles?.map((item, index) => (
                        <Col key={index}>
                            <Link to={"/article/" + item.ID} style={{ textDecoration: "none" }}>
                                <Card style={{ width: '18rem' }}>
                                    <Card.Img variant="top" src={item.Attache} />
                                    <Card.Body>
                                        <Card.Title>{item.Title}</Card.Title>
                                        <Card.Text style={{height: "100px", overflow:"hidden"}}>
                                        {item.Description} Lorem ipsum dolor sit, amet consectetur adipisicing elit. Odit aliquam molestiae quia minima consectetur iste corrupti sint, deleniti sit eius perferendis architecto sunt, laboriosam culpa libero cum, asperiores eum earum. Eos doloribus quas dolor eius.
                                        </Card.Text>
                                        <Badge pill bg='secondary' >Corona Virus</Badge>
                                    </Card.Body>
                                </Card>
                            </Link>
                        </Col>
                        
                    ))
                }
            </Row>
        </div>
        </div>
        </>
    )
}