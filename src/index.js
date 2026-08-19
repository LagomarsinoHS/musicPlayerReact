import React from "react";
import { createRoot } from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/style.css";
import { App } from "./components/app";

const root = createRoot(document.querySelector("#root"));
root.render(<App />);
