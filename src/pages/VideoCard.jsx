import React from "react";
import Card from "react-bootstrap/Card";
import { Trash2 } from "react-feather";

import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { addHistory, deleteVideo } from "../services/allapi";


import { v4 as uuidv4 } from 'uuid';

function VideoCard({card,handleDeleteSatus, insideCategory}) {
  const [show, setShow] = useState(false);


  const handleClose = () => setShow(false);


  //function
  const handleShow = async() => {

    setShow(true);

    // auto matic id generation

    const uid = uuidv4();

    console.log(uid);

    //  To genarate system date and time.

    let cardTime = new Date();

    console.log(cardTime);

    const {caption, url} = card;

    if (uid != "", caption !="", url !="", cardTime !="") {

      const body = {
        id: uid,
        cardName: caption,
        url,
        date: cardTime
      }
      
    const response =  await addHistory(body)

    console.log(response);
    }


  }




// function to delete items 

  const removeItem = async(id)=>{


    //API CAll to Delete specific card.

      let response = await deleteVideo(id);
      console.log(response);


      if (response.status >= 200 && response.status<300) {
        handleDeleteSatus(true)
      }
  } 

 
  const dragStarted = (e,id) =>{
    console.log("drag started and source card id" + id);
    e.dataTransfer.setData("cardId", id);

  }

  return (
    <>
      <div>
        <Card draggable onDragStart={e=>dragStarted(e,card?.id)} className="shadow">
          <Card.Img

            //function
            onClick={handleShow}
            variant="top"
            src={card?.thumbnail}
          />
          <Card.Body>
            <Card.Title>
              <span>{card?.caption}</span>

          {
            insideCategory?"":
              <Trash2 onClick={()=>removeItem(card?.id)} color="brown" style={{ float: "right" }} />
          }


            </Card.Title>
          </Card.Body>
        </Card>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Video Caption</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <iframe
              width={'100%'} 
              height={'400px'}
              src={card?.url}
              title="Rocky Bhai Mass Entry Scene  | KGF 2 | Yash | Prashanth Neel | Vijay Kiragandur | Hombale Films"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowfullscreen
            ></iframe>
          </Modal.Body>
        </Modal>
      </div>
    </>
  );
}

export default VideoCard;
