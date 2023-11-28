import { useEffect, useState } from "react";
import { Container, Nav, Navbar, NavbarCollapse, NavbarToggle } from "react-bootstrap";
import { Link } from "react-router-dom";
import { getUser } from "../api/routes/user";
import { User } from "../api/types";
import useAuth from "../hooks/useAuth";
import Login from "./Login";

export default function Menu() {
  const [expanded, setExpanded] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  const angemeldet = useAuth();
  const expand = () => {
    setExpanded(false);
  };

  useEffect(() => {
    async function x() {
      if (!angemeldet) return;

      // Zieh Benutzer.
      const id = sessionStorage.getItem("id");
      if (id == null) return;
      const User = await getUser(id);
      setUser(User?.user);
    }
    void x();
  }, [angemeldet]);

  return (
    <Navbar bg="dark" expand="lg" variant="dark" className="rounded mt-1" expanded={expanded}>
      <Container fluid>
        <Link className="navbar-brand" to="/">
          DSMS
        </Link>
        <NavbarToggle onClick={() => setExpanded((prev) => !prev)} />
        <NavbarCollapse>
          <Nav className="me-auto" variant="tabs">
            <Link to="/" className="nav-link" onClick={expand}>
              Übersicht
            </Link>
            <Link to="/avv" className="nav-link" onClick={expand}>
              AVV
            </Link>
          </Nav>
          {/* Konto */}
          {angemeldet ? (
            <>
              <small className="text-white">
                Angemeldet als: <Link to="/user">{user?.name}</Link> &nbsp; &nbsp;
              </small>
              <Login />
            </>
          ) : (
            <Link to="/logIn" className="btn btn-primary">
              Anmelden
            </Link>
          )}
        </NavbarCollapse>
      </Container>
    </Navbar>
  );
}
