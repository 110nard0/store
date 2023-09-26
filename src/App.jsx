import { BrowserRouter, Route, Routes } from "react-router-dom";
import WaitListPage from "./pages/WaitListPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<WaitListPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
