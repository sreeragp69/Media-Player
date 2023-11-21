import React, { useState } from "react";
import { Row, Col } from "react-bootstrap";
import VideoCard from "./VideoCard";
import { getVideo } from "../services/allapi";
import { useEffect } from "react";

function View({serverRes}) {

  const [allVideos, setallVideos] = useState([]);
  const [deleteStatus, setdeleteStatus] = useState(false);


  const getallVideos = async () => {
    //Assigning API response in variable.
    let response = await getVideo();

    // console.log(response.data);

    setallVideos(response.data);
  };

  // console.log(allVideos);

  //useEffect
  //when page reloads the function automatically calls and the data will shown.
  useEffect(() => {

    //what to show
    getallVideos();

    //inside the array. Have to enter
  }, [serverRes, deleteStatus]);


//function to 

 const handleDeleteSatus = (res) =>{

      setdeleteStatus(res)

}


  return (
    <div className="border p-3 rounded  border-warning">
      <Row>
        {
        
        allVideos.map(video=> (
          <Col className="ps-3 mb-3 " sm={12} md={6}>
            <VideoCard handleDeleteSatus={handleDeleteSatus} card={video}/>
          </Col>
        ))
        
        }
      </Row>
    </div>
  );
}

export default View;
