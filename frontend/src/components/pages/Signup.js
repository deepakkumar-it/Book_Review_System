import React, { useState } from "react";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
} from "mdb-react-ui-kit";
import { useDispatch } from "react-redux";
import { changeAuthState } from "../../store/slices/authSlice";
import { useNavigate } from "react-router";

import styles from "./Login.module.css";
import axios from "axios";
import { Button } from "reactstrap";

function Signup() {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const navigate = useNavigate();

  const usernameHandler = (event) => {
    setUsername(event.target.value);
  };
  const passwordHandler = (event) => {
    setPassword(event.target.value);
  };
  const nameHandler = (event) => {
    setName(event.target.value);
  };
  const phoneHandler = (event) => {
    setPhone(event.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    console.log(phone.length);
    if (phone.length !== 10) return;
    const details = {
      name: name,
      username: username,
      password: password,
      phone: phone,
    };
    axios
      .post("/signup", details)
      .then((res) => {
        if (res.status === 200) {
          dispatch(
            changeAuthState({ userid: res.data?.id, name: res.data?.name })
          );
          const userObj = {
            user_id: res.data?.id,
            user_name: res.data?.name,
          };
          localStorage.setItem("keeper-user", JSON.stringify(userObj));
          navigate("/home");
        }
      })
      .catch((err) => {
        document.getElementById("error").innerHTML = "User already exist";
      });
  };

  return (
    <MDBContainer fluid className={styles}>
      <MDBRow className="d-flex justify-content-center align-items-center">
        <MDBCol col="12">
          <MDBCard
            className="bg-white mx-auto"
            style={{
              borderRadius: "1rem",
              maxWidth: "500px",
              marginTop: "4%",
            }}
          >
            <MDBCardBody className="p-5 w-100 d-flex flex-column">
              <h2 className="fw-bold mb-2 text-center">Sign up</h2>
              <p className="text-white-50 mb-3">
                Please enter your login and password!
              </p>
              <form action="/signup" method="post" onSubmit={submitHandler}>
                <MDBInput
                  wrapperClass="mb-4 w-100"
                  placeholder="Name"
                  id="name"
                  type="text"
                  size="lg"
                  required
                  onChange={nameHandler}
                  value={name}
                />
                <MDBInput
                  wrapperClass="mb-4 w-100"
                  placeholder="Email address"
                  id="email"
                  type="email"
                  size="lg"
                  required
                  onChange={usernameHandler}
                  value={username}
                />
                <center>
                  <p id="error" style={{ color: "red" }}></p>
                </center>
                <MDBInput
                  wrapperClass="mb-4 w-100"
                  placeholder="Phone Number"
                  id="phone"
                  type="number"
                  size="lg"
                  required
                  onChange={phoneHandler}
                  value={phone}
                />
                <MDBInput
                  wrapperClass="mb-4 w-100"
                  placeholder="Password"
                  id="password"
                  type="password"
                  size="lg"
                  required
                  minLength={8}
                  maxLength={16}
                  onChange={passwordHandler}
                  value={password}
                />
                <center>
                  <Button size="lg" color="warning" type="submit">
                    Signup
                  </Button>
                </center>
              </form>
              <hr className="my-4" />
              <div className="d-flex flex-row align-items-center justify-content-center mb-1">
                <p className="mb-0">
                  Already an user ?{" "}
                  <a href="/" style={{ textDecoration: "none" }}>
                    {" "}
                    Login
                  </a>
                </p>
              </div>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default Signup;
