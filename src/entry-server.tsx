import React from "react";
import { renderToString } from "react-dom/server";
import { VistoLanding } from "./App";

export function render() { return renderToString(<React.StrictMode><VistoLanding /></React.StrictMode>); }
