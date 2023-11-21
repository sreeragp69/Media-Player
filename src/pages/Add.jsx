import React from "react";
import { PlusCircle } from "react-feather";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import { addVideo } from "../services/allapi";

// tosatify
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Add({handleRes}) {
  // Form data as object.

  const [uploaddata, setuploadData] = useState({
    id: "",
    caption: "",
    thumbnail: "",
    url: "",
  });






  // input function

  const setInput = (e) => {

    //destructure value from object to value.
    const { name, value } = e.target;
    // console.log(e.target.value);

    //Spread oparator : To show objects in one line. 
    setuploadData({ ...uploaddata, [name]: value });
  };

  // console.log(uploaddata);














  //youtube video link into embeded

  const extractUrl = (e) => {
    let youtubeUrl = e.target.value;

    // Checking youtube link that if there is v=...

    if (youtubeUrl.includes("v=")) {
      //checking where is v= in the url by using indexOf() method.
      let index = youtubeUrl.indexOf("v=");
      console.log(index);

      //Cutting the last part of the youtube link
      let videoUrl = youtubeUrl.substring(index + 2, index + 13);
      console.log(videoUrl);

      //Assigning the Input value to a variable called VIDEODATA.
      let videoData = uploaddata;

      videoData.url = `https://www.youtube.com/embed/${videoUrl}`;
      setuploadData(videoData);
    }
    else {
      console.log("error url");
    }
    console.log(uploaddata);
  };









  // Define handleAdd function
  const  handleAdd = async () => {


    // Destructure upload data state
    const { id, caption, thumbnail, url } = uploaddata;

    if (!id || !caption || !thumbnail || !url) {
      toast.error("Fill the Form compleatly");

    }
    else {


      //Make an API call.
      const response = await addVideo(uploaddata);
      // console.log(response);


      //
      if (response.status >= 200 && response.status < 300) {
        // console.log(response);


        //lifing the data from 

        handleRes(response.data)

        toast.success("video Uploaded Succsfully");
        // To close the window
        setShow(false);
      } else {
        toast.error("Provide a unique ID");
      }
    }
  };






  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <div onClick={handleShow}>
        <PlusCircle color="black" size={30} />
      </div>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Upload Video Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <FloatingLabel
              className="mb-3"
              controlId="floatingid"
              label="Uploading video id"
            >
              <Form.Control
                type="text"
                placeholder="Video Id"
                name="id"
                onChange={setInput}
              />
            </FloatingLabel>

            <FloatingLabel
              className="mb-3"
              controlId="floatingCaption"
              label="Uploading video Caption"
            >
              <Form.Control
                type="text"
                placeholder="Video Caption"
                name="caption"
                onChange={setInput}
              />
            </FloatingLabel>

            <FloatingLabel
              className="mb-3"
              controlId="floatingImage"
              label="Uploading video cover image url"
            >
              <Form.Control
                type="text"
                placeholder="Video Cover image Url"
                name="thumbnail"
                onChange={setInput}
              />
            </FloatingLabel>

            <FloatingLabel
              className="mb-3"
              controlId="floatingLink"
              label="Uploading video Link"
            >
              <Form.Control
                type="text"
                placeholder="Video Link"
                name="url"
                onChange={extractUrl}
              />
            </FloatingLabel>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleAdd}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>

      <ToastContainer
        position="top-right"
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        // pauseOnHover
        theme="light"
      />
      {/* Same as */}
      <ToastContainer />
    </>
  );
}

export default Add;
