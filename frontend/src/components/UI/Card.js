import React, { useState } from "react";
import {
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardText,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Row,
  Col,
} from "reactstrap";
import { Rating } from "@mui/material";
import axios from "axios";
import styled from "styled-components";
import { useNavigate } from "react-router";

const Cards = (props) => {
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);
  const navigate = useNavigate();

  const idObj = {
    id: props.id,
  };

  console.log(idObj);

  //const user_id = useSelector((state) => state.auth.userid);

  return (
    <>
      <Card
        body
        color="light"
        style={{
          width: "100%",
          margin: "auto",
        }}
      >
        <CardBody>
          <CardTitle tag="h5">{props.title}</CardTitle>
          <CardSubtitle className="mt-3 mb-2 text-muted" tag="h6">
            {props.author}
          </CardSubtitle>
          <CardSubtitle
            className=" text-muted"
            tag="h6"
            style={{ margin: "5% auto" }}
          >
            Reviewer : {props.user_name}
          </CardSubtitle>
          <CardText>
            {props.description.length === 0 &&
              "Sorry Description not available.."}
            {props.description.length < 250 && props.description}
            {props.description.length >= 250 &&
              props.description.substring(0, 250) + "..."}
          </CardText>
          <Wrapper>
            {props.isdelete && (
              <Button
                color="danger"
                size="md"
                onClick={() => {
                  axios
                    .post("/delete", idObj)
                    .then((res) => {
                      if (res.status === 200) {
                        navigate("/profile");
                      }
                    })
                    .catch((err) => {
                      console.log(err);
                    });
                }}
              >
                Delete Review
              </Button>
            )}
            <Button color="warning" size="md" onClick={toggle}>
              View Review
            </Button>
          </Wrapper>
        </CardBody>
      </Card>

      <Modal isOpen={modal} toggle={toggle} fullscreen>
        <ModalHeader toggle={toggle}>Keeper</ModalHeader>
        <ModalBody>
          <Row style={{ marginTop: "4%" }}>
            <Col lg="6" md="6">
              <center>
                <img src={props.image} alt="" style={{ width: "250px" }} />
              </center>
            </Col>
            <Col lg="6" md="6">
              <h4 style={{ marginTop: "2%" }}>Title: </h4>
              <h6>{props.title}</h6>
              <h4 style={{ marginTop: "3%" }}>Author: </h4>
              <h6>{props.author}</h6>
              <h4 style={{ marginTop: "3%" }}>Description: </h4>
              <p>
                {props.description !== ""
                  ? props.description
                  : "Sorry, No decsription available"}
              </p>
              <h4 style={{ marginTop: "3%" }}>Review by: </h4>
              <h6>{props.user_name}</h6>
              <h4 style={{ marginTop: "3%" }}>Rating: </h4>
              <Rating name="read-only" value={props.rating} readOnly />
              <h4 style={{ marginTop: "3%" }}>Review: </h4>
              <p>{props.review}</p>
            </Col>
          </Row>
          {/* <div style={{ width: "85%", margin: "3% auto" }}>
            <h4>Review: </h4>
            <p>{props.review}</p>
          </div> */}
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default Cards;

const Wrapper = styled.section`
  align-items: center;
  display: flex;
  justify-content: space-between;
  margin-top: 10%;
`;
