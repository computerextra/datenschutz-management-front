import { useEffect, useState } from "react";
import {
  Button,
  Container,
  FloatingLabel,
  Form,
  FormControl,
  InputGroup,
  Table,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { createRole, deleteRole, getAllRoles } from "../../api/routes/role";
import { Role } from "../../api/types";
import useAdmin from "../../hooks/useAdmin";

export default function Roles() {
  const [roles, setRoles] = useState<Role[] | null>(null);
  const [newName, setNewName] = useState("");

  const admin = useAdmin();

  useEffect(() => {
    async function x() {
      if (!admin) return;
      const id = sessionStorage.getItem("id");
      if (id == null) return;

      const rolesRes = await getAllRoles();
      if (rolesRes == null) return;
      const roles = rolesRes.role as Role[];
      if (roles == null) return;
      setRoles(roles);
    }
    void x();
  }, [admin]);

  // TODO: Role Edit
  // TODO: Role Delete

  const DeleteRole = async (id: string) => {
    const Res = await deleteRole(id);
    if (Res == null) return;
    if (Res.message.includes("Successfully")) {
      location.reload();
    }
  };

  const CreateNewRole = async () => {
    if (newName.length < 1) return;

    const Role = await createRole(newName);
    if (Role == null) return;
    location.reload();
  };

  return (
    <Container className="mt-3">
      {!admin ? (
        <>
          <h2 className="text-center text-danger">
            Keine Berechtigungen für diese Seite
          </h2>
        </>
      ) : (
        <>
          <h2 className="text-center">Rollen Verwaltung</h2>
          <Form onSubmit={(e) => e.preventDefault()} className="mt-3 mb-3">
            <InputGroup>
              <FloatingLabel label="Name">
                <FormControl
                  type="text"
                  placeholder="Name"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                />
              </FloatingLabel>
              <Button type="submit" onClick={() => void CreateNewRole()}>
                Anlegen
              </Button>
            </InputGroup>
          </Form>
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
                    <Link
                      to={`/admin/roles/${role.id}`}
                      className="btn btn-primary"
                    >
                      Edit
                    </Link>
                  </td>
                  <td>
                    <Button
                      variant="danger"
                      onClick={() => void DeleteRole(role.id)}
                    >
                      Delete
                    </Button>
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
