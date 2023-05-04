import CardComp from "../Components/Card";
import Jumbotron from "../Components/Jumbotron";
import AddArticle from "./Doctor/AddArticle";

export default function Home(){
    return (
        
        <>
        <Jumbotron/>
        <div className="m-5">

        {/* <AddArticle/> */}
            <div className="d-flex justify-content-center my-5">
                <h1 style={{color:"#FF6185"}}>Artikel Hari Ini</h1>
            </div>
        <div className="d-flex gap-4 flex-wrap">

        <CardComp/>
        <CardComp/>
        <CardComp/>
        <CardComp/>
        <CardComp/>
        <CardComp/>
        <CardComp/>
        <CardComp/>
        <CardComp/>
        <CardComp/>
        <CardComp/>
        <CardComp/>
        </div>
        </div>
        </>
    )
}