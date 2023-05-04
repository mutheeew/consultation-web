import { Button, Carousel } from "react-bootstrap"
import Ads from "../assets/Jumbotron.png"
import Group from "../assets/Group.png"
import { Link } from "react-router-dom"

export default function Jumbotron (){
    return (
        <Carousel>
            <Carousel.Item >
                <img
                className="d-block w-100"
                src={Ads}
                alt="First slide"
                />
                <Carousel.Caption className="d-flex flex-column align-items-start mb-2" >
                <Link to="/reservation" className="btn btn-light px-3" ><img
                src={Group}></img> Konsultasi dengan dokter</Link >
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
    )
}