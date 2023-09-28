import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import WaitListPage from "./pages/WaitListPage";
import NavBar from "./components/NavBar";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/waitlist" element={<WaitListPage />} /> */}
        <Route path="/" element={<WaitListPage />} />

        {/* protected routes */}
        {/* <Route path="/" element={<NavBar />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
