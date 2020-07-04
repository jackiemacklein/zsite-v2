import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

/* import components */
import App from "./App";

/* import GrbalStyles */
import GlobalStyle from "./styles/global";

const root = document.getElementById("root");

const AppDOM = () => (
  <React.StrictMode>
    <BrowserRouter forceRefresh={true}>
      <GlobalStyle />
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

if (root.hasChildNodes() === true) {
  ReactDOM.hydrate(<AppDOM />, root);
} else {
  ReactDOM.render(<AppDOM />, root);
}
