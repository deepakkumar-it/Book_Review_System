import React from "react";
//import Header from "./Layout/Header";
import { Routes, Route } from "react-router";
import Home from "./pages/Home";
import WriteReview from "./pages/WriteReview";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
//import axios from "axios";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/write-review" element={<WriteReview />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
