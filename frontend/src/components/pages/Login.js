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

function Login() {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const usernameHandler = (event) => {
    setUsername(event.target.value);
  };
  const passwordHandler = (event) => {
    setPassword(event.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    const details = {
      username: username,
      password: password,
    };
    axios
      .post("/login", details)
      .then((res) => {
        if (res.status === 200) {
          dispatch(
            changeAuthState({
              user_id: res.data?.id,
              user_name: res.data?.name,
            })
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
        document.getElementById("error").innerHTML = "Invalid credentials";
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
              marginTop: "8%",
            }}
          >
            <MDBCardBody className="p-5 w-100 d-flex flex-column">
              <h2 className="fw-bold mb-2 text-center">Sign in</h2>
              <p className="text-white-50 mb-3">
                Please enter your login and password!
              </p>
              <form action="/login" method="post" onSubmit={submitHandler}>
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
                <MDBInput
                  wrapperClass="mb-4 w-100"
                  placeholder="Password"
                  id="password"
                  type="password"
                  size="lg"
                  required
                  onChange={passwordHandler}
                  value={password}
                />
                <center>
                  <p id="error" style={{ color: "red" }}></p>
                </center>
                <center>
                  <Button size="lg" color="warning" type="submit">
                    Login
                  </Button>
                </center>
              </form>
              <hr className="my-4" />
              <div className="d-flex flex-row align-items-center justify-content-center mb-1">
                <p className="mb-0">
                  New User ?{" "}
                  <a href="/signup" style={{ textDecoration: "none" }}>
                    {" "}
                    Sign up
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

export default Login;
