import {Button, Card} from 'react-bootstrap';
import { useQuery } from 'react-query';
import { API } from '../config/api';
import {useParams} from 'react-router-dom'

function CardComp() {
    let { id } = useParams("id")

    let { data: article } = useQuery('myArticlesCache', async () => {
        const response = await API.get('/article/' + 2)
        return response.data.Data;
    });

    return (
        <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src="holder.js/100px180" />
            <Card.Body>
                <Card.Title>{article?.Title}</Card.Title>
                <Card.Text>
                {article?.Description}
                </Card.Text>
                <Button variant="primary">Go somewhere</Button>
            </Card.Body>
        </Card>
    );
}

export default CardComp;