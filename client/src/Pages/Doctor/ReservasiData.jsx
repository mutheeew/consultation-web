import { useQuery } from "react-query";
import { API } from "../../config/api";
import { Dropdown, Table } from "react-bootstrap";
import DetailInfo from "../../Components/Doctor/DetailInfo";

export default function ReservasiData(){
    let {data: consultations, refetch} = useQuery('consultationsCache', async () => {
        const response = await API.get("/consultations")
        return response.data.Data
    })

    return(
        <div className="m-5">
            <h1 className="py-3" style={{color:"#FF6185"}}>Reservasi Data</h1>
            <Table>
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Users</th>
                        <th>Subject</th>
                        <th>Date of complaint</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {consultations?.length !== 0 && consultations?.map((item, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{item.User.FullName}</td>
                            <td>{item.Subject}</td>
                            <td>{item.RequestDate}</td>
                            {
                                item.Status === "waiting" ?
                                <td className="text-warning">Waiting...</td>
                                :
                                item.Status === "success" ?
                                <td className="text-success">Approved</td>
                                :
                                <td className="text-danger">Cancel</td>
                            }
                            <td>
                                <>
                                    { item.Status === "waiting" ? 
                                        <>
                                            <DetailInfo item={item}/>
                                        </>
                                        :
                                        <>
                                        <p className="text-primary">Response has been given</p>
                                        </>
                                    }
                                </>
                            </td>
                            <td></td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    )
}