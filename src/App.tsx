import { BrowserRouter, Route, Routes } from "react-router-dom";
import LogInPage from "./pages/LogInPage";
import User from "./pages/User";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<>Home</>} />
        <Route path="/user" element={<User />} />
        <Route path="/LogIn" element={<LogInPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
