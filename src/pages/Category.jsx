import React, { useEffect } from "react";
import { useState } from "react";
import { Col, FloatingLabel, Form, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import {
  addCategories,
  getallCategories,
  deleteCategory,
  getVideos,
  updateCategory,
} from "../services/allapi";
import VideoCard from "./VideoCard";
// tosatify
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Trash2 } from "react-feather";



function Category() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const dragover = (e) => {
    e.preventDefault();
    console.log("dragging over the category");
  };

  const dropped = async (e, categoryId) => {
    // console.log(categoryId);

    let sourceCardId = e.dataTransfer.getData("cardId");
    console.log("source card id", sourceCardId);

    // Logic to implement adding card in the given category

    let { data } = await getVideos(sourceCardId);

    // console.log(response);
    // console.log("source video data", data);

    let selectedCategory = allCategory.find((item) => item.id == categoryId);

    console.log("target catagory details", selectedCategory);

    selectedCategory.allvideos.push(data);

    console.log("updated target category detaild", selectedCategory);

    await updateCategory(categoryId, selectedCategory);

    getcategoryList();
  };

  const [categoryItem, setCategoryItem] = useState({
    id: "",
    name: "",
    allvideos: [],
  });

  const [allCategory, setallCategory] = useState([]);

  const addCategoryForm = (e) => {
    const { name, value } = e.target;
    setCategoryItem({ ...categoryItem, [name]: value });
  };

  // console.log(categoryItem);

  const handleAddCategory = async (e) => {
    e.preventDefault();
    const { id, name } = categoryItem;

    if (!id || !name) {
      toast.warn("Fill the Form compleatly");
    } else {
      let response = await addCategories(categoryItem);
      console.log(response);
      getcategoryList();
      setShow(false);
    }
  };
  // get all categories

  const getcategoryList = async () => {
    const response = await getallCategories();
    // console.log(response.data);
    setallCategory(response.data);
  };

  // console.log(allCategory);

  // type use efect snippet
  useEffect(() => {
    getcategoryList();
  }, []);

  const handleDeleteCategory = async (e, id) => {
    e.preventDefault();
    console.log(id);
    await deleteCategory(id);
    getcategoryList();
  };

  return (
    <>
      <div className="d-grid">
        <div onClick={handleShow} className="btn btn-dark m-2 ">
          Add Category - 1
        </div>
        {allCategory?.map((item) => (
          <div
            droppable
            onDragOver={(e) => dragover(e)}
            onDrop={(e) => dropped(e, item?.id)}
            className="d-flex justify-content-between border rounded mt-2 p-3"
          >
            <h4>{item.name}</h4>
            <span onClick={(e) => handleDeleteCategory(e, item?.id)}>
              <Trash2 color="red" />
            </span>


           
          <Row>

            {
              item?.allvideos.map((card)=>(
                <Col className="p-3 mb-1 sm={12}">
                  <VideoCard card={card} insideCategory={true}/>
                
                </Col>
               ) )
            }

          </Row>

            


          </div>
        ))}
      </div>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title> Add Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FloatingLabel className="mb-3" controlId="floatingLink" label="Id">
            <Form.Control
              onChange={addCategoryForm}
              name="id"
              type="text"
              placeholder="Id"
            />
          </FloatingLabel>

          <FloatingLabel
            className="mb-3"
            controlId="floatingLink"
            label="category"
          >
            <Form.Control
              onChange={addCategoryForm}
              name="name"
              type="text"
              placeholder="Category"
            />
          </FloatingLabel>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button onClick={handleAddCategory} variant="primary">
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

export default Category;
