import React from "react";
import Routes from "./router";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'

import GlobalStyle from "./styles/global";

function App() {
  return (
    <>
      <GlobalStyle />
      <ToastContainer autoClose={2000}/>
      <Routes />
    </>
  );
}

export default App;
