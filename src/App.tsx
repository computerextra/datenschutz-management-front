import { Container } from "react-bootstrap";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Menu from "./components/Menu";
import RoleAssign from "./pages/Admin/RoleAssign";
import Roles from "./pages/Admin/Roles";
import RolesEdit from "./pages/Admin/RolesEdit";
import Home from "./pages/Home";
import LogInPage from "./pages/LogInPage";
import Register from "./pages/Register";
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
            <Route path="/admin/roles/:id" element={<RolesEdit />} />
            <Route path="/admin/roleAssign" element={<RoleAssign />} />
          </Routes>
        </Container>
      </BrowserRouter>
    </>
  );
}

export default App;
