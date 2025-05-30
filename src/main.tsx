import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./login.css";
import { BrowserRouter } from 'react-router-dom';

const rootElement = document.getElementById("root");

if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  );
} else {
  console.error("Root element with ID 'root' not found.");
}