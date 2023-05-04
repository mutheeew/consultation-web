import React, {useContext} from "react";
import {useQuery} from 'react-query';
import {Row, Col, Button} from "react-bootstrap";
import Icon from '../../assets/Icon.png'
import '../../index.css'
// import Profile from "../image/Ayana_Shahab.jpg";
import { CgProfile } from "react-icons/cg";
import { FiMail } from "react-icons/fi";
import { RiVipLine } from "react-icons/ri";
import { TbGenderBigender } from "react-icons/tb";
import { MdLocalPhone } from "react-icons/md";
import { SiGooglemaps } from "react-icons/si";
import { UserContext } from "../../Context/User";

import {API} from "../../config/api"
function Profil() {
  const [state] = useContext(UserContext);

//   let {data : profile} = useQuery('userCache', async () => {
//     const response = await API.get(`/user/${state.user.id}`);
//     console.log(response)
//     return response.data.Data;
//   });

  return (
    <div
      className="d-flex container-fluid align-items-center justify-content-center p-5">
      <div className="shadow-lg py-5 rounded" style={{ width:"50vw"}}>
        <Row className="justify-content-around px-3">
          <Col className="col-5">
              <h4 className="fw-bold mb-4">Personal Info</h4>
            <div className="d-flex align-items-center mb-3">
                <CgProfile className="CgProfile me-3" />
                <span>
                    <p className="fw-semibold mb-0">
                    {state.user.FullName}
                    </p>
                    <p
                    className="text-muted mb-0" style={{fontSize:"12px"}}>
                    Full name
                    </p>
                </span>
            </div>

            <div className="d-flex align-items-center mb-3">
              <FiMail className="FiMail me-3" />
              <span>
              <p className="fw-semibold mb-0">
                  {state.user.Email}
                </p>
                <p
                  className="text-muted mb-0" style={{fontSize:"12px"}}>
                  Email
                </p>
              </span>
            </div>

            <div className="d-flex align-items-center mb-3">
              <RiVipLine className="RiVipLine me-3" />
              <span>
              <p className="fw-semibold mb-0">
                  Active
                </p>
                <p
                  className="text-muted mb-0" style={{fontSize:"12px"}}>
                  Status
                </p>
              </span>
            </div>

            <div className="d-flex align-items-center mb-3">
              <TbGenderBigender className="TbGenderBigender me-3" />
              <span>
              <p className="fw-semibold mb-0">
                    {state.user.Gender}
                </p>
                <p
                  className="text-muted mb-0" style={{fontSize:"12px"}}>
                  Gender
                </p>
              </span>
            </div>

            <div className="d-flex align-items-center mb-3">
              <MdLocalPhone className="MdLocalPhone me-3" />
              <span>
              <p className="fw-semibold mb-0">
                  {state.user.Phone}
                </p>
                <p
                  className="text-muted mb-0" style={{fontSize:"12px"}}>
                  Mobile Phone
                </p>
              </span>
            </div>

            <div className="d-flex align-items-center mb-3">
              <SiGooglemaps className="SiGooglemaps me-3" />
              <span >
              <p className="fw-semibold mb-0">
                  {state.user.Address}  
                </p>
                <p
                  className="text-muted mb-0" style={{fontSize:"12px"}}>
                  Address
                </p>
              </span>
            </div>
          </Col>
          <Col className="col-5">
            <img className="img-fluid"
              src={Icon}
              alt="Profile" ></img>
            <Button
              className="mt-3" style={{backgroundColor:"#FF6185", borderColor:"#FF6185"}}>
              Change Photo Profile
            </Button>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default Profil;
