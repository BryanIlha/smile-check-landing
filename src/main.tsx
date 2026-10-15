import React from "react";
import ReactDOM from "react-dom/client";

import { VistoLanding } from "./App";

const root = document.getElementById("root");

if (!root) {
  throw new Error("Root element #root not found.");
}

const app = (
  <React.StrictMode>
    <VistoLanding />
  </React.StrictMode>
);

if (root.hasChildNodes()) ReactDOM.hydrateRoot(root, app);
else ReactDOM.createRoot(root).render(app);
