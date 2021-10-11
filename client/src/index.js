import * as React from "react";
import * as ReactDOM from "react-dom";
import "./index.css";
import { BrowserRouter } from 'react-router-dom';
import App from './App';
// import { CollectionsContextProvider } from './domains/gallery';
import { AuthProvider } from "./domains/auth";

ReactDOM.render(
  <AuthProvider>

      <BrowserRouter>
        <App />
      </BrowserRouter>
  </AuthProvider>,
  document.querySelector("#root")
);
