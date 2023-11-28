import { useEffect, useState } from "react";
import { Button, Container, Table } from "react-bootstrap";
import { getAllRoles } from "../api/routes/role";
import { getUser } from "../api/routes/user";
import { Role, UserWithRole } from "../api/types";
import useAuth from "../hooks/useAuth";

export default function Roles() {
  const auth = useAuth();
  const [user, setUser] = useState<UserWithRole | null>(null);
  const [roles, setRoles] = useState<Role[] | null>(null);

  useEffect(() => {
    async function x() {
      if (!auth) return;
      const id = sessionStorage.getItem("id");
      if (id == null) return;

      const userRes = await getUser(id);
      if (userRes == null) return;
      const User = userRes.user as UserWithRole;
      if (User == null) return;
      setUser(User);

      const rolesRes = await getAllRoles();
      if (rolesRes == null) return;
      const roles = rolesRes.role as Role[];
      if (roles == null) return;
      setRoles(roles);
    }
    void x();
  }, [auth]);

  // TODO: Role Edit
  // TODO: Role Delete

  return (
    <Container className="mt-3">
      {!auth || user == null ? (
        <>
          <h2 className="text-center text-danger">Keine Berechtigungen für diese Seite</h2>
        </>
      ) : (
        <>
          <h2 className="text-center">Rollen Verwaltung</h2>
          <Table striped>
            <thead>
              <tr>
                <th>Aktuelle Rollen</th>
                <td>Edit</td>
                <td>Del</td>
              </tr>
            </thead>
            <tbody>
              {roles?.map((role) => (
                <tr key={role.id}>
                  <td>{role.name}</td>
                  <td>
                    <Button>Edit</Button>
                  </td>
                  <td>
                    <Button variant="danger">Delete</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      )}
    </Container>
  );
}
