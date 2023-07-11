import React, { useEffect, useState } from "react";
import Card from "../UI/Card";
import { Row, Col } from "reactstrap";
import styled from "styled-components";
import axios from "axios";

const Reviews = (props) => {
  const [reviews, setReviews] = useState([]);
  const reviewList = reviews.filter((item) => {
    const title = item.title.toLowerCase();
    return title.includes(props.content.toLowerCase());
  });
  useEffect(() => {
    axios
      .get("/")
      .then((res) => {
        if (res.status === 200) {
          setReviews([...res.data]);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  console.log(reviews);

  return (
    <section>
      <Row>
        {reviewList.map((reviews) => {
          return (
            <Col lg="4" md="6" key={reviews._id}>
              <Wrapper>
                <Card
                  title={reviews.title}
                  author={reviews.author}
                  description={reviews.description}
                  image={reviews.image}
                  rating={reviews.rating}
                  review={reviews.review}
                  user_name={reviews.user_name}
                  isdelete={false}
                />
              </Wrapper>
            </Col>
          );
        })}
      </Row>
    </section>
  );
};

export default Reviews;

const Wrapper = styled.section`
  margin: 6% auto;
  width: 90%;
`;
