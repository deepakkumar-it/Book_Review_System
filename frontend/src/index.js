import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./axios/axios";
import WriteReview from "./components/pages/WriteReview";
import Profile from "./components/pages/Profile";
import Home from "./components/pages/Home";
import { store } from "./store/store";
import { Provider } from "react-redux";
import Signup from "./components/pages/Signup";
const router = createBrowserRouter([
  {
    path: "",
    element: <App />,
    children: [
      { path: "write-review", element: <WriteReview /> },
      { path: "profile", element: <Profile /> },
      { path: "home", element: <Home /> },
      { path: "signup", element: <Signup /> },
    ],
  },
]);
ReactDOM.render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>,
  document.getElementById("root")
);
