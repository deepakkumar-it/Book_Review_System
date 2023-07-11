import React, { useEffect, useState } from "react";
import Card from "../UI/Card";
import { Row, Col } from "reactstrap";
import styled from "styled-components";
import axios from "axios";
import Headers from "../Layout/Header";
import { useNavigate } from "react-router";

const Profile = () => {
  const userObj = JSON.parse(localStorage.getItem("keeper-user"));
  const navigate = useNavigate();
  //const user_name = userObj.user_name;

  const [enteredValue, setEnteredValue] = useState("");
  const [isEntered, setIsEntered] = useState(false);
  const submitHandler = (event) => {
    event.preventDefault();
  };

  useEffect(() => {
    if (enteredValue === "") {
      setIsEntered(false);
    } else {
      setIsEntered(true);
    }
  }, [enteredValue]);
  console.log(isEntered);
  const changeHandler = (event) => {
    setEnteredValue(event.target.value);
  };

  //const user_id = userObj.user_id;

  const [reviews, setReviews] = useState([]);
  const reviewList = reviews.filter((item) => {
    const title = item?.title?.toLowerCase();
    return title.includes(enteredValue.toLowerCase());
  });
  console.log(reviewList);

  useEffect(() => {
    if (!userObj) {
      navigate("/");
    }
    axios
      .post("/profile", userObj)
      .then(async (res) => {
        if (res.status === 200) {
          console.log("res", res.data);
          setReviews([...res.data]);
        }
      })
      .catch((err) => {
        console.log(err);
      });
    // eslint-disable-next-line
  }, [reviews]);

  return (
    <>
      <Headers />
      <center>
        <h3 style={{ marginTop: "3%" }}>Your Profile</h3>
      </center>
      <form className="create-note" action="" onSubmit={submitHandler}>
        {
          <input
            name="title"
            onChange={changeHandler}
            placeholder="Enter the Title"
            value={enteredValue}
          />
        }
      </form>
      <section>
        <h4>Your Reviews : </h4>
        <Row>
          {reviewList.map((review) => {
            return (
              <Col lg="4" md="6" key={review._id}>
                <Wrapper>
                  <Card
                    title={review.title}
                    author={review.author}
                    description={review.description}
                    image={review.image}
                    rating={review.rating}
                    review={review.review}
                    user_name={review.user_name}
                    isdelete={true}
                    id={review._id}
                  />
                </Wrapper>
              </Col>
            );
          })}
        </Row>
      </section>
    </>
  );
};

export default Profile;

const Wrapper = styled.section`
  margin: 6% auto;
  width: 90%;
`;
