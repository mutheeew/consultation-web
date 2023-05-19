import { useContext, useState } from "react"
import { Form, Button } from "react-bootstrap"
import { useMutation } from "react-query"
import { API } from "../../config/api"
import { UserContext } from "../../Context/User"
import { useNavigate, useParams } from 'react-router-dom';


export default function UpdateArticle(){
    const {id} = useParams()
    const [state] = useContext(UserContext)
    const [form, setForm] = useState({
        title: '',
        attache: '',
        description: '',
    })

    console.log(form)

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: 
            e.target.type === 'file' ? e.target.files : e.target.value
        })
    }

    let navigate = useNavigate()
    const handleUpdateArticle = useMutation(async (e) => {
        try {
            e.preventDefault()

            const config = {
                headers:{
                    "Content-type": "multipart/form-data"
                }
            }

            const formData = new FormData()
            formData.set('title', form.title)
            formData.set('attache', form.attache[0], form.attache[0].name)
            formData.set('description', form.description)

            const response = await API.patch('/article/' + id, formData, config)
            console.log("Berhasil: ", response)
            alert("Berhasil menambahkan article")
            navigate("/")
        } catch (error){
            e.preventDefault()
            console.log("Update article gagal: ", error)
            alert("Gagal menambahkan article")
        }
    })
    return (
        <div className="m-5">
        <h1 className="m-5" style={{color:"#FF6185"}}>Update Article</h1>
            <Form onSubmit={(e) => handleUpdateArticle.mutate(e)}>
                <Form.Group className="mb-3">
                    <Form.Label className="fw-semibold">Title</Form.Label>
                    <Form.Control type="text" name="title" value={form.title} onChange={handleChange}/>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Control type="file" name="attache" onChange={handleChange}/>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label className="fw-semibold">Description</Form.Label>
                    <Form.Control as="textarea" name="description" value={form.description} onChange={handleChange} rows={3} />
                </Form.Group>
                <div className="mt-3">
                    <Button type="submit" className="px-5" style={{backgroundColor:"#FF6185", border:"none"}}>Post</Button>
                </div>
            </Form>
        </div>
    )
}