import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App.js";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const dark = createTheme({
  palette: {
    mode: "dark",
  },
});

// renders React Component "Root" into the DOM element with ID "root"
ReactDOM.createRoot(document.getElementById("root")).render(
  <ThemeProvider theme={dark}>
    <App />
  </ThemeProvider>
);
// allows for live updating
module.hot.accept();
