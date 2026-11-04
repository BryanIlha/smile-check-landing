import { SolutionPage } from './SolutionPage';
import React from "react";
import { renderToString } from "react-dom/server";
import { VistoLanding } from "./App";

export function render(path = '/') { return renderToString(<React.StrictMode>{path === '/' ? <VistoLanding /> : <SolutionPage slug={path.replaceAll('/', '')} />}</React.StrictMode>); }

export { solutions } from './solutions';
