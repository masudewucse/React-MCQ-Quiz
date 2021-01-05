import * as React from "react";
import { render } from "react-dom";

import App from "./App";
// Importing the Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";

const rootElement = document.getElementById("root");
render(<App />, rootElement);
