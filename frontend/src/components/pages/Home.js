import React, { useEffect, useState } from "react";
import Reviews from "../Layout/Reviews";
import { useNavigate } from "react-router";
import Headers from "../Layout/Header";
function Home(props) {
  const navigate = useNavigate();
  const userObj = JSON.parse(localStorage.getItem("keeper-user"));
  // eslint-disable-next-line
  useEffect(() => {
    if (!userObj) {
      navigate("/");
    }
    // eslint-disable-next-line
  }, []);

  // const user_id = userObj.user_id;
  // const user_name = userObj.user_name;

  const [enteredValue, setEnteredValue] = useState("");
  const [isEntered, setIsEntered] = useState(false);

  useEffect(() => {
    if (enteredValue === "") {
      setIsEntered(false);
    } else {
      setIsEntered(true);
    }
  }, [enteredValue]);

  const submitHandler = (event) => {
    event.preventDefault();
  };
  console.log(isEntered);
  const changeHandler = (event) => {
    setEnteredValue(event.target.value);
  };

  return (
    <div>
      <Headers />
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
      {<Reviews content={enteredValue} />}
    </div>
  );
}

export default Home;
