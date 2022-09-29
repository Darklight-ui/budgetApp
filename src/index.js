/** @format */

import React from "react";
import ReactDom from "react-dom";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import { BudgetProvider } from "./components/contexts/BudgetContexts";

ReactDom.render(
	<BudgetProvider>
		<App />
	</BudgetProvider>,
	document.getElementById("root"),
);
