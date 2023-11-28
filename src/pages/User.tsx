import { useEffect, useState } from "react";
import { Container, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { getUser } from "../api/routes/user";
import type { UserWithRole } from "../api/types";
import useAuth from "../hooks/useAuth";

export default function User() {
  const auth = useAuth();
  const [User, setUser] = useState<UserWithRole | null>();

  useEffect(() => {
    async function x() {
      const id = sessionStorage.getItem("id");
      if (id == null) return;

      const userRes = await getUser(id);
      const user = userRes.user as UserWithRole;
      setUser(user);
    }
    void x();
  }, []);

  return (
    <Container className="mt-3">
      {!auth ? (
        <div className="text-center">
          <p>Bitte erst anmelden</p>
          <Link to="/logIn" className="btn btn-primary">
            Anmelden
          </Link>
        </div>
      ) : (
        <>
          <h1 className="text-center">Willkommen {User?.name}</h1>
          <Table striped className="mt-3">
            <thead>
              <tr>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>Name</th>
                <td>{User?.name}</td>
              </tr>
              <tr>
                <th>Mail</th>
                <td>{User?.mail}</td>
              </tr>
              <tr>
                <th>Zugewiesene Rolle</th>
                <td>{User?.role?.name}</td>
              </tr>
            </tbody>
          </Table>
        </>
      )}
    </Container>
  );
}
