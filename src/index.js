import React from "react";
import ReactTHREE from "./ReactTHREE";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

ReactTHREE.render(<App />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
