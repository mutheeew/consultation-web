import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { API } from "../config/api";
import { Card, Container } from "react-bootstrap";

export default function DetailArticle(){
    let { id } = useParams("id")

    let { data: article } = useQuery('myArticlesCache', async () => {
        const response = await API.get('/article/' + id)
        return response.data.Data;
    });

    return (
        <Container>
            <h3 className='text-bold mt-5'>{article?.Title}</h3>
            <span className='text-muted'>{article?.CreatedAt.split("T")[0]}</span>
            <p className="text-muted">Author: <span style={{color:"#FF6185"}}>{article?.User.FullName}</span></p>
            <Card className='mb-5 shadow' style={{border:"none"}}>
                <div className='m-5'>
                    <div style={{width:"80%"}} className='mx-auto'>
                    <Card.Img src={article?.Attache} />
                    </div>
                    <Card.Body className='mt-4'>
                            <p style={{textAlign:"justify"}}>
                                {article?.Description}
                            </p>
                    </Card.Body>
                </div>
            </Card>
        </Container>
    ) 
}