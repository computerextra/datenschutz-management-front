import { Container } from "react-bootstrap";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Menu from "./components/Menu";
import Home from "./pages/Home";
import LogInPage from "./pages/LogInPage";
import Register from "./pages/Register";
import Roles from "./pages/Roles";
import User from "./pages/User";

function App() {
  return (
    <>
      <BrowserRouter>
        <Menu />
        <Container fluid>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/user" element={<User />} />
            <Route path="/LogIn" element={<LogInPage />} />
            <Route path="/register" element={<Register />} />
            <Route path="/avv" element={<>AVV</>} />
            <Route path="/admin" element={<>ADMIN</>} />
            <Route path="/admin/roles" element={<Roles />} />
          </Routes>
        </Container>
      </BrowserRouter>
    </>
  );
}

export default App;
