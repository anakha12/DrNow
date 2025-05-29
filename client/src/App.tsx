import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserRegister from "./features/user/UserRegister";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<UserRegister />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
