import { useEffect, useState } from "react";
import {
  Button,
  Container,
  FloatingLabel,
  Form,
  FormControl,
} from "react-bootstrap";
import { useParams } from "react-router-dom";
import { getRole, updateRole } from "../../api/routes/role";
import type { Role } from "../../api/types";
import useAdmin from "../../hooks/useAdmin";

export default function RolesEdit() {
  const { id } = useParams();
  const [role, setRole] = useState<Role | null>(null);
  const [name, setName] = useState("");
  const admin = useAdmin();

  useEffect(() => {
    async function x() {
      if (!admin) return;
      if (id == null) return;
      const RoleRes = await getRole(id);
      if (RoleRes == null) return;
      const Role = RoleRes.role as Role;
      setRole(Role);
      setName(Role.name);
    }
    void x();
  }, [admin, id]);

  const save = async () => {
    if (name.length < 1) return;
    if (id == null) return;
    if (name === role?.name) {
      location.reload();
    } else {
      const RoleRes = await updateRole(id, name);
      if (RoleRes.message === "Success") {
        location.reload();
      }
    }
  };

  return (
    <Container>
      {admin ? (
        <>
          <h1 className="text-center">{role?.name} bearbeiten</h1>
          <Form onSubmit={(e) => e.preventDefault()}>
            <FloatingLabel label="Name" controlId="Name" className="mb-3">
              <FormControl
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </FloatingLabel>
            <Button type="submit" onClick={save}>
              Speichern
            </Button>
          </Form>
        </>
      ) : (
        <>NOPE</>
      )}
    </Container>
  );
}
