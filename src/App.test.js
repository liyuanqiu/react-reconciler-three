import React from "react";
import ReactTHREE from "./ReactTHREE";
import App from "./App";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactTHREE.render(<App />, div);
  ReactTHREE.unmountComponentAtNode(div);
});
