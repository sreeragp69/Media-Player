import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useNavigate } from "react-router-dom";
function Landingpage() {

  // useNavigate() is a hook
  
  const navigate = useNavigate();



const handleNavigate = ()=>{
  // Navigate to home page
      navigate('/home')
}

  return (
    <div>
      <Row className="align-items-center mt-5" >
        <Col></Col>

        <Col lg={6}>
          <h1>Welcome to Video.com</h1>
          <p style={{textAlign:"justify"}}>
            Where user can use their favourite Videos user can upload any
            youtube videos by copy and paste their URL. Video.com will allow to
            add and remove their upload videos and also arrange them in diffrent
            categories by drag and drop. It is free to use. Try it
          </p>
          <button onClick={handleNavigate} className="btn">Click here to know more!!!</button>
        </Col>

        <Col lg={4}>
            <img src="./image.jpeg" alt="No image" style={{width:'100%'}}/>
        </Col>

        <Col></Col>
      </Row>
    </div>
  );
}

export default Landingpage;
