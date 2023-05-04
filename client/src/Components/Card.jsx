import {Badge, Button, Card} from 'react-bootstrap';
import { useQuery } from 'react-query';
import { API } from '../config/api';
import {useParams} from 'react-router-dom'
import article1 from '../assets/article1.png'

function CardComp() {
    let { id } = useParams("id")

    let { data: article } = useQuery('myArticlesCache', async () => {
        const response = await API.get('/article/' + 2)
        return response.data.Data;
    });

    return (
        <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src={article1} />
            <Card.Body>
                <Card.Title>{article?.Title}</Card.Title>
                <Card.Text>
                {article?.Description}
                </Card.Text>
                <Badge pill bg='secondary' >Corona Virus</Badge>
            </Card.Body>
        </Card>
    );
}

export default CardComp;