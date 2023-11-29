import { useEffect, useState } from "react";
import { Button, Container, Table } from "react-bootstrap";
import { getAllRoles } from "../../api/routes/role";
import { getUsers, updateUserRole } from "../../api/routes/user";
import { Role, UserWithRole } from "../../api/types";
import useAdmin from "../../hooks/useAdmin";

export default function RoleAssign() {
  const [User, setUser] = useState<UserWithRole[] | null>(null);
  const [Roles, setRoles] = useState<Role[] | null>(null);
  const [selectedRole, setSelectedRole] = useState("");
  const admin = useAdmin();

  useEffect(() => {
    async function x() {
      const UserRes = await getUsers();
      const RoleRes = await getAllRoles();

      if (UserRes == null) return;
      if (RoleRes == null) return;

      if (UserRes.message === "Success") {
        const user = UserRes.user as UserWithRole[];
        setUser(user);
      }
      if (RoleRes.message === "Success") {
        const role = RoleRes.role as Role[];
        setRoles(role);
      }
    }
    void x();
  }, []);

  const save = async (userId: string) => {
    if (!selectedRole.startsWith(userId)) return;
    const split = selectedRole.split(";");
    if (split.length < 2) return;
    const UpdateRes = await updateUserRole(userId, split[1]);
    if (UpdateRes == null) return;
    if (UpdateRes.message === "Success") {
      location.reload();
    }
  };

  return (
    <Container>
      {admin ? (
        <>
          <h2 className="text-center">Aktuelle Benutzer:</h2>
          <Table striped>
            <thead>
              <tr>
                <th>Name</th>
                <td>Aktuelle Rolle</td>
                <td>Neue Rolle</td>
                <td>Save</td>
              </tr>
            </thead>
            <tbody>
              {User?.map((u) => (
                <tr key={u?.id}>
                  <td>{u?.name}</td>
                  <td>{u?.role?.name}</td>
                  <td>
                    <select
                      onChange={(e) =>
                        setSelectedRole(`${u!.id};${e.currentTarget.value}`)
                      }
                    >
                      {Roles?.map((role) => (
                        <option value={role.id} key={role.id}>
                          {role.name}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td>
                    <Button onClick={() => void save(u!.id)}>Speichern</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      ) : (
        <>NOPE</>
      )}
    </Container>
  );
}
