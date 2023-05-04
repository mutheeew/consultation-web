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
            <span className='text-gray'>{article?.CreatedAt}</span>
            <p className='text-gray'>Author: <span className='text-color-pink'>{article?.User.FullName}</span></p>
            <Card style={{boxShadow:"0 0 10px gray"}} className='mb-5'>
                <div className='m-5'>
                    <div style={{width:"80%"}} className='mx-auto'>
                    <Card.Img variant="top" className="img-fluid" src={article?.Attache} />
                    </div>
                    <Card.Body className='mt-4'>
                            <p>
                                {article?.Description}
                            </p>
                    </Card.Body>
                </div>
            </Card>
        </Container>
    ) 
}