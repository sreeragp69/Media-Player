import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";
import Add from "./Add";
import View from "./View";
import Category from "./Category";
import { Link } from "react-router-dom";

function Home() {


  //
  const [serverRes, setserverResponse] = useState({});



  const handleResponse = (res) => {
    setserverResponse(res)
  }
  // console.log(serverRes);

  return (
    <>
      <div>
        <h1 className="text-info  ms-5 mt-4 mb-5 ">All Video Cards</h1>

        <Link to={'/watchhistory'} className="ms-auto d-flex mb-3 " style={{textDecoration:"none",  fontSize:'25px', color:"#212121", justifyContent:"end" }}>Watch History</Link>

        <Row>

          <Col lg={1}>
            
            <Add handleRes={handleResponse}/>
          </Col>

          <Col lg={7}>
            
            <View serverRes={serverRes}/>
          </Col>

          <Col lg={4}>
            
            <Category/>                                                                                                                           
          </Col>

        </Row>
      </div>
    </>
  );
}

export default Home;
