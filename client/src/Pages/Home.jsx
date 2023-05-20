import Jumbotron from "../Components/Jumbotron";
import AddArticle from "./Doctor/AddArticle";
import { Row, Col, Card, Badge, Button } from "react-bootstrap";
import { useMutation, useQuery } from "react-query";
import { API } from "../config/api";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../Context/User";

export default function Home(){
    const [state] = useContext(UserContext);

    let { data: articles } = useQuery('articlesCache', async () => {
        const response = await API.get('/articles');
        return response.data.Data;
    });

    const handleDelete = useMutation(async (id) => {
        try{
            await API.delete("/article/"+ id);
            alert("Ddeleted")
            
        } catch (error){
          console.log(error);
        }
      });

    return (
        <>
            <Jumbotron/>
            <div className="m-5">
                <div className="d-flex justify-content-center my-5">
                    <h1 style={{color:"#FF6185"}}>Artikel Hari Ini</h1>
                </div>
                <div className="d-flex flex-wrap justify-content-center">
                    <Row className="gap-5">
                            {articles?.length !== 0 &&
                                articles?.map((item, index) => (
                                    <Col key={index}>
                                            <Card style={{ width: '18rem' }}>
                                        <Link to={"/article/" + item.ID} style={{ textDecoration: "none" }}>
                                                <Card.Img variant="top" src={item.Attache} />
                                                </Link>
                                                <Card.Body>
                                                    <Card.Title style={{height: "50px", overflow:"hidden"}}>{item.Title}</Card.Title>
                                                    <Card.Text style={{height: "100px", overflow:"hidden"}}>
                                                    {item.Description}
                                                    </Card.Text>
                                                    
                                                    <Badge pill bg='secondary' >Corona Virus</Badge>
                                                    {state.isLogin && state.user.Role === 'Doctor' && (
                                                        <>
                                                            <Link to={"/update-article/" + item.ID} className="btn btn-secondary py-0 ms-5" style={{fontSize:"12px"}}>Edit</Link>
                                                            <Button variant="secondary" onClick={()=> {handleDelete.mutate(item.ID)}} className="py-0 ms-2" style={{fontSize:"12px"}}>Delete</Button>
                                                        </>
                                                    )}
                                                    
                                                </Card.Body>
                                            </Card>
                                    </Col>
                                    
                                ))
                            }
                    </Row>
                </div>
            </div>
        </>
    )
}