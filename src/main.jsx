import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { initPatchworkSelection } from "./patchwork/selection-runtime.js";

// PATCHWORK visual-selection runtime. Disabled by default; it only activates
// when the authorized parent origin enables it via postMessage.
initPatchworkSelection();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
