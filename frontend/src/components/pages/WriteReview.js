import React, { Fragment, useState, useEffect } from "react";
import { Rating } from "@mui/material";
import { useNavigate } from "react-router";
import axios from "axios";
import {
  Row,
  Col,
  Button,
  Card,
  ListGroup,
  ListGroupItem,
  Spinner,
  Input,
} from "reactstrap";
import Header from "../Layout/Header";

const WriteReview = () => {
  const userObj = JSON.parse(localStorage.getItem("keeper-user"));
  const navigate = useNavigate();
  // eslint-disable-next-line
  useEffect(() => {
    if (!userObj) {
      navigate("/");
    }
    // eslint-disable-next-line
  }, []);

  const user_id = userObj.user_id;
  const user_name = userObj.user_name;

  const [enteredValue, setEnteredValue] = useState("");
  const [selectedValue, setSelectedValue] = useState(undefined);
  const [isEntered, setIsEntered] = useState(false);
  const [apiData, setApiData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [shouldSet, setShouldSet] = useState(false);
  const [value, setValue] = useState(1);

  const getBookList = () => {
    if (enteredValue.length === 0) return;
    setLoading(true);
    fetch(
      "https://www.googleapis.com/books/v1/volumes?q=intitle:" +
        enteredValue.toLowerCase()
    )
      .then((res) => {
        res.json().then((data) => {
          setApiData([...data?.items]);
        });
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    if (enteredValue === "") {
      setIsEntered(false);
    } else {
      setIsEntered(true);
    }
  }, [enteredValue]);

  useEffect(() => {
    const timer = setTimeout(getBookList, 1000);

    return () => {
      clearTimeout(timer);
    };
    // eslint-disable-next-line
  }, [enteredValue]);

  const changeHandler = (event) => {
    setSelectedValue(undefined);
    setEnteredValue(event.target.value);
  };
  const submitHandler = (event) => {
    event.preventDefault();
  };

  const setTitleHandler = (item) => {
    setSelectedValue(item);
  };

  const detailsHandler = () => {
    if (selectedValue !== undefined && selectedValue !== "") {
      setShouldSet(true);
    }
  };

  const contentHandler = () => {
    let des = "Sorry, Description not available";
    let img =
      "https://images.pexels.com/photos/3358707/pexels-photo-3358707.png?auto=compress&cs=tinysrgb&w=600";
    let bk_title = "";
    let author = "unknown";

    if (selectedValue?.volumeInfo?.title !== undefined) {
      bk_title = selectedValue?.volumeInfo?.title;
    }
    if (selectedValue?.volumeInfo?.authors !== undefined) {
      author = selectedValue?.volumeInfo?.authors;
    }
    if (selectedValue?.volumeInfo?.description !== undefined) {
      des = selectedValue?.volumeInfo?.description;
    }
    if (selectedValue?.volumeInfo?.imageLinks?.smallThumbnail !== undefined) {
      img = selectedValue?.volumeInfo?.imageLinks?.smallThumbnail;
    }

    if (value === 0) return;

    const content = {
      title: bk_title,
      author: author,
      description: des,
      rating: value,
      review: document.getElementById("Review").value,
      image: img,
      user_id: user_id,
      user_name: user_name,
    };
    console.log(content);
    axios
      .post("/add-review", content)
      .then((res) => {
        if (res.status === 200) {
          console.log("Added successfully");
          setSelectedValue(undefined);
          setEnteredValue("");
          navigate("/home");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const src =
    selectedValue?.volumeInfo?.imageLinks?.smallThumbnail !== undefined
      ? selectedValue?.volumeInfo?.imageLinks?.smallThumbnail
      : "https://images.pexels.com/photos/3358707/pexels-photo-3358707.png?auto=compress&cs=tinysrgb&w=600";

  return (
    <Fragment>
      <Header />
      <Row
        style={{
          margin: "2% auto",
        }}
      >
        <Col lg="6" md="6" sm="12">
          <form
            className="create-note"
            action=""
            onSubmit={submitHandler}
            style={{ width: "90%", marginBottom: "0", borderRadius: "4px" }}
          >
            {
              <input
                onChange={changeHandler}
                name="title"
                placeholder="Enter the Title"
                value={selectedValue?.volumeInfo?.title ?? enteredValue}
              />
            }
          </form>
          {isEntered && (
            <Card
              style={{
                width: "90%",
                margin: "0 auto",
                overflowY: "scroll",
                maxHeight: "200px",
              }}
            >
              <ListGroup flush>
                {loading ? (
                  <Spinner style={{ margin: "1.5% auto" }} color="primary" />
                ) : (
                  !selectedValue &&
                  apiData.map((item) => (
                    <ListGroupItem
                      onClick={() => setTitleHandler(item)}
                      key={item?.id}
                    >
                      {item?.volumeInfo?.title}
                    </ListGroupItem>
                  ))
                )}
              </ListGroup>
            </Card>
          )}
        </Col>
        <Col lg="6" md="6" sm="12" style={{ marginTop: "2.5%" }}>
          <center>
            <Button
              color="primary"
              style={{ width: "45%" }}
              onClick={detailsHandler}
            >
              Get details
            </Button>
          </center>
        </Col>
      </Row>
      {shouldSet && selectedValue !== undefined && (
        <div style={{ marginTop: "4%" }}>
          <center>{<img src={src} width="250px" alt="" />}</center>
          <Row>
            <Col
              style={{
                marginTop: "2%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <h5>Title : </h5>
            </Col>
            <Col
              style={{
                margin: "2% 3% 0px",
              }}
            >
              <h5>{selectedValue?.volumeInfo?.title}</h5>
            </Col>
          </Row>
          <Row>
            <Col
              style={{
                marginTop: "2%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <h5>Author : </h5>
            </Col>
            <Col
              style={{
                margin: "2% 3% 0px",
              }}
            >
              <h5>{selectedValue?.volumeInfo?.authors}</h5>
            </Col>
          </Row>
          <Row>
            <Col
              style={{
                marginTop: "2%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <h5>Description : </h5>
            </Col>
            <Col
              style={{
                margin: "2% 3% 0px",
              }}
            >
              {selectedValue?.volumeInfo?.description === undefined ? (
                <p>Not Available</p>
              ) : (
                selectedValue?.volumeInfo?.description
              )}
            </Col>
          </Row>
          <Row>
            <Col
              style={{
                marginTop: "2%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <h5>Rating : </h5>
            </Col>
            <Col
              style={{
                margin: "2% 3% 0px",
              }}
            >
              <Rating
                size="large"
                onChange={(event, newValue) => {
                  if (newValue === 0) return;
                  setValue(newValue);
                }}
                value={value}
              />
            </Col>
          </Row>
          <Row>
            <Col
              style={{
                marginTop: "2%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <h5>Review : </h5>
            </Col>
            <Col
              style={{
                margin: "2% 3% 0px",
              }}
            >
              <Input
                id="Review"
                name="text"
                type="textarea"
                rows={5}
                required
              />
            </Col>
          </Row>
          <center>
            <Button
              size="lg"
              style={{ margin: "4% 1% 4% auto" }}
              onClick={() => {
                navigate("/home");
              }}
            >
              Cancel
            </Button>
            <Button
              color="warning"
              size="lg"
              style={{ margin: "4% auto 4% 1%" }}
              onClick={contentHandler}
            >
              Submit Review
            </Button>
          </center>
        </div>
      )}
    </Fragment>
  );
};

export default WriteReview;
