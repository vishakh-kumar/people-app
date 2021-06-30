import React from "react";
import ReactDOM from "react-dom";
// IMPORT SCSS FILE TO BE SOURCE OF STYLING
import "./styles.scss";
import App from "./App";
//  IMPORT ROUTER
import { BrowserRouter as Router } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";

ReactDOM.render(
  //Router will help us access information like router history, url paramiters, locations and stuff
  <Router>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Router>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
