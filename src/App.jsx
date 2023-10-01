import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import WaitListPage from "./pages/WaitListPage";
import NavBar from "./components/NavBar";
import Routing from "./Routing/Routing";

function App() {
  return (
    <BrowserRouter>
      <Routing />
    </BrowserRouter>
  );
}

export default App;
